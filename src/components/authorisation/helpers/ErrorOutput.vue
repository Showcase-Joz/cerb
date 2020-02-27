<template>
  <div>
    <em v-if="!!errMessage" class="errorMsg">
      {{ !!errMessage ? errMessage.message : errMessage }}
    </em>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Errors",
  computed: {
    ...mapGetters({errMessage: "authorisation/errMessage"})
  }
};
</script>

<style lang="scss" scoped>
.errorMsg {
  background-color: red;
  border-radius: 5px;
  color: white;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  max-width: max-content;
  padding: 3px 2rem;

  &::before {
    content: "\2192";
    font-size: large;
  }

  &::after {
    content: "\2190";
    font-size: large;
  }
}
</style>
