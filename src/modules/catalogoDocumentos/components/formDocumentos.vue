<template>
  <q-dialog v-model="dialogFormTipoDocumento" persistent>
    <q-card style="width: 300px">
      <q-card-section class="row items-center q-gutter-sm">
        <q-input
          label="Tipo de documento"
          v-model="DocumentosBE.DocuCata_Tipo"
          dense
          outlined
          clearable
          style="width: 250px"
        ></q-input>
        <q-select
          label="Tipo de Socio"
          use-input
          v-model="socioTipo"
          :options="optionsSocio"
          dense
          outlined
          clearable
          style="width: 250px"
        ></q-select>
        <q-select
          filled
          label="Extension del documento"
          multiple
          v-model="extension"
          :options="optionsExt"
          use-chips
          stack-label
          style="width: 250px"
          dense
        />
        <q-toggle
          label="Requerido"
          v-model="DocumentosBE.DocuCata_Requerido"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        />
        <q-toggle
          label="Vence"
          v-model="DocumentosBE.DocuCata_Vence"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
        />
        <q-checkbox label="Estatus" v-model="DocumentosBE.DocuCata_Status" />
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
          :disable="
            DocumentosBE.SociTipo_ID == 0 ||
            DocumentosBE.DocuCata_Tipo == 0 ||
            DocumentosBE.DocuCata_Extension.length == 0
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import extensionesList from "../JSON/extensiones.js";
import { useQuasar } from "quasar";
const $q = useQuasar();
import { ref, toRefs, onMounted, watch } from "vue";
import useDocumentos from "../composables/useDocumentos.js";
const { InsertaDocumentos, ModificaCatalogo, listarById, consultaSocioTipo } =
  useDocumentos();
const props = defineProps({
  DocuCata_ID: {
    type: Number,
    default: 0,
  },
  abrirDialog: {
    type: Boolean,
    default: false,
  },
});

const socioTipo = ref(null);
const DocumentosBE = ref({
  DocuCata_ID: 0,
  DocuCata_SociosTipo_ID: 0,
  DocuCata_Tipo: "",
  DocuCata_Status: true,
  DocuCata_Extension: "",
  DocuCata_Requerido: false,
  DocuCata_Vence: false,
  Accion: 0,
  SociTipo_Tipo: "",
});
const optionsExt = ref(null);
const optionsSocio = ref([]);
const extension = ref([]);
const objConsultaSocioTipo = ref({
  Accion: 1,
});
onMounted(async () => {
  optionsSocio.value = await consultaSocioTipo(objConsultaSocioTipo.value);
  optionsExt.value = extensionesList;
});

const dialogFormTipoDocumento = ref(false);

const emits = defineEmits(["cerrarFormDialog", "recargaGrid"]);

const { DocuCata_ID, abrirDialog } = toRefs(props);

const documentos = ref({});

watch(abrirDialog, (newValue) => {
  dialogFormTipoDocumento.value = newValue;
});

watch(DocuCata_ID, async (newValue) => {
  if (newValue > 0) {
    const response = await listarById(newValue);
    console.log("El objeto de onsulta de BD", response.Lista[0]);
    DocumentosBE.value.DocuCata_ID = response.Lista[0].DocuCata_ID;
    DocumentosBE.value.DocuCata_SociosTipo_ID =
      response.Lista[0].DocuCata_SociosTipo_ID;
    DocumentosBE.value.DocuCata_Tipo = response.Lista[0].DocuCata_Tipo;
    DocumentosBE.value.DocuCata_Status = response.Lista[0].DocuCata_Status;
    DocumentosBE.value.DocuCata_Extension =
      response.Lista[0].DocuCata_Extension;
    DocumentosBE.value.DocuCata_Requerido =
      response.Lista[0].DocuCata_Requerido;
    DocumentosBE.value.DocuCata_Vence = response.Lista[0].DocuCata_Vence;
    DocumentosBE.value.Accion = response.Lista[0].Accion;
    DocumentosBE.value.SociTipo_Tipo = response.Lista[0].SociTipo_Tipo;
    DocumentosBE.value.SociTipo_ID = response.Lista[0].SociTipo_ID;
    socioTipo.value = optionsSocio.value.filter(
      (item) => item.value == response.Lista[0].SociTipo_ID
    )[0];
    colocaExtensionesEditar();
  } else {
    limpiarForm();
  }
});

watch(socioTipo, (newValue) => {
  if (newValue != null) {
    DocumentosBE.value.SociTipo_ID = newValue.value;
    DocumentosBE.value.SociTipo_Tipo = newValue.label;
    DocumentosBE.value.DocuCata_SociosTipo_ID = newValue.value;
  }
});

watch(dialogFormTipoDocumento, (newValue) => {
  if (!newValue) {
    emits("cerrarFormDialog");
  }
});

watch(extension, (newValue) => {
  DocumentosBE.value.DocuCata_Extension = "";
  if (newValue != undefined && newValue != null) {
    console.log("watcher de extension", newValue);
    // DocumentosBE.value.DocuCata_Extension = newValue.value.join(",");
    for (let i = 0; i < newValue.length; i++) {
      DocumentosBE.value.DocuCata_Extension =
        DocumentosBE.value.DocuCata_Extension + newValue[i].value + ",";
    }
    console.log(
      "DocumentosBE.value.DocuCata_Extension",
      DocumentosBE.value.DocuCata_Extension
    );
  }
});

const colocaExtensionesEditar = () => {
  let extensiones = DocumentosBE.value.DocuCata_Extension.split(",");
  extensiones = extensiones.filter((item) => item.trim().length > 0);
  let extensionesObjeto = [];
  for (let i = 0; i < extensiones.length; i++) {
    let item = optionsExt.value.filter((item) =>
      item.value.includes(extensiones[i])
    );
    if (item.length > 0) {
      let indice = extensionesObjeto.findIndex((item1) =>
        item1.value.includes(item.value)
      );
      if (indice < 0) {
        extensionesObjeto.push(item[0]);
      }
    }
  }
  console.log("extensionesObjeto", extensionesObjeto);
  extension.value = extensionesObjeto;
};

const enviarForm = async () => {
  let response = null;
  //// debugger;
  if (DocumentosBE.value.DocuCata_ID > 0) {
    //modificar}
    DocumentosBE.value.Accion = 1;
    console.log(DocumentosBE.value);
    response = await ModificaCatalogo(DocumentosBE.value);
  } else {
    //registrar
    response = await InsertaDocumentos(DocumentosBE.value);
  }
  console.log("la respuesta de enviar y actualizar", response);

  emits("recargaGrid", response.data.bolRespuesta);

  $q.notify({
    message: response.data.bolRespuesta
      ? "Movimiento realizado correctamente"
      : response.data.strError,
    color: response.data.bolRespuesta ? "positive" : "negative",
  });
  limpiarform();
};

const limpiarForm = () => {
  DocumentosBE.value.DocuCata_ID = 0;
  DocumentosBE.value.DocuCata_SociosTipo_ID = 0;
  DocumentosBE.value.DocuCata_Tipo = "";
  DocumentosBE.value.DocuCata_Status = true;
  DocumentosBE.value.DocuCata_Extension = "";
  DocumentosBE.value.DocuCata_Requerido = false;
  DocumentosBE.value.DocuCata_Vence = false;
  DocumentosBE.value.Accion = 0;
  DocumentosBE.value.SociTipo_Tipo = 0;
  socioTipo.value = null;
  extension.value = [];
};
</script>
