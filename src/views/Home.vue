<template>
  <div class="container">
    <section class="hero is-large">
      <div class="hero-body is-flex">
        <div class="container">
          <b-button
            tag="router-link"
            to="/game"
            type="is-primary"
            size="is-large"
            outlined
            rounded
            >START</b-button
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.hero {
  height: inherit;

  &-body {
    align-items: center;
  }
}

.button.is-large {
  font-size: 2.5rem;
  border-width: 0.5rem;
  margin-bottom: 1.25rem;
}
</style>
