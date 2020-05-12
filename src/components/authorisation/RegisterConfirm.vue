<template>
  <div>
    <!-- confirm new user form -->
    <div id="register-confirm">
      <br />
      <h4>Confirm your Registration with a Code</h4>
      <br />
      <form @submit.prevent.stop="userConfirm" @keyup.enter="userConfirm">
        <div class="form-group">
          <div
            class="input-with-label email"
            :class="{
              invalid: $v.confirmEmail.$error && $v.confirmEmail.$dirty,
              valid: !$v.confirmEmail.$error && $v.confirmEmail.$dirty
            }"
          >
            <label
              for="email"
              :class="{
                hasValue: $v.confirmEmail.hasValueLength
              }"
              >Email</label
            >
            <input
              v-model="confirmEmail"
              ref="email"
              type="email"
              name="email"
              @blur="$v.confirmEmail.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.confirmEmail.minLength">
            Your email is more than
            {{ $v.confirmEmail.$params.minLength.min }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.confirmEmail.maxLength">
            Your email is less than
            {{ $v.confirmEmail.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.confirmEmail.email">
            {{
              !$v.confirmEmail.minLength || !$v.confirmEmail.maxLength
                ? "and"
                : "Your"
            }}
            email address looks malformed!
          </span>
          <span
            class="form-field-msg"
            v-if="!$v.confirmEmail.required && $v.confirmEmail.$dirty"
            >Enter your registered email address</span
          >
        </div>
        <div class="form-group">
          <div
            class="input-with-label code"
            :class="{
              invalid: $v.confirmCode.$error && $v.confirmCode.$dirty,
              valid: !$v.confirmCode.$error && $v.confirmCode.$dirty
            }"
          >
            <label
              for="code"
              :class="{
                hasValue: $v.confirmCode.hasValueLength
              }"
              >Code</label
            >
            <input
              v-model="confirmCode"
              ref="code"
              type="number"
              name="code"
              @blur="$v.confirmCode.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.confirmCode.minLength">
            Your code is
            {{ $v.confirmCode.$params.minLength.min }}
            digits or longer.
          </span>
          <span class="form-field-msg" v-if="!$v.confirmCode.maxLength">
            Your coed is less than
            {{ $v.confirmCode.$params.maxLength.max }}
            digits long.
          </span>
          <span
            class="form-field-msg"
            v-if="!$v.confirmCode.codeDefPattern && $v.confirmCode.$dirty"
          >
            {{
              !$v.confirmCode.minLength || !$v.confirmCode.maxLength
                ? "and your"
                : "Your"
            }}
            code should only be digits
          </span>
          <span
            class="form-field-msg"
            v-if="!$v.confirmCode.required && $v.confirmCode.$dirty"
            >You didn't enter a code, duh!</span
          >
        </div>
        <div class="form-group">
          <a @click="registerUser">Not got a Code?</a>
        </div>
        <div class="form-group">
          <button
            class="btn-sign-small-auth-valid"
            :disabled="
          $v.confirmEmail.$error && $v.confirmEmail.$dirty ||
            $v.confirmCode.$error && $v.confirmCode.$dirty ||
            this.spinner
        "
            type="submit"
            @click="userConfirm"
          >Confirm my Code
          <LoadingSpinner v-if="this.spinner" />
          </button>
        </div>

        <!-- <div class="confirm-notice" :value="true">
          You will need to login after confirming your email.
        </div> -->
      </form>
      <ErrorOutput />
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "../helpers/LoadingSpinner.vue";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
import { mapGetters } from "vuex";
import {
  email,
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
// used to prevent UI covering user input when field has been completed
const hasValueLength = value => value.length >= 1;
const codeDefPattern = helpers.regex("codeDefPattern", /^[0-9].{4,7}$/);
export default {
  name: "registerConfirm",
  components: {
    LoadingSpinner,
    ErrorOutput
  },
  data() {
    return {
      confirmEmail: "",
      confirmCode: "",
    };
  },
  validations: {
    confirmEmail: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(200),
      hasValueLength,
      email
    },
    confirmCode: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(8),
      hasValueLength,
      codeDefPattern
    }
  },
  beforeMount() {
    if (this.registerConfirmEmail !== "") {
      this.confirmEmail = this.registerConfirmEmail;
    }
  },
  mounted() {
    if (this.confirmEmail !== "") {
      this.$refs["code"].focus();
    } else {
      this.$refs["email"].focus();
    }
  },
  methods: {
    // focusInput: function(ref) {
    //   if (this.confirmEmail !== "") {

    //   }
    // },
    async userConfirm() {
      await this.$store
        .dispatch("authorisation/confirm", {
          email: this.confirmEmail,
          code: this.confirmCode
        })
        .then(() => {
          if (this.confirmEmail === "") {
            this.$router.push("/");
          } else if (this.showNotice === true) {
            setTimeout(() => {
              this.$router.push("/login");
            }, 1500);
          }
        });
      return false;
    },
    registerUser: function() {
      this.$store.dispatch("authorisation/updateConfirm", false);
      this.$store.dispatch("authorisation/setError", null);
    },
    onFocus() {
      this.hasFocus = true;
    },
    onBlur() {
      this.hasFocus = false;
    }
  },
  computed: {
    ...mapGetters({
      registerConfirmEmail: "authorisation/registerConfirmEmail",
      showNotice: "showNotice",
      spinner: "spinner"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" scoped>
#register-confirm {
  display: block;

  form {
    .input-with-label {
      min-height: 50px;
    }
    // .confirm-notice {
    //   width: fit-content;
    // }
  }
}
</style>
