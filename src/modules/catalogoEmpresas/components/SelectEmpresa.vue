<template>
  <q-select
    label="Empresa CT"
    use-input
    v-model="Empresa"
    :options="optionsEmpresa"
    dense
    outlined
    clearable
    style="width: 200px"
  ></q-select>
</template>

<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useEmpresasID from "../composables/useEmpresasID.js";

const valor = ref([]);
const { consultaEmpresas, limpiarStore } = useEmpresasID();
const Empresa = ref(null);
const optionsEmpresa = ref(null);
const item2 = ref({
  Accion: 1,
});

const props = defineProps({
  itemsDesactivar: {
    type: Array,
    default: null,
  },
});

const { itemsDesactivar } = toRefs(props);

const emits = defineEmits("enviaIdEmpresa");

const consultaEmpresa = (Empr_ID, Empr_NombreCorto) => {
  emits("filtrarEmpresa", Empr_NombreCorto, Empr_ID);
};
watch(Empresa, (newValue) => {
  emits("enviaIdEmpresa", newValue);
});

onMounted(async () => {
  await limpiarStore();
  optionsEmpresa.value = await consultaEmpresas(item2.value);
  desactivarOpciones(itemsDesactivar.value);
});

watch(itemsDesactivar, (newValue) => {
  desactivarOpciones(newValue);
});

const desactivarOpciones = (items) => {
  Empresa.value = null;
  if (items != null && items.length > 0 && optionsEmpresa.value != null) {
    Object.keys(optionsEmpresa.value).forEach((key) => {
      optionsEmpresa.value[key].disable = false;
    });
    Object.keys(items).forEach((key) => {
      console.log("lakey", key);
      console.log("optionsEmpresa", optionsEmpresa.value);
      let indice = optionsEmpresa.value.findIndex(
        (item) => item.label == items[key].Empr_NombreCorto
      );
      if (indice >= 0) {
        optionsEmpresa.value[indice].disable = true;
      }
      console.log("El indice", indice);
    });
  }
  if (items == null || (items.length == 0 && optionsEmpresa.value != null)) {
    Object.keys(optionsEmpresa.value).forEach((key) => {
      optionsEmpresa.value[key].disable = false;
    });
  }
};
</script>
