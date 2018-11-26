<template>
    <div>
        <div class="col-md-12" v-show="timelines.length>0">
            <h3>Timeline Items</h3>
            <div class="row mrb-10" v-for="timeline in timelines">
                <div class="input-group m-b-5">
                    <span class="input-group-addon addon-right"><input 
type="checkbox" v-model="timeline.done" :checked="timeline.done" 
:value="timeline.done" v-on:change="updateTimeline(timeline)" title="Mark as 
done?"/></span>
                    <input type="text" class="form-control" 
:class="timeline.done?'timeline__done':''" v-model="timeline.name" 
@keypress="timeline.editing=true" @keyup.enter="updateTimeline(timeline)">
                    <span class="input-group-addon addon-left" 
title="Delete timeline?" v-on:click="deleteTimeline(timeline._id)">X</span>
                </div>
                <span class="help-block small" v-show="timeline.editing">Hit 
enter to update</span>
            </div>
        </div>
        <div class="row alert alert-info text-center" 
v-show="timelines.length==0">
            <p class="alert alert-info">
              <strong>All Caught Up</strong>
            <br/>
            You do not have any timeline items</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import bus from './../bus.js'

    export default {
        data() {
            return {
                timelines: []
            }
        },
        created: function() { // get timeline items and start listening to 
events once component is created
            this.fetchTimeline();
            this.listenToEvents();
        },
        methods: {
            fetchTimeline() {
                let uri = 'http://localhost:4000/api/all';
                axios.get(uri).then((response) => {
                    this.timelines = response.data;
                });
            },
            updateTimeline(timeline) {
                let id = timeline._id;
                let uri = 'http://localhost:4000/api/update/' + id;
                timeline.editing = false;
                axios.post(uri, timeline).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                })
            },
            deleteTimeline(id) { //delete timeline item
                let uri = 'http://localhost:4000/api/delete/' + id;
                axios.get(uri);
                this.fetchTimeline();
            },
            listenToEvents() {
                bus.$on('refreshTimeline', ($event) => {
                    this.fetchTimeline(); // referesh or update timeline list on 
the page
                })
            }
        }
    }
</script>
<style scoped>
    .delete__icon {}
    .timeline__done {
        text-decoration: line-through !important
    }
    .no_border_left_right {
        border-left: 0px;
        border-right: 0px;
    }
    .flat_form {
        border-radius: 0px;
    }
    .mrb-10 {
        margin-bottom: 10px;
    }
    .addon-left {
        background-color: none !important;
        border-left: 0px !important;
        cursor: pointer !important;
    }
    .addon-right {
        background-color: none !important;
        border-right: 0px !important;
    }
</style>
