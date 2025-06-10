<template>
    
    <div class="card mb-0">
        <div class="flex justify-between mb-4">
            <div>
                <span class="block text-muted-color font-bold mb-4">{{ title }}</span>
                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ value }}</div>
            </div>
            <div 
                :class="{
                    flex: true,
                    'items-center': true,
                    'justify-center': true,
                    [`bg-${color}-100`]: true,
                    [`dark:bg-${color}-400/10`]: true,
                    'rounded-border': true,
                }"
                style="width: 2.5rem; height: 2.5rem"
            >
                <i :class="{
                    pi: true, 
                    [`${iconClass}`]: true,
                    [`text-${color}-500`]: true,
                    '!text-xl': true
            }"></i>
            </div>
        </div>
        <!-- <span class="text-primary font-medium">50 new </span> -->
        <!-- <span class="text-muted-color">since last visit</span> -->
    </div>
</template>

<script setup>
    // Definição dos props que o componente aceita
    const props = defineProps({
        title: {
            default: 'N/A'
        },
        value: {
            default: 0
        },
        iconClass: {
            default: 'pi-question'
        },
        color: {
            default: 'blue'
        },
    })
</script>