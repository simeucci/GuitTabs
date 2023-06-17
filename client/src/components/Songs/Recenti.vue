<template>
  <div class="preferiti_container">
    <panel title="I tuoi brani recenti">
      <v-data-table
        dense
        :headers="headers"
        :items="songsRecenti"
        :items-per-page="15"
        hide-default-header
        locale="it"
        class="elevation-1">

        <template v-slot:body="{ items }">
          <tbody v-if="items.length">
            <tr v-for="item in items" :key="item.id">
              <td class="text-start">
                <RouterLink tag="div" class="finto_link" :to="{name: 'song', params: {songId: item.id}}">
                  {{ item.titolo }} <em>({{ item.artista }})</em>
                </RouterLink>
              </td>
            </tr>
          </tbody>
          <tbody v-if="!items.length">
            <tr>
              <td class="text-center">
                  <em>Nessun brano recente.</em>
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
import RecentsService from '@/services/RecentsService'
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
      songsRecenti: []
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
      this.songsRecenti = (await RecentsService.index({
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
