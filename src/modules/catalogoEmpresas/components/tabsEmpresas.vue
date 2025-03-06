<template>
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
        :disable="informacionGeneralEmprTab.Ingresar == 0 ? true : false"
      />
      <q-tab
        class="tabs"
        name="datos"
        icon="las la-building"
        label="Relación Empresas"
        :disable="computed_empleado_Id"
      />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="informacionGeneralEmpr">
        {{ empleado_Id }}
        {{ recibe_Id }}
        <popupInfoGeneral
          :empleado_Id="com_empleado_id"
          @recibeID="recibeID"
        ></popupInfoGeneral>
        <!-- :propNew="propNew"
        :propEdit="propEdit" -->
      </q-tab-panel>

      <q-tab-panel name="datos">
        <div class="q-pa-md row q-gutter-md d-flex justify-center align-center">
          <q-card fixed flat bordered style="width: 150%">
            <q-card-section>
              {{ empleado_Id }}
              {{ recibe_Id }}
              <popupEmpresasCT :empleado_Id="empleado_Id" :recibe_Id="recibe_Id"></popupEmpresasCT>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>
<script setup>
import { ref, toRefs, onMounted, computed, defineProps, watch } from "vue";
import popupInfoGeneral from "src/modules/catalogoEmpresas/components/popupInfoGeneral.vue";
import popupEmpresasCT from "src/modules/catalogoEmpresas/components/popupEmpresasCT.vue";

// const {EmprCata_Id} = toRefs(props)
const tab = ref("informacionGeneralEmpr");
//const {EmprCata_Nombre} = toRefs(props)

const props = defineProps({
  empleado_Id: {
    type: Number,
    default: 0,
  },
  dialog: {
    type: Boolean,
    default: false,
  },
});

const { empleado_Id, dialog } = toRefs(props);
const recibe_Id = ref(0);
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

watch(dialog, (newValue) => {
  if (newValue == false )
  recibe_Id.value = 0
});

const com_empleado_id = computed(() =>
  empleado_Id.value > 0
    ? empleado_Id.value
    : recibe_Id.value > 0
    ? recibe_Id.value
    : 0
);

const computed_empleado_Id = computed(() =>
  empleado_Id.value > 0 || recibe_Id.value > 0 ? false : true
);
onMounted(async () => {
  console.log("ID en tabsEmpresas", empleado_Id.value);
});

const recibeID = (ID) => {
  recibe_Id.value = ID;
};
</script>

<style>
.tabs {
  border-top: 1px solid #9e9e9e;
  border-radius: 10px 10px 0 0;
}
</style>
