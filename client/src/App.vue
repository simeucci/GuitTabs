<template>
  <v-app>
    <PageHeader />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from '@/components/AppHeader.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  },

  data: () => ({
    //
  })
}
</script>
