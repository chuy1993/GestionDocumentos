import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";
import { useQuasar } from "quasar";
const $q = useQuasar();
export default defineStore("empresasStore", {
  state: () => ({
    bool: false,
    msj: "",
    EmprCata_ID: [],
    listaEmpresas: [],
    listaEmpresas2: [],
    listaEmpresasCT: [],
    columnasEmpresas: [
      // {
      //   name: "EmprCata_ID",
      //   required: true,
      //   label: "ID",
      //   align: "left",
      //   field: "EmprCata_ID",
      //   sortable: true,
      //   filter: true,
      // },
      {
        name: "EmprCata_Nombre",
        required: true,
        label: "Nombre",
        align: "left",
        field: "EmprCata_Nombre",
        sortable: true,
        filter: true,
      },
      {
        name: "EmprCata_RFC",
        required: true,
        label: "RFC",
        align: "left",
        field: "EmprCata_RFC",
        sortable: true,
        filter: true,
      },
      {
        name: "EmprCata_Regimen",
        required: true,
        label: "Regimen",
        align: "left",
        field: "EmprCata_Regimen",
        sortable: true,
        filter: true,
      },
      {
        name: "EmprCata_Nomenclatura",
        required: true,
        label: "Nomenclatura",
        field: "EmprCata_Nomenclatura",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "EmprCata_Nota",
        required: true,
        label: "Nota",
        align: "left",
        field: "EmprCata_Nota",
        sortable: true,
        filter: true,
      },
      // {
      //     name: "Empr_NombreCorto",
      //     required: true,
      //     label: "Empresa",
      //     align: "left",
      //     value: "EmprCata_Empr_ID",
      // },
      // {
      //     name: "Corp_NombreCorto",
      //     required: true,
      //     label: "Corporativo",
      //     align: "left",
      //     value: "EmprCata_Corp_ID"
      // },
      {
        name: "EmprCata_Estatus",
        required: true,
        label: "Estatus",
        align: "left",
        field: "EmprCata_Estatus",
        sortable: true,
        filter: true,
      },
      {
        name: "Opciones",
        required: true,
        label: "Opciones",
        align: "left",
      },
    ],

    columnasEmpresasCT: [
      {
        name: "RelaEmpr_ID",
        required: true,
        label: "I.D Relacion",
        align: "left",
      },
      {
        name: "EmprCata_Nombre",
        required: true,
        label: "Empresa Socios",
        align: "left",
      },
      {
        name: "Empr_NombreCorto",
        required: true,
        label: "Empresa CT",
        align: "left",
      },
      {
        name: "RelaEmpr_Estatus",
        required: true,
        label: "Estatus",
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
    getListaEmpresas: (state) => {
      return state.listaEmpresas;
    },
    getColumnasEmpresas: (state) => {
      return state.columnasEmpresas;
    },
    getListaEmpresasCT: (state) => {
      return state.listaEmpresasCT;
    },
    getColumnasEmpresasCT: (state) => {
      return state.columnasEmpresasCT;
    },
    getID: (state) => {
      return state.EmprCata_ID;
    },
    getlistaEmpresas2: (state) => {
      return state.listaEmpresas2;
    },
  },
  actions: {
    async listar(item) {
      const { data } = await apiIntranet.post("/CatalogoEmpresas/Listar", item);
      console.log("store", data.Lista);
      this.listaEmpresas = data.Lista;
      return this.listaEmpresas;
    },

    async InsertarEmpresas(item) {
      const response = await apiIntranet.post(
        "/CatalogoEmpresas/Insertar",
        item
      );
      console.log("insertar", response);
      return response;
    },

    async ModificarEmpresas(item) {
      // debugger;
      //debugger;
      console.log("item", item);
      const response = await apiIntranet.post(
        "/CatalogoEmpresas/Modificar",
        item
      );
      return response;
    },

    async listarRelacion(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoEmpresas/ListarRelacion",
        item
      );
      console.log("store", data.Lista);
      this.listaEmpresasCT = data.Lista;
      return this.listaEmpresasCT;
    },

    async InsertarRelacion(item) {
      const response = await apiIntranet.post(
        "/CatalogoEmpresas/InsertarRelacion",
        item
      );
      console.log("response", response);
      return response;
    },

    async EliminarRelacion(item) {
      console.log("item", item);
      const response = await apiIntranet.post(
        "/CatalogoEmpresas/EliminarRelacion",
        item
      );
      return response;
    },
    async consultaInfoEmpresasSociosPopUp(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoEmpresas/ListarEmp",
        item
      );
      console.log("store", data.Lista);
      return data;
    },
  },
});
