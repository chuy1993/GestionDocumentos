import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("sociosTipoStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaRelacionSociosEmp: [],
    columnasRelacionSociosEmp: [
      {
        name: "RelaSociEmp_Rela_ID",
        required: true,
        label: "ID",
        align: "left",
      },
      {
        name: "Socio",
        required: true,
        label: "Socio",
        align: "left",
      },
      {
        name: "Usufructuario",
        required: true,
        label: "Usufructuario",
        align: "left",
      },
      {
        name: "EmprCata_Nombre",
        required: true,
        label: "Empresa",
        align: "left",
      },
    ]
  }),

  getters: {
    getlistaRelacionSociosEmp: (state) => {
      return state.listaRelacionSociosEmp;
    },
    getcolumnasRelacionSociosEmp: (state) => {
      return state.columnasRelacionSociosEmp;
    },
  },
  actions:{
    async listar(item) {
      this.listaRelacionSociosEmp=[];
      const { data } = await apiIntranet.post("/RelacionSociosEmpresas/Listar",item);
      this.listaRelacionSociosEmp = data.Lista;
      console.log("data store", data.Lista);
    },
    async limpiar() {
      this.listaRelacionSociosEmp = [];
    },
  }
})
