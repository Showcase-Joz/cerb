<template>
	<sup>
		...is
		<span
			:title="this.computedConnectionMessage"
			:class="{
        'status-green': connectionStatus,
        'status-red': !connectionStatus
      }"
		>{{ connectionStatus ? "online" : "offline" }}</span>
    <span
			:title="this.computedConnectionMessage"
			:class="{
        'status-green': serverStatus,
        'status-red': !serverStatus
      }"
		>&amp; {{ serverStatus ? "serving" : "not serving" }}</span>
	</sup>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: "connectionStatus",
	async beforeMount() {
		// check status before view loads
		await this.$store.dispatch("serverTest");
	},
	computed: {
		...mapGetters(["connectionStatus", "serverStatus", "connectionErr"]),
		computedConnectionMessage: function() {
			return this.connectionStatus
				? "Typhon is currently able to communicate with the API and serving ONLINE results"
				: "Typhon is unable to communicate with the API and is therefore OFFLINE";
		}
	},
	// watch: {
	// 	connectionStatus: function(newVal) {
	// 		if (newVal) {
				
	// 		}
	// 	}
	// }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
	& sup {
		cursor: help;
		font-variant: all-petite-caps;
		justify-self: end;
		letter-spacing: calc(#{$letter-spacing} / 4);
		margin-right: 2px;
		width: max-content;

		span {
			&.status-red {
				color: $invalid;
				position: relative;

				&::after {
					background-color: shade($invalid, $shade10);
					border-radius: 50%;
					content: "";
					bottom: 4px;
					height: 10px;
					margin-left: 4px;
					position: absolute;
					width: 10px;
				}
			}

			&.status-green {
				color: $valid;
				position: relative;

				&::after {
					background-color: $valid;
					border-radius: 50%;
					content: "";
					bottom: 4px;
					height: 10px;
					position: absolute;
					margin-left: 4px;
					width: 10px;
				}
			}
		}
	}
}
</style>
