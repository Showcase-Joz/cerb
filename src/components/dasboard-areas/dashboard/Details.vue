<template>
  <div>
    <transition name="animate-cards">
      <div class="item">
        {{ this.currentDetails.event.details }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Details",
  computed: {
    ...mapGetters({
      currentDetails: "details/currentDetails"
    })
  }
};
</script>
<style lang="scss" src="@/styles/animation/_animate-cards.scss" scoped></style>
<style lang="scss" scoped></style>
