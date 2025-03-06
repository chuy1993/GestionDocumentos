<template>
  <q-select
    label="Corporativo"
    use-input
    v-model="Corporativo"
    :options="optionsCorporativo"
    dense
    outlined
    clearable
    style="width: 250px"
  ></q-select>
</template>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useCorporativo from "../composables/useCorporativo.js";

const { consultaCorporativo, limpiarStore } = useCorporativo();
const Corporativo = ref(null);
const optionsCorporativo = ref(null);
const item2 = ref({
  Accion: 1,
});

const props = toRefs({
  prop11: {
    type: String,
    default: "",
  },
});

const { prop11 } = toRefs(props);
const emits = defineEmits(["funcionEjemplo1", "holamundo2"]);

const consultaCorporativos = (
  Corp_ID,
  Corp_NombreCorto,
) => {
  emits("filtrarCorporativo", Corp_NombreCorto, Corp_ID);
};
watch(Corporativo, (newValue) => {
  emits("funcionEjemplo1", newValue);
});
onMounted(async () => {
  await limpiarStore();
  optionsCorporativo.value = await consultaCorporativo(item2.value);
});
</script>