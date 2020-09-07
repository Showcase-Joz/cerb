<template>
  <div>
    <transition-group appear name="fade-in">
      <p
        key="1"
        v-if="!!noticeMessage"
        v-html="this.noticeMessage.message"
        class="noticeMsg"
        :class="this.noticeMessage.code"
      ></p>
      <button
        key="2"
        v-if="this.noticeMessage.code === 'invalid'"
        @click="handleReset"
      >
        Oops, Thanks for letting me know
      </button>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notice",
  methods: {
    handleReset: function() {
      this.$store.dispatch("resetAction", "");
    }
  },
  computed: {
    ...mapGetters({ noticeMessage: "noticeMessage" })
  }
};
</script>

<style lang="scss" scoped>
.noticeMsg {
  border-radius: $borderRadius;
  color: tint($color2, $tint100);
  display: block;
  hyphens: auto;
  max-width: max-content;
  padding: 3px calc(#{$spacingDefault} * 2);
  position: relative;
  transform: translateY(7vh);
  word-break: break-word;

  &.neutral {
    background-color: $neutral;
  }

  &.invalid {
    background-color: $invalid;
  }

  &.valid {
    background-color: $valid;
  }

  &::before {
    content: "\2192";
    font-size: large;
    padding-inline-end: 10px;
  }

  &::after {
    content: "\2190";
    font-size: large;
    padding-inline-start: 10px;
  }
}

button {
  @include btn;
  @include btn-success;
  border: none;
  border-radius: $borderRadius;
  padding: $spacingDefault;
  position: relative;
  top: 60vh;
  transition: all 700ms cubic-bezier(0.32, 2, 0.55, 0.27);
}
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease-in-out,
    top 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-in-enter-active {
  transition-delay: 0.5s;
  top: -20vh;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
  top: -20vh;
}

.fade-in-enter-to,
.fade-in-leave {
  opacity: 1;
  top: -20vh;
}
</style>
