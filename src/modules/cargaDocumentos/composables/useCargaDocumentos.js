import { computed } from "vue";
import { useQuasar } from "quasar";

import useDocumentosStore from "../store/cargaDocumentosStore.js";

const useSocios = () => {
  const q = useQuasar();
  const documentosStore = useDocumentosStore();

  const columnasDocumentos = computed(
    () => documentosStore.getColumnasDocumentos
  );
  const listaDocumentos = computed(() => documentosStore.getListaDocumentos);

  const consultaRazonSocial = async () => {
    const response = await documentosStore.selectRazonSocial();
    return response;
  };
  const consultaTipoDocumento = async (item) => {
    const response = await documentosStore.selectTipoDocumento(item);
    return response;
  };
  const consultaInfoDocumentos = async (item) => {
    const response = await documentosStore.consultaInfoDocumentos(item);
    return response;
  };
  const consultaInfoDocumentosPopup = async (item) => {
    const response = await documentosStore.consultaInfoDocumentosPopup(item);
    console.log("composable", response);
    return response;
  };
  const insertaInfoDocumentos = async (item) => {
    const response = await documentosStore.insertaInfoDocumentos(item);
    return response;
  };
  const modificaInfoDocumentos = async (item) => {
    const response = await documentosStore.modificaInfoDocumentos(item);
    console.log("composable editar", response);
    return response;
  };
  const subirArchivos = async (file, id, doc) => {
    const response = await documentosStore.subirArchivos(file, id, doc);
    return response;
  };
  const editarArchivos = async (file) => {
    const response = await documentosStore.editarArchivos(file);
    return response;
  };
  const limpiarStore = async () => {
    documentosStore.limpiar();
  };
  const consultaExtDocumento = async (item) => {
    const response = await documentosStore.consultaExtDocumento(item);
    console.log("use respuesta", response);
    return response;
  };
  return {
    columnasDocumentos,
    listaDocumentos,
    consultaRazonSocial,
    consultaTipoDocumento,
    consultaInfoDocumentos,
    insertaInfoDocumentos,
    modificaInfoDocumentos,
    subirArchivos,
    editarArchivos,
    limpiarStore,
    consultaExtDocumento,
    consultaInfoDocumentosPopup,
  };
};

export default useSocios;
