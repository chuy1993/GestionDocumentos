export default [
  {
    Permissions: "Proc_FinanzasSocios_Catalogos",
    children: [
      {
        Permissions: "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos",
        children: [
          {
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos_Ingresar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos_Actualizar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos_Registrar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoDocumentos_Eliminar",
          },
        ],
      },
      {
        Permissions: "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios",
        children: [
          {
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios_Ingresar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios_Actualizar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios_Registrar",
            Permissions:
              "Proc_FinanzasSocios_Catalogos_CatalogoTipoSocios_Eliminar",
          },
        ],
      },
      {
        Permissions: "Proc_FinanzasSocios_Catalogos_Empresas",
        children: [
          {
            Permissions: "Proc_FinanzasSocios_Catalogos_Empresas_Ingresar",
            Permissions: "Proc_FinanzasSocios_Catalogos_Empresas_Actualizar",
            Permissions: "Proc_FinanzasSocios_Catalogos_Empresas_Registrar",
            Permissions: "Proc_FinanzasSocios_Catalogos_Empresas_Eliminar",
          },
        ],
      },
    ],
  },
  // {
  //   Permissions: "Proc_FinanzasSocios_Catalogos_CargaDocumentos",
  //   children: [
  //     {
  //       Permissions: "Proc_FinanzasSocios_Catalogos_CargaDocumentos_Ingresar",
  //       Permissions: "Proc_FinanzasSocios_Catalogos_CargaDocumentos_Actualizar",
  //       Permissions: "Proc_FinanzasSocios_Catalogos_CargaDocumentos_Registrar",
  //       Permissions: "Proc_FinanzasSocios_Catalogos_CargaDocumentos_Eliminar",
  //     },
  //   ],
  // },
  {
    Permissions: "Proc_FinanzasSocios_Catalogos_SociosUsufructuarios",
    children: [
      {
        Permissions:
          "Proc_FinanzasSocios_Catalogos_SociosUsufructuarios_Ingresar",
        Permissions:
          "Proc_FinanzasSocios_Catalogos_SociosUsufructuarios_Actualizar",
        Permissions:
          "Proc_FinanzasSocios_Catalogos_SociosUsufructuarios_Registrar",
        Permissions:
          "Proc_FinanzasSocios_Catalogos_SociosUsufructuarios_Eliminar",
      },
    ],
  },
  {
    Permissions: "Proc_FinanzasSocios_Catalogos_Alertas",
    children: [
      {
        Permissions: "Proc_FinanzasSocios_Catalogos_Alertas_Ingresar",
        Permissions: "Proc_FinanzasSocios_Catalogos_Alertas_Actualizar",
        Permissions: "Proc_FinanzasSocios_Catalogos_Alertas_Registrar",
        Permissions: "Proc_FinanzasSocios_Catalogos_Alertas_Eliminar",
      },
    ],
  },
];
