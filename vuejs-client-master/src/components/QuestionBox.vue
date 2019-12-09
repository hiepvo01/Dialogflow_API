
<template>
  <div id="app" >
    <div id='chat'>
    </div>

    <form @submit='onSubmit'>
      <div>
      <button @click="onSubmit">Submit</button>
      </div>
    </form>

	</div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AudioRecorder from 'vue-audio-recorder';
import WavEncoder from '../lib/wav-encoder';

Vue.use(AudioRecorder);
import axios from 'axios';

@Component({})
export default class QuestionBox extends Vue {

  @Prop({ required: true, })
  public audio64: string;

  public headers = {
          'X-Custom-Header': 'some data',
        };
  public reader = new FileReader();
  public form = {
    project_id: 'inspirationalquote-hioybg',
    session_id: 'a',
    audio_file_path: '',
    language_code: 'en',
  };

  public recording: boolean = false;

  public conversation: string[] = [];

  public response = {
    user_response: '',
    dialogflow_response: '',
  };

  public ws = new WebSocket('ws://localhost:8000/ws');

  public created() {
    this.ws.onmessage = ((event) => {
      const data = JSON.parse(event.data);
      console.log(data, data.interface);

      this.response.user_response = data.user_response;
      this.response.dialogflow_response = data.phonemes;

      let div = document.createElement('div');
      div.style.border = 'solid 2px orange';

      this.conversation.push(data.user_response);
      let user_par = document.createElement('div');
      user_par.style.backgroundColor = '#78E7ED';
      user_par.style.border ='solid 2px black';
      user_par.style.padding = '5px';
      user_par.style.cssFloat = 'left';
      user_par.style.width = '100%';
      user_par.innerHTML = '';
      div.appendChild(user_par);

      const pr = document.createElement('div');

      user_par.innerHTML += data.user_response

      this.conversation.push(data.dialogflow_response);
      let dialog_par = document.createElement('p');
      dialog_par.style.backgroundColor = 'white';
      dialog_par.style.border ='solid 2px black';
      dialog_par.style.padding = '5px';
      dialog_par.style.cssFloat = 'right';
      dialog_par.style.width = '100%';
      dialog_par.innerHTML = data.dialogflow_response;
      div.appendChild(dialog_par);
      document.getElementById('chat').appendChild(div);
    });
  }

  public onSubmit(e) {
    console.log(this.audio64);
    e.preventDefault();
    const list = [JSON.stringify(this.form.project_id), JSON.stringify(this.form.session_id), JSON.stringify(this.audio64), JSON.stringify(this.form.language_code)];
    this.ws.send(list.toString());
  }
}
</script>
