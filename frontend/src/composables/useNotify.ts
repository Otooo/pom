import { useToast } from 'primevue/usetoast';

export function useNotify() {
  const toast = useToast();
  
  return {
    successToast: (message = 'Sucesso na solicitação!') => {
      toast.add({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
    },

    infoToast: (message = '') => {
      toast.add({ severity: 'info', summary: 'Informação', detail: message, life: 3000 });
    },

    warnToast: (message = 'Revise as informações e solicite novamente') => {
      toast.add({ severity: 'warn', summary: 'Aviso', detail: message, life: 3000 });
    },

    errorToast: (message = 'Falha na solicitação') => {
      toast.add({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
    },
  };
}