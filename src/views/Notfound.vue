<template>
  <div style="height: 100vh">
    <div
      class="notfound-page-card d-flex flex-column align-center"
      style="position: relative; top: 20%"
    >
      <v-img src="../assets/logos/primary-title.png" width="350" class="mx-auto" />

      <v-img src="../assets/backgrounds/404.png" width="300px"></v-img>
      <div class="" style="font-size: 50px; font-family: serif">Not Found</div>
      <div>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          Please continue to our
          <router-link to="/" style="text-decoration: unset">
            <i class="fa-solid fa-home"></i> home page</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { initialize } from '@/utils/functions';
import { mapActions } from "vuex";
export default {
  name: "Notfound-page",
  methods: {
    ...mapActions(["updateLoader"]),
  },
  mounted() {
    initialize();
  },
  destroyed() {
    this.updateLoader(true);
  },
};
</script>
