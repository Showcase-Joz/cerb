<template>
  <div>
    <transition appear name="fade-in">
      <em v-if="!!noticeMessage" class="noticeMsg">
        {{ noticeMessage.message }}
      </em>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notice",
  created() {
    setTimeout(() => {
      this.$store.dispatch("updateNotice", null, { root: true });
    }, 1000);
  },
  computed: {
    ...mapGetters({ noticeMessage: "noticeMessage" })
  }
};
</script>

<style lang="scss" scoped>
.noticeMsg {
  background-color: $neutral;
  border-radius: 5px;
  color: white;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  max-width: max-content;
  padding: 3px 2rem;
  position: relative;

  &::before {
    content: "\2192";
    font-size: large;
  }

  &::after {
    content: "\2190";
    font-size: large;
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease-in-out,
    top 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-in-enter-active {
  transition-delay: 0.5s;
  top: 0;
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
  top: 100%;
}

.fade-in-enter-to,
.fade-in-leave {
  opacity: 1;
  top: 0;
}
</style>
