<template>
  <div>
    <!-- signin form -->
    <div id="login">
      <br />
      <h4>Login to Typhon</h4>
      <br />
      <form @keyup.enter="usersignin">
        <div class="form-group">
          <div
            class="input-with-label email"
            :class="{
              invalid: $v.signinEmail.$error && $v.signinEmail.$dirty,
              valid: !$v.signinEmail.$error && $v.signinEmail.$dirty
            }"
          >
            <label
              for="email"
              :class="{
                hasValue: $v.signinEmail.hasValueLength
              }"
              >Email</label
            >
            <input
              v-model="signinEmail"
              type="email"
              name="email"
              @blur="$v.signinEmail.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.signinEmail.minLength">
            Your email is more than
            {{ $v.signinEmail.$params.minLength.min }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinEmail.maxLength">
            Your email is less than
            {{ $v.signinEmail.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinEmail.email"
            >{{
              !$v.signinEmail.minLength || !$v.signinEmail.maxLength
                ? "and"
                : "Your"
            }}
            email address looks malformed!</span
          >
          <span
            class="form-field-msg"
            v-if="!$v.signinEmail.required && $v.signinEmail.$dirty"
            >Your email shouldn't be empty!</span
          >
        </div>

        <div class="form-group">
          <div
            class="input-with-label password"
            :class="{
              invalid: $v.signinPassword.$error && $v.signinPassword.$dirty,
              valid: !$v.signinPassword.$error && $v.signinPassword.$dirty
            }"
          >
            <label
              for="password"
              :class="{
                hasValue: $v.signinPassword.hasValueLength
              }"
              >Password</label
            >
            <input
              v-model="signinPassword"
              type="password"
              name="password"
              @blur="$v.signinPassword.$touch(), onBlur()"
              @focus="onFocus()"
            />
          </div>
          <span class="form-field-msg" v-if="!$v.signinPassword.minLength">
            Your password is
            {{ $v.signinPassword.$params.minLength.min }}
            characters or longer.
          </span>
          <span class="form-field-msg" v-if="!$v.signinPassword.maxLength">
            Your password is less than
            {{ $v.signinPassword.$params.maxLength.max }}
            characters long.
          </span>
          <span class="form-field-msg" v-if="!$v.signinPassword.pasDefPattern"
            >{{
              !$v.signinPassword.minLength || !$v.signinPassword.maxLength
                ? "and"
                : "Your"
            }}
            password looks malformed!</span
          >
          <span
            class="form-field-msg"
            v-if="!$v.signinPassword.required && $v.signinPassword.$dirty"
            >Your password is empty, duh!</span
          >
        </div>
        <div class="form-group">
          <Notice v-if="this.showNotice" />
        </div>
        <div class="form-group">
          <input
            class="btn-sign-small-valid"
            type="button"
            value="sign in"
            @click="usersignin"
          />
        </div>
      </form>
      <ErrorOutput />
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  email,
  required,
  minLength,
  maxLength,
  helpers
} from "vuelidate/lib/validators";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
import Notice from "../helpers/NoticeOutput.vue";
import Loading from "../authorisation/helpers/Loading.vue";
// used to prevent UI covering user input when field has been completed
const hasValueLength = value => value.length >= 1;
const pasDefPattern = helpers.regex(
  "pasDefPattern",
  /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,200}$/
);
export default {
  name: "signin",
  components: {
    Loading,
    ErrorOutput,
    Notice
  },
  data() {
    return {
      signinEmail: "",
      signinPassword: "",
      loading: false,
      hasFocus: false,
      successURL: "<router-link to='/login'>About</router-link>"
    };
  },
  validations: {
    signinEmail: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(200),
      hasValueLength,
      email
    },
    signinPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(200),
      hasValueLength,
      pasDefPattern
    }
  },
  methods: {
    async usersignin() {
      // check both fields are filled in
      if (this.signinEmail === null || this.signinPassword === null) {
        this.$store.dispatch("authorisation/setError", {
          name: "Please complete both fields"
        });
        return;
      }
      if (this.signinPassword === "") {
        this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Please enter your password!!"
        });
        return;
      }
      this.loading = true;
      await this.$store
        .dispatch("authorisation/signin", {
          email: this.signinEmail,
          password: this.signinPassword
        })
        .then(() => {
          if (this.authUser) {
            // this.$store.dispatch("updateShowNotice", false);
            this.$store.dispatch("updateNotice", null);
            this.$router.push("/");
          }
        });
      this.loading = false;
      return false;
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
      authUser: "authorisation/authUser",
      showNotice: "showNotice"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
<style lang="scss" scoped>
#login {
  display: block;

  form {
    .input-with-label {
      min-height: 50px;
    }
  }
}
</style>
