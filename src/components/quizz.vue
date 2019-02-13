<template>
  <div class="">
    <quizzes></quizzes>
    <questions></questions>
  </div>
</template>

<script>
import Quizzes from './quizzes.vue'
import Questions from './questions.vue'

export default {
  name: 'name',
  components:{
    Quizzes,
    Questions
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
