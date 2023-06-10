<template>
  <div class="white elevation-2 bordi-rotondi">
    <v-toolbar flat dense class="light-blue" dark>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="action" />
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>
        No slot content defined.
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
.bordi-rotondi{
  border-radius: 13px;
}
.bordi-rotondi>header{
  border-radius: 13px 13px 0 0;
}
</style>
