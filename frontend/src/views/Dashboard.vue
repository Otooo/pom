<template>
    <Loading :loading="loading" loadingText="Processando Requisição..." />

    <div v-if="!loading" class="grid grid-cols-12 gap-8">
        <!-- Schedules card -->
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Agendamentos"
                :value="totalSchedules"
                iconClass="pi-calendar"
                color="blue"
            />
        </div>
        <!-- Companies card -->
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Empresas"
                :value="totalCompanies"
                iconClass="pi-building-columns"
                color="orange"
            />
        </div>
        <!-- Locations card -->
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Locais"
                :value="totalLocations"
                iconClass="pi-map-marker"
                color="purple"
            />
        </div>

        <!-- List shifts card -->
        <div class="col-span-12 xl:col-span-12">
            <ListWidget 
                title="Turnos Alocados"
                :data="dataShifts"
            />
        </div>

        <!-- Schedules by Company Chart -->
        <div class="col-span-6 xl:col-span-6">
            <DonutsChartWidget 
                title="Empresas Alocações"
                :data="dataCompaniesSchedules"
                :labels="labelCompanies"
            />
        </div>
        <div class="col-span-6 xl:col-span-6">
            <DonutsChartWidget 
                title="Locais Alocações"
                :data="dataLocationsSchedules"
                :labels="labelLocations"
            />
        </div>

        <!-- Locations x Companies Chart -->
        <div class="col-span-12 xl:col-span-12">
            <BarChartWidget 
                title="Locais Alocações Empresas"
                :data="dataCompaniesXLocations"
                :labels="labelCompanies"
            />
        </div>
    </div>
</template>

<script setup>
import ListWidget from '@/components/dashboard/ListWidget.vue';
import BarChartWidget from '@/components/dashboard/BarChartWidget.vue';
import DonutsChartWidget from '@/components/dashboard/DonutsChartWidget.vue';
import StatsWidget from '@/components/dashboard/StatsWidget.vue';
import { onMounted, ref, watch, computed, nextTick } from 'vue';
import { useNotify } from '@/composables/useNotify';
import { fetchCompanies } from '@/service/company';
import { fetchLocations } from '@/service/location';
import { fetchSchedules} from '@/service/schedule';

    /** CONSTANTS */
    const { successToast, errorToast } = useNotify();

    /** VARIABLES */
    const loading = ref(true);
    const stats = ref({});
    const schedules = ref([]);
	const companies = ref([]);
	const locations = ref([]);

    /** COMPUTE & WATCH */
	const totalSchedules = computed(() => { return stats.value.totalSchedules; });
	const totalCompanies = computed(() => { return stats.value.totalCompanies; });
	const totalLocations = computed(() => { return stats.value.totalLocations; });
    const dataShifts = computed(() => { return stats.value.dataShifts; });
    const dataCompaniesXLocations = computed(() => { return stats.value.dataCompaniesXLocations; });
    const labelCompanies = computed(() => { return stats.value.labelCompanies; });
    const labelLocations = computed(() => { return stats.value.labelLocations; });
    const dataCompaniesSchedules = computed(() => { return stats.value.dataCompaniesSchedules; });
    const dataLocationsSchedules = computed(() => { return stats.value.dataLocationsSchedules; });

    /** METHODS */
    const handleShiftSats = () => {
        const data = {
            morning: 0,
            afternoon: 0,
            night: 0,
        };

        let total = 0;
        schedules.value.forEach((schedule) => {
            let value = data[schedule.shift] ?? 0;
            value += 1;
            data[schedule.shift] = value;
            total++;
        });

        const result = [];
        const percent = total? (100 / total) : 0;
        Object.keys(data).forEach((key) => {
        	result.push({
                name: key,
                value: Math.round(data[key] * percent),
            })
        })
        
        return result;
    }

    const handleLabelLocations = () => {
    	return locations.value.map((location) => {
    		return location.name;
    	})
    }

    const handleLabelCompanies = () => {
    	return companies.value.map((company) => {
    		return company.name;
    	})
    }

    const handleDataCompaniesXLocations = () => {
    	const data = {};
    	schedules.value.forEach((schedule) => {
            if (!data[schedule.location.name]) {
                data[schedule.location.name] = {};
                
                for (let i = 0; i < companies.value.length; i++) {
                    data[schedule.location.name][companies.value[i].name] = 0;
                }
            }
            data[schedule.location.name][schedule.company.name]++;
    	})
    	
        const result = [];
        Object.keys(data).forEach((locationName) => {
        	const value = [];
            Object.keys(data[locationName]).forEach((companyName) => {
                value.push(data[locationName][companyName]);
            })

            result.push({
                label: locationName,
                value: value,
            })
        })

        return result;
    }

    const handleCompaniesSchedules = () => {
    	let data = {};
    	schedules.value.forEach((schedule) => {
            if (!data[schedule.company.name]) {
                data[schedule.company.name] = 0;
            }
            data[schedule.company.name]++;
    	})

        const result = []
        Object.entries(data).forEach(([key, value]) => {
            result.push({
                label: key,
                value
            })
        })

        return result;
    }

    const handleLocationsSchedules = () => {
    	let data = {};
    	schedules.value.forEach((schedule) => {
            if (!data[schedule.location.name]) {
                data[schedule.location.name] = 0;
            }
            data[schedule.location.name]++;
    	})

        const result = []
        Object.entries(data).forEach(([key, value]) => {
            result.push({
                label: key,
                value
            })
        })

        return result;
    }

    const handleStats = async () => {
        const promises = [
            new Promise ((resolve, reject) => fetchCompanies().then((data) => { companies.value = data; resolve(); }).catch(reject)),
            new Promise ((resolve, reject) => fetchLocations().then((data) => { locations.value = data; resolve(); }).catch(reject)),
            new Promise ((resolve, reject) => fetchSchedules().then((data) => { schedules.value = data; resolve(); }).catch(reject)),
        ];

        return new Promise((resolve, reject) => {
            Promise.all(promises)
            .then(() => {
                stats.value = {
                    totalCompanies: companies.value.length,
                    totalLocations: locations.value.length,
                    totalSchedules: schedules.value.length,

                    dataShifts: handleShiftSats(),
                    
                    dataCompaniesSchedules: handleCompaniesSchedules(),
                    dataLocationsSchedules: handleLocationsSchedules(),

                    dataCompaniesXLocations: handleDataCompaniesXLocations(),
                    labelLocations: handleLabelLocations(),
                    labelCompanies: handleLabelCompanies(),
                }

                resolve();
            })
            .catch(reject)
        })
    }

    onMounted(() => {
        loading.value = true;
		
		handleStats()
		.then(() => successToast())
		.then(nextTick)
		.catch(error => { errorToast(error?.message); })
		.finally(() => { 
            loading.value = false;
        });
    })
    
</script>
