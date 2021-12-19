<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <strong class="subheading"
          >Arman Torosyan - webrained</strong
        >

        <v-spacer></v-spacer>

        <v-btn
          v-for="(link, index) in links"
          :key="index"
          class="mx-4"
          dark
          icon
          :href="link.url"
          target="_blank"
        >
          <v-icon size="24px">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>For Frozeneon</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        url: "https://github.com/webrained",
        icon: "mdi-github",
      },
      {
        url: "https://www.linkedin.com/in/webrained/",
        icon: "mdi-linkedin",
      },
    ],
  }),
};
</script>
