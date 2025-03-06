<template>
  <asignarEmpresaSocioUsufructuario
    @limpiaFormRelacion="limpiaFormRelacion"
    :Rela_SociCataSocio_ID="Rela_SociCataSocio_ID"
    :Rela_ID="Rela_ID"
    :dialogAsignaEmpresa="dialogAsignaEmpresa"
  />

  <div class="q-pa-md">
    <div class="text-h4 q-pb-xs">
      <!-- {{ (SociCata_Tipo.value!=2) ? 'asociado con: '  : 'Listado de' }} -->
      <!-- {{  sociosUsuf }} de {{ sociosUsufNombre }} -->
      <!-- SociCata_Tipo.value: {{SociCata_Tipo}}<br> -->
      {{ sociosUsuf }} : {{ sociosUsufNombre }}
    </div>
    <hr />
    <q-btn
      class="q-mb-sm"
      v-if="SociCata_Tipo == 1"
      icon="las la-plus-circle"
      label="crear nuevo"
      color="green"
      @click="nuevoRegistro()"
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso de ejecutar esta acción
        </span>
        <span v-else> Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <div class="text-h4">
      {{ llElusu }}
    </div>

    <q-dialog v-model="agregar">
      <q-card>
        <form @submit.prevent.stop="onSubmit">
          <q-card-section class="row items-center q-gutter-sm">
            <q-select
              :label="sociosUsuf"
              v-model="SelectSociosUsuf"
              ref="tipoRef"
              :options="filteredOptionsTipoSociosUsuf"
              dense
              outlined
              style="width: 250px"
            ></q-select>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cerrar"
              color="negative"
              v-close-popup="cancelEnabled"
            />
            <q-btn
              flat
              color="green"
              icon="las la-save"
              type="submit"
              :disable="guarda"
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
  <div class="q-pl-md q-pr-md">
    <!-- class="q-ma-sm" -->
    <!-- {{listaSociosRelacion}} -->
    <q-grid
      bordered
      :data="listaSociosRelacion"
      :columns="columnasSociosRelacion"
      :columns_filter="false"
      :pagination="pagination"
    >
      <template v-slot:body="props">
        <q-tr props:props v-if="Object.entries(props.row).length > 0">
          <q-td key="SociCata_Nombre">{{ props.row["SociCata_Nombre"] }}</q-td>
          <q-td key="SociCata_RazonSocial">{{
            props.row["SociCata_RazonSocial"]
          }}</q-td>
          <q-td key="SociCata_RFC">{{ props.row["SociCata_RFC"] }}</q-td>
          <q-td class="q-gutter-sm">
            <!-- <q-btn
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
            </q-btn> -->
            <q-btn
              v-if="SociCata_Tipo == 1"
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
            <q-btn
              v-if="SociCata_Tipo == 1"
              class="q-ma-xs float-left"
              round
              size="10px"
              icon="las la-plus"
              color="primary"
              @click="asignarEmpresa(props.row)"
              :disable="accionesModulo.Eliminar == 0 ? true : false"
            >
              <q-tooltip>
                <span v-if="accionesModulo.Eliminar == 0">
                  No tienes permiso de ejecutar esta acción
                </span>
                <span v-else> Asignar empresa</span>
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
import asignarEmpresaSocioUsufructuario from "./asignarEmpresaSocioUsufructuario.vue";
import useSocios from "../composables/useSocios.js";
const $q = useQuasar();
const pagination = ref(null);
const agregar = ref(false);
const guarda = ref(true);
const sociosUsuf = ref("");
const sociosUsufNombre = ref("");
const SelectSociosUsuf = ref([]);
const optionsTipoSociosUsuf = ref([]);
const filteredOptionsTipoSociosUsuf = ref([]);
const edita = ref(false);
const dialogAsignaEmpresa = ref(false);
const Rela_SociCataSocio_ID = ref(0);
const Rela_ID = ref(0);
const props = defineProps({
  SociCata_Id: {
    type: Number,
    default: 0,
  },
  SociCata_Tipo: {
    type: Number,
    default: 0,
  },
  SociCata_Nombre: {
    type: String,
    default: "",
  },
});
const { SociCata_Id } = toRefs(props);
const { SociCata_Tipo } = toRefs(props);
const { SociCata_Nombre } = toRefs(props);
const {
  consultaPorTipoSocio,
  guardaRelacion,
  columnasSociosRelacion,
  listaSociosRelacion,
  listarRelacion,
  listarNombresTipoSocios,
  modificarRelacion,
  eliminaRelacion,
} = useSocios();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});
const item = ref({
  Accion: SociCata_Tipo.value,
  Rela_ID: SociCata_Id.value,
  SociCata_Corp_ID: 1,
});

