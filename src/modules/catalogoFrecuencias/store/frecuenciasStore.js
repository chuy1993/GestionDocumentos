import { defineStore } from "pinia"; 
import apiIntranet from "src/API/apiFinanzas";

export default defineStore("frecuenciasStore", {
    state: () => ({
        bool: false,
        msj: "",
        listaFrecuencias: [],
        columnasFrecuencias: [
            {            
                name: "Frec_ID",
                required: true,
                label: "ID",
                align: "left",
            },
            {
                name: "Frec_Frecuencia",
                required: true,
                label: "Frecuencia",
                align: "left",
            },
            {
                name: "Frec_Status",
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
        getListaFrecuencias: (state) => {
            return state.listaFrecuencias;
        },
        getColumnasFrecuencias: (state) => {
            return state.columnasFrecuencias;
        },
    },
    actions: {
        async listar(item) {
            const { data } = await apiIntranet.post("/Frecuencias/Listar", item);
            console.log("store", data.Lista);
            this.listaFrecuencias = data.Lista;
            return this.listaFrecuencias;
        },
        async InsertarFrecuencias(item) {
            const response = await apiIntranet.post("/Frecuencias/Insertar", item);
            return response;
        },
        async limpiarStore() {
            this.listaFrecuencias = [];            
        },
        async ModificaFrecuencia(item) {
            const response = await apiIntranet.post(
                "/Frecuencias/Modificar",
                item
            );
            return response;
        },
    },
});