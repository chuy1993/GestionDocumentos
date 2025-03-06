<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Relación Socios/Usufructuarios-Empresas</div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      @click="nuevoRegistro"
      :disable="accionesModulo.Registrar === 0"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar === 0">
          No tienes permiso para ejecutar esta acción
        </span>
        <span v-else>Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <q-select
            v-model="SociosUsuf"
            label="Socios-Usufructuario"
            use-input
            :options="optionsSociosUsuf"
            dense
            outlined
            style="width: 250px"
          />
          <q-select
            v-model="Empresas"
            label="Empresas"
            use-input
            :options="optionsEmpresas"
            dense
            outlined
            style="width: 250px"
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
            icon="las la-save"
            @click="enviarForm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <q-grid
        bordered
        :global-search="true"
        :data="listaRelacionSociosEmp"
        :columns="columnasRelacionSociosEmp"
        :columns-filter="true"
        :fullscreen="true"
        :loading="loading"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="RelaSociEmp_ID">{{ props.row.RelaSociEmp_ID }}</q-td>
            <q-td key="Socio">{{ props.row.Socio }} </q-td>
            <q-td key="Usufructuario">{{ props.row.Usufructuario }}</q-td>
            <q-td key="EmprCata_Nombre">{{ props.row.EmprCata_Nombre }}</q-td>
          </q-tr>
        </template>
      </q-grid>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from "quasar";
import useSociosEmpresas from "../composables/useSociosEmpresa.js";

const $q = useQuasar();
const dialog = ref(false);
const SociosUsuf = ref([]);
const Empresas = ref([]);
const optionsSociosUsuf = ref([]);
const optionsEmpresas = ref([]);
const pagination = ref({});

const {
  listaRelacionSociosEmp,
  columnasRelacionSociosEmp,
  listarSociosRelacion,
  consultaSelectSocios
} = useSociosEmpresas();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 1,
  Actualidad: 1,
  Registrar: 1,
});

pagination.value = {
  rowsPerPage: 15,
};

const item = ref({
  Accion: 1
})

const nuevoRegistro = () =>{
  dialog.value = true;
}

 onMounted( async() => {
  await listarSociosRelacion(item.value);
  optionsSociosUsuf.value = await consultaSelectSocios(item.value);
})

</script>
