import { computed } from "vue"; 
import { useQuasar } from "quasar";

import useCorporativoStore from "../store/corporativoStore.js";

const useCorporativo = () => {
const corporativoStore = useCorporativoStore();

    const consultaCorporativo = async (item) => {
        const response = await corporativoStore.consultaCorporativo(item);
        return response;
    };

    const selectCorporativo = async () => {
        const response = await corporativoStore.selectCorporativo();
        return response;
    };

    const limpiarStore = async () => {
        const response = await corporativoStore.limpiarStore();
        return response;
      };

    return { consultaCorporativo, selectCorporativo, limpiarStore };
};

export default useCorporativo;
