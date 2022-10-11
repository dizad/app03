//imports
  import vue from 'vue';
  import vuetify from 'vuetify';
  import 'vuetify/dist/vuetify.css'
  import router from 'vue-router';
  import paths from './routing.config';
  import app from './app.vue';
  import vuex from 'vuex';
  import createPersistedState from 'vuex-persistedstate'; //maintains session state during refresh
//uses
  vue.use(router);
  vue.use(vuetify);
  vue.use(vuex);
  vue.config.productionTip = false;
//implementation
  new vue({
//router
  router: new router({routes: paths}),
//vuetify
  vuetify: new vuetify({}),
//state
  store: new vuex.Store({
  //variables
    state: {
      data: {}
    },
  //synchronous setters
    mutations: {
    //collection
      setData(state, payload){
        state.data = payload;
      }
    },
  //asynchronous setters
    actions: {},
  //modules
    modules: {},
  //getters
    getters: {
      getData: state => state.data,
      getRegion: state => region => state.data[region]
    },
    plugins: [createPersistedState()]
  }),
//render
  render: a => a(app)
}).$mount('#app');


