<template>
  <div class="about">
    <h1>This is a GET page</h1>

    <BaseForm />
  </div>
</template>

<script>
import BaseForm from '../components/form/BaseForm';

export default {
  name: "get", 
  components: {
    BaseForm
  }
}
</script>