<template>
  <q-select
    class="q-pa-sm col-lg-12 col-md-12 col-sm-12"
    label="Regimen Fiscal"
    dense
    :options="listaRegimenFiscal"
    v-model="regimenFiscalv"
    @update:model-value="(val) => enviarIdRegimenfiscal(val)"
  />
</template>
<script setup>
import { ref, toRefs, computed, onMounted, watch } from "vue";
import useRegimenFiscal from "../composables/useRegimenFiscal.js";
const { getSelectRegimenFiscal, Listar } = useRegimenFiscal();
const regimenFiscalv = ref(null);
const listaRegimenFiscal = ref([]);
const props = defineProps({
  RegFis_Id: {
    default: 0,
    type: Number,
  },
  regimenFiscal: {
    default: "",
    type: String,
  },
});

const { RegFis_Id, regimenFiscal } = toRefs(props);

const emits = defineEmits([
  "recibeIdRegimenFiscal",
  "recibeRegimenFiscalNombre",
]);

watch(regimenFiscal, (newValue) => {
  regimenFiscalv.value = listaRegimenFiscal.value.filter((item) =>
    item.label.includes(newValue)
  )[0];
});

onMounted(async () => {
  await Listar();
  // debugger;
  Object.keys(getSelectRegimenFiscal.value).forEach((key) => {
    listaRegimenFiscal.value.push({
      label: getSelectRegimenFiscal.value[key].label,
      value: getSelectRegimenFiscal.value[key].value,
      disable:
        getSelectRegimenFiscal.value[key].value == RegFis_Id.value
          ? true
          : false,
    });
  });
  regimenFiscalv.value = listaRegimenFiscal.value.filter((item) =>
    item.label.includes(regimenFiscal.value)
  )[0];
});

const enviarIdRegimenfiscal = (value) => {
  emits("recibeIdRegimenFiscal", value);
  emits("recibeRegimenFiscalNombre", value);
};
</script>
