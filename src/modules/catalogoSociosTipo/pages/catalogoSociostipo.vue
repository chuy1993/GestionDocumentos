<template>
  <formTipoSocios
    :abrirModal="abrirModal"
    :SociTipo_ID="SociTipo_ID"
    @actualizaRecargarGrid="actualizaRecargarGrid"
    @cerrarModal="cerrarModal"
  />
  <div class="q-pa-md">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <div class="text-h5">Tipos de socios</div>
        <q-separator />
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <q-btn
          class="q-mt-md"
          icon="las la-plus-circle"
          label="Crear nuevo"
          color="green"
          @click="nuevoRegistro"
          :disable="accionesModulo.Registrar == 0 ? true : false"
        >
          <q-tooltip>
            <span v-if="accionesModulo.Registrar == 0">
              No tienes permiso para ejecutar esta acción
            </span>
            <span v-else> Crear nuevo registro </span>
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12">
        <gridTipoSocios
          :recargarGrid="recargarGrid"
          @recibeSociTipo_ID="recibeSociTipo_ID"
          @abreModal="abreModal"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import gridTipoSocios from "../components/gridTipoSocios.vue";
import formTipoSocios from "../components/formTipoSocios.vue";

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualizar: 1,
  Registrar: 1,
});

const SociTipo_ID = ref(0);
const recargarGrid = ref(false);
const abrirModal = ref(false);

const recibeSociTipo_ID = (id) => {
  SociTipo_ID.value = id;
};

const actualizaRecargarGrid = (recargar) => {
  recargarGrid.value = recargar;
};

const cerrarModal = () => {
  abrirModal.value = false;
};

const abreModal = () => {
  abrirModal.value = true;
};

const nuevoRegistro = () => {
  // debugger;
  SociTipo_ID.value = 0;
  abrirModal.value = true;
};
</script>
