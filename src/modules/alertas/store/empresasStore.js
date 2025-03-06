import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("empresasStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaSelectEmpresas: [],
    listaEmpresas: [],
  }),

  actions: {
    async selectEmpresas(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoAlertas/SelectEmpresa",
        item
      );
      console.log("store", data.Lista);
      this.listaEmpresas = data.Lista;
      return this.listaEmpresas;
    },
    async consultaEmpresas(item) {
      console.log("impresion", item);
      const { data } = await apiIntranet.post(
        "/CatalogoAlertas/SelectEmpresa",
        item
      );
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let item2 = {
          value: data.Lista[key].SociCata_ID,
          label: data.Lista[key].SociCata_RazonSocial,
        };
        this.listaSelectEmpresas.push(item2);
      });
      return this.listaSelectEmpresas;
    },
    async limpiarStore() {
      this.listaEmpresas = [];
      this.listaSelectEmpresas = [];
    },
  },
});
