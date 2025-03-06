const linksList = [
  {
    title: "Catálogos",
    icon: "ti-book",
    Permissions: "Proc_FinanzasSocios_Catalogos_CatalogoSocios",
    children: [
      {
        title: "Catalogo Documentos",
        icon: "ti-folder ", // nueva linea
        link: "catalogoDocumentos",
        Permissions:
          "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos_Ingresar",
      },
      {
        title: "Tipo de Socios",
        icon: "ti-briefcase", // nueva linea
        link: "catalogoSociosTipo",
        Permissions:
          "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios_Ingresar",
      },
      {
        title: "Empresas",
        icon: "las la-building", // nueva linea
        link: "catalogoEmpresas",
        Permissions: "Proc_FinanzasSocios_Catalogos_CatalogoEmpresas_Ingresar",
      },
    ],
  },
  {
    title: "Socios/Usufructuarios",
    // icon: "las la-user-tie",
    icon: "ti-user",
    link: "catalogoSocios",
    Permissions: "Proc_FinanzasSocios_Catalogos_CatalogoSocios_Ingresar",
  },
  {
    title: "Alertas",
    icon: "las la-exclamation-triangle",
    link: "alertas",
    Permissions: "Proc_FinanzasSocios_Catalogos_Alertas_Ingresar",
  },
];
export default linksList;
