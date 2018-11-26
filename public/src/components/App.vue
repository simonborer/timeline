<template>
  <div id="app">
    <div class="container">
      <div class="row col-md-6 offset-md-3">
        <create-timeline></create-timeline>
        <list-timeline></list-timeline>
      </div>
    </div>
  </div>
</template>


<script>
  import CreateTimeline from './CreateTimeline.vue';
  import ListTimeline from './ListTimeline.vue';
  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {CreateTimeline,  ListTimeline},
  }
</script>
<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>

