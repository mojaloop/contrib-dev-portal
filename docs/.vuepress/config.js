module.exports = {
  // theme: 'api',
  // base: '/home/',
  base: '/',
  //     <link rel="stylesheet" href="https://unpkg.com/buefy/dist/buefy.min.css">
  head: [
    // ['link', { rel: 'stylesheet', href: 'https://unpkg.com/buefy/dist/buefy.min.css' }],
    // ['script', { src: 'https://unpkg.com/buefy/dist/buefy.min.js' }],
    ['link', { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css" } ],
  ],
  title: 'Mojaloop Sandbox',
  themeConfig: {
    logo: '/logo_main.png',
    sidebar: [
      {
        title: 'Getting Started',
        path: '/',        
      }, 
      {
        //TODO: can we make this so it's always expanded?
        title: 'Sandbox Overview',
        path: '/1-overview/',
      },
      {
        title: 'Use Cases',
        collapsable: false,
        children: [
          {
            title: 'Payments',
            collapsable: false,
            children: [
              ['/usecases/p2p', 'P2P Payments'],
              ['/usecases/bulk', 'Bulk (G2P)'],
              ['/usecases/request-to-pay', 'Merchant Request to Pay'],
              ['/usecases/3ppi-transfer', '3rd Party Initiated Payment'],
            ]
          },
          {
            title: 'Overlay Services',
            collapsable: false,
            children: [
              ['/usecases/3ppi-account-linking', '3PPI Account Linking'],
            ],
          },
          {
            title: 'Business Operations',
            collapsable: false,

            children: [
              ['/usecases/participant-onboarding', 'Participant Onboarding'],
              ['/usecases/settlement', 'Settlement'],
            ],
          },
          {
            title: 'Account Lookup',
            path: '/usecases/account-lookup'
          },
        ]
      },

      // {
      //   title: 'APIs',
      //   collapsable: false,
      //   children: [
      //     ['/2-apis/fspiop', 'FSPIOP (Mojaloop API)'], 
      //     ['/2-apis/admin', 'Admin API'],
      //     ['/2-apis/settlement', 'Settlement API'],
      //     ['/2-apis/thirdparty-dfsp','Thirdparty-DFSP'],
      //     ['/2-apis/thirdparty-pisp','Thirdparty-PISP']

      //   ],
      //   initialOpenGroupIndex: 1
      // },
      {
        title: 'Guides',
        collapsable: false,
        children: [ 
          // No access token at the moment - maybe that's just easy for now
          // ['/3-guides/0_access_token', '0. Access Token'],
         
           // TODO: We should deprecate this guide
          // ['/3-guides/6_pisp_local', '5. Thirdparty PISP API Local'],
          {
            title: 'Payments',
            collapsable: false,
            children: [
              ['/3-guides/1_dfsp_setup', '1. P2P Transfer'],
              ['/3-guides/1_dfsp_setup', '2. 3PPI Transfer'],

            ]
          },
          {
            title: 'Onboarding',
            collapsable: false,
            children: [
              ['/3-guides/1_dfsp_setup', '1. DFSP Setup'],


            ]
          },
          {
            title: 'Developer Tooling',
            collapsable: false,
            children: [
              ['/3-guides/5_ttk_p2p', '1. TTK P2P Transfer (Easy)'],
              ['/3-guides/3_simulators', '2. DFSP Simulators'],


            ]
          },
        ],
      },
      {
        title: 'Demos',
        path: '/99-demos/',
        collapsable: false,

      },
    ],
    nav: [
      // TODO: update API Links
      { 
        text: 'APIs',
        items: [
          { 
            text: 'Sync APIs', 
            items: [
              { text: 'P2P Payments', link: '/2-apis/fspiop'},
              { text: '3PPI Payments', link: '/2-apis/fspiop'},
              { text: 'SDK-Scheme-Adapter', link: '/2-apis/fspiop'},
              { text: '3rd Party Scheme-Adapter', link: '/2-apis/fspiop'},
            ]
          },
          { 
            text: 'Async APIs', 
            items: [
              { text: 'FSPIOP (Mojaloop API)', link: '/2-apis/fspiop'},
              { text: 'ThirdParty API', link: '/2-apis/fspiop'},
            ]
          },
          { 
            text: 'Business Operations', 
            items: [
              { text: 'Participant Onboarding and Management', link: '/2-apis/fspiop'},
              { text: 'Hub Onboarding', link: '/2-apis/fspiop'},
              { text: 'Settlement', link: '/2-apis/fspiop'},
            ]
          },
        ]
      },
      { text: 'Docs', link: 'https://docs.mojaloop.io/documentation/' }
    ]
  }
}
 