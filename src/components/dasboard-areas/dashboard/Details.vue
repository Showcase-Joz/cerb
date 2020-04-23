<template>
  <div>
    <transition appear name="fade-in">
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
<style lang="scss" src="@/styles/animation/_fade-in.scss" scoped></style>
<style lang="scss" scoped></style>
