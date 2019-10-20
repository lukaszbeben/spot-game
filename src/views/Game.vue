<template>
  <div class="container">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-primary">
            ZNAJDŹ 5 RÓŻNIC POMIĘDZY OBRAZKAMI
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            class="column is-full-mobile"
            ref="image-a"
            @mousemove="setRelativePointer($event, 'image-b')"
            @mouseleave="clearRelativePointer"
          >
            <img src="~@/assets/a.png" usemap="#image-map-a" />
            <map name="image-map-a">
              <area
                v-for="(area, key) in areas"
                :key="key"
                @click.prevent="addPoint($event, key)"
                href="#"
                :alt="key"
                :coords="area.coords"
                :shape="area.type"
              />
            </map>
          </div>
          <div
            class="column is-full-mobile"
            ref="image-b"
            @mousemove="setRelativePointer($event, 'image-a')"
            @mouseleave="clearRelativePointer"
          >
            <img src="~@/assets/b.jpg" usemap="#image-map-b" />
            <map name="image-map-b">
              <area
                v-for="(area, key) in areas"
                :key="key"
                @click.prevent="addPoint($event, key)"
                href="#"
                :alt="key"
                :coords="area.coords"
                :shape="area.type"
              />
            </map>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-three-quarters">
            <b-progress
              type="is-warning"
              :value="points.length"
              :max="5"
            ></b-progress>
            <h2 class="title has-text-primary">
              ZNALEZIONO {{ points.length }} z 5
            </h2>
          </div>
        </div>
        <div class="columns is-mobile is-centered">
          <div class="column">
            <base-timer ref="timer" />
          </div>
        </div>
      </div>
    </section>
    <b-modal
      :active.sync="isComponentModalActive"
      width="500"
      has-modal-card
      trap-focus
    >
      <form @submit.prevent="submitForm">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-primary">Gratulacje!</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Podaj swój nick">
              <b-input
                type="nick"
                v-model="nick"
                placeholder="Twój nick"
                validation-message="Twój nick musi się składać z conajmniej 3 znaków - duże/małe litery i cyfry"
                minlength="3"
                pattern="[a-zA-Z|\d]{3,}"
                required
              ></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button"
              type="button"
              @click="isComponentModalActive = false"
            >
              Zamknij
            </button>
            <button class="button is-primary" type="submit">Zapisz</button>
          </footer>
        </div>
      </form>
    </b-modal>
    <transition name="slide-fade">
      <p
        v-if="activePoint.show"
        class="active-point is-size-4"
        :style="{ top: activePoint.y, left: activePoint.x }"
      >
        +1
      </p>
    </transition>
  </div>
</template>

<script>
import imageMapResize from "image-map-resizer";
import BaseTimer from "@/components/BaseTimer";
import { mapMutations } from "vuex";

export default {
  components: {
    BaseTimer
  },
  data() {
    return {
      isComponentModalActive: false,
      nick: "",
      activePoint: {
        show: false,
        x: 0,
        y: 0
      },
      points: [],
      areas: [
        {
          type: "poly",
          coords: "38,65,38,50,61,39,81,45,85,65,77,76,65,84,49,78"
        },
        { type: "poly", coords: "222,84,250,62,285,99,263,119" },
        {
          type: "poly",
          coords:
            "275,405,237,362,259,362,283,372,284,315,305,351,323,336,335,367,319,405"
        },
        {
          type: "poly",
          coords:
            "588,263,596,247,598,223,616,215,633,220,652,229,659,239,666,255,659,272,641,291,616,290,600,277"
        },
        { type: "circle", coords: "489,210,20" }
      ]
    };
  },
  watch: {
    points(val) {
      if (val.length === 5) {
        this.isComponentModalActive = true;
        this.$refs.timer.stop();
      }
    }
  },
  methods: {
    setRelativePointer(event, target) {
      const bounds =
        event.target.tagName === "AREA"
          ? event.target.parentElement.parentElement.getBoundingClientRect()
          : event.target.parentElement.getBoundingClientRect();
      const x = event.clientX - bounds.left + "px";
      const y = event.clientY - bounds.top + "px";
      const pointerDOM = document.getElementById("pointer");

      if (pointerDOM) {
        pointerDOM.style.top = y;
        pointerDOM.style.left = x;
      } else {
        this.$refs[target].insertAdjacentHTML(
          "beforeend",
          `<i id="pointer" style="top: ${y}; left: ${x}"></i>`
        );
      }
    },
    clearRelativePointer() {
      document.getElementById("pointer").remove();
    },
    addPoint(event, point) {
      if (this.points.length === 5) {
        this.isComponentModalActive = true;
        return;
      }
      if (this.points.includes(point)) return;
      this.activePoint.show = true;
      this.activePoint.x = event.x + "px";
      this.activePoint.y = event.y + "px";
      this.points.push(point);
      setTimeout(() => {
        this.activePoint.show = false;
      }, 1000);
    },
    submitForm() {
      this.setUsers({ nick: this.nick, time: this.$refs.timer.time });
      this.$router.push("rank");
    },
    ...mapMutations({
      setUsers: "setUsers"
    })
  },
  mounted() {
    imageMapResize();
  }
};
</script>

<style lang="scss">
.progress-wrapper progress {
  border: 0.5rem solid $primary;
  height: 3rem;
}

.modal-card-foot {
  justify-content: flex-end;
}

form {
  @include from($tablet) {
    width: 500px;
  }
}

area {
  cursor: default;
  &:hover,
  &:active,
  &:focus {
    outline-color: $danger;
  }
}

.column {
  position: relative;
  i {
    width: 20px;
    height: 20px;
    position: absolute;
    border: 0.25rem solid $primary;
    border-radius: 50%;
  }
}

.label {
  font-weight: normal;
  color: $primary;
  text-align: left;
}

.active-point {
  position: fixed;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
