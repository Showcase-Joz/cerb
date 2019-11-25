<template>
  <div class="form-group">
    <div
      class="input-with-label text-area"
      :class="{
        invalid: $v.formResponses.description.$error,
        valid:
          !$v.formResponses.description.$error &&
          $v.formResponses.description.$dirty
      }"
    >
      <label
        for="description"
        :class="{
          hasValue: $v.formResponses.description.hasValueLength
        }"
        >Description
      </label>
      <resizable-textarea>
        <textarea
          name="description"
          v-model="formResponses.description"
          v-on:input="changeDescription"
          v-on:blur="$v.formResponses.description.$touch()"
          placeholder="Multiple lines allowed"
          :class="{ empty: !$v.formResponses.description.hasValueLength }"
        ></textarea>
      </resizable-textarea>
    </div>

    <p class="form-field-msg" v-if="!$v.formResponses.description.minLength">
      Please add a description with at least
      {{ $v.formResponses.description.$params.minLength.min }}
      characters.
    </p>
    <p class="form-field-msg" v-if="!$v.formResponses.description.maxLength">
      The maximum length of the description should be no more than
      {{ $v.formResponses.description.$params.maxLength.max }}
      characters.
    </p>
    <p
      class="form-field-msg"
      v-if="
        !$v.formResponses.description.required &&
          $v.formResponses.description.$dirty
      "
    >
      Description must not be empty!
    </p>
  </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import ResizableTextarea from "./ResizableTextarea.js";
const hasValueLength = value => value.length >= 1;

export default {
  name: "DescriptionTextArea",
  data() {
    return {
      formResponses: {
        description: ""
      }
    };
  },
  components: {
    ResizableTextarea
  },
  validations: {
    formResponses: {
      description: {
        required,
        hasValueLength,
        minLength: minLength(3),
        maxLength: maxLength(200)
      }
    }
  },
  methods: {
    changeDescription: function() {
      this.$emit("changeDescription", this.formResponses.description);
    }
  }
};
</script>
<style lang="scss" src="@/styles/_form.scss" scoped></style>
