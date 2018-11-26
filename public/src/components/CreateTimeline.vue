
<template>
  <div>
    <h2>Create a Timeline List</h2>
    <form @submit.prevent>
      <div class="form-group">
        <input type="text" class="form-control" @keypress="typing=true" 
placeholder="What do you want to do?" v-model="timeline" 
@keyup.enter="addTimeline($event)">
        <span class="help-block small text-center" v-show="typing">Hit 
enter to save</span>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';  
  import bus from "./../bus.js";

  export default {
    data() {
      return {
        timeline: '',
        typing: false,
      }
    },
    methods: {
      addTimeline(event) {
        if (event) event.preventDefault();
        let url = 'http://localhost:4000/api/add';
        let param = {
          name: this.timeline,
          done: 0
      };
        axios.post(url, param).then((response) => {
          console.log(response);
          this.clearTimeline();
          this.refreshTimeline();
          this.typing = false;
        }).catch((error) => {
          console.log(error);
        })
      },
      clearTimeline() {
        this.timeline = '';
      },
      refreshTimeline() {
        bus.$emit("refreshTimeline")
      }
    }
  }
</script>
