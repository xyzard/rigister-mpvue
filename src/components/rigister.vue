<template>
  <div class="register" @click="click">
    <slot></slot>
    <button v-if="isShowAuth" open-type="getUserInfo" @getuserinfo="onGotUserInfo" @click.stop></button>
  </div>
</template>

<script>
export default {
  computed: {
    isShowAuth () {
      return this.$store.state.isShowAuth
    }
  },
  methods: {
    onGotUserInfo (e) {
      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        this.$store.state.isShowAuth = false
        this.$emit('click')
      }
    },
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style>
.register {
  overflow: hidden;
  position: relative;
}
.register button {
  position: absolute;
  padding: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
}
</style>
