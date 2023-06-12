<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col md="10" offset-md="1">
        <panel title="Brani">
          <v-btn to="/songs/create"
            slot="action"
            class="light-blue accent-2"
            dark
            fab
            medium>
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
          <song-search-panel />
          <div v-if="songs.length">
            <div v-for="song in songs" :key="song.id">
              <song-base :song="song">
                <div slot="pulsanti">
                  <v-btn dark class="light-blue" :to="{name: 'song', params: {songId: song.id}}">
                    Vai
                  </v-btn>
                </div>
              </song-base>
            </div>
          </div>
          <div class="error" dark v-if="!songs.length">
            Nessun brano trovato
          </div>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongBase from '@/components/SongBase.vue'
import SongSearchPanel from './SongSearchPanel.vue'
export default {
  components: {
    SongBase,
    SongSearchPanel
  },
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>
