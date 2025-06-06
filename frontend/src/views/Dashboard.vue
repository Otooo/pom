<template>
    <Loading :loading="loading" loadingText="Processando Requisição..." />

    <div v-if="!loading" class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Agendamentos"
                :value="totalSchedules"
                iconClass="pi-calendar"
                color="blue"
            />
        </div>
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Empresas"
                :value="totalCompanies"
                iconClass="pi-building-columns"
                color="orange"
            />
        </div>
        <div class="col-span-12 lg:col-span-4 xl:col-span-4">
            <StatsWidget 
                title="Locais"
                :value="totalLocations"
                iconClass="pi-map-marker"
                color="purple"
            />
        </div>

        <div class="col-span-6 xl:col-span-6">
            <ListWidget 
                title="Turnos Alocados"
                :data="dataShifts"
            />
        </div>
        <div class="col-span-12 xl:col-span-12">
            <BarChartWidget 
                title="Empresas Alocações Locais"
                :data="dataCompanies"
                :labels="labelCompanies"
            />
        </div>
    </div>
</template>

<script setup>
import ListWidget from '@/components/dashboard/ListWidget.vue';
import BarChartWidget from '@/components/dashboard/BarChartWidget.vue';
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
	const totalSchedules = computed(() => {
		return stats.value.totalSchedules;
	});

	const totalCompanies = computed(() => {
		return stats.value.totalCompanies;
	});

	const totalLocations = computed(() => {
		return stats.value.totalLocations;
	});

    const dataShifts = computed(() => {
        return stats.value.dataShifts;
	});

    const dataCompanies = computed(() => {
		return stats.value.dataCompanies;
	});

    const labelCompanies = computed(() => {
        return stats.value.labelCompanies;
	});

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
        const percent = 100 / total;
        Object.keys(data).forEach((key) => {
        	result.push({
                name: key,
                value: Math.round(data[key] * percent),
            })
        })
        
        return result;
    }

    const handleLabelLocations = () => {
    	return companies.value.map((location) => {
    		return location.name;
    	})
    }

    const handleDataCompanies = () => {
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
                    
                    dataCompanies: handleDataCompanies(),
                    labelCompanies: handleLabelLocations(),
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
