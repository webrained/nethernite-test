<template>
  <v-container>
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
        :loading="loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:item.package.date="{ item }">
          {{ getFormattedDate(item.package.date) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon medium color="primary" @click="viewItem(item)">
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
      <v-pagination
        v-if="params.q"
        v-model="page"
        :length="pageCount"
        :total-visible="7"
        @input="searchPackages($event, 'pagination')"
      ></v-pagination>
      <v-dialog
        v-model="dialog"
        v-if="currentItem"
        transition="dialog-top-transition"
        max-width="600"
      >
        <package-details
          :item="currentItem"
          @closeDialog="dialog = false"
        ></package-details>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import moment from "moment";
import PackageDetails from "@/components/PackageDetails";

export default {
  name: "Home",
  components: {
    PackageDetails,
  },
  data: () => ({
    params: {
      q: "",
      from: 0,
      size: 10,
    },
    page: 1,
    loading: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "package.name",
      },
      { text: "Description", value: "package.description", sortable: false },
      { text: "Publisher", value: "package.publisher.username" },
      { text: "Version", value: "package.version", sortable: false },
      { text: "Published", value: "package.date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dialog: true,
    currentItem: null,
  }),
  computed: {
    items() {
      return this.$store.state.packages;
    },
    pageCount() {
      return Math.ceil(this.$store.state.total / 10);
    },
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
    searchPackages(e, type) {
      this.loading = true;
      if (type === "pagination") {
        e === 1
          ? (this.params.from = e - 1)
          : (this.params.from = (e - 1) * this.params.size);
      } else {
        this.params.from = 0;
        this.page = 1;
      }
      this.$store
        .dispatch("searchPackages", this.params)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    viewItem(item) {
      this.dialog = true;
      this.currentItem = item;
    },
  },
};
</script>
