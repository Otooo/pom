<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Locais</div>
        
        <Loading :loading="loading" loadingText="Processando Requisição..." />

        <!-- Add Local -->
        <Toolbar class="mb-6">
            <template #start>
                <Button label="Novo Local" icon="pi pi-plus" severity="primary" class="mr-2" @click="openNewLocation" />
            </template>
        </Toolbar>
        
        <!-- Table Locations-->
        <DataTable
            :value="locations"
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
                    <Button type="button" icon="pi pi-filter-slash" label="Limpar Filtros" outlined @click="clearFilter()" />
                </div>
            </template>
            
            <template #empty> Nenhum local encontrado. </template>

            <!-- Table Name -->
            <Column field="name" header="Nome" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>

            <!-- Table Address -->
            <Column header="Endereço" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.address }}
                </template>
            </Column>

            <!-- Table Status -->
            <Column header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag value="Ativo" severity="success" />
                </template>
            </Column>

            <!-- Table Actions -->
            <Column header="Ações" style="min-width: 8rem">
                <template #body="{ data }">
                    <Button 
                        icon="pi pi-pencil" 
                        severity="secondary" 
                        text 
                        rounded 
                        class="mr-2" 
                        @click="onEdit(data)" 
                    />
                    <Button 
                        icon="pi pi-trash" 
                        severity="danger" 
                        text 
                        rounded 
                        @click="onDelete(data)" 
                    />
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

        <!-- Delete Confirmation Dialog -->
        <Dialog header="Confirmação" v-model:visible="deleteLocationDialog" class="delete-confirmation-dialog" :modal="true">
           <div class="flex items-center justify-center">
               <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
               <span>Tem certeza que deseja excluir este local?</span>
           </div>
           <template #footer>
               <Button label="Não" icon="pi pi-times" @click="closeDeleteModal" text severity="secondary" />
               <Button label="Sim" icon="pi pi-check" @click="handleDelete" severity="danger" outlined autofocus />
           </template>
        </Dialog>
    </div>
</template>

<script setup>
    import { createLocation, deleteLocation, fetchLocations, updateLocation } from '@/service/location';
    import { computed, nextTick, onMounted, ref } from 'vue';
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
    const filters = ref({ 
        name: { 
            operator: FilterOperator.AND, 
            constraints: [{ 
                value: null, 
                matchMode: FilterMatchMode.STARTS_WITH 
            }] 
        }
    });
    const loading = ref(null);
    const locations = ref([]);
    const locationDialog = ref(false);
    const form = ref(defaultForm);
    const deleteLocationDialog = ref(false);
    const locationToDelete = ref(null);

    /** COMPUTE & WATCH */
	const addOrEditLabel = computed(() => {
		return form.value.id? 'Editar' : 'Adicionar';
	});

    /** METHODS */
    onMounted(() => { 
        handleLoadLocations(true);
    })

    const handleLoadLocations = async (showMessage = false) => {
        loading.value = true;
        fetchLocations().then((data) => {
            locations.value = data;
            showMessage && successToast('Locais carregados com sucesso!');
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
        }).then(handleLoadLocations)
        .catch((error) => {
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

    const onEdit = (company) => {
        form.value = { ...company };
        locationDialog.value = true;
    };

    const onDelete = (location) => {
        locationToDelete.value = location;
        deleteLocationDialog.value = true;
    };

    const closeDeleteModal = () => {
        deleteLocationDialog.value = false;
    }

    const handleDelete = () => {
        loading.value = true;
        deleteLocation(locationToDelete.value.id)
        .then(() => {
            successToast('Local excluído com sucesso!');
        }).then(handleLoadLocations)
        .catch((error) => {
            errorToast(error?.message);
        })
        .finally(() => {
            deleteLocationDialog.value = false;
            locationToDelete.value = null;      
            nextTick().then(() => loading.value = false );
        });
    };

</script>
