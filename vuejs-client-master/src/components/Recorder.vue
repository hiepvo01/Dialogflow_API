<template>
  <div id='download'>
    <button @click="toggleRecorder">Record</button>
    <button @click="stopRecorder">Stop</button>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import Recorder from '@/lib/recorder';

  @Component({})
  export default class RecorderComponent extends Vue {
    
    @Prop({ required: false, default: 'record', })
    public filename: string;

    @Prop({ required: false, default: 'wav', })
    public format: string;

    @Prop({ required: false, default: () => { /* empty functio */ }, })
    public headers: object;

    @Prop({ required: false, default: '', })
    public uploadUrl: string;

    @Prop({ required: false, default: 0, })
    public attempts: number;

    @Prop({ required: false, default: 128, })
    public bitRate: number;

    @Prop({ required: false, default: 48000, })
    public sampleRate: number;

    public isUploading: boolean = false;
    public recorder: Recorder = this.initRecorder();
    public recordList: Recorder[] = [];
    public selected: Recorder = undefined;
    public uploadStatus: any = null;

    public audio64: string = '';
    public reading: boolean = false;

    public beforeDestroy() {
      this.stopRecorder();
    }

    public toggleRecorder() {
      if (this.attempts && this.recorder.records.length >= this.attempts) {
        return;
      }
      if (!this.isRecording || (this.isRecording && this.isPause)) {
        this.recorder.start();
      } else {
        this.recorder.pause();
      }
    }

    public stopRecorder() {
      if (!this.isRecording) {
        return;
      }
      this.recorder.stop();
      this.recordList = this.recorder.recordList();
      this.download(this.recordList[this.recordList.length-1].url);
      const reader = new FileReader();
      reader.readAsDataURL(this.recordList[this.recordList.length-1].blob);
      reader.addEventListener('loadend', () => {
        const audioBase64 = reader.result.toString();
        const audioTurned = audioBase64.substr(audioBase64.indexOf(',')+1);
        this.audio64 = audioTurned;
        this.$emit('audio64_ready', this.audio64);
      });
    }



    public download(blobUrl) {
      const link = document.createElement('a');
      console.log(link);
      link.href = blobUrl;
      link.download = 'ninja.wav';
      // link.innerHTML = 'Click';
      document.getElementById('download').appendChild(link);
    }

    public removeRecord(idx) {
      this.recordList.splice(idx, 1);
    }

    public choiceRecord(record) {
      if (this.selected === record) {
        return;
      }
      this.selected = record;
      // this.selectRecord && this.selectRecord(record);
    }

    public initRecorder() {
      return new Recorder({
          beforeRecording : () => { /* empty function */ },
          afterRecording  : () => { /* empty function */ },
          pauseRecording  : () => { /* empty function */ },
          micFailed       : () => { /* empty function */ },
          bitRate         : this.bitRate,
          sampleRate      : this.sampleRate,
          format          : this.format,
      });
    }

    public get attemptsLeft(): number {
      return this.attempts - this.recordList.length;
    }

    public get isPause(): boolean {
      return this.recorder.isPause;
    }

    public get isRecording(): boolean {
      return this.recorder.isRecording;
    }
  }
</script>
