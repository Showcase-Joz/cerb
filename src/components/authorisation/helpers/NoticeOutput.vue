<template>
	<div>
		<em v-if="!!noticeMessage" class="noticeMsg">{{ noticeMessage.message }}</em>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: "Notice",
	computed: {
		...mapGetters({ noticeMessage: "authorisation/noticeMessage" })
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
</style>
