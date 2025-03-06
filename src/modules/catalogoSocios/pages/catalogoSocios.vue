<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Socios/Usufructuarios</div>
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
    <!--popup para cargar documentos-->
    <q-dialog
      v-model="popup"
      persistent
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
        <q-section>
          <popupInfo :SociCata_Id="SociCata_Id"> </popupInfo>
        </q-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogRelacion"
      persistent
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
        <q-section>
          <popupRelacion
            :SociCata_Id="SociCata_Id"
            :SociCata_Tipo="SociCata_Tipo"
            :SociCata_Nombre="SociCata_Nombre"
          >
          </popupRelacion>
        </q-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogRelacionEmpresas"
      persistent
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
        <q-section>
          <popupEmpresas
            :SociCata_Id="SociCata_Id"
            :SociCata_Nombre="SociCata_Nombre"
          >
          </popupEmpresas>
        </q-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialog" persistent style="width: 80%">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab
            class="tabs"
            name="informacionGeneralSocios"
            icon="las la-info"
            label="Información General"
          />
          <q-tab
            class="tabs"
            name="tabRE"
            icon="las la-building"
            label="Relación Empresas"
            :disable="tipoSocio_Id == 1 && recibe_Id > 0 ? false : true"
          />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="informacionGeneralSocios">
            <popupInfoGeneralSoc
              :Socio_Id="registroID"
              :clonacion="clonar_socio"
              @recibeID="recibeID"
              @tipoSocio="tipoSocio"
            />
          </q-tab-panel>
          <q-tab-panel name="tabRE">
            <popupSociosEmpresasCT :Socio_Id="recibe_Id" @recibeID="recibeID" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
    <div class="q-pt-md">
      <q-grid
        bordered
        :global_search="true"
        :data="listaSocios"
        :columns="columnasSocios"
        :columns_filter="true"
        :fullscreen="true"
        :loading="loading"
        :pagination="pagination"
        :csv_download="true"
      >
        <template v-slot:body="props">
          <q-tr props:props>
            <q-td key="SociCata_ID">{{ props.row.SociCata_ID }}</q-td>
            <q-td key="SociCata_Nombre">{{ props.row.SociCata_Nombre }} </q-td>
            <q-td key="SociCata_Telefono"
              >{{ props.row.SociCata_Telefono }}
            </q-td>
            <q-td key="SociCata_RazonSocial">{{
              props.row.SociCata_RazonSocial
            }}</q-td>
            <q-td key="SociCata_Buzon">{{ props.row.SociCata_Buzon }} </q-td>
            <q-td key="SociCata_Correo">{{ props.row.SociCata_Correo }} </q-td>
            <q-td key="SociCata_CIEC">{{ props.row.SociCata_CIEC }}</q-td>
            <q-td key="SociCata_CIP">{{ props.row.SociCata_CIP }}</q-td>
            <q-td key="SociCata_RFC">{{ props.row.SociCata_RFC }}</q-td>
            <q-td key="SociCata_Regimen">{{ props.row.SociCata_Regimen }}</q-td>
            <q-td key="SociCata_CURP">{{ props.row.SociCata_CURP }}</q-td>
            <q-td key="SociTipo_Tipo">{{ props.row.SociTipo_Tipo }}</q-td>
            <q-td key="SociCata_Status">
              <span v-if="props.row['SociCata_Status']">Activo</span>
              <span v-else>Inactivo</span>
            </q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-folder-open"
                color="primary"
                @click="verPopup(props.row)"
                :disable="accionesModulo.Registrar == 0 ? true : false"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Registrar == 0">
                    No tienes permiso de ejecutar esta acción
                  </span>
                  <span v-else> Subir y ver Documentos</span>
                </q-tooltip>
              </q-btn>
            </q-td>
            <q-td class="q-gutter-sm">
              <div class="button-container">
                <q-btn
                  class="q-ma-xs float-left"
                  round
                  size="10px"
                  icon="las la-copy"
                  color="teal"
                  @click="clonarSocio(props.row)"
                  :disable="accionesModulo.Eliminar == 0 ? true : false"
                >
                  <q-tooltip>
                    <span v-if="accionesModulo.Eliminar == 0">
                      No tienes permiso de ejecutar esta acción
                    </span>
                    <span v-else> Clonar</span>
                  </q-tooltip></q-btn
                >
                <q-btn
                  class="q-ma-xs float-left"
                  round
                  size="10px"
                  icon="las la-project-diagram"
                  color="accent"
                  @click="verRelaciones(props.row)"
                  :disable="accionesModulo.Eliminar == 0 ? true : false"
                >
                  <q-tooltip>
                    <span v-if="accionesModulo.Eliminar == 0">
                      No tienes permiso de ejecutar esta acción
                    </span>
                    <span v-else> Ver relaciones</span>
                  </q-tooltip></q-btn
                >

                <q-btn
                  class="q-ma-xs float-left"
                  round
                  size="10px"
                  icon="las la-edit"
                  color="green"
                  @click="llenaEditarTab(props.row)"
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
import { onMounted, ref, toRefs, watch, computed } from "vue";
import { useQuasar } from "quasar";
import useSocios from "../composables/useSocios.js";
import popupInfo from "../components/popupInfo.vue";
import popupRelacion from "../components/popupRelacion.vue";
import popupEmpresas from "../components/popupEmpresas.vue";
import popupInfoGeneralSoc from "../components/popupInfoGeneralSoc.vue";
import popupSociosEmpresasCT from "../components/popupSociosEmpresasCT.vue";
import {
  validarSesion,
  ValidaPermisoAccion,
  validaAccionIndividual,
} from "src/scripts/validarSesion.js";
const socios = ref({});
const pagination = ref({});
const dialog = ref(false);
//const suf = ref(false);
const optionsSocioTipo = ref([]);
const selectSocios = ref([]);
const optionsSocio = ref([]);
const $q = useQuasar();
const nuevo = ref(false);

