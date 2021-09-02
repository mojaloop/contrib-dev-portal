<template>
  <div style="backgroundColor: #F8B11A" class="hero  pb-6">

    <img class="pt-6" src="cdbc_banner.png"/>

    <!-- <div class="custom-divider"></div> -->
  </div>
</template>

<script>
export default {
  props: ["displayText"],
  methods: {
    testAlert() {
      alert("Test Alert");
    },
  },
};
</script>

<style scoped>
button {
  background-color: #4caf50;
}
</style>