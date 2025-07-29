<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Empresas</div>
        
        <Loading :loading="loading" loadingText="Processando Requisição..." />

        <Toolbar class="mb-6">
            <template #start>
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
            
            <template #empty> Nenhuma empresa encontrada. </template>

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
		<Dialog v-model:visible="companyDialog" :style="{ width: '450px' }" header="Empresa" :modal="true">
            <Fluid class="flex flex-col md:flex-row gap-8">
                <!-- Company -->
				<div class="card flex flex-col gap-4 w-full">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-building-columns"></i>
                        </InputGroupAddon>
                        <InputText v-model="form.name" placeholder="Nome da Empresa" />
                    </InputGroup>
                </div>
			</Fluid>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button :label="addOrEditLabel" icon="pi pi-check" @click="handleSave" />
            </template>
        </Dialog>

        <Dialog header="Confirmação" v-model:visible="deleteCompanyDialog" class="delete-confirmation-dialog" :modal="true">
           <div class="flex items-center justify-center">
               <i class="pi pi-exclamation-triangle mr-4" style="font-size: 2rem" />
               <span>Tem certeza que deseja excluir esta empresa?</span>
           </div>
           <template #footer>
               <Button label="Não" icon="pi pi-times" @click="closeDeleteModal" text severity="secondary" />
               <Button label="Sim" icon="pi pi-check" @click="handleDelete" severity="danger" outlined autofocus />
           </template>
        </Dialog>
    </div>
</template>

<script setup>
    import { createCompany, fetchCompanies, updateCompany, deleteCompany } from '@/service/company';
    import { computed, nextTick, onMounted, reactive, ref } from 'vue';
    import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
    import { useNotify } from '@/composables/useNotify';
    
    /** CONSTANTS */
    const { successToast, errorToast } = useNotify();
    const defaultForm = {
		id: null,
		name: '',
	};

    /** REFS */
    const deleteCompanyDialog = ref(false);
    const companyToDelete = ref(null);

    /** VARIABLES */
    const filters = ref({name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }});
    const loading = ref(null);
    const companies = reactive([]);
    const companyDialog = ref(false);
    const form = ref(defaultForm);
    const editCompany = (company) => {
    form.value = { ...company }; 
    companyDialog.value = true;   
};
    /** COMPUTE & WATCH */
	const addOrEditLabel = computed(() => {
		return form.value.id? 'Editar' : 'Adicionar';
	});

    /** METHODS */
    onMounted(() => { 
        handleLoadCompanies();
    })

    const handleLoadCompanies = async () => {
        loading.value = true;
        fetchCompanies().then((data) => {
            successToast('Empresas carregadas com sucesso!');
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

    const openNewCompany = () => {
        companyDialog.value = true;
    }

    const handleSave = async () => {
		loading.value = true;

		const action = !!form.value.id
			? handleUpdate
			: handleCreate;

		action().then((data) => {
			successToast('Empresa registrada com sucesso!');
            handleLoadCompanies();
		}).catch((error) => {
			errorToast(error?.message);
		}).finally(() => {
            hideDialog();
            form.value = { ...defaultForm };
            nextTick().then(() => loading.value = false );
		})
	}
	const handleCreate = async () => {
		return createCompany(form.value)
	}
	const handleUpdate = async () => {
		return updateCompany(form.value.id, form.value)
	}

    const hideDialog = () => {
		companyDialog.value = false;
	}

    
    const confirmDeleteCompany = (company) => {
        companyToDelete.value = company;
        deleteCompanyDialog.value = true;
    };

    const onEdit = (company) => {
    form.value = { ...company };
    companyDialog.value = true;
    };

    const onDelete = (company) => {
    companyToDelete.value = company;
    deleteCompanyDialog.value = true;
    };


    const handleDelete = () => {
        loading.value = true;
        deleteCompany(companyToDelete.value.id)
           .then(() => {
              successToast('Empresa excluída com sucesso!');
              handleLoadCompanies(); // Recarrega a lista
        })
            .catch((error) => {
              errorToast(error?.message);
        })
        .finally(() => {
            deleteCompanyDialog.value = false;
            companyToDelete.value = null;      
            loading.value = false;
        });
    };

    const closeDeleteModal = () => {
    deleteCompanyDialog.value = false;
}



</script>
<style scoped>
.company-dialog {
    width: 450px;
}

.delete-confirmation-dialog {
    width: 350px;
}
</style>