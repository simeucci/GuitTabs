<template>
  <div class="song">
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
        <br />
        <slot name="pulsanti" />
      </v-col>
      <v-col md="6">
        <img class="song-album-image" :src="song.albumImageUrl" />
        <div class="song-album">
          {{ song.album }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: [
    'song'
  ]
}
</script>

<style scoped>
.song {
  border: 3px solid white;
  border-radius: 13px;
  border: 1px solid lightblue;
  background-color: lightyellow;
  padding: 20px;
  margin-bottom: 10px;
  height: 240px;
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
  width: 180px;
  margin: 0 auto -.3em;
}
.song-album{
  font-size: 14px;
}
</style>
