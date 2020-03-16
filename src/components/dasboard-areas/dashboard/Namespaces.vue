<template>
  <div>
    <div class="dashboard-main">
      <transition-group appear name="fade-in">
        <CreateItem key="99999" />

        <div
          class="item"
          v-for="(namespace, index) in this.currentNamespaces"
          :key="index"
          @click="handleClick(namespace)"
          @keyup.enter="handleClick(namespace)"
        >
          <div class="delete" @click.stop.prevent="deleteNamespace(namespace)">x</div>
          {{ namespace }}
          <div class="count">
            <div>{{index}}</div>
            /{{counts.count}}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CreateItem from "../../form/CreateItem.vue";

export default {
	name: "DashboardNamespaces",
	inheritAttrs: false,
	components: {
		CreateItem
	},
	data() {
		return {
			id: "Namespace",
			updatedSearchString: ""
		};
	},
	created() {
		this.initialMeta = "metadata/namespaces";
		this.andFilter = "?filter=";
		this.maxLimit = "?limit=0";
	},
	async beforeMount() {
		if (this.currentNamespaces === null) {
			await this.fetchNamespaces(this.initialMeta + this.maxLimit);
		}
	},
	methods: {
		async fetchNamespaces(queryString) {
			await this.$store.dispatch("namespace/getNS", queryString);
		},
		updateNamespaces: function() {
			if (this.updatedSearchString < 1) {
				// return ALL NS as result
				const fetchAllQuery = this.initialMeta + this.maxLimit;
				this.$store.dispatch(
					"updateNotice",
					{
						code: "valid",
						message: "Gathering all of the available Namespaces!"
					},
					{ root: true }
				);
				this.$store.dispatch("namespace/getNS", fetchAllQuery);
			} else {
				// return FILTERED NS as result
				const fetchSearchedQuery =
					this.initialMeta + this.andFilter + this.updatedSearchString;
				this.$store.dispatch(
					"updateNotice",
					{
						code: "valid",
						message: `Filtering the Namespaces with ${this.searchedContent}`
					},
					{ root: true }
				);
				this.$store.dispatch("namespace/getNS", fetchSearchedQuery);
			}
		},
		updateFromCreated: function(newNS) {
			const justNewNS = this.initialMeta + this.andFilter + newNS;
			this.fetchNamespaces(justNewNS);
		},
		handleClick: function(namespace) {
			this.$store.dispatch("namespace/selectNS", namespace);
			// this.$store.dispatch("search/storedSearch", "");
			this.$router.push("/dashboard/namespace/");
		},
		async deleteNamespace(namespace) {
			await this.$store.dispatch(
				"deletedItem/deleteNS",
				this.initialMeta + "/" + namespace
			);
			await this.$store.dispatch(
				"namespace/getNS",
				this.initialMeta + this.maxLimit
			);
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
			currentNamespaces: "namespace/currentNamespaces",
			selectedNamespace: "namespace/selectedNamespace",
			counts: "namespace/counts",
			searchedContent: "search/searchedContent"
		})
	},
	watch: {
		searchedContent(newVal) {
			this.updatedSearchString = newVal;
			this.updateNamespaces();
		},
		selectedNamespace(newVal) {
			this.updateFromCreated(newVal);
		}
	}
};
</script>
<style lang="scss" src="@/styles/animation/_animate-cards.scss" scoped></style>
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
		text-transform: uppercase;
		word-break: break-word;
		z-index: 1;

		& .delete {
			align-items: center;
			color: shade($color1, $shade100);
			content: "x";
			display: grid;
			font-size: larger;
			height: auto;
			justify-content: center;
			margin: 5px 7px;
			max-height: 25px;
			min-width: 25px;
			opacity: 0;
			position: absolute;
			right: 0;
			top: 0;
			transition: opacity 0.3s ease-in;
			width: 25px;
			z-index: 5;
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

			& .delete {
				opacity: 1;
				transition: opacity 0.3s ease-in 1.25s;

				&:hover {
					background-color: $neutral;
					color: $invalid;
				}
			}

			.count {
				opacity: 1;

				div {
					color: tint($color1, $tint75);
					font-size: xx-large;
					line-height: 0;
					transition: font-size 0.25s ease;
				}
			}

			// .inner-item {
			// 	background-color: $color1;
			// 	border: 2px groove $color1;
			// 	color: $color2;
			// 	font-size: 1.1rem;
			// 	height: calc(100% - 0.5rem);
			// 	width: calc(100% - 0.5rem);
			// 	transition: all 0.3s ease-in;
			// }
		}

		.count {
			bottom: 5px;
			font-variant: all-petite-caps;
			opacity: 0.6;
			position: absolute;
			right: 5px;

			& div {
				display: inline;
				transition: font-size 0.3s ease;
			}
		}

		// .inner-item {
		// 	align-items: center;
		// 	background: $color2;
		// 	border-radius: inherit;
		// 	cursor: pointer;
		// 	display: grid;
		// 	height: calc(100% - 0.4rem);
		// 	justify-self: center;
		// 	width: calc(100% - 0.4rem);
		// }
	}
}
</style>
