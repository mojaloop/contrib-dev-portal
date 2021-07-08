<template>
  <div class="block pb-6">
    <h1 class="title is-4">Learn more about Mojaloop</h1>
    <div class="columns pb-6">
      <div class="column">
        <a href="/">
          <figure class="image is-48x48 block">
            <img src="icon-code.png" />
          </figure>
          <h3 class="title is-5 is-primary">Developer Tools</h3>
          <p class="subtitle is-5">
            Get up and running with our libraries and toolkits to speed up your
            development process.
          </p>
        </a>
      </div>
      <div class="column">
        <a href="/">
          <figure class="image is-48x48 block">
            <img src="icon-key.png" />
          </figure>
          <h3 class="title is-5 is-primary">Security</h3>
          <p class="subtitle is-5">
            Learn more about the 3 levels of security Mojaloop offers and how to
            implement and secure ...
          </p>
        </a>
      </div>
      <div class="column">
        <a href="/">
          <figure class="image is-48x48 block">
            <img src="icon-settings.png" />
          </figure>
          <h3 class="title is-5 is-primary">Developer Account</h3>
          <p class="subtitle is-5">
            <i>Coming Soon!</i> Manage your sandbox account to generate API Keys,
            and more!
          </p>
        </a>
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