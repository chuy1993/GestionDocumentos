import { defineStore } from "pinia";
import apiFinanzas from "src/API/apiFinanzas";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("documentosStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaConsultaTipo: [],
    listaSelectDocumentos: [],
    selectSociosT: [],
    listaDocumentos: [],
    listaSelectSociosTipo: [],
    columnasDocumentos: [
      // {
      //   name: "DocuCata_ID",
      //   field: "DocuCata_ID",
      //   required: true,
      //   label: "ID",
      //   align: "left",
      //   sortable: true,
      //   filter: true,
      // },
      {
        name: "SociTipo_Tipo",
        field: "SociTipo_Tipo",
        required: true,
        label: "Socios Tipo",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "DocuCata_Tipo",
        field: "DocuCata_Tipo",
        required: true,
        label: "Tipo de Documento",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "DocuCata_Extension",
        field: "DocuCata_Extension",
        required: true,
        label: "Extensión",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "DocuCata_Requerido",
        field: "DocuCata_Requerido",
        required: true,
        label: "Requerido",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "DocuCata_Vence",
        field: "DocuCata_Vence",
        required: true,
        label: "Vence",
        align: "left",
        sortable: true,
        filter: true,
      },
      {
        name: "DocuCata_Status",
        field: "DocuCata_Status",
        required: true,
        label: "Status",
        align: "left",
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
  }),

  getters: {
    getListaDocumentos: (state) => {
      return state.listaDocumentos;
    },
    getColumnasDocumentos: (state) => {
      return state.columnasDocumentos;
    },
  },
  actions: {
    async limpiarStore() {
      this.listaDocumentos = [];
    },

    async listar(item) {
      // this.listaDocumentos = [];
      const { data } = await apiIntranet.post(
        "/CatalogoDocumentos/Listar",
        item
      );
      console.log("store", data.Lista);
      this.listaDocumentos = data.Lista;
      return this.listaDocumentos;
    },

    async listarById(id) {
      try {
        const { data } = await apiFinanzas.get(
          "/CatalogoDocumentos/ListarById/" + id
        );
        return data;
      } catch (error) {
        return {
          strError: "Error JS Listar ById:" + error,
          bolRespuesta: false,
        };
      }
    },

    async InsertaDocumentos(item) {
      try {
        const response = await apiIntranet.post(
          "/CatalogoDocumentos/Insertar",
          item
        );
        return response;
      } catch (error) {
        return {
          strError: "errir en js: iserta documentos:" + error,
          bolRespuesta: false,
        };
      }
    },

    async selectSociosT(item) {
      const { data } = await apiIntranet.post(
        "/CatalogoSociosTipo/Listar",
        item
      );
      console.log("store", data.Lista);
      this.listaDocumentos = data.Lista;
      return this.listaDocumentos;
    },
    async consultaSocioTipo(item) {
      this.listaSelectSociosTipo = [];
      console.log("impresion", item);
      const { data } = await apiIntranet.post(
        "/CatalogoSociosTipo/Listar",
        item
      );
      console.log("store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let indice = this.listaSelectSociosTipo.findIndex(
          (item) => item.value == data.Lista[key].SociTipo_ID
        );
        if (indice < 0) {
          let item2 = {
            value: data.Lista[key].SociTipo_ID,
            label: data.Lista[key].SociTipo_Tipo,
          };
          this.listaSelectSociosTipo.push(item2);
        }
      });
      return this.listaSelectSociosTipo;
    },

    async ModificaCatalogo(item) {
      const response = await apiIntranet.post(
        "/CatalogoDocumentos/Modificar",
        item
      );
      return response;
    },

    async EliminarCatalogo(id) {
      const response = await apiIntranet.delete(
        "/CatalogoDocumentos/Eliminar/" + id
      );
      return response;
    },
  },
});
