<template>
  <div class="videoWrapper">
    <iframe :src="youtubeUrl" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: [
    'youtubeId'
  ],
  computed: {
    youtubeUrl () {
      return 'https://www.youtube.com/embed/' + this.youtubeId
    }
  }
}
</script>

<style scoped>
.videoWrapper {
  position: relative;
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
