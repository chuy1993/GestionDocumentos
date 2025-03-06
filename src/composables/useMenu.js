import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import permissionsApp from "../router/PermissionsModules.js";

import useMenuStore from "../stores/menuStore.js";
// import useUserStore from "../stores/userStore.js";
const sistema = 42;

export const useMenu = () => {
  // const $q = useQuasar();
  const menuStore = useMenuStore();
  // const userStore = useUserStore();
  const permissionAppBD = [];

  const permisos = computed(() => menuStore.getPermisosUsuario());
  const permiso = ref(null);
  const generaPermisosUsuario = async (UsuarioBE) => {
    const resultado = await busqueda1(permissionsApp, UsuarioBE, sistema);
    if (resultado != undefined) {
      menuStore.defineMenuUsuario(resultado);
      return {
        ok: true,
        message: "permisos generados corectamente",
        datosusuario: resultado.datosUsuario,
      };
    } else {
      return {
        ok: false,
        message: "No tienes permiso para ingresar",
        datosusuario: null,
      };
    }
  };

  // const validarAcceso = async (acceso, usuario) => {
  //   const respuestaPermiso = await userStore.ListarPermisos(acceso, usuario);
  //   return respuestaPermiso;
  // };

  const accederModulo = async (link, usuario) => {
    permiso.value = "";
    Object.keys(permissionsApp).forEach((key) => {
      const nivel1 =
        permissionsApp[key].children.length > 0
          ? permissionsApp[key].children
          : null;
      if (nivel1 != null) {
        Object.keys(nivel1).forEach((key2) => {
          const nivel2 =
            nivel1[key2].children.length > 0 ? nivel1[key2].children : null;
          if (nivel2 != null) {
            Object.keys(nivel2).forEach((key3) => {
              const nivel3 =
                nivel2[key3].children.length > 0 ? nivel2[key3].children : null;
              if (nivel3 != null) {
                Object.keys(nivel3).forEach((key4) => {
                  const nivel4 =
                    nivel3[keys].children.length > 0
                      ? nivel3[keys].children
                      : null;
                });
                if (nivel4 != null) {
                } else {
                }
              } else {
                if (nivel2[key3].link != undefined) {
                  if (nivel2[key3].link === link) {
                    permiso.value = nivel2[key3].Permissions;
                  }
                }
              }
            });
          } else {
            if (nivel1[key2].link != undefined) {
              if (nivel1[key2].link === link) {
                permiso.value = nivel1[key2].Permissions;
              }
            }
          }
        });
      }
    });

    // localStorage.setItem("accionSolicitada", permiso.value);

    let result = await validarAcceso(permiso.value, usuario);

    return result;
  };

  const busqueda1 = async (parPermissionsApp, UsuarioBE, sistema) => {
    const resultado = await menuStore.consultaItemsBD(UsuarioBE, sistema);
    // debugger;
    if (resultado.ok) {
      const permissionsBD = menuStore.getMenuList();
      console.log("Los permisos de BD", permissionsBD);
      console.log("LOs permisos de archivo", parPermissionsApp);
      permissionsBD.forEach(async function (pBD) {
        if (parPermissionsApp.length > 0) {
          const pAppArr = parPermissionsApp.find(
            (pAppArr) => pAppArr.Permissions == pBD.process
          );
          if (pAppArr) {
            if (pAppArr.children.length > 0) {
              const pAppobjChild = pAppArr.children;
              pAppArr.children = pAppArr.children.filter(
                (permissions) => permissions == ""
              );

              permissionAppBD.push(
                busqueda2(pAppArr, pAppobjChild, permissionsBD)
              );
            } else {
              permissionAppBD.push(pAppArr);
            }
          }
        }
      });
      return permissionAppBD;
    }
  };

  // const agregarEvaluaciones = (permissionAppBD) => {
  //   // let filtrado = permissionAppBD.filter(
  //   //   (item) =>
  //   //     item.children.label == "Responder Evaluación Desempeño" ||
  //   //     item.children.label == "Capturar indicadores"
  //   // );
  //   // if (filtrado.length == 0) {
  //   let indice = permissionAppBD.findIndex(
  //     (item) => item.label == "Evaluación de Desempeño"
  //   );
  //   if (indice >= 0) {
  //     Object.keys(copia).forEach((key) => {
  //       permissionAppBD[indice].children.push(copia[key]);
  //     });
  //   }
  //   // }
  //   return permissionAppBD;
  // };

  const busqueda2 = (
    parPermissionsFather,
    parPermissionsApp,
    permissionsBD
  ) => {
    permissionsBD.forEach(function (pBD) {
      if (parPermissionsApp.length > 0) {
        const pAppArr = parPermissionsApp.find(
          (pAppArr) => pAppArr.Permissions === pBD.process
        );
        if (pAppArr) {
          if (pAppArr.children.length > 0) {
            const pAppobjChild = pAppArr.children;
            pAppArr.children = pAppArr.children.filter(
              (process) => process == ""
            );
            parPermissionsFather.children.push(
              busqueda2(pAppArr, pAppobjChild, permissionsBD)
            );
          } else {
            parPermissionsFather.children.push(pAppArr);
          }
        }
      }
    });
    return parPermissionsFather;
  };

  return {
    generaPermisosUsuario,
    permisos,
    accederModulo,
  };
};
