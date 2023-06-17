<template>
  <v-row no-gutters>
    <v-col md="5">
      <panel :title="song.titolo">
        <song-base :song="song">
          <div slot="pulsanti">
            <v-tooltip bottom color="light-blue">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                fab
                small
                class="light-blue"
                :to="{name: 'song-edit', params: {songId: song.id}}"
                v-bind="attrs"
                v-on="on">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Modifica il brano</span>
            </v-tooltip>
            <v-tooltip bottom color="green" v-if="isUserLoggedIn && !isBookmarked">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                fab
                small
                class="green ml-3"
                @click="setAsBookmark"
                v-bind="attrs"
                v-on="on">
                  <v-icon small>mdi-thumb-up</v-icon>
                </v-btn>
              </template>
              <span>Aggiungi a preferiti</span>
            </v-tooltip>
            <v-tooltip bottom color="red" v-if="isUserLoggedIn && isBookmarked">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                fab
                small
                class="red ml-3"
                @click="unsetAsBookmark"
                v-bind="attrs"
                v-on="on">
                  <v-icon small>mdi-thumb-down</v-icon>
                </v-btn>
              </template>
              <span>Rimuovi da preferiti</span>
            </v-tooltip>
          </div>
        </song-base>
      </panel>
      <panel title="Youtube Video" class="mt-3">
        <you-tube :youtubeId="song.youtubeId" />
      </panel>
    </v-col>
    <v-col md="7" class="pl-3">
      <letteratura
        :song="song"
        />
    </v-col>
  </v-row>
</template>

<script>
// COMPONENTI INSTALLATI
import SongBase from '@/components/SongBase.vue'
import YouTube from '@/components/ViewSong/YouTube.vue'
import letteratura from '@/components/ViewSong/TestoLyricsChords.vue'
// SERVIZI INSTALLATI
import SongsService from '@/services/SongsService'
import UsersSongsService from '@/services/UsersSongsService'
import RecentsService from '@/services/RecentsService'
import { mapState } from 'vuex'
// OUTPUT
export default {
  components: {
    SongBase,
    YouTube,
    letteratura
  },
  data () {
    return {
      song: {},
      isBookmarked: false
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    async setAsBookmark () {
      try {
        await UsersSongsService.post({
          userId: this.$store.state.user.id,
          songId: this.song.id
        })
        this.isBookmarked = true
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsBookmark () {
      try {
        await UsersSongsService.delete({
          userId: this.$store.state.user.id,
          songId: this.song.id
        })
        this.isBookmarked = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongsService.show(songId)).data
    if (this.isUserLoggedIn) {
      try {
        const bookmark = (await UsersSongsService.index({
          userId: this.$store.state.user.id,
          songId
        })).data
        this.isBookmarked = !!bookmark
        await RecentsService.post({
          userId: this.$store.state.user.id,
          songId
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
</style>
