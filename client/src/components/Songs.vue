<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col md="6" offset-md="3">
        <panel title="Brani">
          <v-btn to="/songs/create" slot="action" class="light-blue accent-2" dark fab medium>
            <v-icon large>mdi-plus</v-icon>
          </v-btn>

          <div v-for="song in songs" class="song" :key="song.id">

            <v-row no-gutters>
              <v-col md="6" class="text-center">
                <div class="song-title">
                  {{ song.titolo }}
                </div>
                <div class="song-artist">
                  {{ song.artista }}
                </div>
                <div class="song-genre">
                  {{ song.genere }}
                </div>
                <v-btn dark class="light-blue" @click="navigateTo({
                  name: 'song',
                  params: {
                    songId: song.id
                  }
                })">
                  Apri
                </v-btn>

              </v-col>
              <v-col md="6">
                <img class="song-album-image" :src="song.albumImageUrl" />
              </v-col>
            </v-row>
          </div>

        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel.vue'
export default {
  components: {
    Panel
  },
  data() {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  },
  async mounted() {
    // do a request to the backend for all the songs
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped>
.song {
  border: 3px solid white;
  border-radius: 15%;
  background-color: lightyellow;
  padding: 20px;
  /* height: 330px; */
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.song-album-image {
  width: 70%;
  margin: 0 auto auto;
}
</style>
