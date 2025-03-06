<template>
  <div class="q-pa-md">
    <div class="text-h5">Regimen Fiscal</div>
    <q-separator />
    <q-btn
      color="positive"
      label="Nuevo registro"
      icon="las la-save"
      dense
      @click="nuevoRegistro()"
      class="q-mt-md q-mb-md"
    />
    <gridRegimenFiscal
      @recibeRegFis_Id="recibeRegFis_Id"
      @cerrarDialog="cerrarDialog"
      :operacionExitosa="operacionExitosa"
    />
    <formRegimenFiscal
      :RegFis_Id="RegFis_Id"
      :abrirModal="abrirModal"
      @cerrarDialog="cerrarDialog"
    />
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, watch } from "vue";
import gridRegimenFiscal from "../components/gridRegimenFiscal.vue";
import formRegimenFiscal from "../components/formRegimenFiscal.vue";

const RegFis_Id = ref(0);
const abrirModal = ref(false);
const operacionExitosa = ref(false);

const recibeRegFis_Id = (id) => {
  console.log("Recibe desde la page");
  RegFis_Id.value = id;
  abrirModal.value = true;
};

watch(RegFis_Id, (newValue) => {
  abrirModal.value = true;
});

const nuevoRegistro = () => {
  RegFis_Id.value = 0;
  abrirModal.value = true;
};

const cerrarDialog = (operExito) => {
  abrirModal.value = false;
  if (operExito) {
    operacionExitosa.value = true;
  }
};
</script>
