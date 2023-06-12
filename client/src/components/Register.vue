<template>
  <v-container>
    <v-row class="text-center" no-gutters>
      <v-col md="6" offset-md="3">
        <panel title="Registrazione">
          <form
              name="guittabs-form-registrazione"
              autocomplete="off">
              <v-text-field
              label="Email"
              v-model="email"></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"></v-text-field>
              <br>
              <div class="error" v-html="error" />
              <br>
              <v-btn
                dark
                class="light-blue"
                @click="register"
                >Registrati
              </v-btn>
            </form>
        </panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({ name: 'login' })
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
