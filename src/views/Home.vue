<template>
  <v-card>
    <v-card-title>
      NPM Packages
      <v-spacer></v-spacer>
      <v-text-field
        v-model="params.q"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        @input="searchPackages"
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.package.date="{ item }">
        {{ getFormattedDate(item.package.date) }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  name: "Home",
  data() {
    return {
      params: {
        q: "",
        from: 0,
        size: 10,
      },
      total: 0,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "package.name",
        },
        { text: "Description", value: "package.description" },
        { text: "Author", value: "package.author.name" },
        { text: "Version", value: "package.version" },
        { text: "Published", value: "package.date" },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.packages;
    },
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    searchPackages() {
      this.$store.dispatch("searchPackages", this.params);
    },
  }
};
</script>
