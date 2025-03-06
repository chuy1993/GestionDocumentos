import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas"

export default defineStore("corporativoStore", {
    state: () => ({
        bool: false,
        msj: "",
        listaSelectCorporativo: [],
        listaCorporativo: [],        
    }),

    actions: {
        async selectCorporativo(item) {
            const { data } = await apiIntranet.post("/CatalogoEmpresas/SelectCorporativo", item);
            console.log("store", data.Lista);
            this.listaEmpresas = data.Lista;
            return this.listaEmpresas
        },
        async consultaCorporativo(item) {
            console.log("impresion", item)
            const { data } = await apiIntranet.post("/CatalogoEmpresas/SelectCorporativo", item);
            console.log("store", data.Lista);
            Object.keys(data.Lista).forEach((key) => {
                let item2 = {
                    value: data.Lista[key].Corp_ID,
                    label: data.Lista[key].Corp_NombreCorto,
                };
                this.listaSelectCorporativo.push(item2);
            });
            return this.listaSelectCorporativo;
        },
        async limpiarStore() {
            this.listaCorporativo = [];
            this.listaSelectCorporativo = [];
        },
    }
})