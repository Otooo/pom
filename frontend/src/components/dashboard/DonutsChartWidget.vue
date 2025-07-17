<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">{{ title }}</div>
        <Chart type="doughnut" :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { useLayout } from '@/layout/composables/layout';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    title: {
        default: 'N/A'
    },
    data: {
        default: []
    },
    labels: {
        default: []
    }
});

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const chartData = ref(null);
const chartOptions = ref(null);
const usedColors = ref([]);

const randomRGBA = (retry=10) => {
    const r = Math.floor(Math.random() * 250 + 5);
    const g = Math.floor(Math.random() * 250 + 5);
    const b = Math.floor(Math.random() * 250 + 5);
    
    const color = `rgba(${r}, ${g}, ${b}, 0.8)`;
    
    usedColors.value.forEach((usedColor) => {
        if (usedColor === color && retry > 0) {
            return randomRGBA(retry - 1);
        }
    });
    usedColors.value.push(color);
    
    return color;
}

function setChartData() {
    const datasets = [];
    const colors = []
    
    props.data.map((item) => {
        colors.push(randomRGBA());
        datasets.push(item.value);
    });

    return {
        labels: props.labels,
        datasets: [{
            data: datasets,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
        }]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
}

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

