import { computed, resolveDynamicComponent } from "vue";
import { useQuasar } from "quasar";
import { RegimenFiscalStore } from "../store/RegimenFiscalStore.js";
const useRegimenFiscal = () => {
  const $q = useQuasar();
  const storeRegimenFiscal = RegimenFiscalStore();
  const getListaRegimenFiscal = computed(
    () => storeRegimenFiscal.getListaRegimenFiscal
  );
  const getColumnasRegimenFiscal = computed(
    () => storeRegimenFiscal.getColumnasRegimenFiscal
  );

  const getSelectRegimenFiscal = computed(
    () => storeRegimenFiscal.getSelectRegimenFiscal
  );

  const Listar = async () => {
    const response = await storeRegimenFiscal.Listar();
    return response;
  };

  const ListarByID = async (id) => {
    const response = await storeRegimenFiscal.ListarByID(id);
    return response;
  };

  const Registrar = async (RegimenFiscalBE) => {
    const response = await storeRegimenFiscal.Registrar(RegimenFiscalBE);
    $q.notify({
      message: response.bolRespuesta
        ? "Registro correcto"
        : "Error al registrar",
      color: response.bolRespuesta ? "positive" : "negative",
    });
    return response;
  };

  const Actualizar = async (RegimenFiscalBE) => {
    const response = await storeRegimenFiscal.Actualizar(RegimenFiscalBE);
    $q.notify({
      message: response.bolRespuesta
        ? "Registro correcto"
        : "Error al registrar",
      color: response.bolRespuesta ? "positive" : "negative",
    });
    return response;
  };

  return {
    getListaRegimenFiscal,
    getColumnasRegimenFiscal,
    Listar,
    ListarByID,
    Registrar,
    Actualizar,
    getSelectRegimenFiscal,
  };
};

export default useRegimenFiscal;
