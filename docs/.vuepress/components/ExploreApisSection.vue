<template>
  <div class="block">
    <h1 class="title is-4">Explore Mojaloop's APIs</h1>
    <div class="columns">
      <div class="column">
        <div class="block">
          <h3 class="title is-6">Synchronous APIs</h3>
          <ul>
            <li><a class="stealth-link" href="/">P2P Payments</a></li>
            <li><a class="stealth-link" href="/">3PPI - Initiate payments from a user's account</a></li>
            <li><a class="stealth-link" href="/">sdk-scheme-adapter: real time payments</a></li>
            <li><a class="stealth-link" href="/">thirdparty-sync-api: link a user's account and initiate a real time payment</a></li>
          </ul>
        </div>
        <div class="block">
          <h3 class="title is-6">Asynchronous APIs</h3>
          <ul>
            <li><a class="stealth-link" href="/">FSPIOP API - The core Mojaloop API for payments between DFSPs</a></li>
            <li><a class="stealth-link" href="/">Overlay Services/3PPI API - The API for PISPs to ...</a></li>
          </ul>
        </div>

      </div>
      <div class="column">
        <div class="block">
          <h3 class="title is-6">Business Operations</h3>
          <ul>
            <li><a class="stealth-link" href="/">Participant Onboarding and Management - Create and register new DFSPs and PISPs</a></li>
            <li><a class="stealth-link" href="/">Hub Onboarding - Set up a new Mojaloop Hub from scratch.</a></li>
            <li><a class="stealth-link" href="/">Settlement - Run settlement functions.</a></li>
          </ul>
        </div>
      </div>
    </div>
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