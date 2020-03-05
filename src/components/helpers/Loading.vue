<template>
  <div class="loading">
    <!-- <div class="content">Loading...</div> -->
    <div class="lds-ring-container">
      <div class="lds-ripple">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <Notice v-if="this.loading" class="notice-wrapper" />
  </div>
</template>

<script>
import Notice from "../helpers/NoticeOutput.vue";
import { mapGetters } from "vuex";
export default {
	name: "Loading",
	components: {
		Notice
	},
	computed: {
		...mapGetters({
			loading: "loading"
		})
	}
};
</script>

<style lang="scss" src="@/styles/animation/_spinner.scss" scoped></style>
<style lang="scss" scoped>
.loading {
	align-items: center;
	background-color: rgba(tint($color2, $tint10), 0.85);
	cursor: progress;
	display: grid;
	height: 100%;
  justify-items: center;
  opacity: 0.7;
	position: absolute;
	transition: background-color 1s ease-in;
	width: 100%;
	z-index: 999;

	.lds-ring-container {
		transform: translateX(-25%);
  }
  .notice-wrapper {
		transform: translateX(-15%);
	}
	.notice-wrapper {
    align-self: start;
    justify-self: center;
		margin-top: 10%;
    text-transform: uppercase;
    z-index: 998;
	}
}
</style>
