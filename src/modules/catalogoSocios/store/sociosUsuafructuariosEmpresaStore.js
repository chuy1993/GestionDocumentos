import { defineStore } from "pinia";
import apiFinanzas from "src/API/apiFinanzas";

export const sociosUsuafructuariosEmpresaStore = defineStore(
  "sociosusufructuariosEmpresa",
  {
    state: () => ({
      counter: 0,
      columnasEmpresasSocioUsufructuario: [
        {
          name: "RelaSociEmp_ID",
          required: true,
          label: "ID",
          align: "left",
          field: "RelaSociEmp_ID",
          sortable: true,
          filter: true,
        },
        {
          name: "Empresa",
          required: true,
          label: "Empresa",
          align: "left",
          field: "Empresa",
          sortable: true,
          filter: true,
          filter_type: "select",
        },
        {
          name: "RelaSociEmp_ID",
          required: true,
          label: "Acciones",
          align: "left",
          field: "RelaSociEmp_ID",
          sortable: true,
          filter: true,
        },
      ],
      listaEmpresasSocioUsufructuario: [],
    }),
    getters: {
      doubleCount: (state) => state.counter * 2,
      getListaEmpresasSocioUsufructuario: (state) =>
        state.listaEmpresasSocioUsufructuario,
      getColumnasEmpresasSocioUsufructuario: (state) =>
        state.columnasEmpresasSocioUsufructuario,
    },
    actions: {
      async Registrar(relacionBE) {
        try {
          const { data } = await apiFinanzas.post(
            "/RelacionSocioUsufructuarioEmpresa/Registrar",
            relacionBE
          );
          delete data.Lista;
          return data;
        } catch (error) {
          return {
            strError: "Error JS registra relacion: " + error,
            bolRespuesta: false,
          };
        }
      },
      async Listar(RelaSociEmp_Rela_ID, Empresas) {
        this.listaEmpresasSocioUsufructuario = [];
        // debugger;
        try {
          const { data } = await apiFinanzas.get(
            "/RelacionSocioUsufructuarioEmpresa/Listar/" + RelaSociEmp_Rela_ID
          );
          // this.listaEmpresasSocioUsufructuario = data.Lista;
          Object.keys(data.Lista).forEach((key) => {
            let empresa = Empresas.filter(
              (item) => item.value == data.Lista[key].RelaSociEmp_EmprCata_ID
            )[0];
            let fila = {
              RelaSociEmp_ID: data.Lista[key].RelaSociEmp_ID,
              Empresa: empresa.label,
            };
            this.listaEmpresasSocioUsufructuario.push(fila);
          });
          delete data.Lista;
          return data;
        } catch (error) {
          return {
            strError: "Error JS registra relacion: " + error,
            bolRespuesta: false,
          };
        }
      },
      async Eliminar(id) {
        try {
          const { data } = await apiFinanzas.delete(
            "/RelacionSocioUsufructuarioEmpresa/Eliminar/" + id
          );
          let indice = this.listaEmpresasSocioUsufructuario.findIndex(
            (item) => item.RelaSociEmp_ID == id
          );
          this.listaEmpresasSocioUsufructuario.splice(indice, 1);
          delete data.Lista;
          return data;
        } catch (error) {
          return {
            strError: "Error JS registra relacion: " + error,
            bolRespuesta: false,
          };
        }
      },
    },
  }
);
