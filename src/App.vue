<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-img
          alt="NPM Logo"
          class="shrink mr-2"
          contain
          :src="require('./assets/npm.png')"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    "app-footer": Footer,
  },
};
</script>
