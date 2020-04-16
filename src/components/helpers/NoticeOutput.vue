<template>
  <div>
    <transition-group appear name="fade-in">
      <em
        key="1"
        v-if="!!noticeMessage"
        class="noticeMsg"
        :class="this.noticeMessage.code"
      >{{ noticeMessage.message }}</em>
      <button
        key="2"
        v-if="this.noticeMessage.code === 'invalid'"
        @click="handleReset"
      >Oops, Thanks for letting me know</button>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "Notice",
	methods: {
		handleReset: function() {
			this.$store.dispatch("resetAction", "", { root: true });
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
	}

	&::after {
		content: "\2190";
		font-size: large;
	}
}

button {
	@include btn;
	@include btn-danger;
	border: none;
	position: relative;
	top: 60vh;
	transition: all 700ms linear;
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
