<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Locais</div>
        
        <Loading :loading="loading" loadingText="Processando Requisição..." />

        <Toolbar class="mb-6">
            <template #start>
                <Button label="Novo Local" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNewLocation" />
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
            <Column header="Endereço" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.address }}
                </template>
            </Column>
            <Column header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag value="Ativo" severity="success" />
                </template>
            </Column>
        </DataTable>

        <!-- Dialog ADD/EDIT -->
		<Dialog v-model:visible="locationDialog" :style="{ width: '450px' }" header="Local" :modal="true">
            <Fluid class="flex flex-col md:flex-row gap-8">
                <!-- Location -->
				<div class="card flex flex-col gap-4 w-full">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-map-marker"></i>
                        </InputGroupAddon>
                        <InputText v-model="form.name" placeholder="Nome do Local" />
                    </InputGroup>
                </div>
			</Fluid>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button :label="addOrEditLabel" icon="pi pi-check" @click="handleSave" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
    import { createLocation, fetchLocations, updateLocation } from '@/service/location';
    import { computed, nextTick, onMounted, reactive, ref } from 'vue';
    import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
    import { useNotify } from '@/composables/useNotify';
    
    /** CONSTANTS */
    const { successToast, errorToast } = useNotify();
    const defaultForm = {
		id: null,
		name: '',
        address: 's/n'
	};

    /** VARIABLES */
    const filters = ref({name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }});
    const loading = ref(null);
    const companies = reactive([]);
    const locationDialog = ref(false);
    const form = ref(defaultForm);

    /** COMPUTE & WATCH */
	const addOrEditLabel = computed(() => {
		return form.value.id? 'Editar' : 'Adicionar';
	});

    /** METHODS */
    onMounted(() => { 
        handleLoadLocations();
    })

    const handleLoadLocations = async () => {
        loading.value = true;
        fetchLocations().then((data) => {
            successToast('Locals carregadas com sucesso!');
            Object.assign(companies, data);
        }).catch((error) => {
            errorToast(error?.message);
        }).finally(() => {
            loading.value = false;
        });
    }

    const clearFilter = () => {
        filters.value = {name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }};
    }

    const openNewLocation = () => {
        locationDialog.value = true;
    }

    const handleSave = async () => {
		loading.value = true;

		const action = !!form.value.id
			? handleEdit
			: handleCreate;

		action().then((data) => {
			successToast('Local registrada com sucesso!');
            handleLoadLocations();
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
            hideDialog();
            form.value = defaultForm;
			nextTick().then(() => loading.value = false );
		})
	}
	const handleCreate = async () => {
		return createLocation(form.value)
	}
	const handleEdit = async () => {
		return updateLocation(form.value.id, form.value)
	}

    const hideDialog = () => {
		locationDialog.value = false;
	}

</script>
