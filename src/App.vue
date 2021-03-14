<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large color="black">
          mdi-card-account-mail
        </v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-on:click="login()" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-on:click="getContacts()" text>
        <span class="mr-2">Get Contacts</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contact, index) in contacts" :key="index">
              <td>{{ contact.names[0].displayName }}</td>
              <td>{{ contact.emailAddresses[0].value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    isAuthorized: Boolean,
    currentAPIRequest: Object,
    GoogleAuth: Object,
    gapi: Object,
    contacts: Array,
  }),
  //mounted: () => {
  //this.GoogleAuth = this.$gapi.getAuthInstance();
  //this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
  //},
  methods: {
    login() {
      this.$gapi.getGapiClient().then((gapi) => {
        this.gapi = gapi;
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        this.GoogleAuth.signIn();
        this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
      });
    },

    sendAuthorizedApiRequest(requestDetails) {
      this.currentApiRequest = requestDetails;
      if (this.isAuthorized) {
        // Make API request
        this.$gapi.client.request(requestDetails);
        this.currentApiRequest = {};
      } else {
        this.GoogleAuth.signIn();
      }
    },

    getContacts() {
      this.gapi.client.people.people.connections
        .list({
          resourceName: "people/me",
          personFields: "names,emailAddresses",
        })
        .then((res) => {
          //console.log(res);
          this.contacts = res.result.connections;
        });
    },
    updateSignInStatus(isSignedIn) {
      if (isSignedIn) {
        this.isAuthorized = true;
        if (this.currentyAPIRequest) {
          this.sendAuthorizedApiRequest(this.currentApiRequest);
        }
      } else {
        this.isAuthorized = false;
      }
    },
  },
};
</script>
