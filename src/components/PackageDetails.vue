<template>
  <v-card v-if="item">
    <v-card-title
      ><a :href="item.package.links.npm" target="_blank">{{
        item.package.name
      }}</a></v-card-title
    >
    <v-card-text>
      <div class="text-subtitle-1 mb-3">
        {{ item.package.description }}
      </div>
      <div>
        <a
          v-if="item.package.publisher.email"
          :href="`mailto:${item.package.publisher.email}`"
          >{{ item.package.publisher.username }}</a
        >
        <b v-else>{{ item.package.publisher.username }}</b>
        <span v-if="item.package.version">
          published {{ item.package.version }}</span
        >
        <span v-if="item.package.date">
          - {{ getFormattedDate(item.package.date) }}</span
        >
      </div>
      <div
        class="mt-2"
        v-if="item.package.links.homepage || item.package.links.repository"
      >
        <a
          v-if="item.package.links.homepage"
          :href="item.package.links.homepage"
          class="mr-2"
          >Homepage</a
        >
        <a
          v-if="item.package.links.repository"
          :href="item.package.links.repository"
          >Repository</a
        >
      </div>
    </v-card-text>

    <v-divider class="mx-4 my-4"></v-divider>

    <v-card-text>
      <v-chip
        class="mr-2 mb-2"
        v-for="(item, index) in item.package.keywords"
        :key="index"
        >{{ item }}</v-chip
      >
    </v-card-text>

    <div class="mx-4">
      <div class="d-flex align-center">
        <span class="mr-4 w-30">P</span>
        <v-progress-linear
          :value="item.score.detail.popularity * 100"
          :buffer-value="100"
          color="teal"
          height="5"
        ></v-progress-linear>
      </div>

      <br />
      <div class="d-flex align-center">
        <span class="mr-4 w-30">Q</span>
        <v-progress-linear
          :value="item.score.detail.quality * 100"
          :buffer-value="100"
          color="purple"
          height="5"
        ></v-progress-linear>
      </div>
      <br />

      <div class="d-flex align-center">
        <span class="mr-4 w-30">M</span>
        <v-progress-linear
          :value="item.score.detail.maintenance * 100"
          :buffer-value="100"
          color="red"
          height="5"
        ></v-progress-linear>
      </div>
    </div>

    <v-card-actions class="justify-end">
      <v-btn text @click="$emit('closeDialog')">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
