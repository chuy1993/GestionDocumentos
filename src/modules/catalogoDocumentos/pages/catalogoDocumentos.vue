<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Tipo de Documentos</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      @click="nuevoRegistro"
      :disable="accionesModulo.Registrar == 0 ? true : false"
      label="crear nuevo"
      dense
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso para ejecutar esta acción
        </span>
        <span v-else> Crear nuevo registro </span>
      </q-tooltip>
    </q-btn>
    <formDocumentos
      :DocuCata_ID="DocuCata_ID"
      :abrirDialog="abrirDialog"
      @cerrarFormDialog="cerrarFormDialog"
      @recargaGrid="recargaGrid"
    />
    <gridDocumentos
      @recuperaIdDocumento="recuperaIdDocumento"
      :actualizarGrid="actualizarGrid"
      @recargaGrid="recargaGrid"
    />
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useDocumentos from "../composables/useDocumentos.js";
import extensionesList from "../JSON/extensiones.js";
import gridDocumentos from "../components/gridDocumentos.vue";
import formDocumentos from "../components/formDocumentos.vue";

const DocuCata_ID = ref(0);
const abrirDialog = ref(false);

const pagination = ref({});

const dialog = ref(false);

const $q = useQuasar();
const actualizarGrid = ref(false);

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});

pagination.value = {
  rowsPerPage: 15,
};

const eliminar = async (tableRow) => {
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
    message: "Se cambairá el estatus a inactivo",
    cancel: {
      color: "negative",
      label: "Cancelar",
    },
    persistent: true,
    ok: {
      color: "green",
      label: "Aceptar",
    },
  }).onOk(async () => {
    const fila = {
      DocuCata_ID: tableRow.DocuCata_ID,
    };
    const response = await EliminaCatalogo(fila);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "registro dado de baja",
        color: "green",
      });
      await listarDocumentos(item.value);
    } else {
      $q.notify({
        message: "error al guardar registro",
        color: "negative",
      });
    }
  });
};

const recuperaIdDocumento = (id) => {
  DocuCata_ID.value = id;
  abrirDialog.value = true;
};

const cerrarFormDialog = () => {
  abrirDialog.value = false;
};

const recargaGrid = (recargarGrid) => {
  actualizarGrid.value = recargarGrid;
};

const nuevoRegistro = () => {
  // debugger;
  DocuCata_ID.value = 0;
  abrirDialog.value = true;
};
</script>
