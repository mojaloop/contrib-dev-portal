<template>
  <div class="block homepage-header">
    <h1 class="title is-1">Getting Started</h1>
      <p class="subtitle is-4">
        Explore our guides and examples to integrate with the Mojaloop Sandbox
      </p>
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