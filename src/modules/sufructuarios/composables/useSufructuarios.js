import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useUsufructuariosStore from "../store/sufructuariosStore.js";

const useUsufructuarios = () => {
  const $q = useQuasar();
  const usufructuariosStore = useUsufructuariosStore();

  const columnasUsufructuarios = computed(() => usufructuariosStore.getColumnasUsufructuarios);
  const listaUsufructuarios = computed(() => usufructuariosStore.getListaUsufructuarios);

  const getColumnas = async () => {
    return usufructuariosStore.getColumnasUsufructuarios;
  };

  const listarUsufructuarios = async (item) => {
    const response = await usufructuariosStore.listar(item);
    return response;
  };

  const consultaTipo = async () => {
    const reponse = await usufructuariosStore.consultaTipo();
    return reponse;
  };

  const selectSociosSuf = async () => {
    const response = await usufructuariosStore.selectSociosSuf();
    return response;
  };

  const consultaSocio = async (item) => {
    const response = await usufructuariosStore.consultaSocio(item);
    return response;
  };

  const limpiarStore = async () => {
    const response = await usufructuariosStore.limpiarStore();
    return response;
  };

  return { 
    columnasUsufructuarios, 
    listaUsufructuarios, 
    getColumnas,
    listarUsufructuarios,
    consultaTipo,
    selectSociosSuf,
    consultaSocio,
    limpiarStore,
  };
};

export default useUsufructuarios;
