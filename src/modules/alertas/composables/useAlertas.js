import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useAlertasStore from "../store/alertasStore.js";

const useAlertas = () => {
  const q = useQuasar();
  const alertasStore = useAlertasStore();

  const columnasAlertas = computed(() => alertasStore.getColumnasAlertas);
  const listaAlertas = computed(() => alertasStore.getListaAlertas);

  const consultaFrecuencias = async () => {
    const response = await alertasStore.consultaFrecuencias();
    return response;
  };

  const listarAlertas = async (item) => {
    const response = await alertasStore.listar(item);
    return response;
  };

  const InsertarAlertas = async (item) => {
    const response = await alertasStore.InsertarAlertas(item);
    return response;
  };

//   const consultaEmpresas = async (item) => {
//     const response = await alertasStore.consultaEmpresas(item);
//     return response;
// };

// const selectEmpresas = async () => {
//     const response = await alertasStore.selectEmpresas();
//     return response;
// };

const limpiarStore = async () => {
    const response = await alertasStore.limpiarStore();
    return response;
  };
const ModificarAlerta = async (item) => {
  const response = await alertasStore.ModificarAlerta(item);
  return response;
};
const EliminarAlerta = async (item) => {
  const response = await alertasStore.EliminarAlerta(item);
  return response;
};

  return {
    columnasAlertas,
    listaAlertas,
    consultaFrecuencias,
    listarAlertas,
    InsertarAlertas,
    ModificarAlerta,
    // consultaEmpresas,
    // selectEmpresas,
    limpiarStore,
    EliminarAlerta,
  };
};

export default useAlertas;

