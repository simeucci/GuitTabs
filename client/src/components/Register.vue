<template>
  <v-container>
    <v-row class="text-center" no gutters>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Registrazione
        </h1>
        <input 
          type="email"
          name="email"
          v-model="email"
          placeholder="email" />
        <br>
        <input 
          type="password"
          name="password"
          v-model="password"
          placeholder="password" />
        <br>
        <button
          @click="register"
          >Registrati</button>
      </v-col>
    </v-row>
    <!-- v-row class="text-center" no-gutters>
      <v-col class="mb-4">
        <v-text-field
            solo
            label="Email"
            prepend-inner-icon="mdi-email"
            hide-details
          ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="text-center" no-gutters>
      <v-col class="mb-4">
        <v-text-field
            solo
            label="Password"
            prepend-inner-icon="mdi-lock"
            hide-details
          ></v-text-field>
      </v-col>
    </v-row -->
  </v-container>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService';
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods:{
      async register () {
        //console.log('il pulsante Registrati è stato cliccato', this.email, this.password)
        const response = await AuthenticationService.register({
          email:this.email,
          password: this.password
        })
        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
