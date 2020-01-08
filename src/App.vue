<template>
  <div id="app">
    <MyLayout></MyLayout>
  </div>
</template>

<script>
    import MyLayout from '@/components/MyLayout'

    export default {
        name: 'App',
        components: {
            MyLayout
        }
    }
</script>

<style>
  html,
  body,
  #app {
    margin: 0px;
    height: 100%;
  }
</style>
