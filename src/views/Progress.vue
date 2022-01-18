<template lang="pug">
  #progress.pb-5
    v-typical.ml-5.mt-5.font-weight-bold.typicalWrapper(:steps='text' :loop='Infinity' :wrapper="'h3'" style="color: #38dcdf")
    h3.text-light.mt-5.ml-5 {{doing}}
    #wave.mt-5
    router-link#set.d-block.text-center.text-decoration-none(to='/')
      b-icon.mb-3(icon='bell' scale='2')
      h5.font-weight-bold 更換鈴聲
</template>
<script>
import VTypical from 'vue-typical'
export default {
  data () {
    return {
      text: [
        '正在進行',
        500,
        '正在進行．',
        500,
        '正在進行．．',
        500,
        '正在進行．．．',
        500,
        '正在進行．．',
        500,
        '正在進行．',
        500
      ]
    }
  },
  components: {
    VTypical
  },
  computed: {
    doing () {
      return this.$store.state.current
    }
  }
}
</script>
