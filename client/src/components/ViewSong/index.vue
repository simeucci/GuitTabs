<template>
  <panel :title="song.titolo">
    <v-row no-gutters>
      <v-col md="6" class="text-center pa-6">
        <song-base :song="song">
          <div slot="pulsanti">
            <v-btn dark class="light-blue" @click="navigateTo({
              name: 'song-edit',
              params: {
                songId: song.id
              }
            })">
              <v-icon small>mdi-pencil</v-icon>&nbsp;&nbsp;Modifica
            </v-btn>
          </div>
        </song-base>
      </v-col>
      <v-col md="6" class="text-center pa-6">
        <you-tube :youtubeId="song.youtubeId" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col md="6" class="pa-4">
        <tablatura :tablaturaContent="song.tab" />
      </v-col>
      <v-col md="6" class="pa-4">
        <lyrics :lyrics_content="song.lyrics" />
      </v-col>
    </v-row>
  </panel>
</template>

<script>
// COMPONENTI INSTALLATI
import Panel from '@/components/Panel.vue'
import SongBase from '@/components/SongBase.vue'
import YouTube from '@/components/ViewSong/YouTube.vue'
import Tablatura from '@/components/ViewSong/Tablatura.vue'
import Lyrics from '@/components/ViewSong/Lyrycs.vue'
// SERVIZI INSTALLATI
import SongsService from '@/services/SongsService'
// OUTPUT
export default {
  data() {
    return {
      song: {}
    }
  },
  components: {
    Panel,
    SongBase,
    YouTube,
    Tablatura,
    Lyrics
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    }
  },
  async mounted() {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
  }
}
</script>

<style scoped></style>