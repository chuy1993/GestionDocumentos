<template>
  <form @submit.prevent.stop="onSubmit">
    <!-- <div class="q-pt-sm q-ml-xs row items-start q-gutter-sm"> -->
    <q-input
      class="q-ma-sm"
      label="Nombre"
      v-model="EmpresaBE.EmprCata_Nombre"
      dense
      outlined
      clearable
    ></q-input>
    <q-input
      class="q-ma-sm"
      label="RFC"
      v-model="EmpresaBE.EmprCata_RFC"
      mask="XXXXXXXXXXXXX"
      dense
      outlined
      clearable
      :rules="[validarRFC]"
      :error="!rfcValido(EmpresaBE.EmprCata_RFC)"
    ></q-input>
    <selectRegimenFiscal
      :RegFis_Id="RegFis_Id"
      :regimenFiscal="regimenFiscal"
      @recibeRegimenFiscalNombre="recibeRegimenFiscalNombre"
    />
    <!-- <q-input
      class="q-ma-sm"
      label="Regimen"
      v-model="EmpresaBE.EmprCata_Regimen"
      dense
      outlined
      clearable
    ></q-input> -->
    <q-input
      class="q-ma-sm"
      label="Nota"
      v-model="EmpresaBE.EmprCata_Nota"
      dense
      outlined
      clearable
    ></q-input>

    <q-input
      label="Nomenclatura"
      v-model="EmpresaBE.EmprCata_Nomenclatura"
      readonly
      class="q-ma-sm"
    ></q-input>
    <q-checkbox label="Estatus" v-model="status"></q-checkbox>
    <!-- </div> -->
    <q-separator></q-separator>
    <div class="float-right q-mt-md q-mb-md">
      <q-btn
        class="q-pr-sm"
        flat
        icon="las la-times-circle"
        label="Cerrar"
        color="negative"
        dense
        v-close-popup="cancelEnabled"
        @click="cerrarDialog"
      />
      <q-btn
        align="right"
        flat
        label="Guardar"
        color="green"
        dense
        icon="las la-save"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup>
import { ref, watch, toRefs, onMounted } from "vue";
import { ClosePopup, useQuasar } from "quasar";
import useEmpresas from "src/modules/catalogoEmpresas/composables/useEmpresas.js";
import selectRegimenFiscal from "src/modules/catalogoRegimenFiscal/components/selectRegimenFiscal.vue";
const {
  // limpiarStore,
  listarEmpresas,
  InsertarEmpresas,
  ModificarEmpresas,
  consultaInfoEmpresasSociosPopUp,
  listaEmpresas2,
} = useEmpresas();
const regimenFiscal = ref("");
const RegFis_Id = ref("");

const props = defineProps({
  Empresa_Id: {
    type: Number,
    default: 0,
  },
});

const { Empresa_Id } = toRefs(props);

const emits = defineEmits("recibeID");

const EmpresaBE = ref({
  Accion: 1,
  EmprCata_ID: 0,
  EmprCata_Nombre: "",
  EmprCata_RFC: "",
  EmprCata_Regimen: "",
  EmprCata_Nomenclatura: "",
  EmprCata_Nota: "",
  EmprCata_Estatus: true,
  SisCUsuario: localStorage.getItem("usuario"),
  SisMUsuario: localStorage.getItem("usuario"),
});

const status = ref(true);
const itemBuscarEmpresaBE = ref({ Accion: 1 });
const valida = ref(false);
const usuario = localStorage.getItem("usuario");

const $q = useQuasar();

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualidad: 1,
  Registrar: 1,
});

const valid_nomenclatura = ref(0);

