<template>
  <div class="form-wrapper search-input">
    <form id="formMetaSearch" @submit.prevent="collectInputs">
      <div class="form-group">
        <div
          class="input-with-label"
          :class="{
            invalid: $v.searchString.$error,
            valid: !$v.searchString.$error && $v.searchString.$dirty
          }"
        >
          <label
            for="searchString"
            :class="{
              hasValue: $v.searchString.hasValueLength
            }"
          >Search content..</label>
          <input
            type="text"
            name="searchString"
            v-model="searchString"
            v-on:input="cleanInputs"
            @blur="$v.searchString.$touch()"
          />
          <div class="delete" @click.stop.prevent="clearSearch($event)">x</div>
        </div>
        <p class="form-field-msg" v-if="!$v.searchString.maxLength">
          Please add a searchString with no more than
          {{ $v.searchString.$params.maxLength.max }}
          characters.
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { maxLength, helpers } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
// let metaObj = {};
export default {
	name: "search-input",
	data() {
		return {
			searchString: ""
		};
	},

	validations: {
		searchString: {
			maxLength: maxLength(200),
			hasValueLength,
			strDefPattern
		}
	},
	methods: {
		cleanInputs: function() {
			this.searchString = this.searchString.replace(/\s/g, ".").toLowerCase();
			this.collectInputs();
		},
		collectInputs: function() {
			if (!this.$v.searchString.$error) {
				this.$store.dispatch("search/storedSearch", this.searchString);
			} else if (
				this.searchString.trim() === "" &&
				this.searchString.length < 1
			) {
				this.$store.dispatch("search/storedSearch", "");
			}
		},
		clearInputs: function() {
			this.searchString = "";
			this.$store.dispatch("search/storedSearch", "");
		},
		clearSearch: function(event) {
			const searchInput = event.target.previousElementSibling;
			const searchParent = event.target.previousElementSibling.parentNode;
			setTimeout(() => {
				searchParent.classList.remove("invalid", "valid");
				searchInput.blur();
			}, 10);
			this.clearInputs();
		}
	},
	computed: {
		...mapGetters({
			searchedContent: "search/searchedContent"
		})
	},
	watch: {
		searchedContent(newVal) {
      this.searchString = newVal;
      this.clearSearch();
    }
	}
};
</script>
<style lang="scss" src="@/styles/_form.scss"></style>
<style lang="scss" scoped>
.form-wrapper.search-input {
	// border: 1px $color2 solid;
	grid-area: search-input;
	max-height: 62px;
	padding: $spacingDefault;

	#formMetaSearch {
		.form-group {
			.input-with-label {
				border-bottom: 1px solid
					rgba($color: shade($color1, $shade90), $alpha: 0.2);
				text-transform: initial;

				&:focus-within label:not(input) {
					text-transform: uppercase;
					transition: all 300ms ease-out, font-size 500ms ease-out 300ms;
				}

				&.invalid:focus-within {
					border-bottom: 1px solid rgba($color: $warning, $alpha: 1);
				}

				&.invalid {
					border-bottom: 1px solid rgba($color: $invalid, $alpha: 1);
				}

				&.valid:focus-within,
				&.valid {
					border-bottom: 1px solid rgba($color: $valid, $alpha: 1);
				}
			}
		}
	}
}
</style>
