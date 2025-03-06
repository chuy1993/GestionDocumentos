import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("usufructuariosStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaConsultaTipo: [],
    selectSociosSuf: [],
    listaSelectUsufructuarios: [],
    listaSelectSocios: [],
    listaUsufructuarios: [],
    columnasUsufructuarios: [
      {
        name: "SociCata_ID",
        required: true,
        label: "ID",
        align: "left",
      },
      {
        name: "SociCata_Nombre",
        required: true,
        label: "Nombre",
        align: "left",
      },
      {
        name: "SociCata_Telefono",
        required: true,
        label: "Telefono",
        align: "left",
      },
      {
        name: "SociCata_RazonSocial",
        required: true,
        label: "Razon Social",
        align: "left",
      },
      {
        name: "SociCata_Buzon",
        required: true,
        label: "Buzon Tributario",
        align: "left",
      },
      {
        name: "SociCata_Correo",
        required: true,
        label: "Correo",
        align: "left",
      },
      {
        name: "SociCata_Regimen",
        required: true,
        label: "Regimen",
        align: "left",
      },
      {
        name: "SociCata_CURP",
        required: true,
        label: "CURP",
        align: "left",
      },
      {
        name: "SociCata_Status",
        required: true,
        label: "Status",
        align: "left",
      },
      {
        name: "Opciones",
        required: true,
        label: "Opciones",
        align: "left",
      },
    ],
  }),

  getters: {
    getListaUsufructuarios: (state) => {
      return state.listaUsufructuarios;
    },
    getColumnasUsufructuarios: (state) => {
      return state.columnasUsufructuarios;
    },
  },
  actions: {
    async listar(item) {
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      console.log("store", data.Lista);
      this.listaUsufructuarios = data.Lista;
      return this.listaUsufructuarios;
    },
    async selectSociosSuf(item) {
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      console.log("store", data.Lista);
      this.listaUsufructuarios = data.Lista;
      return this.listaUsufructuarios;
    },
    async consultaSocio(item) {
      console.log("impresion",item)
      this.listaSelectSocios = [];
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let item2 = {
          value: data.Lista[key].SociCata_ID,
          label: data.Lista[key].SociCata_Nombre,
        };
        this.listaSelectSocios.push(item2);
      });          
      return this.listaSelectSocios;
    },

    async limpiarStore() {
      this.listaConsultaTipo = [];
      this.selectSociosSuf = [];
      this.listaSelectUsufructuarios = [];
      this.listaUselectSocios = [];
      this.listaUsufructuarios = [];
      this.selectSociosSuf = [];
      this.listaSelectSocios = [];

    },

  }
});