const valida = ref(false);
const status = ref(false);
const popup = ref(false);
const corp = ref(1);
const maximizedToggle = ref(true);
const selected_ID = ref({});
const selected_Tipo = ref({});
const selected_Nombre = ref({});
const dialogRelacion = ref(false);
const dialogRelacionEmpresas = ref(false);
const SociCata_Id = computed(() => selected_ID.value);
const SociCata_Tipo = computed(() => selected_Tipo.value);
const SociCata_Nombre = computed(() => selected_Nombre.value);
const mensajeRFC = ref("");
const mensajeCURP = ref("");
const mensajeCorreo = ref("");

const agregar = ref(false);
const guarda = ref(true);
const Socio = ref("");
const Empresa = ref("");
const optionsSocio2 = ref([]);
const optionsEmpresa = ref([]);
const tab = ref("informacionGeneralSocios");
const tabRE = ref(false);
const filteredOptionsEmpresa = ref([]);
const {
  columnasSocios,
  limpiarStore,
  listaSocios,
  listarSocios,
  consultaTipo,
  consultaSocio,
  InsertaSocios,
  ModificaSocios,
  listarEmpresas,
  columnasSociosRelacionEmpresas,
  listaSociosRelacionEmpresas,
  listarRelacionSociosEmpresas,
  InsertaRelacion,
  limpiaTablaRelacion,
  EliminaRelacionEmpresa,
} = useSocios();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});
pagination.value = {
  rowsPerPage: 15,
};
const ls = ref({
  Accion: 3,
  SociCata_Corp_ID: corp.value,
});

const listarEmp = ref({
  Accion: 1,
  EmprCata_ID: 0,
});
/* const descargarExcel = () => {
  desExcel(listaSocios, "CatalogoSocios");
}; */
const item = ref({
  Accion: 1,
  SociCata_Corp_ID: corp.value,
});
const item2 = ref({
  Accion: 3,
  SociCata_Corp_ID: corp.value,
});

const registroID = ref(0);
const clonar_socio = ref(false);

const ElModuloPrincipal = ref("Proc_FinanzasSocios_Catalogos");

const verPopup = (item) => {
  console.log("popup", item.SociCata_ID);
  selected_ID.value = item.SociCata_ID;
  popup.value = true;
};
watch(dialog, (newValue) => {
  if (!newValue) {
    tab.value = "informacionGeneralSocios";
  }
});

const clonarSocio = (tableRow) => {
  tab.value = "informacionGeneralSocios";
  tabRE.value = false;
  clonar_socio.value = true;
  nuevo.value = true;
  registroID.value = tableRow.SociCata_ID;
  dialog.value = true;
};

