<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      icon="las la-paint-roller"
      @click="oscuro"
      round
      color="primary"
    ></q-btn>
  </q-page-sticky>
</template>

<script setup>
import { Dark } from "quasar";

const oscuro = () => {
  event.preventDefault();
  Dark.toggle();
  localStorage.setItem("darkTheme", Dark.isActive);
};

// Verificar y aplicar el tema oscuro al cargar la página
const initialDarkTheme = localStorage.getItem("darkTheme") === "true";
if (initialDarkTheme) {
  Dark.set(true);
}
</script>
