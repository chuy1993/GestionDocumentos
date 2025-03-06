import apiPermisos from "src/API/apiPermisos";
import acciones_modulo from "src/router/PermissionsModules.js";

export const validarSesion = async (permisosBE) => {
  if (permisosBE.Token == null || permisosBE.Usuario == null) {
    return { ok: false };
  }
  const response = await apiPermisos.post(
    "/ControlAcceso/ValidaSesionUsuario",
    { Token: permisosBE.Token }
  );

  if (response.data.Lista != null) {
    if (Object.entries(response.data.Lista).length > 0) {
      if (response.data.Lista[0].ContUsu_Usuario == permisosBE.Usuario) {
        return { ok: true };
      } else {
        return { ok: false };
      }
    } else {
      return { ok: false };
    }
  } else {
    return { ok: false };
  }
};

export const ValidaPermisoAccion = async (ModuloUsuarioBE) => {
  const permisosModulo = {};
  let acciones = acciones_modulo.filter(
    (item) => item.Permissions == ModuloUsuarioBE.principal
  );
  for (const key of Object.keys(acciones[0].children)) {
    let objValidar = {
      Usuario: localStorage.getItem("usuario"),
      ProcUsu_Nombre: acciones[0].children[key].Permissions,
    };
    const permisos = await consultarPermisos(objValidar);
    permisosModulo[
      acciones[0].children[key].Permissions.replace(
        ModuloUsuarioBE.principal + "_",
        ""
      )
    ] = permisos;
  }
  return permisosModulo;
};

const consultarPermisos = async (objeto) => {
  const { data } = await apiPermisos.post(
    "/ControlAcceso/ValidarPermiso",
    objeto
  );
  return data.bolRespuesta ? 1 : 0;
};

export const modulosPadre = async (modulo) => {
  let arreglo = acciones_modulo.filter((item) =>
    item.Permissions.includes(modulo)
  );
  const resultadoFiltrado = arreglo.map((item) => {
    if (item.children && Array.isArray(item.children)) {
      const filteredChildren = item.children.filter((child) =>
        child.Permissions.includes("Ingresar")
      );
      return { modulo: filteredChildren[0].Permissions };
    } else {
      return item;
    }
  });

  for (const key of Object.keys(resultadoFiltrado)) {
    let objValidar = {
      Usuario: localStorage.getItem("usuario"),
      ProcUsu_Nombre: resultadoFiltrado[key].modulo,
    };

    const permisos = await consultarPermisos(objValidar);
    resultadoFiltrado[key]["permiso"] = permisos;
    resultadoFiltrado[key].modulo = resultadoFiltrado[key].modulo
      .replace("Proc_GestionTalento_PerfilesPuestos_PerfilPuesto_", "")
      .replace("_Ingresar", "");
  }
  return resultadoFiltrado;
};

export const validaAccionIndividual = async (modulo, accion) => {
  let objPermiso = {
    Usuario: localStorage.getItem("usuario"),
    ProcUsu_Nombre: modulo + "_" + accion,
  };
  const response = await consultarPermisos(objPermiso);
  if (response == 0) {
    return false;
  }
  return true;
};
