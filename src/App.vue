<template>
  <div id="app">
    <Modal v-if="this.showModal" />
    <transition name="fade-in">
      <Loading v-if="this.loading" />
    </transition>
    <Header />
    <transition name="fade-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/header/Header";
import Modal from "./components/helpers/Modal";
import Loading from "./components/helpers/Loading";
export default {
  name: "app",
  components: {
    Header,
    Modal,
    Loading
  },
  beforeUpdate() {
    // clear error message from current view
    if (this.errMessage) {
      this.$store.dispatch("authorisation/setError", null);
    }
  },
  // attempt to login user from session
  async created() {
    await this.$store.dispatch("authorisation/fetchUser");
    await this.$store.dispatch("appInfo/connectionTest");
    if (this.authUser) {
      this.$router.push("/dashboard");
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser",
      errMessage: "authorisation/errMessage",
      loading: "loading",
      showModal: "showModal"
    })
  }
};
</script>

<style lang="scss" src="@/styles/animation/_fade-in.scss" scoped></style>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
*:focus {
  outline: none;
}

#app {
  color: tint($color2, $tint10);
  display: grid;
  font-family: $primary-font-family;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(auto, max-content) minmax(auto, max-content);
  height: 100vh;
  overflow: hidden;
  min-width: $minViewport;
  text-align: center;
  width: 100vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.split-view {
  display: grid;
  grid-template-columns: minmax(max-content, auto);
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "form-wrapper"
    "sent-fetch-wrapper";

  @include for-size(desktop-up) {
    grid-template-columns: minmax(max-content, 1fr);
    grid-template-areas: "form-wrapper sent-fetch-wrapper";
    column-gap: 1rem;

    &.append-grid {
      grid-template-columns: minmax(max-content, 1fr) minmax(auto, 1fr);
    }
  }
}

.view-atfold {
  grid-area: view-atfold;
  margin-bottom: $spacingDefault;
}

h1 {
  font-size: 2.5rem;
  text-transform: uppercase;
}

h4 {
  color: $color1;
}

.status-setting {
  // align-items: center;
  cursor: help;
  display: grid;
  height: 100%;
  // justify-items: center;
  min-width: 20px;
  position: relative;
  width: 100%;

  &::after {
    border-radius: calc(#{$borderRadius} / 2);
    content: "";
    height: inherit;
    position: absolute;
    width: inherit;
  }

  &::after.status-red {
    @extend .status-setting::after;
    background-color: $invalid;
  }

  &::after.status-green {
    @extend .status-setting::after;
    background-color: $valid;
  }
}

// scrollbars

::-webkit-scrollbar-track-piece:start {
  /* Select the top half (or left half) or scrollbar track individually */
}

::-webkit-scrollbar-thumb:window-inactive {
  /* Select the thumb when the browser window isn't in focus */
}

::-webkit-scrollbar-button:horizontal:decrement:hover {
  /* Select the down or left scroll button when it's being hovered by the mouse */
}

::-webkit-scrollbar {
  width: 6px;
  background-color: tint($color1, $tint100);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(tint($color1, $tint50), 0.7);
  box-shadow: inset 0 0 6px rgba(tint($color1, $tint50), 0.7);
  background-color: tint($color1, $tint100);
}

::-webkit-scrollbar-thumb {
  background-color: $color1;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(tint($color2, $tint100), 0.35) 25%,
    transparent 25%,
    transparent 50%,
    rgba(tint($color2, $tint100), 0.35) 50%,
    rgba(tint($color2, $tint100), 0.35) 75%,
    transparent 75%,
    transparent
  );
}

#message {
  hyphens: auto;
  line-height: 1.5rem;
  margin: 1rem auto;
  word-break: break-word;

  & strong {
    background-color: $invalid;
    border-radius: $borderRadius;
    color: tint($color2, $tint100);
    font-size: smaller;
    padding: 2px 5px;
    text-transform: uppercase;
    word-break: break-all;

    &.warning {
      border: 2px solid tint($color2, $tint100);
      box-shadow: 0 0 5px 1px tint($color2, $tint100);
    }
  }
}
#message-confirm {
  border-top: shade($invalid, $shade50) 2px outset;
  padding-top: 1rem;
}
</style>
