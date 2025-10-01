
import type { ToastServiceMethods } from 'primevue/toastservice';

type Level = 'success' | 'info' | 'warn' | 'error';
type Payload = { severity: Level; summary?: string; detail: string; life?: number; group?: string };

let toastInstance: ToastServiceMethods | null = null;
const queue: Payload[] = [];
const DEFAULT_GROUP = 'app'; // <-- Grupo padrão das notificações

export function attachToastInstance(instance: ToastServiceMethods) {
  toastInstance = instance;
  // drena toasts que chegaram antes do app montar
  for (const p of queue.splice(0)) {
    toastInstance.add(p as any);
  }
}

function emit(p: Payload) {
  const payload = { group: DEFAULT_GROUP, ...p }; // <-- Adiciona o grupo padrão se não for fornecido
  if (toastInstance) toastInstance.add(payload as any);
  else queue.push(payload); // segura até o App registrar a instância
}

export function useNotify() {
  
  return {
    successToast: (message = 'Sucesso na solicitação!', life = 3000) => {
      emit({ severity: 'success', summary: 'Sucesso', detail: message, life });
    },

    infoToast: (message = '', life = 3000) => {
      emit({ severity: 'info', summary: 'Informação', detail: message, life });
    },

    warnToast: (message = 'Revise as informações e solicite novamente', life = 3000) => {
      emit({ severity: 'warn', summary: 'Aviso', detail: message, life });
    },

    errorToast: (message = 'Falha na solicitação', life = 3000) => {
      emit({ severity: 'error', summary: 'Erro', detail: message, life });
    },

    errorToastWithLink(detail: string, link: string, linkText = 'Clique aqui', life = 3000) {
      emit({ severity: 'error', summary: 'Erro', detail, life, link, linkText } as any);
    }
  };
}