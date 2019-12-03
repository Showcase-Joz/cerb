<template>
  <div class="form-group">
    <div
      class="input-with-label timestamp"
      :class="{
        invalid: $v.formResponses.timestamp.$error,
        valid:
          !$v.formResponses.timestamp.$error &&
          $v.formResponses.timestamp.$dirty
      }"
    >
      <label
        for="timestamp"
        :class="{
          hasValue: $v.formResponses.timestamp.hasValueLength
        }"
        >Timestamp
      </label>
      <input
        type="number"
        name="timestamp"
        v-model="formResponses.timestamp"
        v-on:input="changeTimestamp"
        v-on:blur="$v.formResponses.timestamp.$touch(), onBlur()"
        @focus="onFocus()"
        :class="{ empty: !$v.formResponses.timestamp.hasValueLength }"
      />
    </div>

    <p class="form-field-msg" v-if="!$v.formResponses.timestamp.minLength">
      Please add a timestamp with at least
      {{ $v.formResponses.timestamp.$params.minLength.min }}
      digits.
    </p>
    <p class="form-field-msg" v-if="!$v.formResponses.timestamp.maxLength">
      The maximum length of the timestamp should be no more than
      {{ $v.formResponses.timestamp.$params.maxLength.max }}
      digits.
    </p>
    <p
      class="form-field-msg"
      v-if="
        !$v.formResponses.timestamp.required &&
          $v.formResponses.timestamp.$dirty
      "
    >
      Timestamp must not be empty!
    </p>
  </div>
</template>
<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;

export default {
  name: "TimeStamp",
  data() {
    return {
      formResponses: {
        timestamp: ""
      },
      hasFocus: null
    };
  },
  validations: {
    formResponses: {
      timestamp: {
        required,
        hasValueLength,
        minLength: minLength(10),
        maxLength: maxLength(20)
      }
    }
  },
  methods: {
    onFocus() {
      this.hasFocus = true;
      this.$emit("updateFocus", this.hasFocus);
    },
    onBlur() {
      this.hasFocus = false;
      this.$emit("updateFocus", this.hasFocus);
    },
    changeTimestamp: function() {
      this.$emit("changeTimestamp", this.formResponses.timestamp);
    }
  }
};
</script>
<style lang="scss" src="@/styles/_form.scss" scoped></style>
