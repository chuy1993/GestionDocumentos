<template>
  <q-select
    label="Empresa"
    use-input
    v-model="Empresa"
    :options="optionsEmpresa"
    dense
    outlined
    clearable
    style="width: 250px"
  ></q-select>
</template>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useEmpresas from "../composables/useEmpresas.js";

const { consultaEmpresas, limpiarStore } = useEmpresas();
const Empresa = ref(null);
const optionsEmpresa = ref(null);
const item2 = ref({
  Accion: 1,
});

const props = toRefs({
  prop1: {
    type: String,
    default: "",
  },
});

const { prop1 } = toRefs(props);

const emits = defineEmits("funcionEjemplo");


const consultaEmpresa = (
  SociCata_ID,
  SociCata_RazonSocial,
) => {
  emits("filtrarEmpresa", SociCata_RazonSocial, SociCata_ID);
};
watch(Empresa, (newValue) => {
  console.log("EMP",Empresa);
  emits("funcionEjemplo", newValue);
});

onMounted(async () => {
  await limpiarStore();
  optionsEmpresa.value = await consultaEmpresas(item2.value);
});
</script>
