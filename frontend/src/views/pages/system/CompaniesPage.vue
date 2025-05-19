<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Companhias</div>
        
        <!-- <template #header>
            <div class="flex flex-wrap justify-end gap-2">
                <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
                <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
            </div>
        </template> -->
        
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
                    <!-- <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['name'].value" placeholder="Nome Companhia" />
                    </IconField> -->
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
                <!-- <template #filter="{ filterModel }">
                    <Select v-model="filterModel.value" :options="statuses" placeholder="Select One" showClear>
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template> -->
            </Column>
            <!-- <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <ProgressBar :value="data.activity" :showValue="false" style="height: 6px"></ProgressBar>
                </template>
                <template #filter="{ filterModel }">
                    <Slider v-model="filterModel.value" range class="m-4"></Slider>
                    <div class="flex items-center justify-between px-2">
                        <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                        <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                    </div>
                </template>
            </Column> -->
            <!-- <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width: 8rem">
                <template #body="{ data }">
                    <i class="pi" :class="{ 'pi-check-circle text-green-500 ': data.verified, 'pi-times-circle text-red-500': !data.verified }"></i>
                </template>
                <template #filter="{ filterModel }">
                    <label for="verified-filter" class="font-bold"> Verified </label>
                    <Checkbox v-model="filterModel.value" :indeterminate="filterModel.value === null" binary inputId="verified-filter" />
                </template>
            </Column> -->
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
    const selectedCompany = ref(null);
    const companySearch = ref('');

    onMounted(() => {
        // const locations = [
        // {
        //     id: '#1',
        //     name: 'Stand Liberdade',
        //     address: 'Av. Paulista, 1000'
        // },
        // {
        //     id: '#2',
        //     name: 'Stand Niteroi',
        //     address: 'Av. Atlântica, 500'
        // }
        // ];

        // const data = [
        //     {
        //         id: '#1',
        //         name: 'Empresa AA',
        //         location_id: locations[0].id // ID da localizaçã
        //     },
        //     {
        //         id: '#2',
        //         name: 'Empresa BB',
        //         location_id: locations[1].id 
        //     }
        // ]
        // Object.assign(companies, data);

        // console.log(companies)

        loading.value = true;
        fetchCompanies().then((data) => {
            successToast();
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
