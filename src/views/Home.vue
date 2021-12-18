<template>
  <hello-world />
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",
  async created() {
    const res = await this.$http.search("vue");
    console.log(res);
  },
  components: {
    HelloWorld,
  },
};
</script>
