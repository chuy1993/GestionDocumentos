<template>
  <q-grid
    :data="listaSociosTipo"
    :columns="columnasSociosTipo"
    :columns_filter="true"
    :pagination="pagination"
  >
    <template v-slot:body="props">
      <q-tr props:props>
        <!-- <q-td key="SociTipo_ID"> {{ props.row["SociTipo_ID"] }}</q-td> -->
        <q-td key="SociTipo_Tipo"> {{ props.row["SociTipo_Tipo"] }}</q-td>
        <q-td key="SociTipo_Subsecuente">
          <span v-if="props.row['SociTipo_Subsecuente']">Si</span>
          <span v-else>No</span>
        </q-td>
        <q-td key="SociTipo_Status">
          <span v-if="props.row['SociTipo_Status']">Activo</span>
          <span v-else>Inactivo</span>
        </q-td>
        <q-td class="q-gutter-sm">
          <q-btn
            class="q-ma-xs float-left"
            round
            size="10px"
            icon="las la-edit"
            color="green"
            @click="editarRegistro(props.row.SociTipo_ID)"
            :disable="
              accionesModulo.Actualizar == 0 || props.row.SociTipo_ID <= 2
                ? true
                : false
            "
          >
            <q-tooltip>
              <span v-if="accionesModulo.Actualizar == 0">
                No tienes permiso de ejecutar esta acción
              </span>
              <span v-else>Actualizar</span>
            </q-tooltip>
          </q-btn>
          <q-btn
            class="q-ma-xs float-left"
            round
            size="10px"
            icon="las la-trash"
            color="negative"
            @click="eliminar(props.row)"
            :disable="
              accionesModulo.Eliminar == 0 || props.row.SociTipo_ID <= 2
                ? true
                : false
            "
            v-if="props.row.SociTipo_Status"
          >
            <q-tooltip>
              <span v-if="accionesModulo.Eliminar == 0">
                No tienes permiso de ejecutar esta acción
              </span>
              <span v-else>Eliminar</span>
            </q-tooltip>
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-grid>
</template>
<script setup>
import { onMounted, watch, ref, toRefs } from "vue";
import { useQuasar } from "quasar";
import useSociosTipo from "../composables/useSociosTipo.js";
const {
  ModificarSociosTipo,
  columnasSociosTipo,
  listaSociosTipo,
  listarSociosTipo,
} = useSociosTipo();

const $q = useQuasar();
const pagination = ref({
  rowsPerPage: 15,
});

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});

const consultaListaGeneral = ref({
  Accion: 1,
});
const props = defineProps({
  recargarGrid: {
    type: Boolean,
    default: false,
  },
});

const { recargarGrid } = toRefs(props);

const emits = defineEmits(["recibeSociTipo_ID", "abreModal"]);

onMounted(async () => {
  await listarSociosTipo(consultaListaGeneral.value);
});

watch(recargarGrid, async (newValue) => {
  await listarSociosTipo(consultaListaGeneral.value);
});

const editarRegistro = (id) => {
  emits("recibeSociTipo_ID", id);
  emits("abreModal");
};

const eliminar = (row) => {
  $q.dialog({
    title: "Eliminar registro",
    message: "Realmetne deseas eliminar el regiatro seleccionado?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    let registroAEliminar = {
      Accion: 2,
      SociTipo_ID: row.SociTipo_ID,
      SociTipo_Tipo: row.SociTipo_Tipo,
      SociTipo_Subsecuente: row.SociTipo_Subsecuente,
      SociTipo_Status: false,
    };
    // debugger;
    const response = await ModificarSociosTipo(registroAEliminar);
    $q.notify({
      color: !response.data.bolRespuesta ? "negative" : "positive",
      message: response.data.bolRespuesta
        ? "Operacion realizada correctamente"
        : "Error al ejecutar la operacion solicitada",
    });
    if (response.data.bolRespuesta) {
      await listarSociosTipo(consultaListaGeneral);
    }
  });
};
</script>
