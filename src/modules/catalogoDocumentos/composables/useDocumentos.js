import { computed } from "vue";
import { useQuasar } from "quasar";

import useDocumentosStore from "../store/documentosStore.js";

const useDocumentos = () => {
  const $q = useQuasar();
  const documentosStore = useDocumentosStore();

  const columnasDocumentos = computed(
    () => documentosStore.getColumnasDocumentos
  );
  const listaDocumentos = computed(() => documentosStore.getListaDocumentos);

  const getColumnas = async () => {
    return documentosStore.getColumnasDocumentos;
  };

  const listarDocumentos = async (item) => {
    const response = await documentosStore.listar(item);
    return response;
  };

  const listarById = async (id) => {
    const response = await documentosStore.listarById(id);
    return response;
  };
  const consultaTipo = async () => {
    const response = await documentosStore.consultaTipo();
    return response;
  };

  const consultaDocumento = async (item) => {
    const response = await documentosStore.consultaDocumento(item);
    return response;
  };

  const InsertaDocumentos = async (item) => {
    const response = documentosStore.InsertaDocumentos(item);
    return response;
  };
  const selectSociosT = async () => {
    const response = await documentosStore.selectSociosT();
    return response;
  };

  const consultaSocioTipo = async (item) => {
    const response = await documentosStore.consultaSocioTipo(item);
    return response;
  };

  const ModificaCatalogo = async (item) => {
    const response = await documentosStore.ModificaCatalogo(item);
    return response;
  };

  const EliminaCatalogo = async (id) => {
    const response = await documentosStore.EliminarCatalogo(id);
    return response;
  };

  const limpiarStore = async () => {
    const response = await documentosStore.limpiarStore();
    return response;
  };

  return {
    columnasDocumentos,
    listaDocumentos,
    listarDocumentos,
    getColumnas,
    consultaTipo,
    limpiarStore,
    selectSociosT,
    consultaSocioTipo,
    consultaDocumento,
    InsertaDocumentos,
    ModificaCatalogo,
    EliminaCatalogo,
    listarById,
  };
};

export default useDocumentos;
