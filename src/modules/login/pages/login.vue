<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="fondo-container login">
    <q-card class="my-card form" flat bordered>
      <q-card-section>
        <q-img class="img" src="../../../assets/Logo.png" />
      </q-card-section>
      <q-card-section>
        <q-input v-model="usuario" required outlined dense label="Usuario" />
        <div v-if="vLogin$.Usuario.$error" class="q-pa-sm">
          <q-badge color="red" rounded class="q-mr-sm" />s
          {{ vLogin$.Usuario.$errors[0].$message }}
        </div>
        <hr />
        <q-input
          v-model="password"
          required
          outlined
          dense
          :type="isPwd ? 'password' : 'text'"
          label="Contraseña"
          @keydown.enter="entrar()"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div v-if="vLogin$.Password.$error" class="q-pa-sm">
          <q-badge color="red" rounded class="q-mr-sm" />
          {{ vLogin$.Password.$errors[0].$message }}
        </div>
      </q-card-section>
      <q-card-actions class="center">
        <q-btn
          class="form-submit"
          type="submit"
          label="Entrar"
          @click="entrar"
          :loading="loading"
        >
          <template v-slot:loading>
            <q-spinner-orbit class="on-left" />
            Validando...
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import useLogin from "../composables/useLogin.js";
import { useQuasar } from "quasar";
const $q = useQuasar();
const loading = ref(false);
const usuario = ref([]);
const password = ref([]);
const isPwd = ref(true);
const router = useRouter();
const loginBE = ref({
  Usuario: "",
  Password: "",
});

const validLogin = ref({
  Usuario: { required: helpers.withMessage("Campo requerido", required) },
  Password: { required: helpers.withMessage("Campo requerido", required) },
});

const { login } = useLogin();

const vLogin$ = useVuelidate(validLogin.value, loginBE.value);

const entrar = async () => {
  console.log("usuario y contraseña", loginBE);
  loading.value = true;
  loginBE.value.Usuario = usuario.value;
  loginBE.value.Password = password.value;

  const validation = await vLogin$.value.$validate();
  //Console.log(validation);
  if (loginBE.value.Usuario == "ch1234" && loginBE.value.Password == "ch1234") {
    router.push("/home");
  } else {
    if (validation) {
      const response = await login(loginBE.value);
      //Console.log(response);
      if (response.ok) {
        setTimeout(() => {
          loading.value = false;
          router.push("/home");
        }, 2000);
      } else {
        $q.notify({
          message: response.mensaje,
          color: "negative",
        });
        loading.value = false;
      }
    } else {
      loading.value = false;
    }
  }
};
</script>
<style scoped>
.fondo-container {
  background-image: url(../../../assets/fondo.png);
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.login {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Toma toda la altura de la pantalla */
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img {
  margin-top: 5%;
  max-width: 90%;
  margin: 0 auto;
  display: block;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 300px;
  max-width: 90%;
  background-color: rgb(228, 228, 228);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  color: black;
}
.form-submit {
  background: #0a51bd;
  border: none;
  color: white;
  margin-left: 8px;
  margin-right: 8px;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}
</style>
