<template>
  <v-app-bar app fixed color="light-blue" dark>
      <div class="d-flex align-center cursor-pointer" @click="navigateTo({ name:'home'})">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 hidden-sm-and-down"
          contain
          src="../../public/plettro.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>
          <h3>Guitar Tabs</h3>
        </v-toolbar-title>
      </div>

      <v-toolbar-items>
        <v-btn text>
          Sfoglia
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="navigateTo({name: 'login'})">
          Accedi
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text @click="navigateTo({name: 'register'})">
          Registrati
        </v-btn>
      </v-toolbar-items>

    </v-app-bar>
</template>

<script>
  export default {
    methods: {
      navigateTo (newRoute) {
        // get comparable fullPaths
        let from  = this.$route.fullPath
        let to    = this.$router.resolve(newRoute).route.fullPath
        if (from === to) { 
          // handle any error due the redundant navigation here
          // or handle any other param modification and route afterwards
          return true 
        }
        // route as expected
        this.$router.push(newRoute)
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