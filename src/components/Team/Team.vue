<template>
  <div>
    <CreateTeam></CreateTeam>
    <ListTeam ref="refreshList"></ListTeam>
  </div>
</template>

<script>
import CreateTeam from'./CreateTeam.vue'
import ListTeam from'./ListTeam.vue'
export default {
  name: 'name',
  components:{
    CreateTeam,
    ListTeam
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
    this.$parent.testLogin();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
