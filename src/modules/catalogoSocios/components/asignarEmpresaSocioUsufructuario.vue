<template>
  <q-dialog v-model="agregar">
    <q-card>
      <form @submit.prevent.stop="registrarRelacionSocioUsufructuarioEmpresa">
        <q-card-section class="row items-center q-gutter-sm">
          <q-select
            label="Empresa"
            v-model="empresa"
            ref="tipoRef"
            :options="lstEmpresa"
            dense
            outlined
            style="width: 250px"
          ></q-select>
          <q-btn
            color="positive"
            icon="las la-plus"
            dense
            label="Agregar"
            @click="enviaRegistro()"
          />
          <q-btn
            flat
            label="Cerrar"
            icon="las la-times-circle"
            color="negative"
            v-close-popup="cancelEnabled"
          />
          <q-separator />
          <q-grid
            :columns="getColumnasEmpresasSocioUsufructuario"
            :data="getListaEmpresasSocioUsufructuario"
            :global_search="true"
            :columns_filter="true"
            :fullscreen="true"
            :loading="loading"
            :csv_download="true"
            style="width: 100%"
          >
            <!-- :pagination="pagination" -->
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="RelaSociEmp_ID">
                  {{ props.row.RelaSociEmp_ID }}
                </q-td>
                <q-td key="Empresa">
                  {{ props.row.Empresa }}
                </q-td>
                <q-td key="RelaSociEmp_ID">
                  <!-- <q-btn
                    icon="las la-edit"
                    color="primary"
                    size="sm"
                    dense
                    @click="editaRegistro(props.row.RelaSociEmp_ID)"
                  >
                    <q-tooltip>Editar</q-tooltip>
                  </q-btn> -->

                  <!-- v-if="props.row.Esta_Tic_Estatus == 'ACTIVO'" -->
                  <q-btn
                    class="q-ml-sm"
                    icon="las la-trash"
                    color="negative"
                    size="sm"
                    dense
                    @click="eliminarRegistro(props.row)"
                  >
                    <q-tooltip>Eliminar</q-tooltip>
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-grid>
        </q-card-section>
        <q-card-actions align="right"> </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { toRefs, ref, onMounted, watch } from "vue";
import useSociosUsuafructuariosEmpresa from "src/modules/catalogoSocios/composables/useSociosUsuafructuariosEmpresa.js";
const {
  registroRelacion,
  Listar,
  getListaEmpresasSocioUsufructuario,
  getColumnasEmpresasSocioUsufructuario,
  Registrar,
  Eliminar,
} = useSociosUsuafructuariosEmpresa();
import useSocios from "../composables/useSocios.js";
const { listarRelacionSociosEmpresas, listaSociosRelacionEmpresas } =
  useSocios();
import { useQuasar } from "quasar";

const props = defineProps({
  Rela_SociCataSocio_ID: {
    type: Number,
    default: 0,
  },
  Rela_ID: {
    type: Number,
    default: 0,
  },
  dialogAsignaEmpresa: {
    type: Boolean,
    default: false,
  },
});

const { Rela_SociCataSocio_ID, Rela_ID, dialogAsignaEmpresa } = toRefs(props);
const agregar = ref(false);
const $q = useQuasar();
const empresa = ref(null);
const lstEmpresa = ref(null);
const loading = ref(false);
const objRelacion = ref({
  RelaSociEmp_ID: 0,
  RelaSociEmp_Rela_ID: 0,
  RelaSociEmp_EmprCata_ID: 0,
});

// RelaSociEmp_ID:0,
// RelaSociEmp_Rela_ID:21,
// RelaSociEmp_EmprCata_ID:5

const objRelacionSocioEmpresa = ref({
  Accion: 2,
  RelaSoc_Emp_SociCata_ID: 0,
  RelaSoc_Emp_Corp_ID: 1,
});

const emits = defineEmits("limpiaFormRelacion");

// onMounted(async()=>{
//   // lstEmpresa.value = await listarEmpresas();
// })

