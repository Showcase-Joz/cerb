<template>
  <div>
    <form @submit="collectInputs">
      <input
        v-model="namespace"
        type="text"
        name="namespace"
        placeholder="Namespace"
      />
      <input type="text" name="name" placeholder="Name" v-model="name" />
      <select name="type">
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
      <input type="submit" value="Submit" class="btn" />
    </form>
  </div>
</template>

<script>
export default {
  name: "BaseForm",
  data() {
    return {
      namespace: "",
      name: "",
      type: ""
    };
  },
  methods: {
    collectInputs() {
      console.log("test");
    }
  }
};
</script>

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
</style>
