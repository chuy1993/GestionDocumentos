<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">
      Empresas de CT relacionadas con {{ EmprCata_Nombre }}
    </div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="positive"
      @click="nuevoRegistro()"
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso de ejecutar esta acción
        </span>
        <span v-else> Agregar empresa </span>
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="agregar">
      <q-card>
        <form @submit.prevent.stop="onSubmit">
          <q-card-section class="row items-center q-gutter-sm">
            <empresa
              @funcionEjemplo="funcionEjemplo"
              :prop1="true"
              v-if="!emp"
            ></empresa>
            <empresa
              @funcionEjemplo="funcionEjemplo"
              :prop1="true"
              v-if="emp"
              v-model="empresas.Empresa"
            ></empresa>
            <q-checkbox label="Estatus" v-model="status" v-if="!nuevo" />
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
              icon="las la-save"
              type="submit"
              :disable="guarda"
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
  <div class="q-pa-md">
    <q-grid
      class="q-ma-sm"
      bordered
      :data="listaEmpresasRelacion"
      :columns="columnasEmpresasRelacion"
      :columns-filter="false"
      :pagination="pagination"
    >
      <template v-slot:body="props">
        <q-tr props:props v-if="Object.entries(props.row).length > 0">
          <q-td key="RelaEmpr_ID"> {{ props.row["RelaEmpr_ID"] }} </q-td>
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
                <span v-else> Eliminar</span>
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
import useEmpresas from "../composables/useEmpresas";

const $q = useQuasar();
const pagination = ref(null);
const agregar = ref(false);
const guarda = ref(true);
const sociosUsuf = ref("");

const variable = ref(null);
const Empresa = ref([]);
const emp = ref(false);
const cor = ref(false);
const registroID = ref(0);
const status = ref(false);

const props = defineProps({
  EmprCata_ID: {
    type: Number,
    default: 0,
  },
});
const nuevoRegistro = () => {
  emp.value = false;
  nuevo.value = true;
  dialog.value = true;
};
const { EmprCata_ID } = toRefs(props);

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualidad: 1,
  Registrar: 1,
});

const filtraEmpresa = async (Empr_ID, Empr_NombreCorto) => {};

const item = ref({
  RelaEmpr_EmprCata_ID: EmprCata_ID.value,
});

onMounted(async () => {
  const response = await listarRelacionEmpresas(item.value);
  console.log("front", response);
  console.log("lista", listaEmpresas.value);
});

// const llenarEditar = async (tableRow) => {
//   emp.value = true;
//   nuevo.value = false;
//   console.log("tabla", tableRow);
//   funcionEjemplo(tableRow.Empr_ID);
//   registroID.value = tableRow.RelaEmpr_ID;
//   empresas.value.Empresa = tableRow.Empr_NombreCorto;
//   empresas.value.Corporativo = tableRow.Corp_NombreCorto;
//   status.value = tableRow.RelaEmpr_Estatus;

//   dialog.value = true;
// };

// const eliminar = async (tableRow) => {
//   $q.dialog({
//     title: "¿Seguro que quieres eliminar?",
//     message: "Se cambiara el estatus a inactivo",
//     cancel: true,
//     html: true,
//   }).onOk(async () => {
//     const fila = {
//       EmprCata_ID: tableRow.EmprCata_ID,
//       Accion: 2,
//     };
//     const response = await ModificarEmpresas(fila);
//     if (response.data.bolRespuesta) {
//       $q.notify({
//         message: "Registro dado de baja",
//         color: "Green",
//       });
//       await listarEmpresas(item.value);
//     } else {
//       $q.notify({
//         message: "Error al guardar registro",
//         color: "negative",
//       });
//     }
//   });
// };
</script>
