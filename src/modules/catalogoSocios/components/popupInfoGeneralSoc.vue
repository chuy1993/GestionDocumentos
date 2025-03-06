<template>
  <form @submit.prevent.stop="onSubmit">
    <div class="row">
      <div class="col-md-6">
        <q-card-section class="row items-center q-gutter-sm">
          <q-input
            label="Nombre Completo"
            v-model="SociosBE.SociCata_Nombre"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-input
            label="Teléfono"
            v-model="SociosBE.SociCata_Telefono"
            mask="(###) ### - ####"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-input
            label="Razón Social"
            v-model="SociosBE.SociCata_RazonSocial"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-input
            label="Buzón Tributario"
            v-model="SociosBE.SociCata_Buzon"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-input
            label="Correo"
            v-model="SociosBE.SociCata_Correo"
            dense
            outlined
            style="width: 250px"
            :rules="[validarCorreo]"
            :hint="mensajeCorreo"
            error-message="Ingresa un Correo Correcto"
            :error="!isValidCorreo"
          ></q-input>
          <!-- <q-input
            label="Regimen"
            v-model="SociosBE.SociCata_Regimen"
            dense
            outlined
            style="width: 250px"
            hint=""
          ></q-input> -->
          <selectRegimenFiscal
            :RegFis_Id="RegFis_Id"
            :regimenFiscal="regimenFiscal"
            @recibeRegimenFiscalNombre="recibeRegimenFiscalNombre"
          />
        </q-card-section>
      </div>
      <div class="col-md-6">
        <q-card-section class="row items-center q-gutter-sm">
          <q-input
            label="RFC"
            v-model="SociosBE.SociCata_RFC"
            dense
            outlined
            style="width: 250px"
            :rules="[validarRFC]"
            mask="XXXXXXXXXXXXX"
            :hint="mensajeRFC"
            error-message="Ingresa un RFC Correcto"
            :error="!isValidRFC"
          ></q-input>
          <q-input
            label="CURP"
            v-model="SociosBE.SociCata_CURP"
            dense
            outlined
            style="width: 250px"
            :rules="[validarCURP]"
            mask="XXXXXXXXXXXXXXXXXX"
            :hint="mensajeCURP"
            error-message="Ingresa un CURP Correcto"
            :error="!isValidCURP"
          ></q-input>
          <q-input
            label="CIEC"
            v-model="SociosBE.SociCata_CIEC"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-input
            label="CIP"
            v-model="SociosBE.SociCata_CIP"
            dense
            outlined
            style="width: 250px"
          ></q-input>
          <q-select
            label="Tipo"
            v-model="tipo"
            :options="optionsSocioTipo"
            dense
            outlined
            style="width: 250px"
          >
          </q-select>
          <q-checkbox label="Estatus" v-model="status" v-if="!nuevo" />
        </q-card-section>
      </div>
    </div>
    <q-card-actions align="right">
      <q-btn
        flat
        label="Cerrar"
        icon="las la-times-circle"
        color="negative"
        v-close-popup="cancelEnabled"
      />
      <q-btn
        align="right"
        flat
        color="green"
        icon="las la-save"
        label="guardar"
        type="submit"
        :disable="
          !SociosBE.SociCata_Nombre ||
          !SociosBE.SociCata_Telefono ||
          !SociosBE.SociCata_RazonSocial ||
          !SociosBE.SociCata_Buzon ||
          !SociosBE.SociCata_Correo ||
          !SociosBE.SociCata_Regimen ||
          !SociosBE.SociCata_RFC ||
          !SociosBE.SociCata_CURP ||
          !SociosBE.SociCata_CIEC ||
          !SociosBE.SociCata_CIP
        "
      />
    </q-card-actions>
  </form>
</template>
<script setup>
import { onMounted, ref, toRefs, watch, computed } from "vue";
import selectRegimenFiscal from "src/modules/catalogoRegimenFiscal/components/selectRegimenFiscal.vue";
import { ClosePopup, useQuasar } from "quasar";
import useSocios from "../composables/useSocios.js";

const $q = useQuasar();
const {
  columnasSocios,
  limpiarStore,
  listaSocios,
  listarSocios,
  consultaTipo,
  consultaSocio,
  InsertaSocios,
  ModificaSocios,
  listarEmpresas,
  columnasSociosRelacionEmpresas,
  listaSociosRelacionEmpresas,
  listarRelacionSociosEmpresas,
  InsertaRelacion,
  limpiaTablaRelacion,
  EliminaRelacionEmpresa,
  cosnultaInfoSociosPopUp,
} = useSocios();

