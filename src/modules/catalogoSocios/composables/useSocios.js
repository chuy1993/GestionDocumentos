import { computed } from "vue";
import { useQuasar } from "quasar";

import useSociosStore from "../store/sociosStore.js";

const useSocios = () => {
  const sociosStore = useSociosStore();

  const columnasSocios = computed(() => sociosStore.getColumnasSocios);
  const listaSocios = computed(() => sociosStore.getListaSocios);
  const columnasSociosRelacion = computed(
    () => sociosStore.getcolumnasSociosRelacion
  );
  const listaSociosRelacion = computed(() => sociosStore.getlistaRelacion);
  const columnasSociosRelacionEmpresas = computed(
    () => sociosStore.getcolumnasSociosRelacionEmpresas
  );
  const listaSociosRelacionEmpresas = computed(
    () => sociosStore.getlistaRelacionEmpresas
  );

  const getColumnas = async () => {
    return sociosStore.getColumnasSocios;
  };
  const listarSocios = async (item) => {
    const response = await sociosStore.listar(item);
    return response;
  };

  const cosnultaInfoSociosPopUp = async (item) => {
    const response = await sociosStore.cosnultaInfoSociosPopUp(item);
    console.log("composable", response);
    return response;
  };

  const getcolumnasSociosRelacion = async () => {
    return sociosStore.getcolumnasSociosRelacion;
  };
  const consultaTipo = async (item) => {
    const response = await sociosStore.consultaTipo(item);
    return response;
  };

  // const selectConsultaTipoFunction = async () => {
  //   const response = await sociosStore.selectConsultaTipoFunction(item);
  //   return response;
  // }
  const listarRelacion = async (item) => {
    console.log("relacion composable", item);
    const response = await sociosStore.listarRelacion(item);
    return response;
  };
  const listarRelacionSociosEmpresas = async (item) => {
    const response = await sociosStore.listarRelacionSociosEmpresas(item);
    return response;
  };
  const consultaSocio = async (item) => {
    const response = await sociosStore.consultaSocio(item);
    return response;
  };

  const listarEmpresas = async (item) => {
    const response = await sociosStore.listarEmpresas(item);
    return response;
  };

  const consultaCorporativo = async (item) => {
    const response = await sociosStore.consultaCorporativo(item);
    return response;
  };

  const limpiarStore = async () => {
    const response = await sociosStore.limpiarStore();
    return response;
  };
  const InsertaSocios = async (item) => {
    const response = await sociosStore.InsertaSocios(item);
    return response;
  };
  const ModificaSocios = async (item) => {
    const response = await sociosStore.ModificaSocios(item);
    return response;
  };
  const guardaRelacion = async (item) => {
    const response = await sociosStore.guardaRelacion(item);
    console.log("composable", response.data.bolRespuesta);
    return response.data.bolRespuesta;
  };
  const modificarRelacion = async (item) => {
    const response = await sociosStore.modificarRelacion(item);
    console.log("composable", response.data.bolRespuesta);
    return response.data.bolRespuesta;
  };
  const eliminaRelacion = async (item) => {
    const response = await sociosStore.eliminaRelacion(item);
    console.log("composable", response.data.bolRespuesta);
    return response.data.bolRespuesta;
  };
  const EliminaRelacionEmpresa = async (item) => {
    const response = await sociosStore.EliminaRelacionEmpresa(item);
    return response.data.bolRespuesta;
  };
  const consultaPorTipoSocio = async (item) => {
    console.log("a consultar por tipo", item);
    const response = await sociosStore.consultaSocioRelacion(item);
    return response;
  };
  const listarNombresTipoSocios = async (item) => {
    console.log("a consultar nombre por tipo", item);
    const response = await sociosStore.listarNombresTipoSocios(item);
    return response;
  };

  const InsertaRelacion = async (item) => {
    const response = await sociosStore.InsertaRelacion(item);
    return response;
    // console.log("composable", response.data.bolRespuesta);
    // return response.data.bolRespuesta;
  };

  const limpiaTablaRelacion = async () => {
    await sociosStore.limpiaTablaRelacion();
  };

  return {
    columnasSocios,
    listaSocios,
    listarSocios,
    getColumnas,
    consultaTipo,
    consultaSocio,
    limpiarStore,
    InsertaSocios,
    ModificaSocios,
    guardaRelacion,
    getcolumnasSociosRelacion,
    columnasSociosRelacion,
    listaSociosRelacion,
    listarRelacion,
    consultaPorTipoSocio,
    listarNombresTipoSocios,
    modificarRelacion,
    eliminaRelacion,
    listarRelacionSociosEmpresas,
    cosnultaInfoSociosPopUp,
    columnasSociosRelacionEmpresas,
    listaSociosRelacionEmpresas,
    listarEmpresas,
    InsertaRelacion,
    EliminaRelacionEmpresa,
    limpiaTablaRelacion,
  };
};

export default useSocios;
