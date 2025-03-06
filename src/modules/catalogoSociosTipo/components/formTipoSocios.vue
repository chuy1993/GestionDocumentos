<template>
  <q-dialog v-model="dialogFormSocioTipo" persistent>
    <q-card>
      <q-card-section class="row items-center q-gutter-sm">
        <q-input
          label="Tipo"
          v-model="sociosTipoBE.SociTipo_Tipo"
          dense
          outlined
          clearable
          style="width: 250px"
        ></q-input>

        <q-toggle
          checked-icon="check"
          unchecked-icon="clear"
          label="Subsecuente"
          v-model="sociosTipoBE.SociTipo_Subsecuente"
        />
        <q-checkbox
          label="Estatus"
          v-model="sociosTipoBE.SociTipo_Status"
          v-if="!nuevo"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          icon="las la-times-circle"
          color="negative"
          v-close-popup="cancelEnabled"
        />
        <q-btn
          flat
          color="green"
          v-close-popup
          icon="las la-save"
          label="guardar"
          @click="enviarForm()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { onMounted, watch, ref, toRefs } from "vue";
import { useQuasar } from "quasar";
import useSociosTipo from "../composables/useSociosTipo.js";
const { InsertarSociosTipo, ModificarSociosTipo, ListarById } = useSociosTipo();
const dialogFormSocioTipo = ref(false);
const $q = useQuasar();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});

const sociosTipoBE = ref({
  SociTipo_ID: 0,
  SociTipo_Tipo: "",
  SociTipo_Subsecuente: true,
  SociTipo_Status: true,
  Accion: 0,
  mensaje1: "",
});

const props = defineProps({
  abrirModal: {
    type: Boolean,
    default: false,
  },
  SociTipo_ID: {
    type: Number,
    default: 0,
  },
});
const { abrirModal, SociTipo_ID } = toRefs(props);
const emits = defineEmits(["cerrarModal", "actualizaRecargarGrid"]);

watch(SociTipo_ID, async (newValue) => {
  if (newValue > 0) {
    // debugger;
    //consutlar informacion de la BD
    const response = await ListarById(newValue);
    console.log(response);
    if (response.bolRespuesta) {
      // debugger;
      sociosTipoBE.value.SociTipo_ID = response.Lista[0].SociTipo_ID;
      sociosTipoBE.value.SociTipo_Tipo = response.Lista[0].SociTipo_Tipo;
      sociosTipoBE.value.SociTipo_Subsecuente =
        response.Lista[0].SociTipo_Subsecuente;
      sociosTipoBE.value.SociTipo_Status = response.Lista[0].SociTipo_Status;
    }
  } else {
    limpiarForm();
  }
});

watch(dialogFormSocioTipo, (newValue) => {
  if (!newValue) {
    // debugger;
    emits("cerrarModal");
  }
});

watch(abrirModal, (newValue) => {
  dialogFormSocioTipo.value = newValue;
});

const enviarForm = async () => {
  let response = [];
  if (sociosTipoBE.value.SociTipo_ID > 0) {
    sociosTipoBE.value.Accion = 1;
    response = await ModificarSociosTipo(sociosTipoBE.value);
  } else {
    response = await InsertarSociosTipo(sociosTipoBE.value);
  }
  emits("actualizaRecargarGrid", response.data.bolRespuesta);
  emits("cerrarModal");
  $q.notify({
    message: response.data.bolRespuesta
      ? "Operación realizada correctamente"
      : response.data.strError,
    color: response.data.bolRespuesta ? "positive" : "negative",
  });
};

const limpiarForm = () => {
  sociosTipoBE.value.SociTipo_ID = 0;
  sociosTipoBE.value.SociTipo_Tipo = "";
  sociosTipoBE.value.SociTipo_Subsecuente = true;
  sociosTipoBE.value.SociTipo_Status = true;
  sociosTipoBE.value.Accion = 0;
  sociosTipoBE.value.mensaje1 = "";
};
</script>
