<template>
  <div>
    <q-dialog v-model="dialog" backdrop-filter="grayscale(20%)" persistent>
      <q-card style="width: 80vh">
        <q-card-section class="row items-center q-pb-none text-h6">
          Formulario de Categorias
        </q-card-section>

        <q-form>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <!-- <selectRegimenFiscal
                  @recibeIdRegimenFiscal="recibeIdRegimenFiscal"
                  :RegFis_Id="RegFis_Id"
                /> -->
                <q-input
                  filled
                  class="q-pa-sm"
                  label="Clave"
                  lazy-rules
                  dense
                  v-model="RegimenFiscalBE.RegFis_Clave"
                />

                <q-input
                  filled
                  v-model="RegimenFiscalBE.RegFis_Nombre"
                  class="my-input q-pa-sm"
                  label="Nombre"
                >
                </q-input>

                Estatus :
                <q-toggle
                  class="q-pa-sm"
                  :label="`${estatus ? 'ACTIVO' : 'CANCELADO'}`"
                  color="green"
                  v-model="estatus"
                /><br />
              </div>
            </div>
          </q-card-section>
        </q-form>

        <q-card-actions align="right">
          <q-btn
            icon="las la-times"
            outline
            label="Cancelar"
            color="negative"
            v-close-popup
            dense
            @click="cancelarRegistro"
          />
          <q-btn
            icon="las la-save"
            outline
            dense
            label="Guardar"
            color="positive"
            @click="enviarForm()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, toRefs, computed, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import useRegimenFiscal from "../composables/useRegimenFiscal.js";
const { ListarByID, Registrar, Actualizar } = useRegimenFiscal();

import selectRegimenFiscal from "./selectRegimenFiscal.vue";

const dialog = ref(false);
const $q = useQuasar();
const props = defineProps({
  RegFis_Id: {
    default: 0,
    type: Number,
  },
  abrirModal: {
    type: Boolean,
    default: false,
  },
});
const { RegFis_Id, abrirModal } = toRefs(props);

const emits = defineEmits(["cerrarDialog", "operacionExitosa"]);
const RegimenFiscalBE = ref({
  RegFis_Id: 0,
  RegFis_Nombre: "",
  RegFis_Clave: "",
  RegFis_Estatus: true,
  RegFis_SisCUsuario: localStorage.getItem("usuario"),
});

const estatus = ref(true);

onMounted(async () => {
  if (RegFis_Id.value > 0) {
    const response = await ListarByID(RegFis_Id.value);
    RegimenFiscalBE.value.RegFis_Id = RegFis_Id.value;
    RegimenFiscalBE.value.RegFis_Nombre = response.RegFis_Nombre;
    RegimenFiscalBE.value.RegFis_Clave = response.RegFis_Clave;
    RegimenFiscalBE.value.RegFis_Estatus = response.RegFis_Estatus;
    estatus.value = response.Lista[0].RegFis_Estatus;
    if (response.bolRespuesta) {
      dialog.value = abrirModal.value;
    } else {
      emits("cerrarDialog");
    }
  }
});

watch(RegFis_Id, async (newValue) => {
  if (newValue > 0) {
    const response = await ListarByID(newValue);
    RegimenFiscalBE.value.RegFis_Id = newValue;
    RegimenFiscalBE.value.RegFis_Nombre = response.Lista[0].RegFis_Nombre;
    RegimenFiscalBE.value.RegFis_Clave = response.Lista[0].RegFis_Clave;
    estatus.value = response.Lista[0].RegFis_Estatus;
    if (response.bolRespuesta) {
      dialog.value = abrirModal.value;
    } else {
      emits("cerrarDialog");
    }
  } else {
    limpiarForm();
  }
});

watch(estatus, (newValue) => {
  RegimenFiscalBE.value.RegFis_Estatus = newValue;
});

watch(abrirModal, (newValue) => {
  dialog.value = newValue;
});

const enviarForm = async () => {
  RegimenFiscalBE.value.RegFis_SisCUsuario = localStorage.getItem("usuario");
  let exito = false;
  if (RegFis_Id.value > 0) {
    const response = await Actualizar(RegimenFiscalBE.value);
    exito = response.bolRespuesta;
  } else {
    const response = await Registrar(RegimenFiscalBE.value);
    exito = response.bolRespuesta;
  }
  limpiarForm();
  emits("cerrarDialog", exito);
};

const limpiarForm = () => {
  RegimenFiscalBE.value.RegFis_Id = 0;
  RegimenFiscalBE.value.RegFis_Nombre = "";
  RegimenFiscalBE.value.RegFis_Clave = "";
  RegimenFiscalBE.value.RegFis_Estatus = true;
  dialog.value = false;
};

const cancelarRegistro = () => {
  emits("cerrarDialog");
};

const recibeIdRegimenFiscal = (objeto) => {
  console.log("Hola mundo", objeto);
};
</script>
