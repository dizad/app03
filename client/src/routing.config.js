//imports
    import home from './pages/home.vue';
    import region from './pages/region.vue';
  
//routes
    export default [{
            name: 'default',
            path: "*",
            redirect: "/home"
        },{
            name: 'home',
            path: '/home',
            component: home
        },{
            name: 'region',
            path: '/region/:prop',
            component: region
        }
    ];