import ExcelJS from 'exceljs';
import { DataService } from './DataService';
import { Schedule } from '../models/Schedule';
import { Company } from '../models/Company';
import { Location } from '../models/Location';
import { DB_COLLECTION } from '../types/db_collection.enum';
import { DATA_REQUIRED_ERROR } from '../utils/error';

const SCHEDULE_SERVICE = new DataService<Schedule>(DB_COLLECTION.SCHEDULE);
const COMPANY_SERVICE = new DataService<Company>(DB_COLLECTION.COMPANY);
const LOCATION_SERVICE = new DataService<Location>(DB_COLLECTION.LOCATION);

type ShiftColumn = 'MANHÃ' | 'TARDE' | 'NOITE';

function normalizeShift(shift: string): ShiftColumn | string {
    const s = (shift || '').toLowerCase();
    if (/(manh|morning|\bm\b)/i.test(s)) return 'MANHÃ';
    if (/(tard|afternoon|\bt\b)/i.test(s)) return 'TARDE';
    if (/(noit|night|\bn\b)/i.test(s)) return 'NOITE';
    return 'NÃO IDENTIFICADO';
}

function getDaysOfMonth(monthYear: string): string[] {
    // monthYear: YYYY-MM
    const [yearStr, monthStr] = monthYear.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const date = new Date(year, month - 1, 1);

    const days: string[] = [];
    while (date.getMonth() === month - 1) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        days.push(`${yyyy}-${mm}-${dd}`);
        date.setDate(date.getDate() + 1);
    }

    return days;
}

