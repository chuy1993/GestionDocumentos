<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Empresas de {{ sociosNombre }}</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
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

    <q-dialog v-model="agregar">
      <q-card>
        <form @submit.prevent.stop="onSubmit">
          <q-card-section class="row items-center q-gutter-sm">
            <q-select
            label="Socios"
            v-model="Socio"
            :options="optionsSocio"
            dense
            outlined
            style="width: 250px"
            ></q-select>
            <q-select
            label="Empresas"
            v-model="Empresa"
            :options="optionsEmpresa"
            dense
            outlined
            style="width: 250px"
            ></q-select>
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
      :data="listaSociosRelacionEmpresas"
      :columns="columnasSociosRelacionEmpresas"
      :columns_filter="false"
      :pagination="pagination"
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
          </q-td>
        </q-tr>
      </template>
    </q-grid>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useSocios from "../composables/useSocios.js";
const $q = useQuasar();
const pagination = ref(null);
const agregar = ref(false);
const guarda = ref(true);
const Socio = ref("")
const Empresa = ref("")
const optionsSocio = ref([]);
const optionsEmpresa = ref([]);

const props = defineProps({
  SociCata_Id: {
    type: Number,
    default: 0,
  },
  SociCata_Nombre: {
    type: String,
    default: "",
  }
});

const { SociCata_Id } = toRefs(props);
const { SociCata_Nombre } = toRefs(props);
const sociosNombre = SociCata_Nombre.value;

const {
  columnasSociosRelacionEmpresas,
  listaSociosRelacionEmpresas,
  listarRelacionSociosEmpresas,
  listarSocios,
} = useSocios();

const item = ref({
  Accion: 2,
  RelaSoc_Emp_SociCata_ID: SociCata_Id.value,
  RelaSoc_Emp_Corp_ID: 1
});
const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualizar: 1,
  Registrar: 1,
});

const ls = ref({
  Accion: 3,
  SociCata_Corp_ID: 1
})

onMounted(async () => {
  console.log("ID popupEmpresas",SociCata_Id.value);
  console.log("item popup", item.value);
  const response = await listarRelacionSociosEmpresas(item.value);
  console.log("respuesta popup Empresas", response);
  optionsSocio.value = await listarSocios(ls.value);
  console.log("select socios", optionsSocio.value);
});

const llenaEditar = (tableRow) =>{
  agregar.value = true;
  console.log("tabla", tableRow);
}
const nuevoRegistro = () =>{
  agregar.value = true;
}
</script>
