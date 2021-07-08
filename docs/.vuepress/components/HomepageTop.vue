<template>
  <div class=block>
    <div class="columns">
      <div class="column">
        <!-- <button @click="testAlert">{{ displayText }}</button> -->
        <h3 class="title is-spaced">Payments</h3>
        <p class="subtitle">
          Integrate your application directly with the Mojaloop Sandbox to
          demonstrate a number of Real Time Payment use cases
        </p>
         <b-button type="is-primary" icon-right="arrow-right">
            Get Started
          </b-button>
      </div>
      <div class="column">
        <img class="header-image" src="/header-code.png" />
      </div>
    </div>
    <div class="custom-divider"></div>

    <div class="columns">
      <div class="column">
        <img class="" src="business_ops.png" />
        <h3 class="title is-4">Business Operations</h3>
        <p class="subtitle is-5">
          Explore how Hub Operators interact with Mojaloop APIs to onboard DFSPs
          and PISPs
        </p>
        <b-button class="block" type="is-primary is-light" icon-right="arrow-right">
          Learn More
        </b-button>        
        <h4 class="subtitle is-6">IN THIS SECTION</h4>
        <a href="/">- Onboarding new participants to a Mojaloop Hub</a>
        <br/>
        <a href="/">- Running Settlement operations</a>
      </div>
      <div class="column">
        <img class="" src="als.png" />
        <h3 class="title is-4">Account Lookup</h3>
        <p class="subtitle is-5">
           See how DFSPs use the Account Lookup Service to register identifiers
          with Mojaloop
        </p>
        <b-button class="block" type="is-primary is-light" icon-right="arrow-right">
          Learn More
        </b-button>        
        <h4 class="subtitle is-6">IN THIS SECTION</h4>
        <ul>
          <li><a href="/">Register an identifier for a user</a></li>
          <li><a href="/">Look up a user from an identifier</a></li>
        </ul>
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