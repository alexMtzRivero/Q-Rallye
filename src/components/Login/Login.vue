<template>
  <div class="">
    <input type="text" v-model="mail">
    <input type="text" v-model="pass1">
    <input type="text" v-model="pass2">
    <button> Create </button>
    <button> Login </button>
    <a href="/forgot"> forgot pasword</a>

  </div>
</template>

<script>
export default {
  name: 'Login',
  components:{

  },
  props: {


  },
  data(){
    return{

    }
  },
  methods:{

  },
  // on create
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
