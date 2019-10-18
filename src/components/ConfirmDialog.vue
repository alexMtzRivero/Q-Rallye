<template>
  <div v-if="visible">
  <p> vous etes sur de suprimer ?</p>
  <div>
    <button @click="accept()">oui</button>
    <button @click="dissmis()">non</button>
  </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmDialog',
 
  props: {


  },
  data(){
    return{
      visible: true
    }
  },
  methods:{
    dissmis:function(){

    },
    accept:function(){

    }

  },
  // on create
  mounted(){
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
