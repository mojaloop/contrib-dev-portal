<template>
  <div class="block">
    <h1 class="title is-4">Explore Mojaloop's APIs</h1>
    <div class="columns">
      <div class="column">
        <div class="block">
          <h3 class="title is-6">Synchronous APIs</h3>
          <ul>
            <li><a class="stealth-link" href="/apis/sync-p2p.html"><strong>P2P Payments</strong></a></li>
            <li><a class="stealth-link" href="/apis/sync-3ppi.html"><strong>3PPI</strong> - Link Accounts + Initiate Payments</a></li>
            <!-- <li><a class="stealth-link" href="/">sdk-scheme-adapter: real time payments</a></li> -->
            <!-- <li><a class="stealth-link" href="/">thirdparty-sync-api: link a user's account and initiate a real time payment</a></li> -->
          </ul>
        </div>
        <div class="block">
          <h3 class="title is-6">Asynchronous APIs</h3>
          <ul>
            <li><a class="stealth-link" href="/apis/async-fspiop.html"><strong>FSPIOP API</strong> - The core Mojaloop API for payments between DFSPs</a></li>
            <li><a class="stealth-link" href="/apis/async-thirdparty-pisp.html"><strong>Overlay Services/3PPI API</strong> - The Async API for 3rd Party Fintechs to link accounts and initiate payments.</a></li>
          </ul>
        </div>

      </div>
      <div class="column">
        <div class="block">
          <h3 class="title is-6">Business Operations</h3>
          <ul>
            <li><a class="stealth-link" href="/apis/ops-onboarding.html"><strong>Participant Onboarding and Management</strong> - Create and register new DFSPs and PISPs</a></li>
            <li><a class="stealth-link" href="/apis/ops-onboarding.html"><strong>Hub Onboarding</strong> - Set up a new Mojaloop Hub from scratch.</a></li>
            <!-- <li><a class="stealth-link" href="/">Settlement - Run settlement functions.</a></li> -->
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