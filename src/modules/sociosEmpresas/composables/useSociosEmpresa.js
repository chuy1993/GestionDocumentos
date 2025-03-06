import { computed, ref } from "vue";
import { useQuasar } from "quasar";

import useSociosEmpresaStore from "../store/sociosEmpresaStore.js";

const useSociosRelacion = () => {
  const q = useQuasar();

  const SociosRelacionStore = useSociosEmpresaStore();

  const columnasRelacionSociosEmp = computed(() => SociosRelacionStore.getcolumnasRelacionSociosEmp);
  const listaRelacionSociosEmp = computed(() => SociosRelacionStore.getlistaRelacionSociosEmp);

  const listarSociosRelacion = async (item) => {
    const response = await SociosRelacionStore.listar(item);
    return response;
  };

  return{
    columnasRelacionSociosEmp,
    listaRelacionSociosEmp,
    listarSociosRelacion
  }
}
export default useSociosRelacion;
R