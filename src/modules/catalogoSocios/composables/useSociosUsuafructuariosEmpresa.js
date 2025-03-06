import { computed } from "vue";
import { sociosUsuafructuariosEmpresaStore } from "../store/sociosUsuafructuariosEmpresaStore";
import { list } from "postcss";

const useSociosUsuafructuariosEmpresa = () => {
  const storeSociosUsuafructuariosEmpresa = sociosUsuafructuariosEmpresaStore();

  const registroRelacion = async (relacionBE) => {
    return await storeSociosUsuafructuariosEmpresa.registraRelacion(relacionBE);
  };

  const getListaEmpresasSocioUsufructuario = computed(
    () => storeSociosUsuafructuariosEmpresa.getListaEmpresasSocioUsufructuario
  );
  const getColumnasEmpresasSocioUsufructuario = computed(
    () =>
      storeSociosUsuafructuariosEmpresa.getColumnasEmpresasSocioUsufructuario
  );
  const Listar = async (RelaSociEmp_Rela_ID, Empresas) => {
    const response = await storeSociosUsuafructuariosEmpresa.Listar(
      RelaSociEmp_Rela_ID,
      Empresas
    );
    console.log("response", response);
    return response;
  };
  const Registrar = async (objRelacion) => {
    const response = await storeSociosUsuafructuariosEmpresa.Registrar(
      objRelacion
    );
    console.log("response", response);
    return response;
  };
  const Eliminar = async (id) => {
    const response = await storeSociosUsuafructuariosEmpresa.Eliminar(id);
    console.log("response", response);
    return response;
  };
  return {
    registroRelacion,
    Listar,
    getListaEmpresasSocioUsufructuario,
    getColumnasEmpresasSocioUsufructuario,
    Registrar,
    Eliminar,
  };
};

export default useSociosUsuafructuariosEmpresa;
