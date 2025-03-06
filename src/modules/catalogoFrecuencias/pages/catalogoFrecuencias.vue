<template>
  <div class="q-pa-md">
    <div class="text-h4 q-pb-md">Frecuencias</div>
    <div class="text-h8 q-pb-md">
      Frecuencias utilizadas en el catalogo de alertas
    </div>
    <hr />
    <q-btn
      icon="las la-plus-circle"
      color="green"
      @click="nuevoRegistro"
      :disable="accionesModulo.Registrar == 0 ? true : false"
    >
      <q-tooltip>
        <span v-if="accionesModulo.Registrar == 0">
          No tienes permiso para ejecutar esta acción
        </span>
        <span v-else>Crear nuevo registro</span>
      </q-tooltip>
    </q-btn>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <q-input 
            label="Frecuencia"
            v-model="frecuencias.Frecuencia"
            dense
            outlined
            clearable
            style="width: 100%"
          ></q-input>
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
            v-close-popup
            icon="las la-save"
            @click="enviarForm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <q-grid
        :data="listaFrecuencias"
        :columns="columnasFrecuencias"
        :pagination="pagination"
      >
        <template v-slot:body="props">
          <q-tr props:props>
            <q-td key="Frec_ID"> {{ props.row["Frec_ID"] }} </q-td>
            <q-td key="Frec_Frecuencia">{{ props.row["Frec_Frecuencia"] }}</q-td>
            <q-td key="Frec_Status">
              <span v-if="props.row['Frec_Status']">Activo</span>
              <span v-else>Inactivo</span>
            </q-td>
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
                  <span v-else>Actualizar</span>
                </q-tooltip>
              </q-btn>
              <q-btn
                class="q-ma-xs floar-left"
                round
                size="10px"
                icon="las la-trash"
                color="negative"
                @click="eliminar(props.row)"
                :disable="accionesModulo.Eliminar == 0 ? true : false"
              >
                <q-tooltip>
                  <span v-if="accionesModulo.Eliminar == 0">
                    No tienes permiso de ejecutar estar acción
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
import { onMounted, ref, toRefs, watch } from "vue";
import { useQuasar } from 'quasar';
import useFrecuencias from "../composables/useFrecuencias.js";
// const props = defineProps({
//   Frec_ID: {
//     type: Number,
//     default: 0,
//   },
// });

const pagination = ref(null);
const nuevoStatus = ref(null);
const frecuencias = ref({});
const nuevo = ref(false);
const valida = ref(false);
const dialog = ref(null);
const status = ref(false);
const registroID = ref(0);
const $q = useQuasar();
const {  
    columnasFrecuencias,
    listaFrecuencias,
    listarFrecuencias, 
    InsertarFrecuencias,
    ModificaFrecuencia,
    limpiarStore, } = useFrecuencias();

const accionesModulo = ref({
    Eliminar: 1,
    Ingresar: 0,
    Actualizar: 1,
    Registrar: 1,
});
pagination.value = {
    rowsPerPage: 15,
};
const nuevoRegistro = () => {
    nuevo.value = true;
    limpiarForm();
    dialog.value = true;
};
const item = ref ({
    Accion: 1,
});

onMounted(async () => {
    await limpiarStore();
    const response = await listarFrecuencias(item.value);
    console.log("front", response);

})
const limpiarForm = () => {
    frecuencias.value = {};
};

const enviarForm = async () => {
    valida.value = false;
    let acc = 0;
    if (!nuevo.value) {
    acc = 1;
    }
    const form = {
        Accion: acc,
        Frec_ID: registroID.value,
        Frec_Frecuencia: frecuencias.value.Frecuencia,     
        Frec_Status: status.value,   
    };
    //nuevo
    if (nuevo.value) {
    console.log("nuevo", form);
    if (
      frecuencias.value.Frecuencia
    ) {
      valida.value = true;
    }
    if (valida.value) {
    const response = await InsertarFrecuencias(form);
    console.log("respuesta insertar", response.data.bolRespuesta);
    if (response.data.bolRespuesta) {
        $q.notify({
            message: "Nuevo registro guardado",
            color: "Green",
        });
        await listarFrecuencias(item.value);
    } else {
        $$q.notify({
            message: "Error al guardar",
            color: "negative",
            });
        }
        } else {
            $q.notify({
        message: "No puedes dejar campos vacios",
        color: "negative",
         });
       }
    }
    //editar
    if (!nuevo.value) {
        console.log("editar", form);
        const response = await ModificaFrecuencia(form);
        if (response.data.bolRespuesta) {
            $q.notify({
                message: "Registro editado",
                color: "Green",
            });
            await listarFrecuencias(item.value);
        } else {
            $q.notify({
                message: "Error al guardar",
                color: "negative",
            });
        }
    }

};
const llenaEditar = async (tableRow) => {    
    nuevo.value = false;
    console.log("tabla", tableRow);    
    registroID.value = tableRow.Frec_ID;
    frecuencias.value.Frecuencia = tableRow.Frec_Frecuencia;  
    status.value = tableRow.Frec_Status;  

    dialog.value = true;
};
const eliminar = async (tableRow) => {
    $q.dialog({
        title: "¿Seguro que quieres eliminar?",
        message: "Se cambiará el estatus a inactivo",
        cancel: true,
        html: true,
    }).onOk(async () => {
        const fila = {
            Frec_ID: tableRow.Frec_ID,
            Accion: 2,
        };
        const response = await ModificaFrecuencia(fila);
        if (response.data.bolRespuesta) {
            $q.notify({
                message: "Registro dado de baja",
                color: "Green",
            });
            await listarFrecuencias(item.value);
        } else {
            $q.notify({
                message: "Error al guardar registro",
                color: "negative",
            });
        }
    });
}
</script>
