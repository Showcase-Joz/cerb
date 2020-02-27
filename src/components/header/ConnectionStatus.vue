<template>
	<sup>
		...is
		<span
			:title="this.computedConnectionMessage"
			:class="{
        'green-item': connectionStatus,
        'red-item': !connectionStatus
      }"
		>{{ connectionStatus ? "online" : "offline" }}</span>
		<span
			:title="this.computedServerMessage"
			:class="{
        'green-item': serverStatus,
        'red-item': !serverStatus
      }"
		>{{ serverStatus ? "serving" : "not serving" }}</span>
	</sup>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: "connectionStatus",
	async beforeMount() {
		// check status before view loads
		await this.$store.dispatch("appInfo/serverTest");
	},
	computed: {
		...mapGetters({
			connectionStatus: "appInfo/connectionStatus",
			serverStatus: "appInfo/serverStatus",
			connectionErr: "appInfo/connectionErr"
		}),
		computedConnectionMessage: function() {
			return this.connectionStatus
				? "Typhon is currently able to connect to the internet; you are CONNECTED"
				: "Typhon is unable to connect to the internet and is therefore OFFLINE!";
		},
		computedServerMessage: function() {
			return this.serverStatus
				? "Typhon can communicate with the API and is serving ONLINE results"
				: "Typhon is unable to communicate with the API and is therefore OFFLINE!";
		}
	}
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
			
			&:hover {
				font-weight: $heavy;
				text-decoration: underline $unknown;
			}

			&:last-of-type::before {
				color: tint($color2, $tint100);
				content: "\0026";
				margin: auto 3px;
				position: relative;
			}
		}
	}
}
</style>
