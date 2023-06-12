<template>
  <v-row class="text-center" no-gutters>
    <v-col md="10" offset-md="1">
      <panel title="Nuovo Brano">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col md="5">
              <v-text-field label="Titolo" :hide-details="valid" required :rules="titoloRegole" v-model="song.titolo">
              </v-text-field>

              <v-text-field label="Artista" hide-details v-model="song.artista">
              </v-text-field>

              <v-text-field label="Genere" hide-details v-model="song.genere">
              </v-text-field>

              <v-text-field label="Album" hide-details v-model="song.album">
              </v-text-field>

              <v-text-field label="URL Copertina" hide-details v-model="song.albumImageUrl">
              </v-text-field>

              <v-text-field label="YouTube ID" hide-details v-model="song.youtubeId">
              </v-text-field>

              <v-text-field label="File Midi" hint="Es. Cao" v-model="song.midifile">
              </v-text-field>

            </v-col>
            <v-col md="7">
              <v-tabs
                v-model="schede"
                background-color="light-blue"
                dark
                class="rounded-lg rounded-b-0"
              >
              <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab href="#schede-1">Tablatura</v-tab>
                <v-tab href="#schede-2">Lyrics</v-tab>
                <v-tab href="#schede-3">Accordi</v-tab>
              </v-tabs>

              <v-tabs-items v-model="schede">
                <v-tab-item value="schede-1" >
                  <v-card flat class="pt-2">
                    <v-textarea
                      outlined
                      class="mono_spaced"
                      rows="11"
                      label="Tablatura"
                      hide-details
                      v-model="song.tab">
                    </v-textarea>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="schede-2" >
                  <v-card flat class="pt-2">
                    <v-textarea
                      outlined
                      class="mono_spaced"
                      rows="11"
                      label="Testo / Lyrics"
                      hide-details
                      v-model="song.lyrics">
                    </v-textarea>
                  </v-card>
                </v-tab-item>
                <v-tab-item value="schede-3" >
                  <v-card flat class="pt-2">
                    <v-textarea
                      outlined
                      class="mono_spaced"
                      rows="11"
                      label="Accordi"
                      hide-details
                      v-model="song.accordi">
                    </v-textarea>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>

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
                :disabled="!valid">
                Aggiungi Nuovo Brano
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

      </panel>
    </v-col>
  </v-row>
</template>

<script>
import SongService from '@/services/SongsService'
export default {
  data: () => ({
    valid: true,
    schede: null,
    song: {
      titolo: null,
      artista: null,
      genere: null,
      album: null,
      albumImageUrl: null,
      youtubeId: null,
      lyrics: null,
      tab: null,
      accordi: null,
      midifile: null
    },
    titoloRegole: [
      v => !!v || 'Il titolo è un campo obbligatorio',
      v => (v && v.length <= 255) || 'La lunghezza massima per il titolo è 255 caratteri'
    ],
    error: null
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    async create () {
      this.error = null
      this.validate()
      if (!this.valid) {
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
  async mounted () {
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
.mono_spaced{
  font-family: monospace, monospace !important;
  font-size:smaller;
}
</style>
