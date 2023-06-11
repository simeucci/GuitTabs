<template>
  <panel title="Materiale testuale">
    <div class="barra-selettori pl-8">
      <v-row no-gutters>
        <v-col md="2">
          <v-switch v-model="switch_tab" label="Tablatura" :disabled="disabled_tab"></v-switch>
        </v-col>
        <v-col md="2" class="text-center">
          <v-switch v-model="switch_lyrics" label="Lyrics" :disabled="disabled_lyrics"></v-switch>
        </v-col>
        <v-col md="2" class="text-center">
          <v-switch v-model="switch_accordi" label="Accordi" :disabled="disabled_accordi"></v-switch>
        </v-col>
        <v-col md="6" class="text-right">
          <v-btn 
            v-if="!!song.midifile"
            :href="midifile_url" 
            class="light-blue accent-2 mt-3 mr-5" 
            dark>
            <v-icon medium>mdi-music-note</v-icon>Play Midi File
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div id="div_tab_content" v-if="switch_tab">
      <h3>Tablatura</h3>
      <pre class="pre_tab">{{ song.tab }}</pre>
    </div>
    <div id="div_lyrics_content" v-if="switch_lyrics">
      <h3>Testo / Lyrics</h3>
      <pre class="pre_lyrics">{{ song.lyrics }}</pre>
    </div>
    <div id="div_accordi_content" v-if="switch_accordi">
      <h3>Accordi</h3>
      <pre class="pre_accordi">{{ song.accordi }}</pre>
    </div>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import Conf from '@/config'
export default {
  data() {
    return {
      switch_tab: false,
      switch_lyrics: false,
      switch_accordi: false,

      disabled_tab: false,
      disabled_lyrics: false,
      disabled_accordi: false,

      midifile_url: null
    }
  },
  components: {
    Panel,
    Conf
  },
  props: [
    'song'
  ],

  async mounted() {
    setTimeout(() => {
      this.switch_tab = !!this.song.tab
      this.switch_lyrics = !!this.song.lyrics
      this.switch_accordi = !!this.song.accordi
      this.disabled_tab = !!!this.song.tab
      this.disabled_lyrics = !!!this.song.lyrics
      this.disabled_accordi = !!!this.song.accordi
      if( this.song.midifile ){
        this.midifile_url = Conf.baseUrlMidi + this.song.midifile
      }
    }, 300)
  }

}
</script>

<style scoped>
.lyrics-tab {
  width: 100%;
  font-family: monospace;
  font-size: smaller;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}

.barra-selettori {
  background-color: lightyellow;
}

h3 {
  color: #1565C0;
  background-color: lightblue;
  padding: .15em .8em;
  margin-top: 1em;
  margin-bottom: .5em;
  border-radius: 5px;
}
</style>