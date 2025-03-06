<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Usufructuarios por Socio</div>
    <hr />
    <q-select
      class="q-ml-sm"
      outlined
      dense
      use-input
      input-debounce="0"
      clearable
      transition-show="jump-up"
      transition-hide="jump-up"
      label="Socio"
      v-model="socios"
      :options="optionsSocio"
      @filter="filtroSocios"
      required
      style="width: 250px"
    />
    <div class="q-pa-md">
      <q-grid
        class="q-pa-md"
        bordered
        :data="listaUsufructuarios"
        :columns="columnasUsufructuarios"
        :columns_filter="false"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr props:props v-if="Object.entries(props.row).length > 0">
            <q-td key="SociCata_ID">{{ props.row["SociCata_ID"] }}</q-td>
            <q-td key="SociCata_Nombre"
              >{{ props.row["SociCata_Nombre"] }}
            </q-td>
            <q-td key="SociCata_Telefono"
              >{{ props.row["SociCata_Telefono"] }}
            </q-td>
            <q-td key="SociCata_RazonSocial">{{
              props.row["SociCata_RazonSocial"]
            }}</q-td>
            <q-td key="SociCata_Nombre"
              >{{ props.row["SociCata_Nombre"] }}
            </q-td>
            <q-td key="SociCata_Telefono"
              >{{ props.row["SociCata_Telefono"] }}
            </q-td>
            <q-td key="SociCata_RazonSocial">{{
              props.row["SociCata_RazonSocial"]
            }}</q-td>
            <q-td key="SociCata_Buzon">{{ props.row["SociCata_Buzon"] }} </q-td>
            <q-td key="SociCata_Correo"
              >{{ props.row["SociCata_Correo"] }}
            </q-td>
            <q-td key="SociCata_Correo"
              >{{ props.row["SociCata_Correo"] }}
            </q-td>
            <!-- <q-td key="DocuCata_Tipo">{{ props.row["DocuCata_Tipo"] }} </q-td> -->
            <!-- <q-td key="Fiel">{{ props.row["Fiel"] }}</q-td>
            <q-td key="Password">{{ props.row["Password"] }} </q-td> -->
            <q-td key="SociCata_Regimen"
              >{{ props.row["SociCata_Regimen"] }}
            </q-td>
            <q-td key="SociCata_Regimen"
              >{{ props.row["SociCata_Regimen"] }}
            </q-td>
            <q-td key="SociCata_CURP">{{ props.row["SociCata_CURP"] }}</q-td>
            <q-td key="SociCata_Status">
              <span v-if="props.row['SociCata_Status']">Activo</span>
              <span v-else>Inactivo</span>
            </q-td>
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
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useSufructuarios from "../composables/useSufructuarios.js";
import { required } from "@vuelidate/validators";

const pagination = ref({});
const optionsSocio = ref({});
const filteredOptionSocio = ref([]);
const description = ref([]);
const idSocio = ref([]);
const validaSocio = ref([]);
const validaUsuf = ref([]);
const tipoC = ref([]);
const socios = ref("");
const socio = ref([]);
const $q = useQuasar();
const {
  columnasUsufructuarios,
  consultaSocio,
  listaUsufructuarios,
  listarUsufructuarios,
  selectSociosSuf,
  limpiarStore,
} = useSufructuarios();

const accionesModulo = ref({
  Eliminar: 0,
  Ingresar: 0,
  Actualizar: 0,
  Registrar: 1,
});

const filtroSocios = (searchTerm, done) => {
  if (!searchTerm) {
    filteredOptionSocio.value = optionsSocio.value;
  } else {
    const filtered = optionsSocio.value.filter((option) => {
      return option.label.toLowerCase().includes(searchTerm.toLowerCase());
    });
    filteredOptionSocio.value = filtered;
  }
  done();
};

pagination.value = {
  rowsPerPage: 15,
};
const item = ref({
  Accion: 2,
}); //Accion para cargar la tabla con la info del socio seleccionado
const item2 = ref({
  Accion: 3,
});

watch(socios, (newValue) => {
  idSocio.value = newValue.value;
  console.log("newValue", newValue);
  const response = listarUsufructuarios(item.value);
  if (response) {
    validaUsuf.value = true;
    llenaTabla();
  }
});

onMounted(async () => {
  await limpiarStore();
  const response = await listarUsufructuarios(item.value);
  console.log("front", response);
  //optionsSocioTipo.value = await consultaTipo();
  optionsSocio.value = await consultaSocio(item2.value);
  // filteredOptionSocio.value = optionsSocio.value;
  // filteredOptionSocio.value = optionsSocio.value;
});

const llenaTabla = async (item) => {
  console.log("llenar tabla", item);
  await limpiarStore();
  socios.value = socios.value.nombre;
  optionsSocio.value = socios.value;
  let item2 = {
    Accion: 4,
    SociCata_Id: idSocio.value,
  };
  await listarUsufructuarios(item2);
};
</script>
