import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const time = parseInt(process.env.VUE_APP_TIME)
const timebreak = parseInt(process.env.VUE_APP_TIMEBREAK)

export default new Vuex.Store({
  state: {
    items: [],
    sound: 'eva.mp3',
    finished: [],
    current: '',
    break: false,
    timeleft: time,
    change: 0
  },
  mutations: {
    additem (state, data) {
      state.items.push({
        name: data,
        model: data
      })
    },
    selectSound (state, data) {
      state.sound = data
    },
    start (state, data) {
      state.current = state.break ? '休息一下' : state.items.shift().name
    },
    re (state, data) {
      state.finished.push(state.items[data])
    },
    redo (state, data) {
      state.items.push(state.finished[data])
      state.finished.splice(data, 1)
    },
    countdown (state) {
      state.timeleft--
      if (state.break === false) {
        state.change = (((time - state.timeleft) * 100) / time)
      } else {
        state.change = (((timebreak - state.timeleft) * 100) / timebreak)
      }
    },
    finish (state) {
      if (!state.break) {
        state.finished.push({
          name: state.current,
          model: state.current
        })
      }
      state.current = ''
      if (state.items.length > 0) {
        state.break = !state.break
      }
      state.timeleft = state.break ? timebreak : time
      state.change = 0
    },
    cancel (state) {
      state.finished.push({
        name: state.current,
        model: state.current
      })
      state.timeleft = state.break ? timebreak : time
      this.current = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
