<template>
  <transition name="fade-in">
    <div v-if="this.responseData !== null" class="sent-fetch-wrapper">
      <h3>
        You have posted this data to the API
          <a
            :title="`visit the output URL to view the JSON at ${this.responseData.href}`"
            :href="this.responseData !== null ? this.responseData.href : ''"
            target="_blank"
          >View raw data</a>
      </h3>
      <div class="sent-fetch-data results-recap">
        <p class>{{ this.postString.namespace }}</p>
        <p>{{ this.postString.name }}</p>
        <p>{{ this.postString.type }}</p>
        <p class="output-desc">{{ this.postString.description }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	name: "PostFormOutput",
	computed: {
		...mapGetters({
			postString: "post/postString",
			responseData: "post/responseData"
		})
	}
};
</script>
<style lang="scss" src="@/styles/_form.scss" scoped></style>
<style lang="scss" src="@/styles/animation/_fade-in.scss" scoped></style>
<style lang="scss" scoped>
.sent-fetch-data {
	background-color: lighten($color: $valid, $amount: 25%);
	border-radius: $borderRadius;
	margin-bottom: $spacingDefault;
	padding: $spacingDefault;

	.results-recap {
		display: grid;
		grid-template-columns: repeat(3, [col] minmax(auto, 1fr));
		grid-template-rows: repeat(2, [row] auto);
		grid-row-gap: $spacingDefault;

		.output-desc {
			grid-column: col / span 4;
			grid-row: row 2;
		}
	}

	h3 {
		color: darken($color: $valid, $amount: 35%);
		margin-bottom: $spacingLarge;
		text-decoration: underline solid darken($color: $valid, $amount: 35%);

		& a {
      // FIX NEEDED
      background-color: $color1;
      border-radius: 3px;
      color: tint($color2, $tint100);
      display: inline;
      font-size: small;
      padding: 1px 5px;
      text-decoration: none;
      text-transform: lowercase;
		}
	}

	p {
		color: white;
		font-style: italic;
		white-space: pre-line;

		&.output-desc {
			max-width: fit-content;
			text-align: justify;
			word-break: break-word;
		}
	}

	.fade-enter {
		opacity: 0;
	}

	.fade-enter-active {
		transition: opacity 1s;
	}

	.fade-leave {
	}

	.fade-leave-active {
		transition: opacity 1s;
		opacity: 0;
	}
}
</style>
