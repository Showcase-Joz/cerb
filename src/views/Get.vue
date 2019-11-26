<template>
  <div class="get-view">
    <div class="view-atfold">
      <h1>This is a GET page</h1>
      <p>
        Please complete this form to GET data to the API for testing purposes
      </p>
    </div>
    <GetForm v-on:handleGet="retainGet" />
    <GetFormOutput
      v-bind:passedGet="passedGet"
      v-bind:resultSwitch="resultBoolean"
    />
  </div>
</template>

<script>
import GetForm from "../components/form/GetForm";
import GetFormOutput from "../components/GetFormOutput";

export default {
  name: "Get",
  data() {
    return {
      resultBoolean: false,
      passedGet: {},
      getString: "",
      getQuery: ""
    };
  },
  components: {
    GetForm,
    GetFormOutput
  },
  methods: {
    retainGet: function(newGet) {
      this.passedGet = newGet;
      this.setGetFetchVariables();
    },
    createGetString: function() {
      // this.getString = JSON.stringify(this.passedGet);
      // console.log(this.getString);
      const stagingBodyGetString = Object.keys(this.passedGet)
        .map(key => this.passedGet[key])
        .join("/");
      console.log("stagingBodyGetString: ", stagingBodyGetString);
      return (this.getString = stagingBodyGetString);
    },
    createGetQuery: function() {
      const stagingBodyGetQuery = Object.keys(this.passedGet)
        .map(key => key + "=" + this.passedGet[key])
        .join("&");
      console.log("stagingBodyGetQuery: ", stagingBodyGetQuery);

      return (this.getQuery = stagingBodyGetQuery);
    },
    setGetFetchVariables: function() {
      this.createGetString();
      this.createGetQuery();
      // this.fetchGet();
    },
    fetchGet: function() {
      // console.log("test ", this.getString);

      this.$http.get("", this.getString).then(
        response => {
          console.log(response);
          if (response.ok === true) {
            this.resultBoolean = true;
          }
        },
        error => {
          console.log("Error: ", error);
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.get-view {
  padding: $spacingDefault;
}
</style>
