<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col md="10" offset-md="1">
        <panel title="Brani">
          <v-btn to="/songs/create" slot="action" class="light-blue accent-2" dark fab medium>
            <v-icon large>mdi-plus</v-icon>
          </v-btn>
          <div v-for="song in songs" :key="song.id">
            <song-base :song="song">
              <div slot="pulsanti">
                <v-btn dark class="light-blue" @click="navigateTo({
                  name: 'song',
                  params: {
                    songId: song.id
                  }
                })">
                  Apri
                </v-btn>
              </div>
            </song-base>
          </div>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsService from '@/services/SongsService'
import Panel from '@/components/Panel.vue'
import SongBase from '@/components/SongBase.vue'
export default {
  components: {
    Panel,
    SongBase
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

<style scoped></style>
