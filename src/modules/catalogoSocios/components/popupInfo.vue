<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Carga de Documentos</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      @click="nuevoRegistro"
      label="crear nuevo"
    >
      <!-- :disable="accionesModulo.Registrar == 0 ? true : false" -->
      <q-tooltip>
        <!-- v-if="accionesModulo.Registrar == 0" -->
        <span> No tienes permiso de ejecutar esta acción </span>
        <!-- <span v-else> Crear nuevo registro</span> -->
      </q-tooltip>
    </q-btn>
  </div>

  <formCargaDocumento
    :SociCata_Id="SociCata_Id"
    :Docu_ID="Docu_ID"
    :abrirDialogForm="abrirDialogForm"
    :listaDocumentosRegistrados="listaDocumentosRegistrados"
    @actualizaGridCargaDocumentos="actualizaGridCargaDocumentos"
    @cerrarDialogForm="cerrarDialogForm"
  />
  <gridListaDocumentos
    @EnviaIdDocumentoGrid="EnviaIdDocumentoGrid"
    @cerrarActualizarGrid="cerrarActualizarGrid"
    @enviarListaDocumentosRegistrados="enviarListaDocumentosRegistrados"
    :actualizarGrid="actualizarGrid"
    :SociCata_Id="SociCata_Id"
    :actualizaGridCargaDocumentos="actualizaGridCargaDocumentos"
  />
</template>

<script setup>
import { ref, toRefs, onMounted, watch } from "vue";
import gridListaDocumentos from "./gridListaDocumentos.vue";
import formCargaDocumento from "./formCargaDocumento.vue";
import useCargaDocumentos from "../../cargaDocumentos/composables/useCargaDocumentos.js";
const { listaDocumentos } = useCargaDocumentos();
const Docu_ID = ref(0);
const actualizarGrid = ref(false);
const abrirDialogForm = ref(false);

// const actualizaGridCargaDocumentos = ref(false);
const listaDocumentosRegistrados = ref([]);
const props = defineProps({
  SociCata_Id: {
    type: Number,
    default: 0,
  },
  // Docu_ID: {
  //   type: Number,
  //   default: 0,
  // },
});

const { SociCata_Id } = toRefs(props);

const EnviaIdDocumentoGrid = (id) => {
  Docu_ID.value = id;
  abrirDialogForm.value = true;
};
const actualizaGridCargaDocumentos = () => {
  actualizarGrid.value = true;
};

const cerrarDialogForm = () => {
  abrirDialogForm.value = false;
};

const cerrarActualizarGrid = () => {
  actualizarGrid.value = false;
};

const enviarListaDocumentosRegistrados = (listado) => {
  listaDocumentosRegistrados.value = listado;
};

const nuevoRegistro = () => {
  listaDocumentosRegistrados.value = listaDocumentos.value.filter(
    (item) => item.Docu_ID > 0
  );
  Docu_ID.value = 0;
  abrirDialogForm.value = true;
};
</script>
