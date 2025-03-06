import { defineStore } from "pinia";
import apiFinanzas from "src/API/apiFinanzas";

export const RegimenFiscalStore = defineStore("RegimenFiscal", {
  state: () => ({
    listaRegimenFiscal: [],
    columnasRegimenFiscal: [
      {
        name: "RegFis_Clave",
        required: true,
        label: "Clave",
        align: "left",
        field: "RegFis_Clave",
        sortable: true,
        filter: true,
      },
      {
        name: "RegFis_Nombre",
        required: true,
        label: "Nombre",
        align: "left",
        field: "RegFis_Nombre",
        sortable: true,
        filter: true,
      },
      {
        name: "RegFis_Id",
        required: true,
        label: "Acciones",
        align: "left",
        field: "RegFis_Id",
        sortable: true,
        filter: true,
      },
    ],
  }),
  getters: {
    getListaRegimenFiscal: (state) => state.listaRegimenFiscal,
    getColumnasRegimenFiscal: (state) => state.columnasRegimenFiscal,
    getSelectRegimenFiscal: (state) => {
      let datos = [];
      state.listaRegimenFiscal.map((item) => {
        if (item.RegFis_Estatus) {
          let fila = {
            value: item.RegFis_Id,
            label: item.RegFis_Clave + ": " + item.RegFis_Nombre,
          };
          datos.push(fila);
        }
      });
      return datos;
    },
  },
  actions: {
    async ListarByID(RegFis_Id) {
      try {
        const { data } = await apiFinanzas.get(
          "/RegimenFiscal/Listar/" + RegFis_Id
        );
        return data;
      } catch (error) {
        return {
          bolRespuesta: false,
          strError: "Error JS ListarByID: " + error,
        };
      }
    },
    async Listar() {
      try {
        const { data } = await apiFinanzas.get("/RegimenFiscal/ListarGeneral");
        this.listaRegimenFiscal = data.Lista;
        delete data.Lista;
        return data;
      } catch (error) {
        return {
          bolRespuesta: false,
          strError: "Error JS Listar: " + error,
        };
      }
    },
    async Registrar(RegimenFiscalBE) {
      try {
        const { data } = await apiFinanzas.post(
          "/RegimenFiscal/Registrar",
          RegimenFiscalBE
        );
        delete data.Lista;
        return data;
      } catch (error) {
        return {
          bolRespuesta: false,
          strError: "Error JS Registrar: " + error,
        };
      }
    },
    async Actualizar(RegimenFiscalBE) {
      try {
        const { data } = await apiFinanzas.put(
          "/RegimenFiscal/Actualizar",
          RegimenFiscalBE
        );
        delete data.Lista;
        return data;
      } catch (error) {
        return {
          bolRespuesta: false,
          strError: "Error JS Actualizar: " + error,
        };
      }
    },
  },
});
