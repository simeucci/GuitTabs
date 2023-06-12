<template>
  <div class="search_container">
    <v-text-field label="Cerca titolo, album, o genere" v-model="search">
    </v-text-field>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(async function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      if (this.$route.fullPath !== this.$router.resolve(route).route.fullPath) {
        this.$router.push(route)
      }
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<style scoped></style>
