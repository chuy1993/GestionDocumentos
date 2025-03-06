import { defineStore } from "pinia";
import apiFinanzas from "src/API/apiFinanzas";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("sociosTipoStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaSociosTipo: [],
    columnasSociosTipo: [
      // {
      //   name: "SociTipo_ID",
      //   required: true,
      //   label: "ID",
      //   align: "left",
      //   field: "SociTipo_ID",
      //   sortable: true,
      //   filter: true,
      // },
      {
        name: " SociTipo_Tipo",
        required: true,
        label: "Tipo",
        align: "left",
        field: "SociTipo_Tipo",
        sortable: true,
        filter: true,
      },
      {
        name: "SociTipo_Subsecuente",
        required: true,
        label: "Subsecuente",
        align: "left",
        field: "SociTipo_Subsecuente",
        sortable: true,
        filter: true,
        filter_type: "select",
      },
      {
        name: "SociTipo_Status",
        required: true,
        label: "Status",
        align: "left",
        field: "SociTipo_Status",
        sortable: true,
        filter: true,
        filter_type: "select",
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
    getListaSociosTipo: (state) => {
      return state.listaSociosTipo;
    },
    getColumnasSociosTipo: (state) => {
      return state.columnasSociosTipo;
    },
  },
  actions: {
    async listar(item) {
      //this.listaSociosTipo = [];
      const { data } = await apiIntranet.post(
        "/CatalogoSociosTipo/Listar",
        item
      );
      console.log("store", data.Lista);
      this.listaSociosTipo = data.Lista;
      return this.listaSociosTipo;
    },

    async ListarById(id) {
      try {
        const { data } = await apiFinanzas.get(
          "/CatalogoSociosTipo/ListarById/" + id
        );
        return data;
      } catch (error) {
        return {
          bolRespuesta: false,
          strError: "Error en JS listar by id: " + error,
        };
      }
    },
    async InsertarSociosTipo(item) {
      const response = await apiIntranet.post(
        "/CatalogoSociosTipo/Insertar",
        item
      );
      return response;
    },

    async ModificarSociosTipo(item) {
      const response = await apiIntranet.post(
        "/CatalogoSociosTipo/Modificar",
        item
      );
      return response;
    },

    async limpiarStore() {
      this.listaSociosTipo = [];
    },
  },
});
