<template>
  <div class="q-pa-sm">
    <q-card-section class="q-pt-sm row items-start">
      <q-select
        label="Empresas"
        v-model="Empresa"
        :options="filteredOptionsEmpresa"
        dense
        outlined
        align="left"
        style="width: 250px"
      ></q-select>
      <q-btn
        flat
        align="left"
        dense
        icon="las la-times-circle"
        label="Cerrar"
        color="negative"
        v-close-popup="cancelEnabled"
      />
      <q-btn
        flat
        dense
        align="left"
        color="green"
        icon="las la-save"
        label="Guardar"
        type="submit"
        @click="enviarFormEmpresas"
      />
    </q-card-section>
    <q-grid
      class="q-pa-md"
      bordered
      :data="listaSociosRelacionEmpresas"
      :columns="columnasSociosRelacionEmpresas"
      :columns_filter="false"
    >
      <template v-slot:body="props">
        <q-tr props:props v-if="Object.entries(props.row).length > 0">
          <q-td key="RelaSoc_Emp_ID">{{ props.row["RelaSoc_Emp_ID"] }}</q-td>
          <q-td key="SociCata_RazonSocial">{{
            props.row["SociCata_RazonSocial"]
          }}</q-td>
          <q-td key="EmprCata_Nombre">{{ props.row["EmprCata_Nombre"] }}</q-td>
          <q-td class="q-gutter-sm">
            <q-btn
              class="q-ma-xs float-left"
              round
              size="10px"
              icon="las la-trash"
              color="negative"
              @click="eliminarRelacion(props.row)"
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
import { onMounted, ref, toRefs, watch, computed } from "vue";
import { useQuasar } from "quasar";
import useSocios from "../composables/useSocios.js";
const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});
const corp = ref(1);
const optionsEmpresa = ref([]);
const registroID = ref(0);
const Empresa = ref("");
const $q = useQuasar();
const filteredOptionsEmpresa = ref([]);
const {
  listarRelacionSociosEmpresas,
  listaSociosRelacionEmpresas,
  InsertaRelacion,
  columnasSociosRelacionEmpresas,
  listarEmpresas,
  EliminaRelacionEmpresa,
} = useSocios();
const props = defineProps({
  Socio_Id: {
    type: Number,
    default: 0,
  },
});
const { Socio_Id } = toRefs(props);
const item = ref({
  RelaSoc_Emp_SociCata_ID: Socio_Id.value,
});
watch(Socio_Id, (newValue) => {
  console.log(newValue);
});
const RelacionSociosEmpresasBE = ref({
  Accion: 2,
  RelaSoc_Emp_SociCata_ID: Socio_Id.value,
  RelaSoc_Emp_Corp_ID: 1,
});

const listarEmp = ref({
  Accion: 1,
  EmprCata_ID: 0,
});
onMounted(async () => {
  optionsEmpresa.value = await listarEmpresas(listarEmp.value);
  filteredOptionsEmpresa.value = optionsEmpresa.value;

  const response = await listarRelacionSociosEmpresas(
    RelacionSociosEmpresasBE.value
  );
  console.log("respuesta relacion Empresas", response[0]);
  console.log("SociCata_ID front:", Socio_Id.value);
  console.log("ID de edicion", Socio_Id.value);
});

watch(listaSociosRelacionEmpresas, (newValue) => {
  Object.keys(filteredOptionsEmpresa.value).forEach((key) => {
    filteredOptionsEmpresa.value[key].disable = false;
  });

  Object.keys(newValue).forEach((key) => {
    let indice = filteredOptionsEmpresa.value.findIndex(
      (item1) => item1.label == newValue[key].EmprCata_Nombre
    );
    if (indice >= 0) {
      filteredOptionsEmpresa.value[indice].disable = true;
    }
  });
});

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
const enviarFormEmpresas = async () => {
  let relacion = {
    RelaSoc_Emp_SociCata_ID: Socio_Id.value,
    RelaSoc_Emp_EmprCata_ID: Empresa.value.value,
    RelaSoc_Emp_Corp_ID: corp.value,
  };
  console.log("relacion", relacion);
  const response = await InsertaRelacion(relacion);
  // console.log("mensaje", response.data.Lista[0].mensaje1);
  console.log("insertar", response);
  if (response.data.bolRespuesta) {
    Empresa.value = null;
    if (response.data.Lista[0].mensaje1 != "") {
      await listarRelacionSociosEmpresas(RelacionSociosEmpresasBE.value);
      $q.notify({
        message: response.data.Lista[0].mensaje1,
        color: "negative",
      });
    } else {
      $q.notify({
        message: "Relación registrada",
        color: "green",
      });
    }
  } else {
    $q.notify({
      message: "Error al registrar relación",
      color: "negative",
    });
  }
  await listarRelacionSociosEmpresas(RelacionSociosEmpresasBE.value);
};

const eliminarRelacion = async (tableRow) => {
  /* const response = await validaAccionIndividual(
    ElModuloPrincipal.value,
    "CatalogoSocios_Actualizar"
  );
  if (response) { */
  const item = ref({
    Accion: 2,
    RelaSoc_Emp_SociCata_ID: Socio_Id.value,
    RelaSoc_Emp_Corp_ID: 1,
  });
  $q.dialog({
    title: "¿Seguro que quieres eliminar la relación?",
    message: "Se borrará de la base de datos",
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
      RelaSoc_Emp_ID: tableRow.RelaSoc_Emp_ID,
    };
    const response = await EliminaRelacionEmpresa(fila);
    // if (response.bolRespuesta) {
    //   Object.keys(listarRelacionSociosEmpresas.value).forEach((key) => {
    //     let indice = filteredOptionsEmpresa.value.findIndex(
    //       (item) =>
    //         item.label == listarRelacionSociosEmpresas.value[key].Empresa
    //     );
    //     if (indice >= 0) {
    //       filteredOptionsEmpresa.value.findIndex.value[indice].disable = false;
    //     }
    //   });
    //   Empresa.value = null;
    // }
    if (response) {
      await listarRelacionSociosEmpresas(item.value);
      $q.notify({
        message: "Registro eliminado",
        color: "green",
      });
    } else {
      $q.notify({
        message: "Error al eliminar registro",
        color: "negative",
      });
    }
  });
};
</script>
