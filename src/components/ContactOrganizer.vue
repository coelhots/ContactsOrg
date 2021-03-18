<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-icon large color="black">
          mdi-card-account-mail
        </v-icon>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="isAuthorized == false" v-on:click="login()" text>
        <span class="mr-2">Login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn v-else v-on:click="logout()" text>
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="v-container">
        <div class="container main-container">
          <div class="layout mb-5 column justify-center alighn-center">
            <div class="flex sx12 sm8 md6">
              <div
                id="home-card"
                class="v-card v-sheet theme--light elevation-2"
              >
                <div class="v-card__title display-2 font-weight-thin">
                  <h1 class="display-2 font-weight-black text-xs-center">
                    Your Organizer Area
                  </h1>
                </div>
                <div class="v-card__text pa-0">
                  <div class="button">
                    <button
                      v-if="isAuthorized == true"
                      v-on:click="getContacts()"
                      type="button"
                      class="v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--x-large success"
                    >
                      <span class="v-btn__content"> Get Contacts </span>
                    </button>
                  </div>
                </div>
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
                        <td>
                          {{
                            contact.hasOwnProperty("names")
                              ? contact.names[0].displayName
                              : "NOT LISTED"
                          }}
                        </td>
                        <td>
                          {{
                            contact.hasOwnProperty("emailAddresses")
                              ? contact.emailAddresses[0].value
                              : "NOT LISTED"
                          }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "ContactOrganizer",
  data: () => ({
    isAuthorized: false,
    currentAPIRequest: Object,
    GoogleAuth: Object,
    gapi: Object,
    contacts: Array,
  }),

  methods: {
    login() {
      this.$gapi.getGapiClient().then((gapi) => {
        this.gapi = gapi;
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        this.GoogleAuth.signIn();
        this.isAuthorized = true;
        this.GoogleAuth.isSignedIn.listen(this.updateSigninStatus);
      });
    },
    logout() {
      this.$gapi.getGapiClient().then((gapi) => {
        this.GoogleAuth = gapi.auth2.getAuthInstance();
        this.GoogleAuth.signOut();
        this.isAuthorized = false;
      });
    },
    sendAuthorizedApiRequest(requestDetails) {
      this.currentApiRequest = requestDetails;
      if (this.isAuthorized) {
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
<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
</style>
