<template>
  <div class="preferiti_container">
    <panel title="I tuoi brani preferiti" class="mr-2">
      <v-data-table
        dense
        :headers="headers"
        :items="songsPreferite"
        :items-per-page="15"
        hide-default-header
        locale="it"
        class="elevation-1">

        <template v-slot:body="{ items }">
          <tbody v-if="items.length">
            <tr v-for="item in items" :key="item.id">
              <td class="text-end">
                <RouterLink tag="div" class="finto_link" :to="{name: 'song', params: {songId: item.id}}">
                  {{ item.titolo }} <em>({{ item.artista }})</em>
                </RouterLink>
              </td>
            </tr>
          </tbody>
          <tbody v-if="!items.length">
            <tr>
              <td class="text-center">
                  <em>Nessun brano preferito</em>
              </td>
            </tr>
          </tbody>
        </template>
    </v-data-table>
    </panel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersSongsService from '@/services/UsersSongsService'
import { RouterLink } from 'vue-router'
export default {
  data () {
    return {
      headers: [
        {
          text: 'Brano / Artista',
          align: 'start',
          sortable: false,
          value: 'titolo_artista'
        }
      ],
      songsPreferite: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  methods: {},
  async mounted () {
    if (this.isUserLoggedIn) {
      this.songsPreferite = (await UsersSongsService.index({
        userId: this.user.id
      })).data
    }
  },
  components: { RouterLink }
}
</script>

<style scoped>
  .finto_link{
    cursor: pointer;
    color: blue;
  }
</style>
