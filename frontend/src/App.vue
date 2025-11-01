<script setup>
    import { onMounted } from 'vue';
    import { useToast } from 'primevue/usetoast';
    import { attachToastInstance } from '@/composables/useNotify';

    const toast = useToast();
    onMounted(() => attachToastInstance(toast));
</script>

<template>
    <!-- Use group fixo -->
    <Toast group="app" position="top-right">
        <template #message="{ message }">
        <div class="flex flex-col gap-1">
            <strong v-if="message.summary">{{ message.summary }}</strong>
            <span v-if="message.detail">{{ message.detail }}</span>
            <a
                v-if="message.link"
                :href="message.link"
                target="_blank"
                rel="noopener noreferrer"
                class="underline"
                >
                {{ message.linkText || message.link }}
            </a>
        </div>
        </template>
    </Toast>

    <router-view />
</template>

<style>
    
</style>
