<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Companhias</div>
        
        <Toolbar class="mb-6">
            <template #end>
                <Button label="Nova Empresa" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNewCompany" />
            </template>
        </Toolbar>
        
        <DataTable
            :value="companies"
            :paginator="true"
            :rows="10"
            dataKey="id"
            :rowHover="true"
            v-model:filters="filters"
            filterDisplay="menu"
            :loading="loading"
            :filters="filters"
            :globalFilterFields="['name']"
            showGridlines
        >
            <template #header>
                <div class="flex justify-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                </div>
            </template>
            
            <template #empty> Nenhuma companhia encontrada. </template>
            <template #loading> Carregando Companhias... Por favor aguarde. </template>

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag value="Ativo" severity="success" />
                </template>
            </Column>
        </DataTable>

    </div>
</template>

<script setup>
    import { fetchCompanies } from '@/service/company';
    import { onMounted, reactive, ref } from 'vue';
    import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
    import { useNotify } from '@/composables/useNotify';

    const { successToast, errorToast } = useNotify();

    const filters = ref({name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }});
    const loading = ref(null);
    const companies = reactive([]);

    onMounted(() => {
       
        loading.value = true;
        fetchCompanies().then((data) => {
            successToast('Empresas carregadas com sucesso!');
            Object.assign(companies, data);
        }).catch((error) => {
            errorToast(error?.message);
        }).finally(() => {
            loading.value = false;
        });

    })

    const clearFilter = () => {
        filters.value = {name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }};
    }

</script>
