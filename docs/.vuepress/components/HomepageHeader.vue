<template>
  <div class="columns">
    <div class="column">
      <!-- <button @click="testAlert">{{ displayText }}</button> -->
      <h3 class="title is-spaced">Payments</h3>
      <p class="subtitle">Integrate your application directly with the Mojaloop Sandbox to demonstrate a number of Real Time Payment use cases</p>
      <b-button type="is-primary" size="is-default">Get Started -> </b-button>
    </div>
    <div class="column">
      <img src="/header-code.png"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['displayText'],
  methods: {
    testAlert() {
      alert('Test Alert');
    }
  }
}
</script>

<style scoped>
button {
  background-color: #4CAF50;
}
</style>