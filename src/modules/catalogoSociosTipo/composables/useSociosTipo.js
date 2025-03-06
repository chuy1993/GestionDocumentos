import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useSociosTipoStore from "../store/sociosTipoStore.js";

const useSociosTipo = () => {
  const q = useQuasar();
  const sociosTipoStore = useSociosTipoStore();

  const columnasSociosTipo = computed(
    () => sociosTipoStore.getColumnasSociosTipo
  );
  const listaSociosTipo = computed(() => sociosTipoStore.getListaSociosTipo);

  const listarSociosTipo = async (item) => {
    const response = await sociosTipoStore.listar(item);
    return response;
  };

  const ListarById = async (id) => {
    const response = await sociosTipoStore.ListarById(id);
    return response;
  };

  const InsertarSociosTipo = async (item) => {
    const response = sociosTipoStore.InsertarSociosTipo(item);
    return response;
  };
  const bajaLogica = async (item) => {
    const response = sociosTipoStore.bajaLogica(item);
    q.notify({
      message: response.message,
      caption: "ahora mismo",
      color: response.ok ? "positive" : "negative",
    });
    return response;
  };
  const ModificarSociosTipo = async (item) => {
    const response = await sociosTipoStore.ModificarSociosTipo(item);
    return response;
  };

  const limpiarStore = async () => {
    const response = await sociosTipoStore.limpiarStore();
    return response;
  };

  return {
    columnasSociosTipo,
    listaSociosTipo,
    listarSociosTipo,
    InsertarSociosTipo,
    limpiarStore,
    bajaLogica,
    ModificarSociosTipo,
    ListarById,
  };
};

export default useSociosTipo;
