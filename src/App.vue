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
  created() {
    document.title = "Contact Organizer";
  },
};
</script>
