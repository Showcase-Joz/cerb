<template>
  <div class="dashboard-wrapper">
    <transition name="fade-in">
      <Loading v-if="this.loading" />
    </transition>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Loading from "../helpers/Loading.vue";
export default {
  name: "DashboardWrapper",
  components: {
    Loading
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  }
};
</script>
<style lang="scss" src="@/styles/animation/_loading-fade.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-wrapper {
  grid-area: dashboard-wrapper;
  max-height: inherit;
  overflow-y: auto;
}
</style>
