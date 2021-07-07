<template>
  <div>
    <div>
      <!-- <button @click="testAlert">{{ displayText }}</button> -->
      <h3>Payments</h3>
      <p>Integrate your application directly with the Mojaloop Sandbox to demonstrate a number of Real Time Payment use cases</p>
      <a href="/">Get Started -> </a>
    </div>
    <div>
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