const regimenFiscal = ref("");
const socios = ref({});
const corp = ref(1);
const optionsSocioTipo = ref([]);

const props = defineProps({
  Socio_Id: {
    type: Number,
    default: 0,
  },
  clonacion: {
    type: Boolean,
    default: false,
  },
});
const { Socio_Id, clonacion } = toRefs(props);

const SociCata_ID = ref(0);

const emits = defineEmits(["recibeID", "tipoSocio"]);

const SociosBE = ref({
  Accion: 1,
  SociCata_ID: 0,
  SociCata_Nombre: "",
  SociCata_SociosTipo_ID: 0,
  SociCata_Telefono: "",
  SociCata_RazonSocial: "",
  SociCata_Buzon: "",
  SociCata_RFC: "",
  SociCata_Correo: "",
  SociCata_Regimen: "",
  SociCata_CURP: "",
  SociCata_Ciec: "",
  SociCata_Cip: "",
  SociCata_Status: true,
  SociCata_Corp_ID: 1,
});
const status = ref(true);
const itemBuscarSociosBE = ref({ Accion: 1 });
const valida = ref(false);
const tipo = ref(null);

const isValidRFC = ref(false);
const isValidCURP = ref(false);
const isValidCorreo = ref(false);
const SociCata_Id = computed(() => selected_ID.value);
const SociCata_Tipo = computed(() => selected_Tipo.value);
const SociCata_Nombre = computed(() => selected_Nombre.value);
const mensajeRFC = ref("");
const mensajeCURP = ref("");
const mensajeCorreo = ref("");
const selected_ID = ref({});
const selected_Tipo = ref({});
const selected_Nombre = ref({});
const tabRE = ref(false);

const accionesModulo = ref({
  Eliminar: 1,
  Ingresar: 0,
  Actualidad: 1,
  Registrar: 1,
});
const item = ref({
  Accion: 1,
  SociCata_Corp_ID: corp.value,
});
const ls = ref({
  Accion: 3,
  SociCata_Corp_ID: corp.value,
});
const item2 = ref({
  Accion: 3,
  SociCata_Corp_ID: corp.value,
});
watch(tipo, (newValue) => {
  if (newValue != undefined) {
    SociosBE.value.SociCata_SociosTipo_ID = newValue.value;
  }
});

watch(status, (newValue) => {
  if (newValue != undefined) {
    SociosBE.value.SociCata_Status = newValue;
  }
});

//aqui la funcion para consultar el sp que cargara la info del formulario
onMounted(async () => {
  SociCata_ID.value = Socio_Id.value;
  optionsSocioTipo.value = await consultaTipo(item.value);
  // if (SociCata_ID.value > 0 && clonacion.value == false) {
  const consultar = {
    Accion: 2,
    SociCata_ID: SociCata_ID.value,
    SociCata_Corp_ID: corp.value,
  };
  const response = await cosnultaInfoSociosPopUp(consultar);
  console.log("onMounted", response);
  if (response.bolRespuesta && response.Lista.length > 0) {
    SociosBE.value.SociCata_ID = response.Lista[0].SociCata_ID;
    SociosBE.value.SociCata_Nombre = response.Lista[0].SociCata_Nombre;
    tipo.value = optionsSocioTipo.value.filter(
      (item) => item.label == response.Lista[0].SociTipo_Tipo
    )[0];
    SociosBE.value.SociCata_Telefono = response.Lista[0].SociCata_Telefono;
    SociosBE.value.SociCata_RazonSocial =
      response.Lista[0].SociCata_RazonSocial;
    SociosBE.value.SociCata_Buzon = response.Lista[0].SociCata_Buzon;
    SociosBE.value.SociCata_RFC = response.Lista[0].SociCata_RFC;
    SociosBE.value.SociCata_Correo = response.Lista[0].SociCata_Correo;
    SociosBE.value.SociCata_Regimen = response.Lista[0].SociCata_Regimen;
    SociosBE.value.SociCata_CURP = response.Lista[0].SociCata_CURP;
    SociosBE.value.SociCata_CIEC = response.Lista[0].SociCata_CIEC;
    SociosBE.value.SociCata_CIP = response.Lista[0].SociCata_CIP;
    status.value = response.Lista[0].SociCata_Status;

    SociCata_ID.value = clonacion.value == true ? 0 : Socio_Id.value;
    SociosBE.value.SociCata_ID = clonacion.value == true ? 0 : Socio_Id.value;
    regimenFiscal.value = response.Lista[0].SociCata_Regimen;

    emits("recibeID", response.Lista[0].SociCata_ID);
  }

  // }
});
watch(tipo, (newValue) => {
  emits("tipoSocio", newValue.value);
});

