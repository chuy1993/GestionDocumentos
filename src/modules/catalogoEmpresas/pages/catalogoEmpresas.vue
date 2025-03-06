<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Catalogo de Empresas</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="positive"
      @click="nuevoRegistro"
      label="crear nuevo"
      dense
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso para ejecutar esta acción
        </span>
        <span v-else>Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <!-- <tabsEmpresas :dialog="dialog"  :Empresa_Id="Empresa_Id" />/ -->
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          animated
        >
          <q-tab
            class="tabs"
            name="informacionGeneralEmpr"
            icon="las la-info"
            label="Información General"
          />
          <!-- :disable="informacionGeneralEmprTab.Ingresar == 0 ? true : false" -->
          <q-tab
            class="tabs"
            name="datos"
            icon="las la-building"
            label="Relación Empresas"
            :disable="registroID > 0 ? false : true"
          />
        </q-tabs>
        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="informacionGeneralEmpr">
            <popupInfoGeneral :Empresa_Id="registroID" @recibeID="recibeID" />
          </q-tab-panel>

          <q-tab-panel name="datos">
            <!-- <popupEmpresasCT :Empresa_Id="registroID" :recibe_Id="recibe_Id" /> -->
            <popupEmpresasCT :Empresa_Id="registroID" @recibeID="recibeID" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>

    <div class="q-pt-md">
      <q-grid
        bordered
        :global_search="true"
        :data="listaEmpresas"
        :columns="columnasEmpresas"
        :columns_filter="true"
        :loading="loading"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr props:props>
            <!-- <q-td key="EmprCata_ID"> {{ props.row.EmprCata_ID }} </q-td> -->
            <q-td key="EmprCata_Nombre">
              {{ props.row["EmprCata_Nombre"] }}
            </q-td>
            <q-td key="EmprCata_RFC"> {{ props.row["EmprCata_RFC"] }} </q-td>
            <q-td key="EmprCata_Regimen">
              {{ props.row["EmprCata_Regimen"] }}
            </q-td>
            <q-td key="EmprCata_Nomenclatura">
              {{ props.row["EmprCata_Nomenclatura"] }}
            </q-td>
            <q-td key="EmprCata_Nota"> {{ props.row["EmprCata_Nota"] }} </q-td>
            <q-td key="EmprCata_Estatus">
              <span v-if="props.row['EmprCata_Estatus']">Activo</span>
              <span v-else>Inactivo</span>
            </q-td>
            <q-td class="q-gutter-sm">
              <q-btn
                class="q-ma-xs float-left"
                round
                size="10px"
                icon="las la-edit"
                color="green"
                @click="llenarEditar(props.row)"
                :disable="accionesModulo.Actualizar == 0 ? true : false"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Actualizar == 0">
                    No tienes permiso para ejecutar esta acción
                  </span>
                  <span v-else> Actualizar </span>
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
                  <span v-else>Eliminar</span>
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-grid>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useEmpresas from "src/modules/catalogoEmpresas/composables/useEmpresas.js";
const {
  columnasEmpresas,
  listaEmpresas,
  listarEmpresas,
  InsertarEmpresas,
  limpiarStore,
  bajaLogica,
  ModificarEmpresas,
} = useEmpresas();

import popupInfoGeneral from "src/modules/catalogoEmpresas/components/popupInfoGeneral.vue";
import popupEmpresasCT from "src/modules/catalogoEmpresas/components/popupEmpresasCT.vue";

const pagination = ref({
  rowsPerPage: 10,
});
const router = useRouter();
const status = ref(false);
const nuevo = ref(false);
const dialog = ref(false);

const tab = ref("informacionGeneralEmpr");
const registroID = ref(0);
const $q = useQuasar();

watch(dialog, (newValue) => {
  if (!newValue) {
    tab.value = "informacionGeneralEmpr";
  }
});

const informacionGeneralEmprTab = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});
const popupEmpresasCTTab = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualidad: 1,
  Registrar: 1,
});

const nuevoRegistro = () => {
  nuevo.value = true;
  registroID.value = 0;
  dialog.value = true;
};

const EmpresasBE = ref({
  Accion: 1,
});

onMounted(async () => {
  // console.log("lael nombre ruta", router.params.nombre);
  const response = await listarEmpresas(EmpresasBE.value);
  console.log("hola : =>", router.currentRoute.value.params.name);
});

const llenarEditar = (tableRow) => {
  nuevo.value = false;
  registroID.value = tableRow.EmprCata_ID;
  dialog.value = true;
};

const eliminar = (tableRow) => {
  $q.dialog({
    title: "¿Seguro que quieres eliminar?",
    message: "Se cambiara el estatus a inactivo",
    cancel: true,
    html: true,
  }).onOk(async () => {
    const fila = {
      EmprCata_ID: tableRow.EmprCata_ID,
      Accion: 2,
    };
    const response = await ModificarEmpresas(fila);
    if (response.data.bolRespuesta) {
      $q.notify({
        message: "Registro dado de baja",
        color: "Green",
      });
      await listarEmpresas(EmpresasBE.value);
    } else {
      $q.notify({
        message: "Error al guardar registro",
        color: "negative",
      });
    }
  });
};

const recibeID = async (ID) => {
  registroID.value = ID;
};
</script>
