<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Alertas</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      @click="nuevoRegistro"
      label="Crear nuevo"
      dense
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso de ejecutar esta acción
        </span>
        <span v-else> Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="dialogColor" persistent>
      <q-card>
        {{ color }}
        <q-color v-model="color" no-header-tabs style="width: 250px" />
        <q-card-actions align="right">
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup="cancelEnabled"
            @click="selectColor()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 900px; max-width: 100vw">
        <q-card-section class="row items-center q-gutter-sm">
          <q-input
            label="Correo"
            v-model="alertas.Correo"
            dense
            outlined
            clearable
            autogrow
            type="email"
            style="width: 100%"
          ></q-input>
          <empresa
            @funcionEjemplo="funcionEjemplo"
            :prop1="true"
            v-if="!emp"
          ></empresa>
          <q-input
            v-if="emp"
            label="Empresa"
            v-model="alertas.Empresa"
            dense
            outlined
            readonly
            style="width: 34%"
          ></q-input>
          <q-input
            filled
            dense
            outlined
            style="width: 33%"
            v-model="alertas.Fecha"
            label="Fecha"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="alertas.Fecha" mask="DD-MM-YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Ok" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            label="Frecuencia"
            use-input
            v-model="frecuencia"
            :options="optionsFrecuencia"
            dense
            outlined
            clearable
            style="width: 33%"
          ></q-select>
          <q-input
            label="Ubicación"
            v-model="alertas.Ubicacion"
            dense
            outlined
            clearable
            style="width: 34%"
          ></q-input>
          <q-input
            label="Asunto"
            v-model="alertas.Asunto"
            dense
            outlined
            clearable
            style="width: 34%"
          ></q-input>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-editor
            style="width: 100vh"
            v-model="mensaje"
            :dense="$q.screen.lt.md"
            :toolbar="options"
            :definitions="{
              color: {
                tip: 'CambiaColor',
                icon: 'text_format',
                label: '',
                handler: colorText,
              },
            }"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />
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
    <div class="q-pt-md">
      <q-grid
        bordered
        :data="listaAlertas"
        :columns="columnasAlertas"
        :columns_filter="false"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr props:props v-if="Object.entries(props.row).length > 0">
            <q-td key="Aler_ID">{{ props.row["Aler_ID"] }}</q-td>
            <q-td key="SociCata_RazonSocial">{{
              props.row["SociCata_RazonSocial"]
            }}</q-td>
            <q-td key="Aler_Correo">{{ props.row["Aler_Correo"] }}</q-td>
            <q-td key="Aler_FechaHora">{{ props.row["Aler_FechaHora"] }} </q-td>
            <q-td key="Aler_Frecuencia">{{
              props.row["Aler_Frecuencia"]
            }}</q-td>
            <q-td key="Aler_Ubicacion">{{ props.row["Aler_Ubicacion"] }} </q-td>
            <q-td key="Aler_Asunto">{{ props.row["Aler_Asunto"] }}</q-td>
            <q-td key="Aler_Mensaje">{{
              props.row["Aler_Mensaje"].length > 80
                ? props.row["Aler_Mensaje"].substr(0, 77) + "..."
                : props.row["Aler_Mensaje"]
            }}</q-td>

            <q-td class="q-gutter-sm">
              <div class="button-container">
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
                  color="negative"
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
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import empresa from "../components/SelectEmpresa.vue";
import useAlertas from "../composables/useAlertas.js";
const mensaje = ref(null);
const alertas = ref({});
const pagination = ref({});
const dialog = ref(false);
const nuevo = ref(false);
const color = ref(null);
const status = ref(false);
const valida = ref(false);
const registroID = ref(0);
const $q = useQuasar();
const frecuencia = ref("");
const optionsFrecuencia = ref([]);
const dialogColor = ref(false);
const variable = ref(null);
const emp = ref(false);
const {
  columnasAlertas,
  listaAlertas,
  consultaFrecuencias,
  listarAlertas,
  InsertarAlertas,
  ModificarAlerta,
  EliminarAlerta,
  consultaEmpresas,
  limpiarStore,
} = useAlertas();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});
pagination.value = {
  rowsPerPage: 15,
};

const nuevoRegistro = () => {
  nuevo.value = true;
  emp.value = false;
  limpiarForm();
  dialog.value = true;
};
const item = ref({
  Accion: 1,
});
const fr = ref("");
const optionsEmpresa = ref(null);

const item2 = ref({
  Accion: 1,
});

//watch alertas.Frecuencia
watch(frecuencia, (newValue) => {
  console.log("watcher", newValue.label);
  fr.value = newValue.label;
});

onMounted(async () => {
  await limpiarStore();
  const response = await listarAlertas(item.value);
  console.log("front", response);
  optionsFrecuencia.value = await consultaFrecuencias();
  //optionsEmpresa.value = await consultaEmpresas(item2.value);
});

