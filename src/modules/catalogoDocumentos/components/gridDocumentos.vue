<template>
  <div class="q-mt-md">
    <q-grid
      bordered
      :global_search="true"
      :data="listaDocumentos"
      :columns="columnasDocumentos"
      :columns_filter="true"
      :loading="loading"
    >
      <template v-slot:body="props">
        <q-tr props:props>
          <!-- <q-td key="DocuCata_ID"> {{ props.row["DocuCata_ID"] }} </q-td> -->
          <q-td key="SociTipo_Tipo">
            {{ props.row["SociTipo_Tipo"] }}
          </q-td>
          <q-td key="DocuCata_Tipo"> {{ props.row.DocuCata_Tipo }} </q-td>
          <q-td key="DocuCata_Extension">
            {{ props.row["DocuCata_Extension"] }}
          </q-td>
          <q-td key="DocuCata_Requerido">
            <span v-if="props.row['DocuCata_Requerido']">Si</span>
            <span v-else>No</span>
          </q-td>
          <q-td key="DocuCata_Vence">
            <span v-if="props.row['DocuCata_Vence']">Si</span>
            <span v-else>No</span>
          </q-td>
          <q-td key="DocuCata_Status">
            <span v-if="props.row['DocuCata_Status']">Activo</span>
            <span v-else>Inactivo</span>
          </q-td>
          <q-td class="q-gutter-sm">
            <q-btn
              class="q-ma-xs float-left"
              round
              size="10px"
              icon="las la-edit"
              color="green"
              @click="editarRegistro(props.row)"
            >
              <!-- @click="llenaEditar(props.row)"
                :disable="accionesModulo.Actualizar == 0 ? true : false" -->
              <q-tooltip>
                <span v-if="accionesModulo.Actualizar == 0">
                  No tienes permiso de ejecutar esta acción
                </span>
                <span v-else>Actualizar</span>
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="props.row['DocuCata_Status']"
              class="q-ma-xs float-left"
              round
              size="10px"
              icon="las la-trash"
              color="negative"
              @click="eliminar(props.row.DocuCata_ID)"
              :disable="accionesModulo.Eliminar == 0 ? true : false"
            >
              <q-tooltip>
                <span v-if="accionesModulo.Eliminar == 0">
                  No tienes permiso de ejecutar esta acción
                </span>
                <span v-else>Eliminar</span>
              </q-tooltip></q-btn
            >
          </q-td>
        </q-tr>
      </template>
    </q-grid>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useDocumentos from "../composables/useDocumentos.js";
const {
  columnasDocumentos,
  listaDocumentos,
  listarDocumentos,
  EliminaCatalogo,
} = useDocumentos();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});

const props = defineProps({
  actualizarGrid: {
    type: Boolean,
    default: false,
  },
});

const { actualizarGrid } = toRefs(props);

const $q = useQuasar();
const loading = ref(false);
const consultaGeneralTipoDocumentos = ref({
  Accion: 1,
});

const emits = defineEmits(["recuperaIdDocumento", "recargaGrid"]);

onMounted(async () => {
  loading.value = true;
  await listarDocumentos(consultaGeneralTipoDocumentos.value);
  emits("recargaGrid", false);
  loading.value = false;
});

const eliminar = (id) => {
  $q.dialog({
    title: "Eliminar registro",
    message: "Estas seguro de que deseas eliminar el registro seleccionado?",
    cancel: {
      color: "negative",
      label: "Cancelar",
    },
    ok: {
      color: "positive",
      label: "Ok",
    },
    persistent: true,
  })
    .onOk(async () => {
      //// debugger;
      const response = await EliminaCatalogo(id);
      if (response.data.bolRespuesta) {
        await listarDocumentos(consultaGeneralTipoDocumentos.value);
        emits("recargaGrid", false);
      }
      $q.notify({
        message: response.data.bolRespuesta
          ? "Movimiento realizado correctamente"
          : response.data.strError,
        color: response.data.bolRespuesta ? "positive" : "negative",
      });
    })
    .onCancel(() => {});
};

watch(actualizarGrid, async (newValue) => {
  if (newValue) {
    await listarDocumentos(consultaGeneralTipoDocumentos.value);
    emits("recargaGrid", false);
  }
});

const editarRegistro = (row) => {
  emits("recuperaIdDocumento", row.DocuCata_ID);
};
</script>
