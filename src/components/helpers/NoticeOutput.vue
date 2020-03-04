<template>
  <div>
    <transition appear name="fade-in">
      <em v-if="!!noticeMessage" class="noticeMsg">
        {{
        noticeMessage.message
        }}
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
      this.$store.dispatch("updateNotice", null);
    }, 5000);
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
  

	&::before {
		content: "\2192";
		font-size: large;
	}

	&::after {
		content: "\2190";
		font-size: large;
	}
}

.fade-in-enter-active, .fade-in-leave-active {
  transition: opacity .5s ease-in-out;
}

.fade-in-enter-active {
  transition-delay: .5s;
}

.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-to, .fade-in-leave {
  opacity: 1;
}

</style>
