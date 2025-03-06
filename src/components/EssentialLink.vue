<template>
  <!--   <q-item clickable tag="a" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
  <div>
    <buttonDark />
  </div> -->
  <div class="">
    <q-tree :nodes="linksList" node-key="title">
      <template v-slot:default-header="prop">
        <div v-if="prop.node.link">
          <q-item
            clickable
            v-ripple
            dense
            tag="a"
            @click="handleNodeClick(prop.node.link)"
          >
            <q-icon :name="prop.node.icon" size="24px" class="q-mr-sm" />
            {{ prop.node.title }}
          </q-item>
        </div>
        <div v-else>
          <q-item clickable v-ripple dense tag="a">
            <q-icon :name="prop.node.icon" size="24px" class="q-mr-sm" />
            {{ prop.node.title }}
          </q-item>
        </div>
        <div>
          <button-dark></button-dark>
        </div>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import buttonDark from "src/components/button-dark.vue";
import linksList from "../router/link-list";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMenu } from "src/composables/useMenu.js";
import { useQuasar } from "quasar";
const { generaPermisosUsuario, permisos, accederModulo } = useMenu();
const usuario = ref("");
const token = ref("");
const router = useRouter();
const UsuarioBE = ref(null);

onMounted(async () => {
  usuario.value = localStorage.getItem("usuario");
  token.value = localStorage.getItem("token");
  // usuario.value = "juan.casillas";
  UsuarioBE.value = { usuario: usuario, Token: token.value };
  // Permisos: permisos.value,
  // Modulos: accederModulo.value,
  // UsuarioBE.value = { Token: localStorage.getItem(token) };
  // debugger;
  const respuesta = await generaPermisosUsuario(UsuarioBE.value);
  console.log("Los permisos", permisos.value);
});

const handleNodeClick = async (prop) => {
  /*  const response = await accederModulo(prop, usuario.value);
  if (response == true) { */

  router.push(prop);
  /*  return;
  } else {
    $q.notify({
      message: "No tienes permiso de entrar al modulo deseado",
      caption: "ahora mismo",
      color: "negative",
    });
  } */
};
</script>
