<template>
  <!-- panel title="YouTube Video" -->
  <div class="videoWrapper">
    <iframe :src="youtubeUrl" frameborder="0" allowfullscreen></iframe>
    <!-- youtube :video-id="youtubeId" :player-width="800" :player-height="240">
    </youtube -->
  </div>
  <!-- /panel -->
</template>

<script>
// import Panel from '@/components/Panel'
// import VueYouTubeEmbed, { getIdFromURL } from 'vue-youtube-embed'
export default {
  // components: {
    // Panel,
    // VueYouTubeEmbed
  // },
  // data(){
  //   return
  // },
  data (){
    return {}
  },
  props: [
    'youtubeId'
  ],
  computed: {
    // heroVideoId(){
    //   if (this.youtubeId) {
    //     return getIdFromURL(this.youtubeId)
    //   }
    //   return null
    // }
    youtubeUrl () {
      return 'https://www.youtube.com/embed/' + this.youtubeId
    }
  }

}
</script>


<style scoped>
.videoWrapper {
  position: relative;
  /* padding-bottom: 56.25%; /* 16:9 */
  padding-bottom: 27%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>