const nuevoRegistro = async () => {
  //await limpiarStore();
  tab.value = "informacionGeneralSocios";
  tabRE.value = false;
  Socio.value = "";
  registroID.value = 0;
  //Empresa.value = "";
  /*  const response = await validaAccionIndividual(
    ElModuloPrincipal.value,
    "CatalogoSocios_Registrar"
  );
  if (response) { */
  nuevo.value = true;
  clonar_socio.value = false;
  limpiarForm();
  optionsSocioTipo.value = await consultaTipo(item.value);
  optionsSocio.value = await consultaSocio(item2.value);
  dialog.value = true;
  /* } else {
    $q.notify({
      message: "No tienes permisos de ralizar esta acción",
      color: "negative",
    });
  } */
};
/* const cambio = (val) => {
  tipoID.value = val.value;
  console.log(val.value);
  if (val.label == "Usufructuario") {
    suf.value = true;
  } else {
    suf.value = false;
  }
}; */

onMounted(async () => {
  optionsSocio2.value = await consultaSocio(ls.value);
  console.log("options 2", optionsSocio2.value);
  let permisosBE = {
    Token: localStorage.getItem("token"),
    Usuario: localStorage.getItem("usuario"),
  };
  /* const response = await validarSesion(permisosBE);
  if (response.ok) { */
  try {
    await limpiarStore();
  } catch {
    $q.notify({
      message: "Error al limpiar store",
      color: "negative",
    });
  }
  try {
    console.log("item listar", item.value);
    await listarSocios(item.value);
  } catch {
    $q.notify({
      message: "Error al consultar tabla",
      color: "negative",
    });
  }
  /*  } else {
    $q.notify({
      message: "No tienes permisos para acceder a este módulo",
      color: "negative",
    });
  } */
});

const recibe_Id = ref(0);
watch(dialog, (newValue) => {
  if (newValue == false) recibe_Id.value = 0;
});

const computed_socio_Id = computed(() => (recibe_Id.value > 0 ? false : true));

const recibeID = (ID) => {
  recibe_Id.value = ID;
};

const tipoSocio_Id = ref(0);
const tipoSocio = (tipoID) => {
  tipoSocio_Id.value = tipoID;
};

const limpiarForm = () => {
  socios.value = {};
  selectSocios.value = [];
  mensajeCURP.value = "";
  mensajeRFC.value = "";
  mensajeCorreo.value = "";
  limpiaTablaRelacion();
};
const llenaEditarTab = (tableRow) => {
  nuevo.value = false;
  registroID.value = tableRow.SociCata_ID;
  dialog.value = true;
  clonar_socio.value = false;
};

const desactivarOpciones = async () => {
  console.log("Entra a desactivar opciones");
  Object.keys(listaSociosRelacionEmpresas.value).forEach((key) => {
    let indice = optionsEmpresa.value.findIndex(
      (item) =>
        //console.log("item",item)
        item.label.trim() ==
        listaSociosRelacionEmpresas.value[key].EmprCata_Nombre.trim()
    );
    if (indice >= 0) {
      optionsEmpresa.value[indice].disable = true;
    }
  });
};

const eliminar = async (tableRow) => {
  /* const response = await validaAccionIndividual(
    ElModuloPrincipal.value,
    "CatalogoSocios_Actualizar"
  );
  if (response) { */
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
    message: "Se cambiara el estatus a inactivo",
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
      SociCata_ID: tableRow.SociCata_ID,
      Accion: 2,
    };
    const response = await ModificaSocios(fila);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "Registro dado de baja",
        color: "green",
      });
      await listarSocios(item.value);
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
  });
  /*  } else {
    $q.notify({
      message: "No tienes permisos de ralizar esta acción",
      color: "negative",
    });
  } */
};

const verRelaciones = (item) => {
  console.log(item);
  selected_ID.value = item.SociCata_ID;
  selected_Tipo.value = item.SociTipo_ID;
  selected_Nombre.value = item.SociCata_Nombre;
  dialogRelacion.value = true;
};

const verEmpresas = (item) => {
  console.log("verEmpresas", item);
  selected_ID.value = item.SociCata_ID;
  selected_Nombre.value = item.SociCata_Nombre;
  dialogRelacionEmpresas.value = true;
};
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