const options = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "strike", "underline", "subscript", "superscript"],
  ["token", "hr", "link", "custom_btn"],
  ["fullscreen"],
  [
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "size-1",
        "size-2",
        "size-3",
        "size-4",
        "size-5",
        "size-6",
        "size-7",
      ],
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: "no-icons",
      options: [
        "default_font",
        "arial",
        "arial_black",
        "comic_sans",
        "courier_new",
        "impact",
        "lucida_grande",
        "times_new_roman",
        "verdana",
      ],
    },
    ["color"],
    "removeFormat",
  ],
  ["quote", "unordered", "ordered"],

  ["undo", "redo"],
  ["viewsource"],
];

const range = ref(null);

const colorText = () => {
  document.querySelector(".q-editor");
  const selection = window.getSelection();
  if (!selection) {
    return;
  }
  range.value = selection.getRangeAt(0);
  dialogColor.value = true;
};

const selectColor = () => {
  const span = document.createElement("span");
  span.style.color = color.value;
  range.value.surroundContents(span);
  range.value = null;
};

const llenaEditar = async (tableRow) => {
  emp.value = true;
  nuevo.value = false;
  console.log("tabla", tableRow);
  //funcionEjemplo(tableRow.SociCata_RazonSocial);

  alertas.value.Aler_ID = tableRow.Aler_ID;
  alertas.value.Empresa = tableRow.SociCata_RazonSocial;
  alertas.value.Correo = tableRow.Aler_Correo;
  alertas.value.Fecha = tableRow.Aler_FechaHora;
  frecuencia.value = tableRow.Aler_Frecuencia;
  alertas.value.Ubicacion = tableRow.Aler_Ubicacion;
  alertas.value.Asunto = tableRow.Aler_Asunto;
  mensaje.value = tableRow.Aler_Mensaje;

  console.log("alertas", alertas);
  dialog.value = true;
};

const eliminar = async (tableRow) => {
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
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
      Aler_ID: tableRow.Aler_ID,
    };
    const response = await EliminarAlerta(fila);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "Alerta eliminada",
        color: "green",
      });
      await listarAlertas(item.value);
    } else {
      $q.notify({
        message: "Error al guardar alerta",
        color: "negative",
      });
    }
  });
};

const limpiarForm = () => {
  alertas.value = {};
  // funcionEjemplo.value = {};
  // // frecuencia.value = {};
};

const enviarForm = async () => {
  valida.value = false;
  let acc = 0;
  if (!nuevo.value) {
    acc = 1;
  }
  const form = {
    Accion: acc,
    Aler_ID: alertas.value.Aler_ID,
    Aler_SociCataSufr_ID: variable.value.value,
    Aler_Correo: alertas.value.Correo,
    Aler_Asunto: alertas.value.Asunto,
    Aler_FechaHora: alertas.value.Fecha,
    Aler_Frecuencia: fr.value,
    Aler_Ubicacion: alertas.value.Ubicacion,
    Aler_Mensaje: mensaje.value,
    //Aler_Docu_ID ,
  };
  console.log("form", form);
  //nuevo
  if (nuevo.value) {
    console.log("Alertas", alertas.value);
    if (
      variable.value &&
      alertas.value.Correo &&
      alertas.value.Fecha &&
      frecuencia.value &&
      alertas.value.Ubicacion &&
      alertas.value.Asunto &&
      mensaje.value
    ) {
      valida.value = true;
    }
    if (valida.value) {
      const response = await InsertarAlertas(form);
      console.log("respuesta insertar", response.data.bolRespuesta);
      if (response.data.bolRespuesta) {
        $q.notify({
          message: "Nuevo registro guardado",
          color: "Green",
        });
        await listarAlertas(item.value);
      } else {
        $q.notify({
          message: "Error al guardar registro",
          color: "negative",
        });
      }
    } else {
      $q.notify({
        message: "No puedes dejar campos vacios",
        color: "negative",
      });
    }
  }
  //editar
  if (!nuevo.value) {
    console.log("editar", form);
    const response = await ModificarAlerta(form);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "Registro editado",
        color: "Green",
      });
      await listarAlertas(item.value);
    } else {
      $q.notify({
        message: "error al guardar",
        color: "negative",
      });
    }
  }
};

const funcionEjemplo = (parametroHijo) => {
  console.log("El parametro que viene del hjo es:", parametroHijo);
  variable.value = parametroHijo;
};

//funciona
/* const colorText = () => {
  const color = prompt('Ingrese el color (en inglés o en formato hexadecimal)');
  if (!color) return;
  const editor = document.querySelector('.q-editor');
  if (!editor) return;
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const span = document.createElement('span');
  span.style.color = color;
  range.surroundContents(span);
} */
</script>
<style scoped>
.button-container {
  display: flex;
  flex-direction: row;
}

.button-container .q-btn {
  margin-right: 5px; /* Espacio entre botones */
}
</style>
