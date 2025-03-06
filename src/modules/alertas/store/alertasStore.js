import { defineStore } from "pinia";
import apiIntranet from "src/API/apiFinanzas";
import { api } from "src/boot/axios";

export default defineStore("alertasStore", {
  state: () => ({
    bool: false,
    msj: "",
    listaConsultaFrecuencias: [],
    listaAlertas: [],
    listaSelectEmpresas: [],
    listaEmpresas: [],
    columnasAlertas: [
      {
        name: "Aler_ID",
        required: true,
        label: "ID",
        align: "left",
      },
      {
        name: "SociCata_RazonSocial",
        required: true,
        label: "Empresa",
        align: "left",
      },
      {
        name: "Aler_Correo",
        required: true,
        label: "Correo",
        align: "left",
      },
      {
        name: "Aler_FechaHora",
        required: true,
        label: "Fecha y Hora",
        align: "left",
      },
      {
        name: "Aler_Frecuencia",
        required: true,
        label: "Frecuencia",
        align: "left",
      },
      {
        name: "Aler_Ubicacion",
        required: true,
        label: "Ubicación",
        align: "left",
      },
      {
        name: "Aler_Asunto",
        required: true,
        label: "Asunto",
        align: "left",
      },
      {
        name: "Aler_Mensaje",
        required: true,
        label: "Mensaje",
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
    getListaAlertas: (state) => {
      return state.listaAlertas;
    },
    getColumnasAlertas: (state) => {
      return state.columnasAlertas;
    },
  },

  actions: {
    async consultaFrecuencias() {
      this.listaConsultaFrecuencias = [
        {
          label: "Diaria"
        },
        {
          label: "Semanal",
        },
        {
          label: "Quincenal",
        },
        {
          label: "Mensual",
        },
        {
          label: "Anual",
        }
      ];
     // this.listaConsultaFrecuencias
      return this.listaConsultaFrecuencias;
  },

  async listar(item) {
    const { data } = await apiIntranet.post("/CatalogoAlertas/Listar", item) ;
    console.log("store", data.Lista);
    this.listaAlertas = data.Lista;
    return this.listaAlertas;
  },

//   async selectEmpresas(item) {
//     const { data } = await apiIntranet.post("/CatalogoAlertas/SelectEmpresa", item);
//     console.log("store", data.Lista);
//     this.listaEmpresas = data.Lista;
//     return this.listaEmpresas
// },
// async consultaEmpresas(item) {
//     console.log("impresion", item)
//     const { data } = await apiIntranet.post("/CatalogoAlertas/SelectEmpresa", item);
//     console.log("store", data.Lista);
//     Object.keys(data.Lista).forEach((key) => {
//         let item2 = {
//             value: data.Lista[key].SociCata_ID,
//             label: data.Lista[key].SociCata_RazonSocial,
//         };
//         this.listaSelectEmpresas.push(item2);
//     });
//     return this.listaSelectEmpresas;
// },

  async InsertarAlertas(item) {
    console.log("insertarStore", item)
    const response = await apiIntranet.post("/CatalogoAlertas/Insertar", item);
    return response;
  },
  async ModificarAlerta(item) {
    console.log("modificar: store", item)
    const response = await apiIntranet.post("/CatalogoAlertas/Modificar", item);
    return response;
  },
  async EliminarAlerta(item) {
    console.log("modificar: store", item)
    const response = await apiIntranet.post("/CatalogoAlertas/Eliminar", item);
    return response;
  },
  async limpiarStore() {
    this.listaEmpresas = [];
    this.listaSelectEmpresas = [];
},

},
});
