<template>
  <v-app-bar app fixed color="light-blue" dark>
      <router-link tag="div" class="d-flex align-center cursor-pointer" :to="{name: 'songs'}">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 hidden-sm-and-down"
          contain
          src="../../public/plettro.png"
          transition="scale-transition"
          width="40"/>
        <v-toolbar-title>
          <h3>Guitar Tabs</h3>
        </v-toolbar-title>
      </router-link>
      <v-toolbar-items>
        <v-btn text :to="{name: 'songs'}">
          Sfoglia
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" text :to="{name: 'login'}">
          Accedi
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn v-if="!$store.state.isUserLoggedIn" text :to="{name: 'register'}">
          Registrati
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <span class="pt-5" v-if="$store.state.isUserLoggedIn">
          Ciao {{$store.state.user.email}}
        </span>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          text
          @click="logout"
        >
          Esci
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      const routeHome = { name: 'songs' }
      if (this.$route.fullPath !== this.$router.resolve(routeHome).route.fullPath) {
        this.$router.push(routeHome)
      }
    }
  }
}
</script>

<style scoped>
  .cursor-pointer :hover{
    cursor:pointer;
    color:lightyellow;
  }
</style>
