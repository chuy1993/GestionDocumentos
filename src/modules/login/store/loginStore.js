import { defineStore } from "pinia";
import apiPermisos from "src/API/apiPermisos.js";
import apiIntranet from "src/API/apiGestionTalento.js";

export default defineStore("login", {
  state: () => ({
    permiso: 0,
    listaEmpleados: [],
    usuarios: [],
  }),

  getters: {
    getUserData: (state) => state.userData,
    getPermiso: (state) => () => {
      return state.permiso;
    },
    getListaEmpleados: (state) => {
      return state.listaEmpleados;
    },
  },
  actions: {
    async cerrarSesion(usuarioBE) {
      const { data } = await apiPermisos.post("/ControlAcceso/CerrarSesion", {
        usuarioBE,
      });
      if (data.bolRespuesta) {
        return { ok: true, mensaje: "Sesión cerrada" };
      } else {
        return { ok: false, mensaje: "Error al cerrar la sesion" };
      }
    },
    async Listar(proceso) {
      const { data } = await apiPermisos.post("/ControlAcceso/ListarPermisos", {
        Usuario: this.userData.email,
        Proceso: proceso,
      });
      data.bolRespuesta;
    },
    async ListarPermisos(permiso, usuario) {
      ////Console.log("Si entra a listarPermisos");
      const { data } = await apiPermisos.post("/ControlAcceso/ListarPermisos", {
        Usuario: "CTRANSPORTA\\" + usuario,
        Proceso: permiso,
      });
      ////Console.log("Validando permiso", data);
      return data.bolRespuesta;
    },
    async login(loginBE) {
      ////Console.log("El login", loginBE);
      try {
        const response = await apiPermisos.post(
          "/ControlAcceso/Login",
          loginBE
        );
        // Console.log("La response del store", response);
        if (
          response.data["Lista"] != undefined ||
          response.data["Lista"] != null
        ) {
          let existe = this.usuarios.findIndex(
            (item) => item.token == response.data.Lista[0].Token
          );
          if (existe >= 0) {
            this.usuarios.splice(existe, 1);
            return { ok: false, mensaje: "Buelve a iniciar sesion" };
          } else {
            this.usuarios.push({
              Token: response.data.Lista[0].Token,
              usuario: loginBE.Usuario,
            });
            let nombreEmpleado = response.data.Lista[0].Nombre.split(" ");
            let elnombre =
              nombreEmpleado[nombreEmpleado.length - 2] +
              " " +
              nombreEmpleado[nombreEmpleado.length - 1] +
              " ";
            for (let i = 0; i < nombreEmpleado.length - 2; i++) {
              elnombre += nombreEmpleado[i] + " ";
            }
            elnombre = elnombre.trim();
            let elnombre2 = await this.eliminarDiacriticos(elnombre);
            let EmpleadoBE = {
              Empl_Nombre: elnombre2,
              Empl_Status: "A",
            };
            console.log("El empleado a consultar", EmpleadoBE);
            const respUsuario = await this.consultaDetalleEmpleado(EmpleadoBE);
            //Console.log("La resp usuario", respUsuario);
            if (
              Object.entries(respUsuario).length > 0 &&
              respUsuario.error == undefined
            ) {
              localStorage.setItem("Empl_Id", respUsuario.Empl_Id);
            } else {
              localStorage.removeItem("Empl_Id");
            }

            return {
              ok: true,
              mensaje: "Inicio de sesion correcto",
              Token: response.data.Lista[0].Token,
              Nombre: response.data.Lista[0].Nombre,
            };
          }
        } else {
          return { ok: false, mensaje: response.data.strError };
        }

        // return {ok:true,Lista:data.Lista,mensaje:data.strError}
      } catch (error) {
        return { ok: false, mensaje: error };
      }
    },
    async consultaDetalleEmpleado(EmpleadoBE) {
      // try {
      console.log("El empleado a enviar buscar", EmpleadoBE);
      const response = await apiIntranet.post("/Empleados/Listar", EmpleadoBE);
      ////Console.log("La response funcion nueva", response);

      if (Object.entries(response.data.Lista).length > 0) {
        return {
          Empl_Id: response.data.Lista[0].Empl_Id,
        };
      } else {
        return {
          Empl_Id: 0,
          error: "",
        };
      }
      // } catch (error) {
      //   return { usuario_kiosco: 0, Empl_Id: 0, error: error };
      // }
    },
    async eliminarDiacriticos(texto) {
      return await texto
        .normalize("NFD")
        .replace(
          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
          "$1"
        )
        .normalize()
        .toUpperCase();
    },
    async consultaListaEmpleados(EmpleadoBE) {
      const { data } = await apiIntranet.post(
        // "Empleado/ListarEmpleados",
        "/Empleados/Listar",
        EmpleadoBE
      );
      this.listaEmpleados = data.Lista;
      return { ok: true, message: "Consulta realizada correctamente" };
    },
  },
});
