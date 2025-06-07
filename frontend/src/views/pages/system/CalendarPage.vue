<template>
	<div class="card">
        <div class="font-semibold text-xl mb-4">Calendário</div>
		
		<Loading :loading="loading" loadingText="Processando Requisição..." />

		<!-- Drag Drop Companies & Export MSGs -->
		<Toolbar v-if="companies.length" class="mb-6">
			<template #start>
				<div>
					<div class="font-semibold text-xl mb-2">Empresas disponíveis</div>
					<div class="flex gap-2 flex-wrap my-2">
						<div
							v-for="company in companies"
							:key="company.code"
							class="draggable-company mx-1"
							draggable="true"
							@dragstart="onDragStart(company)"
						>
							{{ company.name }}
						</div>
					</div>
				</div>
			</template>

			<template #end>
				<Button label="Gerar Mensagens" icon="pi pi-upload" severity="secondary" @click="togglePopover" />
				<Popover ref="popover" id="overlay_panel" style="width: 450px">
					<Select
						v-model="dataMsgParam"
						:options="months"
						optionLabel="name"
						optionValue="code"
						placeholder="Mês"
						checkmark 
						:highlightOnSelect="true"
					/> de {{ format(today, 'yyyy') }}
					
					<Button label="Gerar" icon="pi pi-send" @click="exportMsgWhatsApp" severity="info" outlined autofocus />
				</Popover>
			</template>
		</Toolbar>
		
		<!-- Calendar -->
		<Qalendar 
			:events="schedules"
			:config="config"
			:is-loading="loading"
			:selected-date="selectedDate"
			@updated-period="() => setupDropListeners()"
			@date-was-clicked="onCreateEvent"
			@edit-event="onEditEvent"
			@delete-event="onDeleteEvent"
			@event-was-dragged="handleEditDragged"
		>
		</Qalendar>

		<!-- Dialog ADD/EDIT -->
		<Dialog v-model:visible="eventDialog" :style="{ width: '450px' }" header="Agendamento" :modal="true">
            <Fluid class="flex flex-col md:flex-row gap-8">
				<div class="card flex flex-col gap-4 w-full">
					<!-- Date -->
					<div>
						<h5> {{ selectedDateFormatted }} </h5>
					</div>

					<!-- Company -->
					<div class="w-full">
						<div class="font-semibold text-xl">Empresas</div>
						<Select
							v-model="form.company_id"
							:options="companies"
							optionLabel="name"
							optionValue="code"
							placeholder="Empresa"
							showClear
							filter
							checkmark 
							:highlightOnSelect="true"
						>
							<template #footer>
								<div class="p-3">
									<Button
										label="Add Empresa"
										fluid
										severity="secondary"
										text size="small"
										icon="pi pi-plus"
										@click="$router.push('/companies')"
									/>
								</div>
							</template>
						</Select>
					</div>

					<!-- Location -->
	                <div class="w-full">
						<div class="font-semibold text-xl">Locais</div>
						<Select
							v-model="form.location_id"
							:options="locations"
							optionLabel="name"
							optionValue="code"
							placeholder="Local"
							showClear
							filter
							checkmark 
							:highlightOnSelect="true"
						>
							<template #footer>
								<div class="p-3">
									<Button
										label="Add Local"
										fluid
										severity="secondary"
										text size="small"
										icon="pi pi-plus"
										@click="$router.push('/locations')"
									/>
								</div>
							</template>
						</Select>
					</div>

					<!-- Shift -->
	                <div class="w-full">					
						<div class="font-semibold text-xl">Turno</div>
						<Select
							v-model="form.shift"
							:options="topics"
							optionLabel="name"
							optionValue="code"
							placeholder="Turno"
						/>
					</div>					
				</div>
			</Fluid>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button :label="addOrEditLabel" icon="pi pi-check" @click="handleSave" />
            </template>
        </Dialog>

		<!-- Dialog DELETE -->
		<Dialog header="Confirmação" v-model:visible="displayDeleteConfirmation" :style="{ width: '350px' }" :modal="true">
			<div class="flex items-center justify-center">
				<i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
				<span>Tem certeza que deseja excluir este agendamento?</span>
			</div>
			<template #footer>
				<Button label="Não" icon="pi pi-times" @click="hideDialog" text severity="secondary" />
				<Button label="Sim" icon="pi pi-check" @click="handleDelete" severity="danger" outlined autofocus />
			</template>
		</Dialog>

		<Dialog
			header="Mensagem Gerada"
			v-model:visible="showMessageDialog"
			:style="{ width: '500px' }"
			:modal="true"
		>
			<div class="p-4">
				<!-- Área somente-leitura com o texto gerado -->
				<textarea
					class="w-full h-48 p-2 border rounded resize-none"
					readonly
					v-model="dataMsg"
				></textarea>
			</div>
			<template #footer>
				<Button
					label="Copiar"
					icon="pi pi-copy"
					@click="copyToClipboard"
					severity="secondary"
				/>
				<Button
					label="Fechar"
					icon="pi pi-times"
					@click="showMessageDialog = false"
					text
				/>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import { onMounted, computed, ref, nextTick, toRaw } from 'vue'
	import { Qalendar } from "qalendar";
	import Loading from '@/components/commons/Loading.vue'
	import { fetchCompanies } from '@/service/company';
	import { fetchLocations } from '@/service/location';
	import { createSchedule, deleteSchedule, fetchSchedules, generateDataMsg, updateSchedule } from '@/service/schedule';
	import { useNotify } from '@/composables/useNotify';
	import { format, parseISO } from 'date-fns';
	import { ptBR } from 'date-fns/locale';
	import { shiftResolve } from '@/utils/timeUtil';

	/** CONSTANTS */
    const { successToast, errorToast } = useNotify();
	const classDOMCalendarComponent = '.calendar-month__weekday[id^="day-"]';
	const today = new Date();
	const config= {
		locale: 'pt-BR',
		month: {
			showTrailingAndLeadingDates: false,
		},
		defaultMode: 'month',
		disableModes: ['week', 'day'],
		style: {
			colorSchemes: {
				morning: {
					color: '#fff',
					backgroundColor: 'lightgreen',
				},
				afternoon: {
					color: '#fff',
					backgroundColor: 'blue',
				},
				night: {
					color: '#fff',
					backgroundColor: 'red',
				},
			}
		},
		isEditable: true,
		eventDialog: {
			isCustom: false,
		},
	};
	const topics = [
		{ name: 'morning', code: 'morning' },
		{ name: 'afternoon', code: 'afternoon' },
		{ name: 'night', code: 'night' }
	];
	const defaultForm = {
		id: null,
		company_id: null,
		shift: 'morning',
		location_id: null,
		date: '',
	};
	const months = [
		{ name: 'Janeiro', code: `${format(today, 'yyyy')}-01` },
		{ name: 'Fevereiro', code: `${format(today, 'yyyy')}-02` },
		{ name: 'Março', code: `${format(today, 'yyyy')}-03` },
		{ name: 'Abril', code: `${format(today, 'yyyy')}-04` },
		{ name: 'Maio', code: `${format(today, 'yyyy')}-05` },
		{ name: 'Junho', code: `${format(today, 'yyyy')}-06` },
		{ name: 'Julho', code: `${format(today, 'yyyy')}-07` },
		{ name: 'Agosto', code: `${format(today, 'yyyy')}-08` },
		{ name: 'Setembro', code: `${format(today, 'yyyy')}-09` },
		{ name: 'Outubro', code: `${format(today, 'yyyy')}-10` },
		{ name: 'Novembro', code: `${format(today, 'yyyy')}-11` },
		{ name: 'Dezembro', code: `${format(today, 'yyyy')}-12` }
	];

	/** VARIABLES */
	const schedules = ref([]);

	const companies = ref([]);
	const locations = ref([]);

	const loading = ref(true);
	const selectedDate = ref(today);
	const scheduleToDelete = ref(null);
	const eventDialog = ref(false);
	const displayDeleteConfirmation = ref(false);
	const draggedCompany = ref(null);
	const form = ref(defaultForm);
	const popover = ref(null);
	const dataMsgParam = ref(format(today, 'yyyy-MM'));
	const dataMsg = ref('');
	const showMessageDialog = ref(false);

	/** COMPUTE & WATCH */
	const selectedDateFormatted = computed(() => {
		const formattedDate = form.value.date
			? format(parseISO(form.value.date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
			: format(selectedDate.value, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
		
		return formattedDate;
	});

	const addOrEditLabel = computed(() => {
		return form.value.id? 'Editar' : 'Adicionar';
	});

	/** METHODS */
	const handleScheduleEvents = async () => {
		const tempSchedules = [];
        fetchSchedules().then((data) => {
			data.forEach(schedule => {
				tempSchedules.push({
					id: schedule.id,
					title: `${schedule.company.name} - ${schedule.location.name} - ${shiftResolve(schedule.shift)}`,
					time: { start: schedule.date, end: schedule.date },
					topic: shiftResolve(schedule.shift),
					location: schedule.location.name,
					with: schedule.company.name,
					colorScheme: schedule.shift,
					isEditable: true,
					item: schedule,
				})
			})

			schedules.value = tempSchedules;
        })
	}

	const handleCompaniesSelect = async () => {
		companies.value = [];
        fetchCompanies().then((data) => {
            data.map(company => {
				companies.value.push({
					name: company.name,
					code: company.id,
					item: company
				})
			})
        })
	}
	
	const handleLocationsSelect = async () => {
		locations.value = [];
        fetchLocations().then((data) => {
            data.map(location => {
				locations.value.push({
					name: location.name,
					code: location.id,
					item: location
				})
			})
        })
	}

	const hideDialog = () => {
		eventDialog.value = false;
		displayDeleteConfirmation.value = false;
	}

	const onCreateEvent = (date, companyId) => {
		selectedDate.value = parseISO(date);
		form.value = defaultForm;
		form.value.company_id = companyId;
		form.value.date = date;
		
		nextTick(() => {
			eventDialog.value = true;
        });
	}

	const onEditEvent = (event) => {
		const schedule = toRaw(schedules.value.find(s => s.id === event).item ?? {});
		form.value = { 
			id: schedule.id,
			company_id: schedule.company_id,
			shift: schedule.shift,
			location_id: schedule.location_id,
			date: schedule.date,
		};
		
		nextTick(() => {
			eventDialog.value = true;
        });
	}

	const onDeleteEvent = (scheduleId) => {
		scheduleToDelete.value = scheduleId;
		displayDeleteConfirmation.value=true;
	}

	const handleEditDragged = (scheduleEvent) => {
		loading.value = true;

		const schedule = scheduleEvent.item;
		form.value = {
			id: schedule.id,
			company_id: schedule.company_id,
			shift: schedule.shift,
			location_id: schedule.location_id,
			date: scheduleEvent.time.start,
		};

		handleEdit().then((data) => {
			successToast('Empresa alocada com sucesso!');
			handleScheduleEvents();
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
			setupDropListeners();
			loading.value = false;
			hideDialog();
		})
	}

	const handleSave = () => {
		loading.value = true;

		const action = !!form.value.id
			? handleEdit
			: handleCreate;

		action().then((data) => {
			successToast('Empresa alocada com sucesso!');
			handleScheduleEvents();
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
			setupDropListeners();
			loading.value = false;
			hideDialog();
		})
	}
	const handleCreate = async () => {
		return createSchedule(form.value)
	}
	const handleEdit = async () => {
		return updateSchedule(form.value.id, form.value)
	}

	const handleDelete = () => {
		loading.value = true;
		deleteSchedule(scheduleToDelete.value).then((data) => {
			successToast('Agendamento excluido com sucesso!');
			handleScheduleEvents();
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
			// setupDropListeners();
			scheduleToDelete
			loading.value = false;
			hideDialog();
		})
	}

	onMounted(() => {
        loading.value = true;
		
		handleScheduleEvents()
		.then(handleCompaniesSelect)
		.then(handleLocationsSelect)
		.then(() => nextTick())
		.then(() => setupDropListeners())
		.catch(error => { errorToast(error?.message); })
		.finally(() => { loading.value = false; });
    })

	const setupDropListeners = (retries = 2) => {
		setTimeout(() => {
			const dayElements = document.querySelectorAll(classDOMCalendarComponent);
			
			if (!dayElements.length) {
				if (retries > 0) {
					nextTick(() => {
						setupDropListeners(retries - 1);
					});
				}
				return;
			};

			dayElements.forEach((day) => {
				day.removeEventListener("dragover", handleDragOver);
				day.removeEventListener("dragenter", handleDragEnter);
				day.removeEventListener("dragleave", handleDragLeave);
				day.removeEventListener("drop", handleDrop);
				
				day.addEventListener("dragover", handleDragOver);
				day.addEventListener("dragenter", handleDragEnter);
				day.addEventListener("dragleave", handleDragLeave);
				day.addEventListener("drop", handleDrop);
			});
		}, 350);

	};
	const onDragStart = (company) => {
		draggedCompany.value = company.code;
	};
	const handleDragOver = (e) => {
		e.preventDefault();
		e.currentTarget.classList.add('drag-over');
	};
	const handleDragEnter = (e) => {
		e.preventDefault();
		e.currentTarget.classList.add('drag-over');
	};
	const handleDragLeave = (e) => {
		e.currentTarget.classList.remove('drag-over');
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.remove('drag-over');
		
		// Extract day from div
		const dayId = e.currentTarget.getAttribute('id'); // Ex: "day-2025-06-24"
		if (!dayId || !draggedCompany.value) return;
		const dateString = dayId.replace('day-', '');

		if (dateString && draggedCompany.value) {
			onCreateEvent(dateString, draggedCompany.value);
		}
	};

	const togglePopover = (ev) => {
		popover.value.toggle(ev);
	}

	const exportMsgWhatsApp = () => {
		loading.value = true;
		generateDataMsg(dataMsgParam.value).then((data) => {
			dataMsg.value = handleMsg(data)
			showMessageDialog.value = true
			successToast('Mensagem gerada com sucesso!');
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
			togglePopover(null);
			loading.value = false;
		})
	}

	const handleMsg = (data) => {
		if (!data) {
			return 'Nenhuma mensagem disponível para o período selecionado.'
		}

		let text = `\n`;
		Object.entries(data).forEach(([key, items]) => {
			text += `${items[0].companyName}\n`;
			items.forEach(value => {
				text += `${format(parseISO(value.date), 'dd/MM')} - ${value.locationName} (${shiftResolve(value.shift)})\n`
			})
			text += '\n';
		});

		return text;
	}

	const copyToClipboard = () => {
		navigator.clipboard
		.writeText(dataMsg.value)
		.then(() => {
			successToast('Texto copiado para a área de transferência!')
		})
			.catch((err) => {
			errorToast('Falha ao copiar: ' + err)
		})
	}

</script>

<style>
	@import "qalendar/dist/style.css";

	/* Estilo global ou dentro do seu <style scoped> */
	.calendar-month__weekday {
		min-height: 80px; /* aumenta a altura */
		/* height: 80px; */
		max-height: none;
		min-width: 80px; /* aumenta a largura */
		/* width: 80px; */
		max-width: none;
		caret-color: transparent;
		cursor: pointer;
	}
	
	.calendar-month__weekday * {
		caret-color: transparent;
		font-size: 0.8rem;
	}

	.draggable-company {
        padding: 8px 12px;
        background-color: var(--primary-color);
        color: white;
        font-weight: bold;
        margin-bottom: 6px;
        border-radius: 4px;
        cursor: grab;
        user-select: none;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .draggable-company:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .draggable-company:active {
        cursor: grabbing;
    }
    .calendar-month__weekday.drag-over {
        background-color: rgba(var(--primary-color-rgb, 59, 130, 246), 0.15);
        box-shadow: inset 0 0 0 3px var(--primary-color, #3b82f6);
    }

</style>