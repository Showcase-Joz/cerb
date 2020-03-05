<template>
  <div>
    <div class="dashboard-main">
      <transition-group appear name="fade-in">
      <CreateItem :returnSolo="updateFromCreated" key="99999"/>

      <div
        class="item"
        v-for="(namespace, index) in this.currentNamespaces"
        :key="index"
        @click="handleClick(namespace)"
        @keyup.enter="handleClick(namespace)"
      >
        <div class="delete" @click.stop.prevent="deleteNamespace(namespace)">x</div>
        {{ namespace }}
      </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CreateItem from "../../form/CreateItem.vue";
// const initialMeta = "metadata/namespaces";
// const andFilter = "?filter=";
// const maxLimit = "?limit=0";
// const clearSearchInput = "";

export default {
	name: "DashboardNamespaces",
	inheritAttrs: false,
	props: {
		userInputMeta: {
			type: Object
		}
	},
	components: {
		CreateItem
	},
	data() {
		return {
			namespaceResults: [],
			searchInputUpdatedValue: null,
			selectedNS: null,
			id: "Namespace",
			constructNS: {
				initialMeta: "metadata/namespaces",
				andFilter: "?filter=",
				maxLimit: "?limit=0"
			}
		};
	},
	async beforeMount() {
		if (this.currentNamespaces === null) {
			await this.fetchNamespaces(this.constructNS.initialMeta + this.constructNS.maxLimit);
		}
	},
	methods: {
		async fetchNamespaces(stringSuffix) {
			await this.$store.dispatch("namespace/getNS", stringSuffix);
		},
		// fetchNamespaces: function(stringSuffix) {
		// this.loading = true;
		//  this.$http.get(stringSuffix).then(
		// response => {
		// if (response.status === 200) {
		// this.loading = false;
		// this.namespaceResults = response.data.namespaces;
		// } else if (response.status !== 200) {
		//     this.resultBoolean = false;
		//   }
		// },
		// error => {
		//   console.log("Error: ", error);
		// }
		//   );
		// },
		updateNamespaces: function() {
			if (this.searchInputUpdatedValue.namespace.length < 1) {
				this.fetchNamespaces(this.constructNS.initialMeta + this.constructNS.maxLimit);
			} else {
				const updatedMeta =
					this.constructNS.initialMeta + this.constructNS.andFilter + this.searchInputUpdatedValue.namespace;
				this.fetchNamespaces(updatedMeta);
			}
		},
		updateFromCreated: function(newNS) {
			const justNewNS = this.constructNS.initialMeta + this.constructNS.andFilter + newNS;
			this.$emit("handleNewNS", newNS);
			this.fetchNamespaces(justNewNS);
		},
		handleClick: function(namespace) {
			this.selectedNS = namespace;
			this.$emit("handleCurrentNS", this.selectedNS);
			this.$router.push("/dashboard/namespace/");
			this.$emit("handleNewNS", "");
		},
		async deleteNamespace(namespace) {
			await this.$store.dispatch(
				"deletedItem/deleteNS",
				this.constructNS.initialMeta + "/" + namespace
			);
			await this.$store.dispatch("namespace/getNS", this.constructNS.initialMeta + this.constructNS.maxLimit);
			this.$emit("handleNewNS", "");
		}
		// deleteNS: function(namespace) {
		// 	this.$http.delete(initialMeta + "/" + namespace).then(response => {
		// 		if (response.status === 200 && this.$data.id === "Namespace") {
		// 			this.fetchNamespaces(initialMeta + maxLimit);
		// 			this.$emit("handleNewNS", "");
		// 		}
		// 	});
		// 	// console.log(
		// 	//   "this deletes " + namespace + ", uncomment the code to continue"
		// 	// );
		// }
	},
	computed: {
		...mapGetters({
			loading: "loading",
			currentNamespaces: "namespace/currentNamespaces"
		})
	},
	watch: {
		userInputMeta: function(newVal) {
			this.searchInputUpdatedValue = newVal;
			this.updateNamespaces();
		}
	}
};
</script>
<style lang="scss" src="@/styles/animation/_fade-in-out.scss" scoped></style>
<style lang="scss" scoped>
.dashboard-main span {
	align-items: center;
	// background-color: rgb(42, 166, 166);
	display: grid;
	grid-area: dashboard-main;
	grid-gap: 1rem;
	grid-template-columns: repeat(auto-fit, minmax(max-content, auto));
	grid-auto-rows: minmax(auto, 150px);
	padding: $spacingDefault;
	width: 100%;

	@include for-size(tablet-portrait-up) {
		grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
	}

	.item {
		align-items: center;
		border: 1px solid $color2;
		background-color: $color2;
		border-radius: 0.2rem;
		color: tint($color2, $tint90);
		cursor: pointer;
		display: grid;
		height: 100%;
		opacity: 1;
		position: relative;
		word-break: break-word;
		z-index: 1;

		& .delete {
			align-items: center;
			color: $invalid;
			content: "x";
			display: grid;
			font-size: larger;
			height: auto;
			justify-content: center;
			margin: 5px 7px;
			max-height: 25px;
			min-width: 25px;
			position: absolute;
			right: 0;
			top: 0;
			width: 25px;
			z-index: 5;

			&:hover {
				background-color: $neutral;
				color: tint($color2, $tint100);
			}
		}

		// &:hover :not(.active-item) {
		//   opacity: 0.25;
		// }

		&:hover {
			background-color: $color1;
			border-radius: 0.4rem;
			border-width: 3px;
			color: $color2;
			transition: all 0.3s ease-in;

			.inner-item {
				background-color: $color1;
				border: 2px groove $color1;
				color: $color2;
				font-size: 1.1rem;
				height: calc(100% - 0.5rem);
				width: calc(100% - 0.5rem);
				transition: all 0.3s ease-in;
			}
		}

		.inner-item {
			align-items: center;
			background: $color2;
			border-radius: inherit;
			cursor: pointer;
			display: grid;
			height: calc(100% - 0.4rem);
			justify-self: center;
			width: calc(100% - 0.4rem);
		}
	}
}
</style>
