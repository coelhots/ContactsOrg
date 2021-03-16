<template>
  <ContactOrganizer />
</template>

<script>
import ContactOrganizer from "./components/ContactOrganizer";

export default {
  name: "App",
  components: {
    ContactOrganizer,
  },
};
</script>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.3.0/firebase-analytics.js"></script>

<script>
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAId5ncC6MZCMSlOxqzRp_8P_W_DdkI7qs",
  authDomain: "super-orgcontact-1615488826604.firebaseapp.com",
  projectId: "super-orgcontact-1615488826604",
  storageBucket: "super-orgcontact-1615488826604.appspot.com",
  messagingSenderId: "608648518041",
  appId: "1:608648518041:web:ad744909b1c80503989b08",
  measurementId: "G-YYD0540Q1F",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
</script>
