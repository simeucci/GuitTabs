<template>
  <!-- v-container -->
  <v-row class="text-center" no-gutters>
    <v-col md="10" offset-md="1">
      <panel title="Nuovo Brano">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col md="5">
              <v-text-field label="Titolo" required :rules="titoloRegole" v-model="song.titolo">
              </v-text-field>

              <v-text-field label="Artista" v-model="song.artista">
              </v-text-field>

              <v-text-field label="Genere" v-model="song.genere">
              </v-text-field>

              <v-text-field label="Album" v-model="song.album">
              </v-text-field>

              <v-text-field label="URL Copertina" v-model="song.albumImageUrl">
              </v-text-field>

              <v-text-field label="YouTube ID" v-model="song.youtubeId">
              </v-text-field>

            </v-col>
            <v-col md="7">

              <v-textarea label="Testo / Lyrics" v-model="song.lyrics">
              </v-textarea>

              <v-textarea label="Tablatura" v-model="song.tab">
              </v-textarea>

            </v-col>
          </v-row>
          <v-row class="text-center" no-gutters v-if="error">
            <v-col md="12" offset-md="0" class="pt-4 pb-4">
              <div class="error">
                {{ error }}
              </div>
            </v-col>
          </v-row>

          <v-row class="text-center" no-gutters>
            <v-col md="12" offset-md="0" class="pt-4 pb-4">
              <v-btn 
                dark
                class="light-blue" 
                @click="create"
                :disabled="!valid"
                >
                Aggiungi Nuovo Brano
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

      </panel>
    </v-col>
  </v-row>
  <!-- /v-container -->
</template>

<script>
import SongService from '@/services/SongsService'
import Panel from '@/components/Panel.vue'
export default {
  data: () => ({
    valid: true,
    song: {
      titolo: null,
      artista: null,
      genere: null,
      album: null,
      albumImageUrl: null,
      youtubeId: null,
      lyrics: null,
      tab: null
    },
    titoloRegole:[
      v => !!v || 'Il titolo è un campo obbligatorio',
      v => (v && v.length <= 255) || 'La lunghezza massima per il titolo è 255 caratteri',
    ],
    error: null
  }),
  components: {
    Panel
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async create() {
      this.error = null
      this.validate()
      if( !this.valid ){
        this.error = 'Devi prima compilare tutti i campi obbligatori.'
        return
      }
      // Call Api to add Song
      try {
        await SongService.post(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
        // this.error = error.response.data.error
      }
    }
  },
  async mounted() {
    await this.validate()
  }
}
</script>

<style scoped>
.error {
  color: white;
}
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(180, 180, 180, 0.95) !important;
}
</style>
