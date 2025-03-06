<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <form @submit.prevent.stop="onSubmit">
        <q-card-section class="row items-center q-gutter-sm">
          TipoDocumento:{{ TipoDocumento }}
          <q-select
            label="Tipo de Documento"
            v-model="TipoDocumento"
            ref="tipoRef"
            lazy-rules
            :rules="validaSelect"
            :options="filteredOptionsTipoDocumento"
            @filter="filtrarOpciones"
            dense
            outlined
            style="width: 250px"
          ></q-select>
          <!-- @update:model-value="val=>validarControlesActivacion(val)" -->
          <q-file
            :label="
              DatosRegistroDocumento.Docu_Ruta.length > 0
                ? 'Reemplazar ' + DatosRegistroDocumento.Docu_Ruta
                : 'Subir Documentos'
            "
            v-model="file"
            ref="fileRef"
            dense
            outlined
            :accept="ext"
            style="width: 250px"
            :rules="fileRules"
          >
            <template v-slot:append> <q-icon name="attachment" /> </template
          ></q-file>
          <q-input
            v-if="TipoDocumento != null && TipoDocumento.Docu_Vence"
            filled
            dense
            outlined
            v-model="DatosRegistroDocumento.Docu_FechaVencimiento"
            ref="fechavenceRef"
            :rules="validaRules"
            label="Fecha Vencimiento"
            style="width: 250px"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="DatosRegistroDocumento.Docu_FechaVencimiento"
                    mask="DD-MM-YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Ok" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <!-- v-if="vence" -->
          <q-input
            v-if="TipoDocumento != null && TipoDocumento.Docu_Vence"
            filled
            dense
            outlined
            v-model="DatosRegistroDocumento.Docu_Recordatorio"
            ref="anticipadoRef"
            :rules="validaRules"
            label="Fecha de recordatorio"
            style="width: 250px"
            disable
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="DatosRegistroDocumento.Docu_Recordatorio"
                    mask="DD-MM-YYYY"
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Ok" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            label="Contraseña del Documento"
            hint=""
            v-model="DatosRegistroDocumento.Docu_Contraseña"
            dense
            outlined
            style="width: 250px"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="cerrar"
            icon="las la-times-circle"
            color="negative"
            v-close-popup="cancelEnabled"
          />
          <q-btn
            flat
            color="green"
            icon="las la-save"
            label="guardar"
            type="submit"
          />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, toRefs, watch, onMounted } from "vue";
import moment from "moment";
import { useQuasar } from "quasar";
const $q = useQuasar();

import useCargaDocumentos from "../../cargaDocumentos/composables/useCargaDocumentos.js";

const {
  consultaInfoDocumentosPopup,
  consultaRazonSocial,
  consultaTipoDocumento,
  subirArchivos,
  modificaInfoDocumentos,
  insertaInfoDocumentos,
} = useCargaDocumentos();

const props = defineProps({
  Docu_ID: {
    type: Number,
    default: 0,
  },
  SociCata_Id: {
    type: Number,
    default: 0,
  },
  abrirDialogForm: {
    type: Boolean,
    default: false,
  },
  listaDocumentosRegistrados: {
    type: Array,
    default: () => [],
  },
});

const { Docu_ID, SociCata_Id, abrirDialogForm, listaDocumentosRegistrados } =
  toRefs(props);

const emits = defineEmits(["cerrarDialogForm", "actualizaGridCargaDocumentos"]);
const dialog = ref(false);
const optionsTipoDocumento = ref([]);
const filteredOptionsTipoDocumento = ref([]);
const optionsRazonSocial = ref([]);
const itemConsultaTipoDocumento = ref({
  Accion: 3,
});

const file = ref("Documento");
const fileName = ref("");
const tipoRef = ref(null);
const fileRef = ref(null);

const consultaDocumentoInfo = ref({
  Accion: 3,
  SociCata_Id: 0,
  Docu_ID: 0,
});

onMounted(async () => {
  optionsRazonSocial.value = await consultaRazonSocial();
  optionsTipoDocumento.value = await consultaTipoDocumento(
    itemConsultaTipoDocumento.value
  );

  // await consultaInfoDocumentos(listar.value);
  // filteredOptionsTipoDocumento.value.
  filteredOptionsTipoDocumento.value = optionsTipoDocumento.value;
  DatosRegistroDocumento.value.Docu_SociCataSufr_ID = SociCata_Id.value;
});

watch(abrirDialogForm, (newValue) => {
  dialog.value = newValue;
});

watch(dialog, (newValue) => {
  if (!newValue) {
    emits("cerrarDialogForm");
    emits("actualizaGridCargaDocumentos");
  }
});

watch(listaDocumentosRegistrados, (newValue) => {
  Object.keys(newValue).forEach((key) => {
    let indice = filteredOptionsTipoDocumento.value.findIndex(
      (item) => item.label == newValue[key].DocuCata_Tipo
    );
    if (indice >= 0) {
      filteredOptionsTipoDocumento.value[indice].disable = true;
    }
  });
});

const TipoDocumento = ref(null);

