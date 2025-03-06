<template>
  <div class="q-pt-sm q-ml-xs row items-start q-gutter-md">
    <SelectEmpresa
      @enviaIdEmpresa="enviaIdEmpresa"
      :bolRespuesta="bolRespuesta"
      v-if="!emp"
      :itemsDesactivar="listaEmpresasCT"
    />
    <q-btn
      flat
      align="left"
      label="Cerrar"
      color="negative"
      icon="las la-times-circle"
      dense
      v-close-popup="cancelEnabled"
    />

    <q-btn
      flat
      align="left"
      color="green"
      icon="las la-save"
      label="Guardar"
      dense
      @click="enviarFormEmpresas"
    />
  </div>
  <div class="q-pa-md">
    <q-grid
      :data="listaEmpresasCT"
      :columns="columnasEmpresasCT"
      class="q-ma-sm"
    >
      <template v-slot:body="props">
        <q-tr props:props>
          <q-td key="RelaEmpr_ID"> {{ props.row["RelaEmpr_ID"] }} </q-td>
          <q-td key="EmprCata_Nombre">
            {{ props.row["EmprCata_Nombre"] }}
          </q-td>
          <q-td key="Empr_NombreCorto">
            {{ props.row["Empr_NombreCorto"] }}
          </q-td>
          <q-td key="RelaEmpr_Estatus">
            <span v-if="props.row['RelaEmpr_Estatus']">Activo</span>
            <span v-else>Inactivo</span>
          </q-td>
          <q-td class="q-gutter-sm">
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
                <span v-else>Eliminar</span>
              </q-tooltip>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-grid>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch, computed } from "vue";
import { useQuasar } from "quasar";
import useEmpresas from "src/modules/catalogoEmpresas/composables/useEmpresas";
import SelectEmpresa from "../components/SelectEmpresa.vue";
const $q = useQuasar();
const parametroHijo = ref({});
const variable = ref(null);
const nuevo = ref(false);
const Empresa = ref([]);
const emp = ref(false);
const valida = ref(false);
const dialog = ref(false);

const registroID = ref(0);
const itemsDesactivar = ref([]);
const props = defineProps({
  Empresa_Id: {
    type: Number,
    default: 0,
  },
});
const { Empresa_Id } = toRefs(props);
const {
  columnasEmpresasCT,
  listaEmpresasCT,
  listarEmpresasCT,
  InsertarRelacion,

  EliminarRelacion,
} = useEmpresas();
const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualidad: 1,
  Registrar: 1,
});
const nuevoRegistro = () => {
  emp.value = false;
  nuevo.value = true;
};
const item = ref({
  RelaEmpr_EmprCata_ID: Empresa_Id.value,
});

watch(Empresa_Id, (newValue) => {
  console.log(newValue);
});
const empresasAsignadas = ref([]);

onMounted(async () => {
  const response = await listarEmpresasCT(item.value);

  console.log("item", item);
  console.log("front", response);
  console.log("lista", listaEmpresasCT.value);
  console.log("EmprCata_ID front:", Empresa_Id.value);
  console.log("ID de edicion", Empresa_Id.value);
});
const eliminar = async (tableRow) => {
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
    message: "Se cambiara el estatus a inactivo",
    cancel: true,
    html: true,
  }).onOk(async () => {
    const fila = {
      RelaEmpr_ID: tableRow.RelaEmpr_ID,
    };
    const response = await EliminarRelacion(fila);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "Registro dado de baja",
        color: "Green",
      });
      await listarEmpresasCT(item.value);
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
  });
};
const enviarFormEmpresas = async () => {
  let form = {
    RelaEmpr_ID: registroID.value,
    RelaEmpr_EmprCata_ID: Empresa_Id.value,
    RelaEmpr_Empr_ID:
      variable.value > 0 ? variable.value : variable.value.value,
    SisMUsuario: registroID.value > 0 ? localStorage.getItem("usuario") : "",
    SisCUsuario: registroID.value == 0 ? localStorage.getItem("usuario") : "",
  };
  console.log("form", form);
  const response = await InsertarRelacion(form);
  console.log("mensaje", response.data.Lista[0].mensaje1);
  if (response.data.bolRespuesta) {
    await listarEmpresasCT(item.value);
    if (response.data.Lista[0].mensaje1 != "") {
      $q.notify({
        message: response.data.Lista[0].mensaje1,
        color: "negative",
      });
    } else {
      $q.notify({
        message: "Relación registrada",
        color: "Green",
      });
    }
  } else {
    $q.notify({
      message: "Error al guardar registro",
      color: "negative",
    });
  }
};

const enviaIdEmpresa = (parametroHijo) => {
  console.log("El parametro que viene del hijo es:", parametroHijo);
  variable.value = parametroHijo;
};
</script>
