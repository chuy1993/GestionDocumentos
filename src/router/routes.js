const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("src/modules/login/pages/login.vue"),
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/catalogoSocios",
        name: "/catalogoSocios",
        component: () =>
          import("src/modules/catalogoSocios/pages/catalogoSocios.vue"),
      },
      {
        path: "/catalogoDocumentos",
        name: "/catalogoDocumentos",
        component: () =>
          import("src/modules/catalogoDocumentos/pages/catalogoDocumentos.vue"),
      },
      {
        path: "/catalogoSociosTipo",
        name: "/catalogoSociosTIpo",
        component: () =>
          import("src/modules/catalogoSociosTipo/pages/catalogoSociosTipo.vue"),
      },
      {
        path: "/catalogoEmpresas",
        name: "/catalogoEmpresas",
        component: () =>
          import("src/modules/catalogoEmpresas/pages/catalogoEmpresas.vue"),
      },
      {
        path: "/relacionSociosEmpresas",
        name: "/relacionSociosEmpresas",
        component: () =>
          import("src/modules/sociosEmpresas/pages/sociosEmpresa.vue"),
      },
      {
        path: "/catalogoFrecuencias",
        name: "/catalogoFrecuencias",
        component: () =>
          import(
            "src/modules/catalogoFrecuencias/pages/catalogoFrecuencias.vue"
          ),
      },
      {
        path: "/cargaDocumentos",
        name: "/cargaDocumentos",
        component: () =>
          import("src/modules/cargaDocumentos/pages/cargaDocumentos.vue"),
      },
      {
        path: "/sufructuarios",
        name: "/sufructuarios",
        component: () =>
          import("src/modules/sufructuarios/pages/sufructuarios.vue"),
      },
      {
        path: "/alertas",
        name: "/alertas",
        component: () => import("src/modules/alertas/pages/alertas.vue"),
      },
      {
        path: "/catalogoRegimenFiscal",
        name: "/catalogoRegimenFiscal",
        component: () =>
          import(
            "src/modules/CatalogoRegimenFiscal/pages/RegimenFiscalPage.vue"
          ),
      },
      {
        path: "/filosofiaCT",
        name: "/filosofiaCT",
        component: () => import("components/filosofiaCT.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
