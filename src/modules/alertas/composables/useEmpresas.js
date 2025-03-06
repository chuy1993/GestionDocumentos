import { computed } from "vue"; 
import { useQuasar } from "quasar";

import useEmpresasStore from "../store/empresasStore.js";

const useEmpresas = () => {
const empresasStore = useEmpresasStore();

    const consultaEmpresas = async (item) => {
        const response = await empresasStore.consultaEmpresas(item);
        return response;
    };

    const selectEmpresas = async () => {
        const response = await empresasStore.selectEmpresas();
        return response;
    };

    const limpiarStore = async () => {
        const response = await empresasStore.limpiarStore();
        return response;
      };

    return { consultaEmpresas, selectEmpresas, limpiarStore };
};

export default useEmpresas;