<template>
  <div class="dashboard-wrapper">
    <transition name="fade">
      <Loading v-if="this.loading" />
    </transition>
    <router-view
      :userInputMeta="userInputMeta"
      v-on:handleCurrentNS="retainCurrentNS"
      v-on:handleCurrentN="retainCurrentN"
      v-on:handleNewNS="retainNewNS"
      :selectedNS="currentNS"
      :selectedN="currentN"
      :newNS="createdNS"
    />
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Loading from "../helpers/Loading.vue";
export default {
  name: "DashboardWrapper",
  props: {
    userInputMeta: {
      type: Object
    }
  },
  components: {
    Loading
  },
  data() {
    return {
      currentNS: null,
      createdNS: null,
      currentN: null
    };
  },
  methods: {
    retainCurrentNS: function(selectedNS) {
      this.currentNS = selectedNS;
    },
    retainCurrentN: function(selectedN) {
      this.currentN = selectedN;
    },
    retainNewNS: function(createdNS) {
      this.createdNS = createdNS;
      this.$emit("selectedNS", createdNS);
    }
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
