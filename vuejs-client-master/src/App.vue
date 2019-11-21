<template>
  <div id="app">
    <question-box :audio64='audio64'/>
    <br>
    <record-audio @audio64_ready="(e) => { audio64 = e; }"/>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import QuestionBox from './components/QuestionBox.vue';
import RecorderComponent from './components/Recorder.vue';

@Component({components: { 'question-box': QuestionBox, 'record-audio': RecorderComponent, },})
export default class App extends Vue {

  public audio64: string = '';
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>