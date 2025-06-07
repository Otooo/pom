<template>
    <div class="card">
        <ul class="list-none p-0 m-0">
            <li v-for="(item, index) in data" :key="index" class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{ item.name }}</span>
                    <div class="mt-1 text-muted-color">{{ shiftResolve(item.name) }}</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-orange-500 h-full" :style="[`width: ${item.value}%`]"></div>
                    </div>
                    <span class="text-orange-500 ml-4 font-medium">%{{ item.value }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { shiftResolve } from '@/utils/timeUtil';

// Definição dos props que o componente aceita
const props = defineProps({
    title: {
        default: 'N/A'
    },
    data: {
        default: []
    },
    
})

const usedColors = ref([]);

const randomRGBA = (retry=10) => {
    const r = Math.floor(Math.random() * 250 + 5);
    const g = Math.floor(Math.random() * 250 + 5);
    const b = Math.floor(Math.random() * 250 + 5);
    
    const color = `rgba(${r}, ${g}, ${b})`;
    
    usedColors.value.forEach((usedColor) => {
        if (usedColor === color && retry > 0) {
            return randomRGBA(retry - 1);
        }
    });
    usedColors.value.push(color);
    
    return color;
}


</script>