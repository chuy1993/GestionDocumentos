<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Finanzas Corporativas </q-toolbar-title>
        <topMenu></topMenu>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding="">
          <q-item-label header style="margin-top: 5px;"> Menú </q-item-label>
          <EssentialLink />
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="../assets/istockphoto2.jpg"
        style="height: 165px"
      >
        <div class="absolute-bottom column items-center">
          <q-avatar rounded size="150px"></q-avatar>
          <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
          <q-avatar color="primary" text-color="white">
            {{ iniciales }}</q-avatar
          >
          <div
            rounded
            class="text-weight-bold text-stroke"
            style="font-size: 14px; color: rgb(255, 255, 255)"
          >
            {{ nombre }}
          </div>
          <div>
            <q-btn
              color="primary"
              label="Cerrar Sesión"
              push
              size="md"
              @click="confirm"
              v-close-popup
            ></q-btn>
          </div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";
import linksList from "../router/link-list";
import useLogin from "src/modules/login/composables/useLogin";
import { Dark } from "quasar";
import { useQuasar } from "quasar";
import topMenu from "../components/top-menu.vue";
const iniciales = ref("");
const router = useRouter();
const nombre = ref(null);
const $q = useQuasar();
const area = ref(null);
const arrNombre = ref(null);
const { CerrandoSesion } = useLogin();

const confirm = () => {
  $q.dialog({
    title: "Cerrar sesión",
    message: "Estas seguro de que deseas cerrar sesión?",
    cancel: {
      color: "negative",
      label: "Cancelar",
    },
    ok: {
      color: "positive",
      label: "Ok",
    },
    persistent: true,
  })
    .onOk(async () => {
      const respuesta = await CerrandoSesion();
      $q.notify({
        message: respuesta.mensaje,
        color: respuesta.ok ? "positive" : "negative",
      });
      if (respuesta.ok) {
        setTimeout(() => {
          let tema = localStorage.getItem("darkTheme");
          localStorage.clear();
          localStorage.setItem("darkTheme", tema);
          router.push("/");
        }, 3000);
      }
    })
    .onCancel(() => {})
    .onDismiss(() => {});
};

onMounted(async () => {
  const storedTheme = localStorage.getItem("darkTheme");
  Dark.set(storedTheme === "true" ? true : false);

  //const response = await validarSesion(permisosBE);

  // if (response.ok) {
  // await listaDirecciones();
  // await listaPuestos();
  nombre.value = localStorage.getItem("nombre_usuario");
  area.value = localStorage.getItem("area_usuario");
  arrNombre.value = nombre.value.split(" ");
  iniciales.value = "";
  iniciales.value =
    arrNombre.value[2].charAt(0, 1) + arrNombre.value[0].charAt(0, 1);
  $q.loading.hide();
  //} else {
  // $q.loading.hide();
  // router.push("/");
  //}
});

console.log("link", linksList);
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
<style scoped>
/*.glow-text {
  text-shadow: 0 0 5px rgba(29, 18, 182, 0.5);
}
*/
.text-stroke {
  color: rgb(255, 255, 255);
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
