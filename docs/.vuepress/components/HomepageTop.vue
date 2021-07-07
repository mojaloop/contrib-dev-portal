<template>
  <div class="columns">
    <div class="column">
        <img src="business_ops.png"/>
        <h3>Business Operations</h3>
        <p>Explore how Hub Operators interact with 
           Mojaloop APIs to onboard DFSPs and PISPs</p>
        <b-button>Learn More -> </b-button>
        <h4>IN THIS SECTION</h4>
        <ul>
          <li><a href="/">Onboarding new participants to a Mojaloop Hub</a></li>
          <li><a href="/">Running Settlement operations</a></li>
        </ul>
    </div>
    <div class="column">
      <img src="als.png"/>
      <h3>Account Lookup</h3>
      <p>See how DFSPs use the Account Lookup Service to register 
        identifiers with Mojaloop</p>
      <b-button>Learn More -> </b-button>
        <h4>IN THIS SECTION</h4>
        <ul>
          <li><a href="/">Register an identifier for a user</a></li>
          <li><a href="/">Look up a user from an identifier</a></li>
        </ul>
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