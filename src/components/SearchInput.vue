<template>
  <div class="form-wrapper search-input">
    <form id="formMetaSearch" @submit.prevent="collectInputs">
      <div class="form-group">
        <div
          class="input-with-label"
          :class="{
            invalid: $v.namespace.$error,
            valid: !$v.namespace.$error && $v.namespace.$dirty
          }"
        >
          <label
            for="namespace"
            :class="{
              hasValue: $v.namespace.hasValueLength
            }"
          >Search content...</label>
          <input
            id="searchInput"
            type="text"
            name="namespace"
            v-model="namespace"
            v-on:input="cleanInputs"
            @blur="$v.namespace.$touch(), onBlur()"
            @focus="onFocus()"
<<<<<<< HEAD
            @keyup.enter="focusItems"
=======
            @mouseup="onFocus()"
            @keyup.enter.tab.exact="focusItems()"
            @keyup.shift.tab="focusPrevious()"
>>>>>>> master
          />
        </div>
        <p class="form-field-msg" v-if="!$v.namespace.maxLength">
          Please add a Namespace with no more than
          {{ $v.namespace.$params.maxLength.max }}
          characters.
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import { maxLength, helpers } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;
const strDefPattern = helpers.regex("strDefPattern", /^[\d+\w+^.^-]+$/);
<<<<<<< HEAD
let metaObj = {};
=======
>>>>>>> master

export default {
  name: "search-input",
  props: {
    clearSearchValue: {
      type: Boolean
    },
    userInputMeta: {
      type: Object
    }
  },
  data() {
    return {
      hasFocus: false,
      namespace: ""
    };
  },
  validations: {
    namespace: {
      maxLength: maxLength(200),
      hasValueLength,
      strDefPattern
    }
  },
  methods: {
    cleanInputs: function() {
      this.namespace = this.namespace.replace(/\s/g, ".").toLowerCase();
      this.collectInputs();
    },
    collectInputs: function() {
      if (!this.$v.namespace.$error) {
        // send up to parent
        this.$emit("emitSearchNamespace", this.namespace);
      } else if (this.namespace.trim() === "" && this.namespace.length < 1) {
        this.$emit("emitSearchNamespace", this.namespace);
      }
    },
    focusItems: function() {
      document.activeElement.blur();
      document.getElementById("createNew").nextElementSibling.focus();
<<<<<<< HEAD
      // this.$emit("keyup", true);
    },
    onFocus() {
=======
      this.hasFocus = false;
    },
    focusPrevious: function() {
      this.hasFocus = false;
    },
    onFocus: function() {
>>>>>>> master
      this.hasFocus = true;
    },
    onBlur: function() {
      this.hasFocus = false;
    }
  },
  watch: {
    clearSearchValue(newVal) {
      if (newVal) {
        this.formResponses.namespace = "";
        // document.getElementById('searchInput').value = "";
      }
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
