<template>
  <div>
    <form id="formPost" @submit.prevent="collectInputs">
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
          >Namespace
        </label>
        <input
          v-model="namespace"
          @blur="$v.namespace.$touch()"
          type="text"
          name="namespace"
        />
      </div>
      <p v-if="!$v.namespace.minLength">
        Please add a Namespace with at least
        {{ $v.namespace.$params.minLength.min }}
        characters.
      </p>
      <p v-if="!$v.namespace.maxLength">
        Please add a Namespace with no more than
        {{ $v.namespace.$params.maxLength.max }}
        characters.
      </p>
      <p v-if="!$v.namespace.required && $v.namespace.$dirty">
        Namespace must not be empty!
      </p>
      <input type="text" name="name" placeholder="Name" v-model="name" />
      <select name="type" v-model="type">
        <option disabled value>Please select</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
      <textarea
        name="description"
        id
        rows="5"
        placeholder="Enter a description for your issue here..."
        v-model="description"
      ></textarea>
      <input type="submit" value="Submit" class="btn" />
    </form>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
const hasValueLength = value => value.length >= 1;

export default {
  name: "PostForm",
  data() {
    return {
      namespace: "",
      name: "",
      type: "",
      description: ""
    };
  },
  validations: {
    namespace: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(5),
      hasValueLength
    }
  },
  methods: {
    collectInputs() {
      const newPost = {
        namespace: this.namespace,
        name: this.name,
        type: this.type,
        description: this.description
      };
      // send up to parent
      this.$emit("handlePost", newPost);
    }
  }
};
</script>

<style lang="scss" src="@/styles/_form.scss" scoped>
#formPost {
  margin-top: 200px;
}
</style>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  border: none;
  background-color: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
}

.error-msg {
  color: red;
}
</style>