watch(TipoDocumento, (newValue) => {
  if (newValue != null) {
    DatosRegistroDocumento.value.Docu_CataDocu_ID = newValue.value;
  } else {
    DatosRegistroDocumento.value.Docu_CataDocu_ID = 0;
  }
});

const DatosRegistroDocumento = ref({
  Docu_ID: Docu_ID.value,
  Docu_SociCataSufr_ID: 0,
  Docu_CataDocu_ID: 0,
  Docu_Ruta: "",
  Docu_Contraseña: "",
  Docu_Vence: false,
  Docu_FechaVencimiento: "",
  Docu_FechaCarga: "",
  Docu_Recordatorio: "",
});

onMounted(() => {
  // debugger;
  consultaDocumentoInfo.value.SociCata_Id = SociCata_Id.value;
});

const fileRules = [
  (val) =>
    TipoDocumento.value != null &&
    TipoDocumento.value.DocuCata_Requerido == true
      ? (val !== null && val !== "") || "No puede ir vacío"
      : "",
];

watch(Docu_ID, async (newValue) => {
  if (newValue > 0) {
    // debugger;

    consultaDocumentoInfo.value.Docu_ID = newValue;
    // await getDocumento(newValue.Docu_ID);
    const response = await consultaInfoDocumentosPopup(
      consultaDocumentoInfo.value
    );
    console.log("response", response);
    DocumentoActual.value = response.Docu_Ruta;
    DatosRegistroDocumento.value.Docu_ID = response.Docu_ID;
    DatosRegistroDocumento.value.Docu_SociCataSufr_ID = SociCata_Id.value;

    DatosRegistroDocumento.value.Docu_CataDocu_ID = response.Docu_CataDocu_ID;
    DatosRegistroDocumento.value.Docu_Ruta = response.Docu_Ruta;
    DatosRegistroDocumento.value.Docu_Contraseña = response.Docu_Contraseña;
    DatosRegistroDocumento.value.Docu_Vence = response.Docu_Vence;
    DatosRegistroDocumento.value.Docu_FechaVencimiento = moment(
      response.Docu_FechaVencimiento
    ).format("YYYY-MM-DD");
    DatosRegistroDocumento.value.Docu_FechaCarga = response.Docu_FechaCarga;
    DatosRegistroDocumento.value.Docu_Recordatorio = response.Docu_Recordatorio;
    TipoDocumento.value = filteredOptionsTipoDocumento.value.filter(
      (item) => item.value == response.DocuCata_ID
    )[0];
    dialog.value = true;
  }
});

const enviarformulario = () => {};

const DocumentoActual = ref([]);

async function onSubmit() {
  // debugger;
  // DatosRegistroDocumento.value.Docu_Ruta =
  //   fileName.value.length == 0 ? DocumentoActual.value : fileName.value;

  DatosRegistroDocumento.value.Docu_FechaCarga = moment().format("YYYY-MM-DD");

  if (Object.entries(file.value).length > 0) {
    const response = await subirArchivos(
      file.value,
      SociCata_Id.value,
      TipoDocumento.value.label
    );
    DatosRegistroDocumento.value.Docu_Ruta = response.data[0].nombre;
  } else {
    DatosRegistroDocumento.value.Docu_Ruta = DocumentoActual.value;
  }

  console.log("DatosRegistroDocumento.value", DatosRegistroDocumento.value);
  // debugger;
  if (parseInt(DatosRegistroDocumento.value.Docu_ID) > 0) {
    const response = await modificaInfoDocumentos(DatosRegistroDocumento.value);
    console.log("respuesta de la api edita", response);
    if (response == true) {
      // emitir funcion para actualizar el grid

      // console.log("editado succes", listar.value.value);
      // await consultaInfoDocumentos(listar.value);
      dialog.value = false; //poner un watcerh pra emitir el cierre del dialog
      $q.notify({
        message: "Registro editado",
        color: "green",
      });
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
  }
  //nuevo
  else {
    // console.log("formulario nuevo", form);
    const response = await insertaInfoDocumentos(DatosRegistroDocumento.value);
    console.log("respuesta de la api inserta", response);
    // response.then((items) => {
    //   console.log("item", items);
    if (response == true) {
      // dialog.value = false;//emitir el cierre del dialog y la consulta del ubnevo gris
      $q.notify({
        message: "Nuevo registro guardado",
        color: "green",
      });
      // await consultaInfoDocumentos(listar.value);
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
    // });
  }
  limpiarForm();
}

const limpiarForm = () => {
  DatosRegistroDocumento.value.Docu_ID = 0;
  // DatosRegistroDocumento.value.Docu_SociCataSufr_ID = 0;
  DatosRegistroDocumento.value.Docu_CataDocu_ID = 0;
  DatosRegistroDocumento.value.Docu_Ruta = "";
  DatosRegistroDocumento.value.Docu_Contraseña = "";
  DatosRegistroDocumento.value.Docu_Vence = false;
  DatosRegistroDocumento.value.Docu_FechaVencimiento = "";
  DatosRegistroDocumento.value.Docu_FechaCarga = "";
  DatosRegistroDocumento.value.Docu_Recordatorio = "";
  dialog.value = false;
  TipoDocumento.value = null;
};
</script>
