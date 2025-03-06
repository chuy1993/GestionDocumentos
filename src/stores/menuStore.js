import { defineStore } from "pinia";
import apiPermisos from "src/API/apiPermisos";

export default defineStore("navegacion", {
  state: () => ({
    linklist: [],
    permisos: [],
    sistema: 42,
  }),
  getters: {
    getMenuList: (state) => () => {
      return state.linklist;
    },
    getPermisosUsuario: (state) => () => {
      return state.permisos;
    },
  },
  actions: {
    async consultaItemsBD(UsuarioBE) {
      // //Console.log(UsuarioBE);
      // debugger;
      const response = await apiPermisos.post(
        "/controlAcceso/validaSesionUsuario",
        { Token: UsuarioBE.Token }
      );
      // //Console.log(response);
      // return false;
      const datos = response.data;

      // localStorage.setItem("usuario","juan.casillas");

      if (Object.entries(datos.Lista).length > 0) {
        // ////Console.log("La lista de BD", datos.Lista);
        // ////Console.log("La respuesta de la BD", datos.Lista[0].ContUsu_Usuario);
        const { data } = await apiPermisos.post(
          "/ControlAcceso/ListarPermisos",
          {
            Perfil_Sistema_ID: this.sistema,
            // Usuario: "CTRANSPORTA\\juan.casillas",
            Usuario: "CTRANSPORTA\\" + datos.Lista[0].ContUsu_Usuario,
          }
        );

        const listado = [];
        // ////Console.log("La lista de la data de menues", data);
        Object.keys(data.Lista).forEach((key) => {
          listado.push({
            process: data.Lista[key].ProcUsu_Nombre,
            sistema: data.Lista[key].Perfil_Sistema,
          });
        });

        this.linklist = listado;
        return { ok: true, message: "Consulta correcta" };
      } else {
        return { ok: false, mensaje: "Inicia sesion nuevamente" };
      }
    },

    defineMenuUsuario(permissionAppBD) {
      this.permisos = permissionAppBD;
    },
  },
});
