<template>
  <img src="../assets/fondo.jpg" style="width: max-content" />
  <div class="absolute-full text-subtitle2 flex flex-center container">
    <div style="font-size: 30vh; color: white" class="codigo">404</div>
    <div style="font-size: 6vh; color: white" class="mensaje">
      Tu oruga se perdió, no encontró lo que buscabas
    </div>
    <div class="oruga">
      <img class="centro" src="../assets/oruga2.png" />
    </div>
    <q-btn
      class="q-mt-xl bottom-button"
      color="primary"
      text-color="white"
      unelevated
      to="/home"
      label="Volver a inicio"
      no-caps
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>
<style scoped>
.codigo {
  display: flex;
  justify-content: center;
  position: absolute;
  margin-bottom: 750px;
}
.mensaje {
  display: flex;
  justify-content: center;
  position: absolute;
  margin-bottom: 150px;
}
.oruga {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.centro {
  margin-bottom: 250px;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.bottom-button {
  margin-bottom: 60px;
}
</style>
