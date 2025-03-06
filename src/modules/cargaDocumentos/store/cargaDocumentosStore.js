import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("cargaDocumentosStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaDocumentos: [],
    listaRS: [],
    SelectDocumentos: [],
    InstFormData: new FormData(),
    columnasDocumentos: [
      // {
      //   name: "Docu_ID",
      //   required: true,
      //   label: "ID",
      //   align: "left",
      // },
      {
        name: "Docu_Ruta",
        required: true,
        label: "Documento",
        align: "left",
      },
      /*  {
        name: "DocuCata_ID",
        required: true,
        label: "DocuCata_ID",
        align: "left",
      }, */
      {
        name: "DocuCata_Tipo",
        required: true,
        label: "Tipo de Documento",
        align: "left",
      },
      {
        name: "Docu_FechaVencimiento",
        required: true,
        label: "Fecha Vencimiento",
        align: "left",
      },
      {
        name: "Docu_Recordatorio",
        required: true,
        label: "Recordatorio Anticipado en días",
        align: "left",
      },
      {
        name: "Docu_Contraseña",
        required: true,
        label: "Contraseña",
        align: "left",
      },
      {
        name: "DocuCata_Extension",
        required: true,
        label: "DocuCata_Extension",
        align: "left",
      },
      {
        name: "Docu_FechaCarga",
        required: true,
        label: "Fecha de Importación",
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
    getListaDocumentos: (state) => state.listaDocumentos,
    getColumnasDocumentos: (state) => state.columnasDocumentos,
  },
  actions: {
    async selectRazonSocial() {
      this.limpiar();
      console.log("store");
      const { data } = await apiIntranet.post("/CatalogoAlertas/SelectEmpresa");
      console.log("data del store", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let tipo = {
          value: data.Lista[key].SociCata_ID,
          label: data.Lista[key].SociCata_RazonSocial,
        };
        this.listaRS.push(tipo);
      });

      return this.listaRS;
    },
    async selectTipoDocumento(item) {
      this.limpiar();
      console.log("store select documentos", item);
      const { data } = await apiIntranet.post(
        "/CatalogoDocumentos/Listar",
        item
      );
      console.log("data del store lista tipo de documentos", data.Lista);
      Object.keys(data.Lista).forEach((key) => {
        let tipo = {
          value: data.Lista[key].DocuCata_ID,
          label: data.Lista[key].DocuCata_Tipo,
          Docu_Requerido: data.Lista[key].DocuCata_Requerido,
          Docu_Vence: data.Lista[key].DocuCata_Vence,
        };
        this.SelectDocumentos.push(tipo);
      });

      return this.SelectDocumentos;
    },
    async consultaInfoDocumentos(item) {
      this.listaDocumentos = [];
      console.log("consulta store", item);
      const { data } = await apiIntranet.post("/CargaDocumentos/Listar", item);
      this.listaDocumentos = data.Lista;
      Object.keys(this.listaDocumentos).forEach((key) => {
        let ext =
          this.listaDocumentos[key].Docu_Ruta.length == 0
            ? ""
            : this.listaDocumentos[key].Docu_Ruta.split(".");
        this.listaDocumentos[key].DocuCata_Extension =
          ext.length > 0 ? ext[ext.length - 1] : "";
      });
      console.log("respuesta consultar", data.Lista);
    },
    async consultaInfoDocumentosPopup(item) {
      console.log("consulta store popups", item);
      const { data } = await apiIntranet.post("/CargaDocumentos/Listar", item);
      console.log("data del store", data.Lista[0]);
      return data.Lista[0];
    },
    async insertaInfoDocumentos(item) {
      console.log("inserta store", item);
      const { data } = await apiIntranet.post(
        "/CargaDocumentos/Insertar",
        item
      );
      console.log("respuesta insertar", data);
      return data.bolRespuesta;
    },
    async modificaInfoDocumentos(item) {
      console.log("modifica store", item);
      const { data } = await apiIntranet.post(
        "/CargaDocumentos/Modificar",
        item
      );
      console.log("respuesta modificar", data.bolRespuesta);
      return data.bolRespuesta;
    },
    async subirArchivos(file, id, doc) {
      this.InstFormData.append("files", file);
      let header = { "content-type": "multipart/form-data" };
      let configuracion = { headers: header };
      const response = await apiIntranet.post(
        "CargaDocumentos/CargarArchivo/" + id + "/" + doc,
        this.InstFormData,
        configuracion
      );
      this.InstFormData = new FormData();
      return response;
    },
    async editarArchivos(fileName) {
      const response = await apiIntranet.post(
        `CargaDocumentos/EditarArchivo?file=${fileName}`
      );
      return response;
    },
    async consultaExtDocumento(item) {
      console.log("consulta store", item);
      const { data } = await apiIntranet.post(
        "/CatalogoDocumentos/ListarExt",
        item
      );
      //this.listaDocumentos = data.Lista;
      console.log("respuesta consultar ext", data.Lista[0]);
      return data.Lista[0];
    },
    async limpiar() {
      this.listaDocumentos = [];
      this.listaRS = [];
      this.SelectDocumentos = [];
    },
  },
});
