<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">{{ title }}</div>
        <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
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
    props.data.map((item) => {
        datasets.push({
            type: 'bar',
            label: item.label,
            backgroundColor: randomRGBA(),
            data: item.value,
            borderRadius: {
                topLeft: 8,
                topRight: 8
            },
            borderSkipped: true,
            barThickness: 32
        });
    });

    return {
        labels: props.labels,
        datasets,
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');
    
    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
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


