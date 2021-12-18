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
    <v-data-table
      :headers="headers"
      :items="items"
      hide-default-footer
    >
      <template v-slot:item.package.date="{ item }">
        {{ getFormattedDate(item.package.date) }}
      </template>
    </v-data-table>
    <v-pagination v-model="page" :length="pageCount" :total-visible="7" @input="changePage($event)"></v-pagination>
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
      page: 1,
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
    pageCount() {
      return Math.ceil(this.$store.state.total / 10)
    }
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    searchPackages() {
      this.$store.dispatch("searchPackages", this.params);
    },
    changePage(e) {
      console.log(e)
      e === 1 ? this.params.from = e - 1 : this.params.from = (e - 1) * this.params.size 
      this.searchPackages();
    }
  },
};
</script>
