import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useFrecuenciasStore from "../store/frecuenciasStore.js";

const useFrecuencias = () => {
    const q = useQuasar();
    const frecuenciasStore = useFrecuenciasStore();

    const columnasFrecuencias = computed(() => frecuenciasStore.getColumnasFrecuencias);
    const listaFrecuencias = computed(() => frecuenciasStore.getListaFrecuencias);

    const listarFrecuencias = async (item) => {
        const response = await frecuenciasStore.listar(item);
        return response;
    };
    const InsertarFrecuencias = async (item) => {
        const response = await frecuenciasStore.InsertarFrecuencias(item);
        return response;
    };
    const limpiarStore = async () => {
        const response = await frecuenciasStore.limpiarStore();
        return response;
    };
    const ModificaFrecuencia = async (item) => {
        const response = await frecuenciasStore.ModificaFrecuencia(item);
        return response;
    };

    return {
        columnasFrecuencias,
        listaFrecuencias,
        listarFrecuencias, 
        InsertarFrecuencias,
        limpiarStore,
        ModificaFrecuencia,
    };
};
export default useFrecuencias;