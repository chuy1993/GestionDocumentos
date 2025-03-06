import { computed } from "vue"; 
import { useQuasar } from "quasar";

import useEmpresasIDStore from "../store/empresasIDStore.js";

const useEmpresasID = () => {
const empresasIDStore = useEmpresasIDStore();

    const consultaEmpresas = async (item) => {
        const response = await empresasIDStore.consultaEmpresas(item);
        return response;
    };

    const selectEmpresas = async () => {
        const response = await empresasIDStore.selectEmpresas();
        return response;
    };

    const limpiarStore = async () => {
        const response = await empresasIDStore.limpiarStore();
        return response;
      };

    return { consultaEmpresas, selectEmpresas, limpiarStore };
};

export default useEmpresasID;