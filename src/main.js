import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'
import VueGapi from 'vue-gapi'

Vue.config.productionTip = false

Vue.use(VueGapi, {
  apiKey: 'AIzaSyAId5ncC6MZCMSlOxqzRp_8P_W_DdkI7qs',
  clientId: '608648518041-7mak9ejp07re127nvrv7pki754r03p8h.apps.googleusercontent.com',
  discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  scope: 'https://www.googleapis.com/auth/contacts.readonly',
})

Vue.use(Vuetify)

const vuetify = new Vuetify({icons:{iconfont:'mdi'}})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