const tipo = ref({
  Accion: SociCata_Tipo.value,
  SociCata_Corp_ID: 1,
});

const itemSocio = ref({
  SociTipo_ID: SociCata_Tipo.value,
});

watch(SelectSociosUsuf, async (newValue, oldValue) => {
  if (newValue != oldValue) {
    guarda.value = false;
  }
});

const llElusu = ref("");

onMounted(async () => {
  await listarRelacion(item.value);
  const response = await listarNombresTipoSocios(itemSocio.value);
  console.log("respuesta listar", response);
  if (SociCata_Tipo.value == 2) {
    // sociosUsuf.value = "Socios"
    llElusu.value = "Socios: ";
    sociosUsuf.value = "Usufructuario";
  } else {
    // sociosUsuf.value = "Usufructuarios"
    llElusu.value = "Usufructuarios: ";
    sociosUsuf.value = "Socio";
  }
  sociosUsufNombre.value = SociCata_Nombre.value;
  optionsTipoSociosUsuf.value = await consultaPorTipoSocio(tipo.value);
  desactivarOpciones();
  filteredOptionsTipoSociosUsuf.value = optionsTipoSociosUsuf.value;
});

const desactivarOpciones = () => {
  Object.keys(listaSociosRelacion.value).forEach((key) => {
    let indice = optionsTipoSociosUsuf.value.findIndex(
      (item) =>
        item.rfc.trim() == listaSociosRelacion.value[key].SociCata_RFC.trim()
    );
    if (indice >= 0) {
      optionsTipoSociosUsuf.value[indice].disable = true;
    }
  });
};

const nuevoRegistro = () => {
  SelectSociosUsuf.value = [];
  guarda.value = true;
  agregar.value = true;
};
const llenaEditar = (tableRow) => {
  edita.value = true;
  console.log("elemento a editar", tableRow);
  SelectSociosUsuf.value = {
    value: tableRow.Rela_SociCataSocio_ID,
    label: tableRow.SociCata_RazonSocial + "-" + tableRow.SociCata_RFC,
  };
  agregar.value = true;
  guarda.value = true;
};

async function onSubmit() {
  let opc = {};

  console.log("seleccion", SelectSociosUsuf.value.value);
  if (SelectSociosUsuf.value.value > 1) {
    opc = {
      Rela_SociCataSuf_ID: SelectSociosUsuf.value.value,
      Rela_SociCataSocio_ID: SociCata_Id.value,
      Rela_Corp_ID: 1,
    };

    const response = guardaRelacion(opc);

    console.log("respuesta insertar", response);
    response.then((items) => {
      console.log("item", items);
      if (items) {
        $q.notify({
          message: "Nuevo registro guardado",
          color: "green",
        });
        listarRelacion(item.value);
      } else {
        $q.notify({
          message: "Error al guardar registro",
          color: "negative",
        });
      }
    });
  } else {
    $q.notify({
      message: "No se seleccionó " + sociosUsuf.value,
      color: "negative",
    });
  }
}

const eliminar = async (tableRow) => {
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
    message: "Se borrará la relación",
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
      Rela_ID: tableRow.Rela_ID,
    };
    const response = await eliminaRelacion(fila);
    if (response) {
      $q.notify({
        message: "Relación eliminada",
        color: "green",
      });
      await listarRelacion(item.value);
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
  });
};

const asignarEmpresa = (row) => {
  dialogAsignaEmpresa.value = true;
  Rela_SociCataSocio_ID.value = row.Rela_SociCataSocio_ID;
  Rela_ID.value = row.Rela_ID;
};

const limpiaFormRelacion = (estatus) => {
  // debugger;
  Rela_SociCataSocio_ID.value = 0;
  Rela_ID.value = 0;
  dialogAsignaEmpresa.value = estatus;
};
</script>
