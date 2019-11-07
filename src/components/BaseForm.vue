<template>
  <div>
    <form>
      <input type="text" name="namespace" placeholder="Namespace" />
      <input type="text" name="name" placeholder="Name" />
      <select name="type">
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "BaseForm", 
  components: {

  }
};
</script>

<style lang="scss" scoped>

</style>