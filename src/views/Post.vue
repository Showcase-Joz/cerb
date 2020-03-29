<template>
  <div class="post-view page">
    <div class="view-atfold">
      <h1>
        POST
        <span class="symbol-arrows">&#8594;</span> Typhon
      </h1>
      <p
        v-if="!resultBoolean"
      >Please complete this form to POST data to the API for testing purposes</p>
    </div>

    <div class="split-view" :class="{ 'append-grid': this.resultBoolean }">
      <PostForm
        v-on:handlePost="retainPost"
        v-bind:resultSwitch="resultBoolean"
      />
      <PostFormOutput
        v-bind:responseHref="responseHref"
        v-bind:passedPost="passedPost"
        v-bind:resultSwitch="resultBoolean"
      />
    </div>
  </div>
</template>

<script>
import PostForm from "../components/form/PostForm";
import PostFormOutput from "../components/PostFormOutput";
import { mapGetters } from "vuex";
export default {
	name: "post",
	props: {},
	data() {
		return {
			// resultBoolean: false,
			passedPost: {},
			postString: "",
		};
	},
	components: {
		PostForm,
		PostFormOutput
	},
	methods: {
		retainPost: function(newPost) {
			this.passedPost = newPost;
			this.createPostString();
		},
		createPostString: function() {
			this.postString = JSON.stringify(this.passedPost);
			this.fetchPost();
		},
		async fetchPost() {
			this.$store.dispatch(
				"updateNotice",
				{
					code: "valid",
					message: "Posting new data to the API"
				},
				{ root: true }
			);
			await this.$store.dispatch("post/sendString", this.postString);
			// .then(
			//   response => {
			//     if (response.status === 200 || response.status === 201) {
			//       this.resultBoolean = true;
			//       this.responseHref = response.data.href;
			//       this.passedMessage = response.data.message;
			//     } else if (response.status !== 200 || response.status !== 201) {
			//       this.resultBoolean = false;
			//     }
			//   },
			//   error => {
			//     console.log("Error: ", error);
			//     console.log(this.postString);
			//   }
			// );
		}
	},
	computed: {
		...mapGetters({
			responseData: "post/responseData"
		}),
		resultBoolean: function() {
			if (this.responseData !== null) {
				return true;
			} else {

				return false;
			}
    },
    responseHref: function() {
      if (this.responseData !== null) {
        return this.responseData.href;
      } else {
        return "";
      }
    }
	}
};
</script>
<style lang="scss" scoped>
.post-view {
	padding: $spacingDefault;

	h1 span.symbol-arrows {
		@include symbol-arrows;
	}
}
</style>
