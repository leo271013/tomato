<template lang="pug">
  #app.w-100
    h4.text-center.text-light.p-2.mb-5(v-show="this.status === 0" style="background: #4d4d4d") POMODORO 番茄鐘
    button#cancel.text-center(v-show="this.status !== 0" @click="cancel")
      b-icon(icon='x' scale='3' variant='light')
    button#open(v-if="!mute && this.status !== 0" @click="muting(true)")
      b-icon(icon='volume-up' scale='3' variant='info')
    button#off(v-else-if="this.status !== 0" @click="muting(false)")
      b-icon(icon='volume-mute' scale='3' variant='danger')
    #play.rounded-circle.mt-4(:class="{play:this.status !== 0}")
      #padding.rounded-circle(:class="{cat:this.status !== 0}")
      button#circle.d-block.rounded-circle(@click="play")
        b-icon(icon='play-fill' scale='4' variant='light')
      svg#circle-svg(viewBox='0 0 160 160' v-show="this.status !== 0")
        defs
          linearGradient#myGradient(x1='0%' y1='0%' x2='100%' y2='100%' spreadMethod='pad')
            stop(offset='0%' stop-color='rgb(0, 81, 255)' stop-opacity='1')
            stop(offset='100%' stop-color='rgb(0,255,255)' stop-opacity='1')
        circle(cx='80' cy='80' r='70' :style="{strokeDashoffset: cp}")
    h1#time.d-inline-block.mt-3(:class="{playtime:this.status !== 0,color:this.status !== 0}") {{ timeText }}
      button#stop(v-if="this.status === 1" @click="pause()")
        b-icon#pos(icon='pause-circle-fill' scale='.5' variant='info')
      button#stopB(v-else-if="this.status === 2" @click="play()")
        b-icon#posB(icon='play-circle-fill' scale='.5' variant='danger')
    h4.text-center.mt-2.font-weight-bold(style="color: #ffce5d") 好累哦...
    #menu
      router-view
</template>
<script>
const audioeva = new Audio()
audioeva.src = require('@/assets/eva.mp3')
const audiomeow = new Audio()
audiomeow.src = require('@/assets/meow.mp3')
export default {
  data () {
    return {
      mute: false,
      cp: 440,
      status: 0,
      timer: 0
    }
  },
  components: {
  },
  methods: {
    muting (val) {
      this.mute = val
      if (this.mute === false) {
        audioeva.volume = 1
        audiomeow.volume = 1
      } else {
        audioeva.volume = 0
        audiomeow.volume = 0
      }
    },
    stoppping (val) {
      this.stop = val
    },
    cancel () {
      self.location.href = '#/'
      clearInterval(this.timer)
      this.status = 0
      this.cp = 440
      this.$store.commit('cancel')
    },
    play (val) {
      if (this.status === 0 && this.items.length > 0) {
        self.location.href = '#/progress'
        this.$store.commit('start')
      }
      if (this.current.length) {
        this.status = 1
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft === -1) {
            this.finish(false)
          }
          this.cp = (440 - (440 * this.change) / 100)
        }, 1000)
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.status = 0
      this.$store.commit('finish')

      if (!skip && this.$store.state.sound === 'eva.mp3') {
        audioeva.play()
      } else if (!skip && this.$store.state.sound === 'meow.mp3') {
        audiomeow.play()
      }

      if (this.items.length > 0) {
        this.play()
      } else {
        self.location.href = '#/'
      }
    },
    pause (val) {
      this.status = 2
      clearInterval(this.timer)
    }
  },
  computed: {
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60).toString().padStart(2, '0')
      const s = Math.floor(this.timeleft % 60).toString().padStart(2, '0')
      return `${m} : ${s}`
    },
    current () {
      return this.$store.state.current
    },
    items () {
      return this.$store.state.items
    },
    change () {
      return this.$store.state.change
    }
  }
}
</script>
