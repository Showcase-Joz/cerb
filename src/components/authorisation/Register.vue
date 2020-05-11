<template>
  <div>
    <!-- register new user form -->
    <div id="register">
      <br />
      <h4>Register as a New User</h4>
      <br />
      <form @keyup.enter.prevent.stop="userRegister">
        <div class="form-group">
          <div
            class="input-with-label email"
            :class="{
              invalid: $v.registerEmail.$error && $v.registerEmail.$dirty,
              valid: !$v.registerEmail.$error && $v.registerEmail.$dirty
            }"
          >
            <label
              for="email"
              :class="{
                hasValue: $v.registerEmail.hasValueLength
              }"
              >Email</label
            >
            <input
              v-model="registerEmail"
              type="email"
              name="email"
              @blur="$v.registerEmail.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.registerEmail.minLength">
            Your email is more than
            {{ $v.registerEmail.$params.minLength.min }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.registerEmail.maxLength">
            Your email is less than
            {{ $v.registerEmail.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.registerEmail.email"
            >{{
              !$v.registerEmail.minLength || !$v.registerEmail.maxLength
                ? "and"
                : "Your"
            }}
            email address looks malformed!</span
          >
          <span
            class="form-field-msg"
            v-if="!$v.registerEmail.required && $v.registerEmail.$dirty"
            >Your email shouldn't be empty!</span
          >
        </div>

        <div class="form-group">
          <div
            class="input-with-label password"
            :class="{
              invalid: $v.registerPassword.$error && $v.registerPassword.$dirty,
              valid: !$v.registerPassword.$error && $v.registerPassword.$dirty
            }"
          >
            <label
              for="password"
              :class="{
                hasValue: $v.registerPassword.hasValueLength
              }"
              >Password</label
            >
            <input
              v-model="registerPassword"
              type="password"
              name="password"
              @blur="$v.registerPassword.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.registerPassword.minLength">
            Your password is
            {{ $v.registerPassword.$params.minLength.min }}
            characters or longer.
          </span>
          <span class="form-field-msg" v-if="!$v.registerPassword.maxLength">
            Your password is less than
            {{ $v.registerPassword.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.registerPassword.pasDefPattern"
            >{{
              !$v.registerPassword.minLength || !$v.registerPassword.maxLength
                ? "and"
                : "Your"
            }}
            password looks malformed!</span
          >
          <span
            class="form-field-msg"
            v-if="!$v.registerPassword.required && $v.registerPassword.$dirty"
            >Your password is empty, duh!</span
          >
        </div>
        <div class="form-group">
          <div
            class="input-with-label password"
            :class="{
              invalid: !$v.registerPasswordConfirm.sameAsPassword,
              valid: $v.registerPasswordConfirm.sameAsPassword
            }"
          >
            <label
              for="passwordConfirm"
              :class="{
                hasValue: $v.registerPasswordConfirm.hasValueLength
              }"
              >Confirm Password</label
            >
            <input
              v-model="registerPasswordConfirm"
              type="password"
              name="passwordConfirm"
              @blur="$v.registerPasswordConfirm.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span
            class="form-field-msg"
            v-if="
              !$v.registerPasswordConfirm.sameAsPassword &&
                $v.registerPasswordConfirm.$dirty
            "
            >Your passwords don't match</span
          >
        </div>
        <div class="form-group">
          <a @click="verifyCode">Already got a Code?</a>
        </div>
        <div class="form-group">
          <input
            class="btn-sign-small-valid"
            type="button"
            value="Register"
            @click="userRegister"
          />
        </div>
      </form>
      <ErrorOutput />
    </div>
    <!-- loading (during async await) -->
    <Loading v-if="loading" />
  </div>
</template>

<script>
import {
  email,
  required,
  minLength,
  maxLength,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import Loading from "../authorisation/helpers/Loading.vue";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
// used to prevent UI covering user input when field has been completed
const hasValueLength = value => value.length >= 1;
const pasDefPattern = helpers.regex(
  "pasDefPattern",
  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,200}$/
);
export default {
  name: "register",
  components: {
    Loading,
    ErrorOutput
  },
  data() {
    return {
      registerEmail: "",
      registerPassword: "",
      registerPasswordConfirm: "",
      hasFocus: false,
      loading: false
    };
  },
  validations: {
    registerEmail: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(200),
      hasValueLength,
      email
    },
    registerPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(200),
      hasValueLength,
      pasDefPattern
    },
    registerPasswordConfirm: {
      required,
      hasValueLength,
      sameAsPassword: sameAs("registerPassword")
    }
  },
  methods: {
    // tried to sign a user up
    async userRegister() {
      // checks passwords match before calling Auth...
      if (this.registerEmail === "") {
        await this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Email cannot be empty"
        });
        return;
      }
      if (this.registerPassword !== this.registerPasswordConfirm) {
        await this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Confirmation password must match"
        });
        return;
      }
      // set component elements ready for ux
      this.loading = true;
      // calls Vuex method [signup] with collected local details (email/pword)
      await this.$store.dispatch("authorisation/register", {
        email: this.registerEmail,
        password: this.registerPassword
      });
      this.loading = false;
      return false;
    },
    verifyCode: function() {
      this.$store.dispatch("authorisation/updateConfirm", true);
      this.$store.dispatch("authorisation/setError", null);
    },
    onFocus() {
      this.hasFocus = true;
    },
    onBlur() {
      this.hasFocus = false;
    }
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" scoped>
#register {
  display: block;

  form {
    .input-with-label {
      min-height: 50px;
    }
  }
}
</style>
