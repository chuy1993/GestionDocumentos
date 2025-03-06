import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useEmpresasStore from "src/modules/catalogoEmpresas/store/empresasStore.js";

const useEmpresas = () => {
  const q = useQuasar();
  const empresasStore = useEmpresasStore();

  const columnasEmpresas = computed(() => empresasStore.getColumnasEmpresas);
  const listaEmpresas = computed(() => empresasStore.getListaEmpresas);
  const listaEmpresas2 = computed(() => empresasStore.getListaEmpresas2);

  const columnasEmpresasCT = computed(
    () => empresasStore.getColumnasEmpresasCT
  );
  const listaEmpresasCT = computed(() => empresasStore.getListaEmpresasCT);

  const EmprCata_ID = computed(() => empresasStore.getID);

  const listarEmpresas = async (item) => {
    const response = await empresasStore.listar(item);
    return response;
  };

  const listarEmpresasCT = async (item) => {
    const response = await empresasStore.listarRelacion(item);
    return response;
  };

  const InsertarEmpresas = async (item) => {
    const response = await empresasStore.InsertarEmpresas(item);
    return response;
  };

  const InsertarRelacion = async (item) => {
    const response = await empresasStore.InsertarRelacion(item);
    return response;
  };

  const bajaLogica = async (item) => {
    const response = await empresasStore.bajaLogica(item);
    q.notify({
      message: response.message,
      caption: "ahora mismo",
      color: response.ok ? "positive" : "negative",
    });
    return response;
  };
  const ModificarEmpresas = async (item) => {
    const response = await empresasStore.ModificarEmpresas(item);
    return response;
  };

  const EliminarRelacion = async (item) => {
    const response = await empresasStore.EliminarRelacion(item);
    return response;
  };

  const limpiarStore = async () => {
    const response = await empresasStore.limpiarStore();
    return response;
  };

  const consultaInfoEmpresasSociosPopUp = async (item) => {
    const response = await empresasStore.consultaInfoEmpresasSociosPopUp(item);
    console.log("composable", response);
    return response;
  };

  return {
    columnasEmpresas,
    listaEmpresas,
    listarEmpresas,
    InsertarEmpresas,
    limpiarStore,
    bajaLogica,
    ModificarEmpresas,
    EliminarRelacion,
    InsertarRelacion,
    columnasEmpresasCT,
    listaEmpresasCT,
    listarEmpresasCT,
    consultaInfoEmpresasSociosPopUp,
    EmprCata_ID,
    listaEmpresas2,
  };
};

export default useEmpresas;
