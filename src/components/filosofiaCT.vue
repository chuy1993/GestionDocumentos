<template>
  <div class="row">
    <div class="col col-xs-12 col-sm-6 col-md-3">
      <div class="q-ma-sm">
        <q-card class="my-card" style="height: 250px">
          <!--  style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"-->
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 q-pa-none q-ma-none">
              Misión
              <q-icon name="las la-file-contract" size="24px" class="q-mr-sm" />
            </div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-section class="q-pa-md">
            Somos un Corporativo que ofrece servicios y soluciones integrales de
            transporte de personas y mercancías.
          </q-card-section>
        </q-card>
        <!-- <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-sm">Misión</div>
            <div class="text-caption text-grey text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <q-separator dark vertical inset />
          </q-card-section>
        </q-card-section>
        <q-separator />
      </q-card> -->
      </div>
    </div>
    <div class="col col-xs-12 col-sm-6 col-md-3">
      <div class="q-ma-sm">
        <q-card class="my-card" style="height: 250px">
          <!-- <q-card-section
            class="text-white"
            style="
              background: radial-gradient(
                ellipse at top left,
                #35a2ff 0%,
                #3d62b9 100%
              );
            "
          > -->
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">
              Visión
              <q-icon name="las la-eye" size="24px" class="q-mr-sm" />
            </div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-section class="q-pt-md">
            Ser un Corporativo de Transporte en constante expansión, enfocado a
            mejorar la vida de sus colaboradores, clientes, proveedores,
            accionistas y socios estratégicos.
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col col-xs-12 col-sm-6 col-md-3">
      <div class="q-ma-sm">
        <q-card class="my-card" style="height: 250px">
          <q-card-section class="text-white bg-primary">
            <div class="text-h6">
              Valores
              <q-icon name="las la-heart" size="24px" class="q-mr-sm" />
            </div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-section>
            <ul class="custom-list">
              <li>Respeto</li>
              <li>Compromiso</li>
              <li>Confianza</li>
              <li>Honestidad</li>
              <li>Responsabilidad</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col col-xs-12 col-sm-6 col-md-3">
      <div class="q-ma-sm">
        <q-card class="my-card" style="height: 250px">
          <q-card-section class="text-white bg-primary">
            <div class="text-h6">
              Politicas
              <q-icon name="las la-gavel" size="24px" class="q-mr-sm" />
            </div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>
          <q-card-section class="q-pt-md">
            Corporativo Transporta se compromete a satisfacer las necesidades de
            transporte de personas y mercancías, mediante la mejora continua del
            sistema de gestión de calidad.
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const expanded = ref(true);
</script>
<style scoped>
.custom-list {
  list-style-type: none; /* Quita los marcadores predeterminados */
}

.custom-list li:before {
  content: "•"; /* Agrega un punto como marcador */
  margin-right: 5px; /* Espacio entre el punto y el texto */
}
</style>
