<template>
  <panel title="Testo / Lyrics">
    <textarea class="lyrics-tab" readonly v-model="lyrics_content"></textarea>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  data () {
    return {}
  },
  components: {
    Panel
  },
  props: [
    'lyrics_content'
  ]
}
</script>

<style scoped>
  textarea.lyrics-tab{
    width: 100%;
    font-family: monospace;
    border: none;
    height:600px;
    border-style: none;
    border-color:transparent;
    overflow: auto;
    padding: 40px;
  }
</style>