function mountExcel( 
    schedulesByLocation: Map<string, Schedule[]>,
    monthDays: string[],
    companyMap: Map<string, string>,
    locationMap: Map<string, string>,
): ExcelJS.Workbook {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'POM Calendário';
    wb.created = new Date();

    for (const [locationId, locationSchedules] of schedulesByLocation.entries()) {
        const locationName = (locationMap.get(locationId) || `Local-${locationId}`).toUpperCase();
        const ws = wb.addWorksheet(locationName);

        // Index por dia e turno (lista de empresas por turno)
        const indexByDay: Record<string, Partial<Record<ShiftColumn, string[]>>> = {};
        for (const schedule of locationSchedules) {
            const col = normalizeShift(schedule.shift as string);
            if (!col) continue;

            const companyName = (companyMap.get(schedule.company_id) || schedule.company?.name || 'N/D').toUpperCase();
            indexByDay[schedule.date] = indexByDay[schedule.date] || {};
            const list = indexByDay[schedule.date]?.[col as ShiftColumn];
            if (list) {
                if (!list.includes(companyName)) list.push(companyName); // evita duplicados
            } else {
                (indexByDay[schedule.date] as Record<ShiftColumn, string[]>)[col as ShiftColumn] = [companyName];
            }
        }

        // Descobrir quantas colunas por turno (mínimo 1)
        const maxByShift = { 'MANHÃ': 1, 'TARDE': 1, 'NOITE': 1 } as Record<ShiftColumn, number>;
        for (const day of monthDays) {
            const entry = indexByDay[day] || {};
            (['MANHÃ', 'TARDE', 'NOITE'] as ShiftColumn[]).forEach(shift => {
                const qty = ((entry[shift] as string[] | undefined)?.length || 0);
                if (qty > maxByShift[shift]) maxByShift[shift] = qty;
            });
        }

        // Colunas dinâmicas (sem cabeçalhos automáticos; usaremos linha 1 manual)
        const columns: { key: string; width: number }[] = [{ key: 'date', width: 12 }];
        for (let i = 1; i <= maxByShift['MANHÃ']; i++) columns.push({ key: `morning_${i}`, width: 20 });
        for (let i = 1; i <= maxByShift['TARDE']; i++) columns.push({ key: `afternoon_${i}`, width: 20 });
        for (let i = 1; i <= maxByShift['NOITE']; i++) columns.push({ key: `night_${i}`, width: 20 });
        ws.columns = columns as any;

        // Índices de início por bloco de turno
        const startMorningIdx = 2;
        const startAfternoonIdx = startMorningIdx + maxByShift['MANHÃ'];
        const startNightIdx = startAfternoonIdx + maxByShift['TARDE'];

        // NOVO: índices de fim por bloco (para aplicar separadores mais escuros)
        const endMorningIdx = startMorningIdx + maxByShift['MANHÃ'] - 1;
        const endAfternoonIdx = startAfternoonIdx + maxByShift['TARDE'] - 1;
        const endNightIdx = startNightIdx + maxByShift['NOITE'] - 1;

        // Cabeçalho agrupado (UMA linha, sem numeração)
        const headerTop = ws.getRow(1);
        const borderMedium = { style: 'thin' as ExcelJS.BorderStyle };

        // Borda do header (linhas do header) um pouco mais escura
        const headerLineBorder = { style: 'medium' as ExcelJS.BorderStyle };

        // DATA
        headerTop.getCell(1).value = 'DATA';

        // MANHÃ (mescla horizontal sobre as colunas do bloco)
        ws.mergeCells(1, startMorningIdx, 1, startMorningIdx + maxByShift['MANHÃ'] - 1);
        headerTop.getCell(startMorningIdx).value = 'MANHÃ';

        // TARDE
        ws.mergeCells(1, startAfternoonIdx, 1, startAfternoonIdx + maxByShift['TARDE'] - 1);
        headerTop.getCell(startAfternoonIdx).value = 'TARDE';

        // NOITE
        ws.mergeCells(1, startNightIdx, 1, startNightIdx + maxByShift['NOITE'] - 1);
        headerTop.getCell(startNightIdx).value = 'NOITE';

        // Estilo do cabeçalho: topo/baixo escuros; laterais padrão
        headerTop.font = { bold: true };
        headerTop.alignment = { horizontal: 'center', vertical: 'middle' };
        headerTop.eachCell(cell => {
            cell.border = {
                top: headerLineBorder,
                bottom: headerLineBorder,
                left: borderMedium,
                right: borderMedium,
            };
        });

        // Separadores verticais mais escuros entre grupos e entre DATA↔MANHÃ
        const applyHeaderSeparators = () => {
            // Entre DATA ↔ MANHÃ
            const dataCell = headerTop.getCell(1);
            dataCell.border = { ...dataCell.border, right: headerLineBorder };
            const morningStartCell = headerTop.getCell(startMorningIdx);
            morningStartCell.border = { ...morningStartCell.border, left: headerLineBorder };

            // Limites dos blocos MANHÃ/TARDE/NOITE
            const morningEndCell = headerTop.getCell(endMorningIdx);
            morningEndCell.border = { ...morningEndCell.border, right: headerLineBorder };

            const afternoonStartCell = headerTop.getCell(startAfternoonIdx);
            afternoonStartCell.border = { ...afternoonStartCell.border, left: headerLineBorder };
            const afternoonEndCell = headerTop.getCell(endAfternoonIdx);
            afternoonEndCell.border = { ...afternoonEndCell.border, right: headerLineBorder };

            const nightStartCell = headerTop.getCell(startNightIdx);
            nightStartCell.border = { ...nightStartCell.border, left: headerLineBorder };
            const nightEndCell = headerTop.getCell(endNightIdx);
            nightEndCell.border = { ...nightEndCell.border, right: headerLineBorder };
        };
        applyHeaderSeparators();

        // NOVO: separadores escuros nas linhas de dados (somente transições de turno)
        const applyRowSeparators = (row: ExcelJS.Row) => {
            // Entre DATA ↔ MANHÃ
            const dataCell = row.getCell(1);
            dataCell.border = { ...dataCell.border, right: headerLineBorder };
            const morningStartCell = row.getCell(startMorningIdx);
            morningStartCell.border = { ...morningStartCell.border, left: headerLineBorder };

            // Limite MANHÃ ↔ TARDE
            const morningEndCell = row.getCell(endMorningIdx);
            morningEndCell.border = { ...morningEndCell.border, right: headerLineBorder };
            const afternoonStartCell = row.getCell(startAfternoonIdx);
            afternoonStartCell.border = { ...afternoonStartCell.border, left: headerLineBorder };

            // Limite TARDE ↔ NOITE
            const afternoonEndCell = row.getCell(endAfternoonIdx);
            afternoonEndCell.border = { ...afternoonEndCell.border, right: headerLineBorder };
            const nightStartCell = row.getCell(startNightIdx);
            nightStartCell.border = { ...nightStartCell.border, left: headerLineBorder };
        };

        // Preencher linhas com colunas múltiplas por turno
        monthDays.forEach(day => {
            const entry = indexByDay[day] || {};
            const morningList = (entry['MANHÃ'] as string[]) || [];
            const afternoonList = (entry['TARDE'] as string[]) || [];
            const nightList = (entry['NOITE'] as string[]) || [];

            const rowValues: Record<string, string> = { date: day };
            for (let i = 1; i <= maxByShift['MANHÃ']; i++) rowValues[`morning_${i}`] = morningList[i - 1] || '';
            for (let i = 1; i <= maxByShift['TARDE']; i++) rowValues[`afternoon_${i}`] = afternoonList[i - 1] || '';
            for (let i = 1; i <= maxByShift['NOITE']; i++) rowValues[`night_${i}`] = nightList[i - 1] || '';

            const row = ws.addRow(rowValues);

            // Alinhamento nas células de turno (sem quebra de linha)
            for (let idx = startMorningIdx; idx < startNightIdx + maxByShift['NOITE']; idx++) {
                row.getCell(idx).alignment = { horizontal: 'left', vertical: 'middle' };
            }

            // Pintar células vazias de vermelho (ARGB completo)
            const fillRed = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB80000' } } as ExcelJS.Fill;
            const paintEmpty = (start: number, count: number) => {
                for (let i = 0; i < count; i++) {
                    const cell = row.getCell(start + i);
                    if (!String(cell.value ?? '').trim()) cell.fill = fillRed;
                }
            };
            paintEmpty(startMorningIdx, maxByShift['MANHÃ']);
            paintEmpty(startAfternoonIdx, maxByShift['TARDE']);
            paintEmpty(startNightIdx, maxByShift['NOITE']);

            // Bordas leves: somente topo/baixo em toda a linha (sem laterais internas)
            row.eachCell(cell => {
                cell.border = {
                    top: borderMedium,
                    bottom: borderMedium,
                };
            });

            // Aplicar separadores verticais escuros nas transições de turno
            applyRowSeparators(row);
        });

        // Congelar apenas a primeira linha (sem subcabeçalho)
        ws.views = [{ state: 'frozen', ySplit: 1 }];
    }

    return wb;
}

