import { computed } from "vue";
import userStore from "../store/loginStore.js";
const useLogin = () => {
  const storeUser = userStore();

  const login = async (loginBE) => {
    const response = await storeUser.login(loginBE);

    const datosEmpleados = computed(() => storeUser.getListaEmpleados);

    if (response.ok == 1) {
      localStorage.setItem("token", response.Token);
      localStorage.setItem("usuario", loginBE.Usuario);
      let nombre = response.Nombre;
      let elnombre = nombre.split(" ");
      let apellidos =
        elnombre[elnombre.length - 2] + " " + elnombre[elnombre.length - 1];
      delete elnombre[elnombre.length - 1];
      delete elnombre[elnombre.length - 2];
      let nombres = elnombre.join(" ").trim();
      let elnombreEmpleado = apellidos + " " + nombres;
      let elnombreEmpleado2 = eliminarDiacriticos(elnombreEmpleado);

      localStorage.setItem("nombre_usuario", elnombreEmpleado2);
      let empleado = {
        Empl_Nombre: elnombreEmpleado,
      };
      console.log("El empleado", empleado);
      let result = await storeUser.consultaListaEmpleados(empleado);
      let laclave = 0;
      if (datosEmpleados.value.includes("Empl_Clave")) {
        laclave = datosEmpleados.value[0].Empl_Clave;
      }
      localStorage.setItem("clave_empleado", laclave);
    }
    return response;
  };

  const eliminarDiacriticos = (texto) => {
    return texto
      .normalize("NFD")
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        "$1"
      )
      .normalize()
      .toUpperCase();
  };

  const CerrandoSesion = async (usuarioBE) => {
    const response = await storeUser.cerrarSesion(usuarioBE);
    return response;
  };

  const informacionEmpleado = async (EmpleadoBE) => {
    const response = await storeUser.consultaListaEmpleados(EmpleadoBE);
    const listado = storeUser.getListaEmpleados;
    return listado;
  };

  return {
    login,
    CerrandoSesion,
    informacionEmpleado,
  };
};

export default useLogin;
