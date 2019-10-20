<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-primary">RANKING</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-three-fifths">
            <dl class="is-flex has-text-primary">
              <dt class="is-size-4">Nick</dt>
              <dd class="is-size-4">Czas</dd>
            </dl>
            <dl class="is-flex" v-for="(user, key) in users" :key="key">
              <dt class="is-size-4">{{ user.nick }}</dt>
              <dd class="is-size-4">{{ user.time }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <b-button
      tag="router-link"
      to="/"
      type="is-primary"
      size="is-medium"
      outlined
      rounded
      >Powrót</b-button
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      users: "getUsers"
    })
  }
};
</script>

<style lang="scss">
dl {
  justify-content: space-between;
}
.button.is-medium {
  border-width: 0.25rem;
  margin-bottom: 1.25rem;
}
</style>