watch(Rela_SociCataSocio_ID, async (newValue) => {
  lstEmpresa.value = [];
  // debugger;
  if (newValue > 0) {
    objRelacionSocioEmpresa.value.RelaSoc_Emp_SociCata_ID = newValue;
    await listarRelacionSociosEmpresas(objRelacionSocioEmpresa.value);
    Object.keys(listaSociosRelacionEmpresas.value).forEach((key) => {
      //   let indice = getListaEmpresasSocioUsufructuario.value.findIndex(item=>
      //       trim(item.Empresa)==trim(listaSociosRelacionEmpresas.value[key].EmprCata_Nombre)
      // );
      //   console.log("El indice"+key,indice);
      lstEmpresa.value.push({
        value: listaSociosRelacionEmpresas.value[key].RelaSoc_Emp_ID,
        label: listaSociosRelacionEmpresas.value[key].EmprCata_Nombre,
        disable: false,
      });
    });
    // loading.value = true;
    await Listar(Rela_ID.value, lstEmpresa.value);
    // loading.value = false;
    Object.keys(getListaEmpresasSocioUsufructuario.value).forEach((key) => {
      let indice = lstEmpresa.value.findIndex(
        (item) =>
          item.label == getListaEmpresasSocioUsufructuario.value[key].Empresa
      );
      if (indice >= 0) {
        lstEmpresa.value[indice].disable = true;
      }
    });

    agregar.value = true;
  }
});

// watch(getListaEmpresasSocioUsufructuario.value, (newValue) => {
//   debugger;
//   Object.keys(lstEmpresa.value).forEach((key) => {
//     lstEmpresa.value[key].disable = false;
//   });
//   Object.keys(newValue).forEach((key) => {
//     let indice = lstEmpresa.value.findIndex(
//       (item) => item.label == newValue.Empresa
//     );
//     if (indice >= 0) {
//       lstEmpresa.value[indice].disable = true;
//     }
//   });
// });

watch(Rela_ID, (newValue) => {
  objRelacion.value.RelaSociEmp_Rela_ID = newValue;
});

watch(empresa, (newValue) => {
  if (newValue != null) {
    objRelacion.value.RelaSociEmp_EmprCata_ID = newValue.value;
  }
});

watch(agregar, (newValue) => {
  if (!newValue) {
    emits("limpiaFormRelacion", newValue);
    limpiarForm();
  }
});

const registrarRelacionSocioUsufructuarioEmpresa = () => {
  // debugger;
  console.log("objRelacion", objRelacion.value);
  $q.dialog({
    title: "Registro de relación",
    message: "Deseas registrar la relacion indicada?",
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      // console.log('>>>> OK')
      console.log("objRelacion.value", objRelacion.value);
      const response = await registroRelacion(objRelacion.value);

      $q.notify({
        message: response.bolRespuesta
          ? "Registro correcto"
          : "Error al registrar: " + response.strError,
        color: response.bolRespuesta ? "positive" : "negative",
      });
      empresa.value = null;
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
      empresa.value = null;
    });
};
const limpiarForm = () => {
  objRelacion.value.RelaSociEmp_ID = 0;
  objRelacion.value.RelaSociEmp_Rela_ID = 0;
  objRelacion.value.RelaSociEmp_EmprCata_ID = 0;
  agregar.value = false;
  empresa.value = null;
};

const enviaRegistro = async () => {
  const response = await Registrar(objRelacion.value);
  $q.notify({
    message: response.bolRespuesta
      ? "Operación realizada correctamente"
      : "Error al ejecutar la operación solicitada",
    color: response.bolRespuesta ? "positive" : "negative",
  });
  if (response.bolRespuesta) {
    loading.value = true;
    await Listar(Rela_ID.value, lstEmpresa.value);
    loading.value = false;
    Object.keys(getListaEmpresasSocioUsufructuario.value).forEach((key) => {
      let indice = lstEmpresa.value.findIndex(
        (item) =>
          item.label == getListaEmpresasSocioUsufructuario.value[key].Empresa
      );
      if (indice >= 0) {
        lstEmpresa.value[indice].disable = true;
      }
    });
    empresa.value = null;
  }
};

const eliminarRegistro = (row) => {
  $q.dialog({
    title: "Eliminar empresa",
    message: "realmente desea eliminar el registro seleccionado?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const response = await Eliminar(row.RelaSociEmp_ID);
    $q.notify({
      message: response.bolRespuesta
        ? "Eliminado correctamente"
        : "Error al eliminar: " + response.strError,
      color: response.bolRespuesta ? "positive" : "negative",
    });
    if (response.bolRespuesta) {
      // loading.value = true;
      // await Listar(Rela_ID.value, lstEmpresa.value);
      // loading.value = false;
      Object.keys(lstEmpresa.value).forEach((key) => {
        let indice = getListaEmpresasSocioUsufructuario.value.findIndex(
          (item) => item.Empresa == lstEmpresa.value[key].label
        );
        if (indice >= 0) {
          lstEmpresa.value[key].disable = true;
        } else {
          lstEmpresa.value[key].disable = false;
        }
      });
    }
  });
};
</script>
