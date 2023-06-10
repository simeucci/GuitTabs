<template>
  <panel title="Tablatura / Intavolatura / Tab">
    <textarea class="song-tab">{{ tablaturaContent }}</textarea>
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
    'tablaturaContent'
  ]
}
</script>

<style scoped>
  textarea.song-tab{
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