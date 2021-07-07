<template>
  <div class="columns">
    <div class="column">
        <img src="icon-code.png"/>
        <h3>Developer Tools</h3>
        <p>Get up and running with our libraries and toolkits to 
           speed up your development process.</p>
    </div>
    <div class="column">
        <img src="icon-key.png"/>
        <h3>Security</h3>
        <p>Learn more about the 3 levels of security Mojaloop 
           offers and how to implement and secure ...</p>
    </div>
    <div class="column">
        <img src="icon-settings.png"/>
        <h3>Developer Account</h3>
        <p><i><strong>Coming Soon!</strong> Manage your sandbox account 
           to generate API Keys, and more!</i></p>
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