//aqui función para consultar SP que cargara la informacion del formulario
onMounted(async () => {
  if (Empresa_Id.value > 0) {
    const consultar = {
      Accion: 2,
      EmprCata_ID: Empresa_Id.value,
    };
    const response = await consultaInfoEmpresasSociosPopUp(consultar);
    if (response.bolRespuesta && response.Lista.length > 0) {
      EmpresaBE.value.EmprCata_ID = response.Lista[0].EmprCata_ID;
      EmpresaBE.value.EmprCata_Nombre = response.Lista[0].EmprCata_Nombre;
      EmpresaBE.value.EmprCata_RFC = response.Lista[0].EmprCata_RFC;
      EmpresaBE.value.EmprCata_Regimen = response.Lista[0].EmprCata_Regimen;
      EmpresaBE.value.EmprCata_Nomenclatura =
        response.Lista[0].EmprCata_Nomenclatura;
      EmpresaBE.value.EmprCata_Nota = response.Lista[0].EmprCata_Nota;
      status.value = response.Lista[0].EmprCata_Estatus;
      regimenFiscal.value = response.Lista[0].EmprCata_Regimen;
      emits("recibeID", response.Lista[0].EmprCata_ID);
    }
  }
});

const limpiarForm = () => {
  EmpresaBE.value.EmprCata_ID = 0;
  EmpresaBE.value.EmprCata_Nombre = "";
  EmpresaBE.value.EmprCata_RFC = "";
  EmpresaBE.value.EmprCata_Regimen = "";
  EmpresaBE.value.EmprCata_Nomenclatura = "";
  EmpresaBE.value.EmprCata_Nota = "";
  EmpresaBE.value.EmprCata_Estatus = true;

  status.value = true;
};

async function onSubmit() {
  valida.value = false;
  let acc = 0;
  if (Empresa_Id.value == 0) {
    acc = 1;
  } else {
    acc = 2;
  }

  if (
    EmpresaBE.value.EmprCata_Nombre.length > 0 &&
    EmpresaBE.value.EmprCata_RFC.length > 0 &&
    EmpresaBE.value.EmprCata_Regimen.length > 0
  ) {
    valida.value = true;
  }
  let response = [];
  if (valida.value) {
    if (Empresa_Id.value == 0) {
      response = await InsertarEmpresas(EmpresaBE.value);
      console.log("Respuesta de la insercion,", response);
      EmpresaBE.value.EmprCata_Nomenclatura =
        response.data.Lista[0].EmprCata_Nomenclatura;
      emits("recibeID", response.data.Lista[0].EmprCata_ID);
      valid_nomenclatura.value = response.data.Lista[0].EmprCata_ID;
    } else {
      response = await ModificarEmpresas(EmpresaBE.value);
    }
  }
  if (response.data.Lista[0].mensaje1 != "") {
    $q.notify({
      message: response.data.Lista[0].mensaje1,
      color: "negative",
    });
  } else {
    $q.notify({
      message: "Registro guardado",
      color: "Green",
    });
    await listarEmpresas(itemBuscarEmpresaBE.value);
  }
}

// Función para validar el RFC
function rfcValido(rfc, aceptarGenerico = true) {
  const re =
    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  var validado = rfc.match(re);

  if (!validado) return false;

  const digitoVerificador = validado.pop(),
    rfcSinDigito = validado.slice(1).join(""),
    len = rfcSinDigito.length,
    diccionario = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
    indice = len + 1;
  var suma, digitoEsperado;

  if (len == 12) suma = 0;
  else suma = 481; //Ajuste para persona moral

  for (var i = 0; i < len; i++)
    suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
  digitoEsperado = 11 - (suma % 11);
  if (digitoEsperado == 11) digitoEsperado = 0;
  else if (digitoEsperado == 10) digitoEsperado = "A";

  if (
    digitoVerificador != digitoEsperado &&
    (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000")
  )
    return false;
  else if (
    !aceptarGenerico &&
    rfcSinDigito + digitoVerificador == "XEXX010101000"
  )
    return false;
  return rfcSinDigito + digitoVerificador;
}

// Función para validar la entrada del RFC
function validarRFC() {
  const rfc =
    EmpresaBE.value.EmprCata_RFC.length == 0
      ? ""
      : EmpresaBE.value.EmprCata_RFC.trim().toUpperCase(); // Obtén el valor del RFC y conviértelo a mayúsculas
  const rfcCorrecto = rfcValido(rfc);
  if (!rfcCorrecto) {
    $q.notify({
      message: "RFC no válido",
      color: "negative",
    });
  }
}

const recibeRegimenFiscalNombre = (objetoRegimen) => {
  let nombreRegimen = objetoRegimen.label.split(":");
  EmpresaBE.value.EmprCata_Regimen = nombreRegimen[1];
};
</script>
