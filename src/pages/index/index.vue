<template>
  <register @click="like">
    <div>点赞</div>
  </register>
</template>

<script>
import Register from '../../components/rigister.vue'
export default {
  components: { Register },
  methods: {
    like () {
      console.log('就很棒')
    }
  }
}
</script>

<style>
</style>