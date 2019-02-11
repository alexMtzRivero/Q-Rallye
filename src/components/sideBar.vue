<template>
  <div :class="shown?'holder-show':'holder-hide'">
        <button @mousedown="change">hide</button>
        <ul>
          <li>Teams</li>
          <li>Rules</li>
          <li>Questions</li>
          <li></li>
          <li></li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'sideBar',
  components:{

  },
  props: {


  },
  data(){
    return{
          shown : true
    }
  },
  methods:{
        change(){
          
          this.shown = !this.shown
        }
  },
  // on create
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.holder-hide{
  position: absolute;
  top: 0px;
  transition: 0.5s;
  width: 20%;
  height: 100vh;
  background-color: #19212b;
}
.holder-show{
  position: absolute;
  top: 0px;
  transition: 0.5s;
  width: 5%;
  height: 100vh;
  background-color: #19212b;
}
</style>
