<template>

  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col md="6" offset-md="3">
        <div class="white elevation-2">
          <v-toolbar flat dense class="light-blue" dark>
            <v-toolbar-title>Accesso</v-toolbar-title>
          </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <v-text-field
              label="email"
              v-model="email"></v-text-field>
            <v-text-field
              label="password"
              type="password"
              v-model="password"></v-text-field>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn
              dark
              class="light-blue"
              @click="login"
              >Accedi
          </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: null
      }
    },
    methods:{
      async login () {

        try {
          const response = await AuthenticationService.login({
            email:this.email,
            password: this.password 
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
</script>

<style scoped>
  .error{
    color: white;
  }
</style>
