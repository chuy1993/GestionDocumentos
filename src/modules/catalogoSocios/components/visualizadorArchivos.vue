<template>
  <q-dialog
    v-model="ver"
    :maximized="maximizedToggle"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space />
        <q-btn
          dense
          flat
          icon="minimize"
          @click="maximizedToggle = false"
          :disable="!maximizedToggle"
        >
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary"
            >Minimizar</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          flat
          icon="crop_square"
          @click="maximizedToggle = true"
          :disable="maximizedToggle"
        >
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary"
            >Maximizar</q-tooltip
          >
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section class="column no-wrap flex-center">
        <iframe
          id="inlineFrame"
          title="Inline Frame"
          class="fullscreen-iframe"
          :src="frameVer"
        >
        </iframe>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, toRefs, watch, onMounted } from "vue";
import extensiones from "src/modules/catalogoDocumentos/JSON/extensiones.js";
import { useQuasar } from "quasar";
const $q = useQuasar();
const extensionesFile = extensiones;
const URL = "http://tin-atlantis-03:7021/";

const props = defineProps({
  rutaArchivo: {
    type: String,
    default: "",
  },
  abrirVisualizador: {
    type: Boolean,
    default: false,
  },
});

const { rutaArchivo, abrirVisualizador } = toRefs(props);

const ver = ref(false);
const maximizedToggle = ref(true);

watch(rutaArchivo, (newValue) => {
  if (newValue.length > 0) {
    verPdf(newValue);
  }
});

watch(abrirVisualizador, (newValue) => {
  if (!newValue) {
    ver.value = newValue;
  }
});

const frameVer = ref("");
const emits = defineEmits("cerrarVisualizador");
watch(ver, (newValue) => {
  emits("cerrarVisualizador", newValue);
});

const verPdf = (ruta) => {
  console.log("ruta", ruta);
  frameVer.value = URL + ruta;
  console.log("url y ruta", frameVer.value);
  const extension = ruta.split(".").pop();
  console.log("Extensión del archivo:", extension);

  let extensionesArchivo = ruta.split(".");
  let elmymetype = extensionesFile.filter((itemMime) =>
    itemMime.value.includes(extensionesArchivo[extensionesArchivo.length - 1])
  )[0];
  if (
    extension.toLowerCase() == "png" ||
    extension.toLowerCase() == "jpg" ||
    extension.toLowerCase() == "pdf" ||
    extension.toLowerCase().includes("jpeg")
  ) {
    ver.value = true;
  } else {
    ver.value = false;
    window.open(URL + ruta, "_blank");
    $q.notify({
      message:
        "El documento no se puede visualzar, por lo que se va a descargar",
      color: "primary",
    });

    // downloadFile(URL + ruta, "Ejemplo", elmymetype.mimeType);
    // downloadUrlAsFile(
    //   URL + ruta,
    //   "Ejemplo." + extensionesArchivo[extensionesArchivo.length - 1]
    // )
    //;
  }
};
</script>
<style scope>
.fullscreen-dialog {
  width: 100vh !important;
  height: 100vh !important;
}
.fullscreen-iframe {
  width: 100vh !important;
  height: 100vh !important;
}
.fila-roja {
  background-color: #961616;
  color: white; /* Puedes ajustar el color de texto según sea necesario */
}
</style>
