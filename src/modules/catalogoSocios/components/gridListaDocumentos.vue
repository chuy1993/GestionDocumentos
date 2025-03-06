<template>
  <div class="row q-pa-md">
    <div class="col-lg-12">
      <div class="text-bold text-h5">
        Las filas marcadas en rojo son los documentos obligatorios que no has
        cargado
      </div>
    </div>
    <!-- </q-card-section>
      <q-card-section> -->
    <div class="col-lg-12">
      <!-- listaDocumentos:{{ listaDocumentos }}<br />
      columnasDocumentos:{{ columnasDocumentos }} -->
      <!-- listaDocumentos:{{ listaDocumentos }} -->

      <q-grid
        class="q-ma-sm"
        bordered
        :data="listaDocumentos"
        :columns="columnasDocumentos"
        :columns_filter="false"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr
            props:props
            :class="props.row.Docu_ID == 0 ? 'bg-red-3 text-dark' : ''"
          >
            <q-td class="q-gutter-sm">
              <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-eye"
                color="secondary"
                @click="verPdf(props.row.Docu_Ruta)"
                :disable="props.row.Docu_ID == 0 ? true : false"
              >
                <!-- :disable="accionesModulo.Actualizar == 0 ? true : false" -->
                <q-tooltip>
                  <span v-if="accionesModulo.Actualizar == 0">
                    No tienes permiso de ejecutar esta acción
                  </span>
                  <span v-else>visualizar</span>
                </q-tooltip>
              </q-btn>
            </q-td>
            <!-- ocultar -->
            <q-td key="DocuCata_ID" v-if="ocultar">{{
              props.row["DocuCata_ID"]
            }}</q-td>
            <q-td key="DocuCata_Tipo">{{ props.row["DocuCata_Tipo"] }}</q-td>
            <q-td key="Docu_Ruta" v-if="ocultar">{{
              props.row["Docu_Ruta"]
            }}</q-td>
            <q-td key="Docu_FechaVencimiento">{{
              props.row["Docu_FechaVencimiento"]
            }}</q-td>
            <q-td key="Docu_Recordatorio">{{
              props.row["Docu_Recordatorio"]
            }}</q-td>
            <q-td key="Docu_Contraseña">{{
              props.row["Docu_Contraseña"]
            }}</q-td>
            <q-td key="DocuCata_Extension">{{
              props.row["DocuCata_Extension"]
            }}</q-td>
            <q-td key="Docu_FechaCarga">{{
              props.row["Docu_FechaCarga"]
            }}</q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-edit"
                color="green"
                :disable="accionesModulo.Actualizar == 0 ? true : false"
                @click="editarRegistro(props.row)"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Actualizar == 0">
                    No tienes permiso de ejecutar esta acción
                  </span>
                  <span v-else> Actualizar</span>
                </q-tooltip>
              </q-btn>
              <!-- <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-trash"
                color="primary"
                @click="eliminar(props.row)"
                :disable="accionesModulo.Eliminar == 0 ? true : false"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Eliminar == 0">
                    No tienes permiso de ejecutar esta acción
                  </span>
                  <span v-else> Eliminar</span>
                </q-tooltip></q-btn
              > -->
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </div>
  </div>
  <visualizadorArchivos
    :abrirVisualizador="abrirVisualizador"
    @cerrarVisualizador="cerrarVisualizador"
    :rutaArchivo="rutaArchivo"
  />
</template>
<script setup>
import { ref, toRefs, onMounted, watch } from "vue";

import visualizadorArchivos from "./visualizadorArchivos.vue";

import useCargaDocumentos from "../../cargaDocumentos/composables/useCargaDocumentos.js";
const { columnasDocumentos, listaDocumentos, consultaInfoDocumentos } =
  useCargaDocumentos();

const props = defineProps({
  SociCata_Id: {
    type: Number,
    default: 0,
  },
  actualizarGrid: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  "EnviaIdDocumentoGrid",
  "cerrarActualizarGrid",
  "enviarListaDocumentosRegistrados",
]);

const { SociCata_Id, actualizarGrid } = toRefs(props);

const abrirVisualizador = ref(false);

const ocultar = ref(false);

const rutaArchivo = ref("");

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});

const pagination = ref({
  rowsPerPage: 15,
});

const listar = ref({
  Accion: 2,
  Docu_SociCataSufr_ID: SociCata_Id.value,
});

const documentosRegistrados = ref([]);

onMounted(async () => {
  // debugger;
  const response = await consultaInfoDocumentos(listar.value);
  documentosRegistrados.value = listaDocumentos.value.filter(
    (item) => item.Docu_ID > 0
  );
});

watch(actualizarGrid, async (newValue) => {
  if (newValue) {
    const response = await consultaInfoDocumentos(listar.value);
    emits("cerrarActualizarGrid");
  }
});

const cerrarVisualizador = (estatus) => {
  abrirVisualizador.value = estatus;
};

const verPdf = (Docu_Ruta) => {
  abrirVisualizador.value = true;
  rutaArchivo.value = Docu_Ruta;
};

const editarRegistro = (row) => {
  // debugger;
  // console.log("row", row);
  emits("EnviaIdDocumentoGrid", row.Docu_ID);
  emits("enviarListaDocumentosRegistrados", documentosRegistrados.value);
};
</script>
