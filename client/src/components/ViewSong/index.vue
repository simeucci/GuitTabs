<template>
  <v-row no-gutters>
    <v-col md="4">
      <panel :title="song.titolo">
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
      </panel>
      <panel title="Youtube Video" class="mt-3">
        <you-tube :youtubeId="song.youtubeId" />
      </panel>
    </v-col>
    <v-col md="8" class="pl-3">
      <letteratura
        :song="song" 
        />
    </v-col>
  </v-row>
</template>

<script>
// COMPONENTI INSTALLATI
import Panel from '@/components/Panel.vue'
import SongBase from '@/components/SongBase.vue'
import YouTube from '@/components/ViewSong/YouTube.vue'
import letteratura from '@/components/ViewSong/letteratura.vue'
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
    letteratura,
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