const limpiarForm = () => {
  SociosBE.value.SociCata_Nombre = "";
  SociosBE.value.SociCata_ID = 0;
  SociosBE.value.SociCata_SociosTipo_ID = 0;
  SociosBE.value.SociCata_Telefono = "";
  SociosBE.value.SociCata_RazonSocial = "";
  SociosBE.value.SociCata_Buzon = "";
  SociosBE.value.SociCata_RFC = "";
  SociosBE.value.SociCata_Correo = "";
  SociosBE.value.SociCata_Regimen = "";
  SociosBE.value.SociCata_CURP = "";
  SociosBE.value.SociCata_CIEC = "";
  SociosBE.value.SociCata_CIP = "";

  status.value = true;
};

async function onSubmit() {
  //let SociTipo_ID = tipo.value.value;
  //valida.value = false;
  let acc = 0;
  if (SociCata_ID.value == 0) {
    acc = 1;
  } else {
    acc = 2;
  }
  // {
  //   valida.value = true;
  // }
  if (SociosBE.value.SociCata_SociosTipo_ID == 0) {
    $q.notify({
      message: "Debes seleccionar un tipo de socio",
      color: "negative",
    });
    return;
  }
  // if (SociosBE.value.SociCata_SociosTipo_ID > 0) {
  //   console.log("tipo socio", SociosBE.value.SociTipo_ID);
  //   // tipo.value = socios.value.tipo_ID;
  // }
  //nuevo
  //valida.value = true;
  let response = [];
  // if (SociosBE.value.SociCata_ID == 0) {
  if (SociCata_ID.value == 0) {
    response = await InsertaSocios(SociosBE.value);
    console.log("respuesta de la insercion,", response);
    if (
      SociosBE.value.SociCata_SociosTipo_ID == 1 &&
      response.data.bolRespuesta
    ) {
      emits("recibeID", response.data.Lista[0].SociCata_ID);
    }
  } else {
    response = await ModificaSocios(SociosBE.value);
    console.log("respuesta de la edicion,", response);
  }
  //}
  if (response.data.strError != null && response.data.strError.length > 0) {
    $q.notify({
      message: response.data.strError,
      color: "negative",
    });
    await listarSocios(itemBuscarSociosBE.value);
  } else {
    $q.notify({
      message: "Registro guardado",
      color: "Green",
    });
    await listarSocios(itemBuscarSociosBE.value);
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
    SociosBE.value.SociCata_RFC.length == 0
      ? ""
      : SociosBE.value.SociCata_RFC.trim().toUpperCase();
  const rfcCorrecto = rfcValido(rfc);
  if (!rfcCorrecto) {
    isValidRFC.value = false;
    //mensajeRFC.value="RFC Incorrecto"
  } else {
    isValidRFC.value = true;
    mensajeRFC.value = "RFC Correcto";
  }
}

//Función para validar una CURP
function curpValida(curp) {
  var re =
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
    validado = curp.match(re);

  if (!validado)
    //Coincide con el formato general?
    return false;

  //Validar que coincida el dígito verificador
  function digitoVerificador(curp17) {
    //Fuente https://consultas.curp.gob.mx/CurpSP/
    var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
      lngSuma = 0.0,
      lngDigito = 0.0;
    for (var i = 0; i < 17; i++)
      lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
    lngDigito = 10 - (lngSuma % 10);
    if (lngDigito == 10) return 0;
    return lngDigito;
  }

  if (validado[2] != digitoVerificador(validado[1])) return false;

  return true; //Validado
}
//Lleva la CURP a mayúsculas para validarlo
function validarCURP() {
  const curp =
    SociosBE.value.SociCata_CURP.length == 0
      ? ""
      : SociosBE.value.SociCata_CURP.trim().toUpperCase();
  if (curpValida(curp)) {
    isValidCURP.value = true;
    mensajeCURP.value = "CURP Correcto";
  } else {
    isValidCURP.value = false;
    mensajeCURP.value = "CURP Incorrecto";
  }

  //resultado.innerText = "CURP: " + curp + "\nFormato: " + valido;
}
function validarCorreo() {
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const correo = SociosBE.value.SociCata_Correo;

  if (!correoRegex.test(correo)) {
    isValidCorreo.value = false;
    //mensajeCorreo.value = "Formato no valido"
  } else {
    isValidCorreo.value = true;
    mensajeCorreo.value = "";
  }
}

const recibeRegimenFiscalNombre = (objetoRegimen) => {
  let nombreRegimen = objetoRegimen.label.split(":");
  SociosBE.value.SociCata_Regimen = nombreRegimen[1];
};
</script>
