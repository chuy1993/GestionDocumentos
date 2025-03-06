<template>
  <q-separator dark vertical />
  <q-btn stretch flat label="Filosofia" @click="filosofia" />
  <q-separator dark vertical />
  <q-btn
    stretch
    flat
    label="CT Intranet"
    href="http://intranet.ctransporta.com/"
    target="_blank"
  />
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const filosofia = () => {
  router.push({ name: "/filosofiaCT" });
};
</script>
