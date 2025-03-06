<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Carga de Documentos</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      label="crear nuevo"
      @click="nuevoRegistro"
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso de ejecutar esta acción
        </span>
        <span v-else> Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <q-select
            label="Razón Social"
            v-model="RazonSocial"
            :options="optionsRazonSocial"
            dense
            outlined
            style="width: 250px"
          ></q-select>
          <q-select
            label="Tipo de Documento"
            v-model="TipoDocumento"
            :options="optionsTipoDocumento"
            dense
            outlined
            style="width: 250px"
          ></q-select>
          <q-file
            label="Selecciona Documento"
            v-model="file"
            dense
            outlined
            style="width: 250px"
          ></q-file>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="negative"
            v-close-popup="cancelEnabled"
          />
          <q-btn
            flat
            color="green"
            v-close-popup
            icon="las la-save"
            @click="enviarForm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <q-grid
        class="q-ma-sm"
        bordered
        :data="listaDocumentos"
        :columns="columnasDocumentos"
        :columns_filter="false"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr props:props v-if="Object.entries(props.row).length > 0">
            <q-td key="ID">{{ props.row["ID"] }}</q-td>
            <q-td key="RazonSocial">{{ props.row["RazonSocial"] }}</q-td>
            <q-td key="TipoDocumento">{{ props.row["TipoDocumento"] }}</q-td>
            <q-td key="Ruta">{{ props.row["Ruta"] }}</q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-edit"
                color="green"
                @click="llenaEditar(props.row)"
                :disable="accionesModulo.Actualizar == 0 ? true : false"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Actualizar == 0">
                    No tienes permiso de ejecutar esta acción
                  </span>
                  <span v-else> Actualizar</span>
                </q-tooltip>
              </q-btn>
              <q-btn
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
              >
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import useDocumentos from "../composables/useCargaDocumentos.js";

const file = ref("Documento");
const pagination = ref(null);
const dialog = ref(false);
const $q = useQuasar();
const RazonSocial = ref([]);
const TipoDocumento = ref([]);
const optionsRazonSocial = ref([]);
const optionsTipoDocumento = ref([]);
const {
  columnasDocumentos,
  listaDocumentos,
  consultaRazonSocial,
  consultaTipoDocumento,
} = useDocumentos();

const accionesModulo = ref({
  Eliminar: 0,
  Ingresar: 0,
  Actualizar: 0,
  Registrar: 1,
});
pagination.value = {
  rowsPerPage: 15,
};
const nuevoRegistro = () => {
  dialog.value = true;
};
const item = ref({
  Accion: 3,
});
onMounted(async () => {
  optionsRazonSocial.value = await consultaRazonSocial();
  optionsTipoDocumento.value = await consultaTipoDocumento(item.value);
});
</script>
