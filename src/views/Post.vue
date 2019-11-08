<template>
  <div>
    <h1>This is a POST page</h1>

    <BaseForm />
  </div>
</template>

<script>
import BaseForm from '../components/form/BaseForm';

export default {
  name: "post", 
  components: {
    BaseForm
  }
}
</script>