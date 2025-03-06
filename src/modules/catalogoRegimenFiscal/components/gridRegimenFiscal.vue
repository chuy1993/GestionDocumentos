<template>
  <div class="q-mt-md">
    <!-- getColumnasRegimenFiscal:{{
      getColumnasRegimenFiscal
    }}
    getListaRegimenFiscal:{{ getListaRegimenFiscal }} -->
    <q-grid
      :columns="getColumnasRegimenFiscal"
      :data="getListaRegimenFiscal"
      :global_search="true"
      :columns_filter="true"
      :fullscreen="true"
      :loading="loading"
      :pagination="pagination"
      :csv_download="true"
      style="width: 100%"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="RegFis_Clave">
            {{ props.row.RegFis_Clave }}
          </q-td>
          <q-td key="RegFis_Nombre">
            {{ props.row.RegFis_Nombre }}
          </q-td>

          <q-td key="RegFis_Id">
            <q-btn
              icon="las la-edit"
              color="primary"
              size="sm"
              dense
              @click="editaRegistro(props.row.RegFis_Id)"
            >
              <q-tooltip>Editar</q-tooltip>
            </q-btn>

            <q-btn
              class="q-ml-sm"
              v-if="props.row.RegFis_Estatus"
              icon="las la-trash"
              color="negative"
              size="sm"
              dense
              @click="eliminaRegistro(props.row)"
            >
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-grid>
  </div>
</template>
<script setup>
import { ref, toRefs, computed, onMounted, watch } from "vue";
import useRegimenFiscal from "../composables/useRegimenFiscal.js";
import { useQuasar } from "quasar";
const $q = useQuasar();
const emits = defineEmits("recibeRegFis_Id");
const { getListaRegimenFiscal, getColumnasRegimenFiscal, Listar, Actualizar } =
  useRegimenFiscal();

const props = defineProps({
  operacionExitosa: {
    default: false,
    type: Boolean,
  },
});

const { operacionExitosa } = toRefs(props);
onMounted(async () => {
  await Listar();
});

watch(operacionExitosa, async (newValue) => {
  if (newValue) {
    await Listar();
  }
});

const editaRegistro = (id) => {
  emits("recibeRegFis_Id", id);
};

const eliminaRegistro = async (row) => {
  $q.dialog({
    title: "Eliminar registro",
    message: "El registro se eliminara, estas de acuerdo?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    row.RegFis_SisCUsuario = localStorage.getItem("usuario");
    row.RegFis_Estatus = false;
    const response = await Actualizar(row);
    // debugger;
    if (response.bolRespuesta) {
      await Listar();
    }
  });
};
</script>
