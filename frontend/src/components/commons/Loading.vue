<template>
    <!-- Só mostra o backdrop se o prop `loading` for true -->
    <div v-if="loading" class="backdrop">
        <div class="loading-content">
            <!-- Spinner do PrimeVue (você pode trocar por outro spinner, se preferir) -->
            <ProgressSpinner />
            <!-- Texto customizável abaixo do spinner -->
            <span class="loading-text">{{ loadingText }}</span>
        </div>
    </div>
</template>

<script setup>
    import ProgressSpinner from 'primevue/progressspinner'

    // Definição dos props que o componente aceita
    const props = defineProps({
        // controla se o backdrop estará aberto ou não
        loading: {
            type: Boolean,
            default: false
        },
        // mensagem que aparecerá junto ao spinner
        loadingText: {
            type: String,
            default: 'Processando...'
        }
    })
</script>

<style scoped>
    /* O backdrop cobre toda a tela, com fundo semitransparente */
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }

    /* Container interno para alinhar spinner + texto em coluna */
    .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: transparent;
        border-radius: 8px;
        min-width: 200px;
    }

    /* Estilo do texto de loading */
    .loading-text {
        font-size: 2.2rem;
        font-weight: bold;
        backdrop-filter: blur(2px);
        color: #ccc;
        text-align: center;
    }
</style>