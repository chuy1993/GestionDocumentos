import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("sociosStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaConsultaCorp: [],
    listaConsultaTipo: [],
    listaConsultaEmpresa: [],
    selectCorporativos: [],
    selectConsultaTipo: [],
    selectSociosSoc: [],
    listaSelectSocios: [],
    listaTipoSocios: [],
    listaSocios: [],
    columnasSociosRelacionEmpresas: [
      {
        name: "RelaSoc_Emp_ID",
        label: "ID",
        align: "left",
        field: "RelaSoc_Emp_ID",
      },
      {
        name: "SociCata_RazonSocial",
        label: "Socio",
        align: "left",
        field: "SociCata_RazonSocial",
      },
      {
        name: "EmprCata_Nombre",
        label: "Empresa",
        align: "left",
        field: "EmprCata_Nombre",
      },
      {
        name: "Opciones",
        label: "Opciones",
        align: "left",
        field: "Opciones",
      },
    ],
    listaRelacionEmpresas: [],
    nombresTipoSocios: [],
    columnasSocios: [
      {
        name: "SociCata_ID",
        required: true,
        label: "ID",
        align: "left",
        field: "SociCata_ID",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_Nombre",
        required: true,
        label: "Nombre",
        align: "left",
        field: "SociCata_Nombre",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_Telefono",
        required: true,
        label: "Telefono",
        align: "left",
        field: "SociCata_Telefono",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_RazonSocial",
        required: true,
        label: "Razon Social",
        align: "left",
        field: "SociCata_RazonSocial",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_Buzon",
        required: true,
        label: "Buzon Tributario",
        align: "left",
        field: "SociCata_Buzon",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_Correo",
        required: true,
        label: "Correo",
        align: "left",
        field: "SociCata_Correo",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_CIEC",
        required: true,
        label: "CIEC",
        align: "left",
        field: "SociCata_CIEC",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_CIP",
        required: true,
        label: "CIP",
        align: "left",
        field: "SociCata_CIP",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_RFC",
        required: true,
        label: "RFC",
        align: "left",
        field: "SociCata_RFC",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_Regimen",
        required: true,
        label: "Regimen",
        align: "left",
        field: "SociCata_Regimen",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_CURP",
        required: true,
        label: "CURP",
        align: "left",
        field: "SociCata_CURP",
        sortable: true,
        filter: true,
      },
      {
        name: "SociTipo_Tipo",
        required: true,
        label: "Tipo",
        align: "left",
        field: "SociTipo_Tipo",
        sortable: true,
        filter: true,
        filter_type: "select",
      },
      {
        name: "SociCata_Status",
        required: true,
        label: "Status",
        align: "left",
        field: "SociCata_Status",
        sortable: true,
        filter: true,
        filter_type: "select",
      },
      {
        name: "Visualizar Archivos",
        required: true,
        label: "Visualizar",
        align: "left",
        filter: false,
      },
      {
        name: "Opciones",
        required: true,
        label: "Opciones",
        align: "left",
        filter: false,
      },
    ],
    columnasSociosRelacion: [
      {
        name: "SociCata_Nombre",
        required: true,
        label: "Nombre",
        align: "left",
        field: "SociCata_Nombre",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_RazonSocial",
        required: true,
        label: "Razón Social",
        align: "left",
        field: "SociCata_RazonSocial",
        sortable: true,
        filter: true,
      },
      {
        name: "SociCata_RFC",
        required: true,
        label: "RFC",
        align: "left",
        field: "SociCata_RFC",
        sortable: true,
        filter: true,
      },
      {
        name: "Opciones",
        required: true,
        label: "Opciones",
        align: "left",
        filter: false,
      },
    ],
    listaRelacion: [],
  }),

  getters: {
    getListaSocios: (state) => {
      return state.listaSocios;
    },
    getColumnasSocios: (state) => {
      return state.columnasSocios;
    },
    getlistaRelacion: (state) => {
      return state.listaRelacion;
    },
    getcolumnasSociosRelacion: (state) => {
      return state.columnasSociosRelacion;
    },
    getcolumnasSociosRelacionEmpresas: (state) => {
      return state.columnasSociosRelacionEmpresas;
    },
    getlistaRelacionEmpresas: (state) => {
      return state.listaRelacionEmpresas;
    },
  },
  actions: {
    async listar(item) {
      this.listaSocios = [];
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      console.log("store", data.Lista);
      this.listaSocios = data.Lista;
      return this.listaSocios;
    },

    async cosnultaInfoSociosPopUp(item) {
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      console.log("lista del store", data.Lista);
      return data;
    },

    async listarRelacionSociosEmpresas(item) {
      //this.listaRelacionEmpresas = [];
      const { data } = await apiIntranet.post(
        "/RelacionSociosEmpresas/ListarSocEmp",
        item
      );
      console.log("store", data.Lista);
      this.listaRelacionEmpresas = data.Lista;
      return this.listaRelacionEmpresas;
    },
    async selectConsultaTipoFunction(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoSociosTipo/Listar",
        item
      );
      console.log("store", data.Lista);
      this.listaSocios = data.Lista;
      return this.listaSocios;
    },
    async consultaTipo(item) {
      console.log("tipo", item);
      this.listaConsultaTipo = [];
      const { data } = await apiIntranet.post(
        "/CatalogoSociosTipo/Listar",
        item
      );
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        console.log("data del store", data.Lista);
        let tipo = {
          value: data.Lista[key].SociTipo_ID,
          label: data.Lista[key].SociTipo_Tipo,
        };
        this.listaConsultaTipo.push(tipo);
      });
      return this.listaConsultaTipo;
    },

    async listarEmpresas(item) {
      console.log("tipo", item);
      this.listaConsultaEmpresa = [];
      const { data } = await apiIntranet.post(
        "/CatalogoEmpresas/ListarEmp",
        item
      );
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        console.log("data del store", data.Lista);
        let tipo = {
          value: data.Lista[key].EmprCata_ID,
          label: data.Lista[key].EmprCata_Nombre,
        };
        this.listaConsultaEmpresa.push(tipo);
      });
      return this.listaConsultaEmpresa;
    },

    async selectSociosSocFunction(item) {
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      //console.log("store", data.Lista);
      this.listaSocios = data.Lista;
      return this.listaSocios;
    },

    async consultaSocio(item) {
      console.log("socio", item);
      this.listaSelectSocios = [];
      const { data } = await apiIntranet.post("/CatalogoSocios/Listar", item);
      //console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let item2 = {
          value: data.Lista[key].SociCata_ID,
          label: data.Lista[key].SociCata_RazonSocial,
        };
        this.listaSelectSocios.push(item2);
      });
      return this.listaSelectSocios;
    },

    async selectCorporativosFunction(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoSocios/SelectCorp",
        item
      );
      //console.log("store", data.Lista);
      this.listaSocios = data.Lista;
      return this.listaSocios;
    },
    async consultaCorporativo(item) {
      //console.log("impresion", item);
      this.listaConsultaCorp = [];
      const { data } = await apiIntranet.post(
        "/CatalogoSocios/SelectCorp",
        item
      );
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let item3 = {
          value: data.Lista[key].Corp_ID,
          label: data.Lista[key].Corp_NombreCorto,
        };
        this.listaConsultaCorp.push(item3);
      });
      return this.listaConsultaCorp;
    },

    async InsertaSocios(item) {
      const response = await apiIntranet.post("/CatalogoSocios/Insertar", item);
      return response;
    },

    async InsertaRelacion(item) {
      const response = await apiIntranet.post(
        "/RelacionSociosEmpresas/Insertar",
        item
      );
      console.log("respuesta de la api", response);
      return response;
    },

    async ModificaSocios(item) {
      const response = await apiIntranet.post(
        "/CatalogoSocios/Modificar",
        item
      );
      console.log("response", response);
      return response;
    },
    async guardaRelacion(item) {
      const response = await apiIntranet.post(
        "/CatalogoSocios/InsertarRelacion",
        item
      );
      console.log("respuesta de la api", response);
      return response;
    },
    async modificarRelacion(item) {
      const response = await apiIntranet.post(
        "/CatalogoSocios/ModificarRelacion",
        item
      );
      console.log("respuesta de la api", response);
      return response;
    },
    async eliminaRelacion(item) {
      const response = await apiIntranet.post(
        "/CatalogoSocios/EliminarRelacion",
        item
      );
      console.log("respuesta de la api", response);
      return response;
    },
    async listarRelacion(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoSocios/ListarRelacion",
        item
      );
      console.log("store", data.Lista);
      this.listaRelacion = data.Lista;
      return this.listaRelacion;
    },

    async EliminaRelacionEmpresa(item) {
      const response = await apiIntranet.post(
        "/RelacionSociosEmpresas/Eliminar",
        item
      );
      console.log("respuesta de la api", response);
      return response;
    },

    async consultaSocioRelacion(item) {
      console.log("select store", item);
      this.listaTipoSocios = [];
      const { data } = await apiIntranet.post(
        "/CatalogoSocios/ListarSelectTipo",
        item
      );
      Object.keys(data.Lista).forEach((key) => {
        let item2 = {
          value: data.Lista[key].SociCata_ID,
          label:
            data.Lista[key].SociCata_RazonSocial +
            " - " +
            data.Lista[key].SociCata_RFC,
          rfc: data.Lista[key].SociCata_RFC,
        };
        this.listaTipoSocios.push(item2);
      });
      console.log("resultado store select", this.listaTipoSocios);
      return this.listaTipoSocios;
    },
    async listarNombresTipoSocios(item) {
      this.nombresTipoSocios = [];
      const { data } = await apiIntranet.post(
        "/CatalogoSocios/listarNombresTipoSocios",
        item
      );
      console.log("store", data.Lista);
      this.nombresTipoSocios = data.Lista;
      return this.nombresTipoSocios;
    },
    async limpiarStore() {
      this.listaConsultaCorp = [];
      this.listaConsultaTipo = [];
      this.listaConsultaEmpresa = [];
      this.selectCorporativos = [];
      this.selectConsultaTipo = [];
      this.selectSociosSoc = [];
      this.listaSelectSocios = [];
      this.listaTipoSocios = [];
      this.listaSocios = [];
      this.nombresTipoSocios = [];
      this.listaRelacion = [];
    },
    async limpiaTablaRelacion() {
      this.listaRelacionEmpresas = [];
    },
  },
});