export const ExportService = {
    buildCalendarWorkbook: async (monthYear: string): Promise<Buffer> => {
        if (monthYear.length !== 7) {
            DATA_REQUIRED_ERROR('Mês e ano devem ser informado');
        }

        const schedules = (await SCHEDULE_SERVICE.getAll()).filter(schedule => schedule.date.substring(0, 7) === monthYear);

        // Mesma otimização do index()
        const companyIds = [...new Set(schedules.map(schedule => schedule.company_id))];
        const locationIds = [...new Set(schedules.map(schedule => schedule.location_id))];

        const [companies, locations] = await Promise.all([
            COMPANY_SERVICE.getByIds(companyIds),
            LOCATION_SERVICE.getByIds(locationIds)
        ]);

        const companyMap = new Map(companies.map(company => [company.id, company.name]));
        const locationMap = new Map(locations.map(location => [location.id, location.name]));

        const monthDays = getDaysOfMonth(monthYear);

        // Agrupar por local
        const schedulesByLocation = new Map<string, Schedule[]>();
        schedules.forEach(schedule => {
            const list = schedulesByLocation.get(schedule.location_id) || [];
            list.push(schedule);
            schedulesByLocation.set(schedule.location_id, list);
        });

        const wb = mountExcel(
            schedulesByLocation,
            monthDays,
            companyMap,
            locationMap,
        );

        // Caso não haja schedules no mês, criar uma planilha informativa
        if (wb.worksheets.length === 0) {
            const ws = wb.addWorksheet(`Calendário ${monthYear}`);
            ws.addRow(['Sem dados para o mês selecionado']);
        }

        const buffer = await wb.xlsx.writeBuffer();
        
        return Buffer.from(buffer);
    }
}