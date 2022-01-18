<template lang="pug">
  #main.pt-2.pb-2.accordion(role='tablist')
    div.ml-3.mt-3
      .item(style="position:relative" block v-b-toggle.accordion-1 variant='info' header-tag='header' role='tab' @click="change('a')")
        h3.ml-4.mr-4.d-inline 待辦事項
        b-icon(icon='file-text' scale='2' variant='warning')
        b-icon(v-show="up.a" icon="chevron-up" scale='2' variant='warning')
        b-icon(v-show="!up.a" icon="chevron-down" scale='2' variant='warning')
      b-collapse#accordion-1(visible accordion='my-accordion' role='tabpanel')
        #list.ml-5.mt-4
          #col.w-100.d-flex
            button.p-1.bg-transparent(@click="additem")
              b-icon#plus(v-show="!up.a" icon="plus" scale='2' variant='light')
            b-form-input.ml-3.w-75(v-if="inputting" v-model="newinput" :state="newinputstate" @keydown.enter="additem" placeholder="新增待辦事項...")
            h4.text-light.ml-1.mb-0(v-else @click="inputting = true") 新增待辦事項...
          #col2
            draggable.list-group(:list='items' :disabled='!enabled' ghost-class='ghost' @start='dragging = true' @end='dragging = false')
              li.grab.text-light.mt-3.ml-2(v-for="(item,index) in items" :key="item" @click="del(index)")
                b-iconstack.mr-4(font-scale='1.4')
                  b-icon(stacked icon='square' variant='light')
                h4.d-inline {{item.name}}
            li.done.text-light.mt-3.ml-2(v-for="(item,index) in finished" :key="item" @click="redo(index)")
              b-iconstack.mr-4(font-scale='1.4')
                b-icon(stacked icon='square' variant='secondary')
                b-icon(stacked icon='check' variant='secondary')
              h4.d-inline.text-secondary {{item.name}}
    div.ml-3.mt-3
      .item(style="position:relative" block v-b-toggle.accordion-2 variant='info' header-tag='header' role='tab' @click="change('b')")
        h3.ml-4.mr-4.d-inline 統計圖表
        b-icon(icon='bar-chart-line' scale='2' variant='warning')
        b-icon(v-show="up.b" icon="chevron-up" scale='2' variant='warning')
        b-icon(v-show="!up.b" icon="chevron-down" scale='2' variant='warning')
      b-collapse#accordion-2(accordion='my-accordion' role='tabpanel')
        #chart
          svg#chart(width='100%' height='200' viewBox='0 0 1000 500' xmlns='http://www.w3.org/2000/svg')
            path(d='M 0,297.0637934982519 C 0,297.0637934982519 167,320.99094860098336 167,320.99094860098336 C 167,320.99094860098336 334,230.3382372912509 334,230.3382372912509 C 334,230.3382372912509 501,365.868904907184 501,365.868904907184 C 501,365.868904907184 668,181.1515844680339 668,181.1515844680339 C 668,181.1515844680339 835,68.95022961651955 835,68.95022961651955 C 835,68.95022961651955 1002,236.78197252592634 1002,236.78197252592634,L 1000 500,L 0 500Z' fill='#444cf71a')
            path(d='M 0,297.0637934982519 C 0,297.0637934982519 167,320.99094860098336 167,320.99094860098336 C 167,320.99094860098336 334,230.3382372912509 334,230.3382372912509 C 334,230.3382372912509 501,365.868904907184 501,365.868904907184 C 501,365.868904907184 668,181.1515844680339 668,181.1515844680339 C 668,181.1515844680339 835,68.95022961651955 835,68.95022961651955 C 835,68.95022961651955 1002,236.78197252592634 1002,236.78197252592634' fill='none' stroke='#444cf7' stroke-width='5px')
            g
              circle(cx='0' cy='297.0637934982519' r='10' fill='#444cf7')
              | ,
              circle(cx='167' cy='320.99094860098336' r='10' fill='#444cf7')
              | ,
              circle(cx='334' cy='230.3382372912509' r='10' fill='#444cf7')
              | ,
              circle(cx='501' cy='365.868904907184' r='10' fill='#444cf7')
              | ,
              circle(cx='668' cy='181.1515844680339' r='10' fill='#444cf7')
              | ,
              circle(cx='835' cy='68.95022961651955' r='10' fill='#444cf7')
              | ,
              circle(cx='1002' cy='236.78197252592634' r='10' fill='#444cf7')
    div.ml-3.mt-3.mb-2
      .item(style="position:relative" block v-b-toggle.accordion-3 variant='info' header-tag='header' role='tab' @click="change('c')")
        h3.ml-4.mr-4.d-inline 選擇鈴聲
        b-icon(icon='bell' scale='2' variant='warning')
        b-icon(v-show="up.c" icon="chevron-up" scale='2' variant='warning')
        b-icon(v-show="!up.c" icon="chevron-down" scale='2' variant='warning')
      b-collapse#accordion-3(accordion='my-accordion' role='tabpanel')
        #alarm.pt-4
          ul.text-warning.m-0.pl-4
            li.d-flex.mb-3(@click="select('eva.mp3')")
              h4.d-inline Eva
              b-icon.mt-2.ml-2(icon='music-note' scale='1.5' variant='warning')
              b-icon.mt-2.ml-3(v-if="item[0].src === sound" icon='check' scale='3' variant='success')
              audio(controls :src="require('@/assets/eva.mp3')")
            li.d-flex(@click="select('meow.mp3')")
              h4.d-inline Meow
              b-icon.mt-2.ml-2(icon='music-note' scale='1.5' variant='warning')
              b-icon.mt-2.ml-3(v-if="item[1].src === sound" icon='check' scale='3' variant='success')
              audio(controls :src="require('@/assets/meow.mp3')")
</template>
<script>
import draggable from 'vuedraggable'
export default {
  data () {
    return {
      newinput: '',
      up: { a: false, b: true, c: true },
      inputting: false,
      item: [
        { name: 'eva', src: 'eva.mp3' },
        { name: 'meow', src: 'meow.mp3' }
      ],
      enabled: true,
      dragging: false
    }
  },
  methods: {
    change (index) {
      if (this.up[index] === true) {
        for (const ups in this.up) {
          this.up[ups] = true
        }
        this.$set(this.up, index, false)
      } else {
        this.$set(this.up, index, true)
      }
    },
    additem () {
      if (this.newinput.length > 2) {
        this.$store.commit('additem', this.newinput)
        this.newinput = ''
      }
      this.inputting = true
    },
    select (item) {
      this.$store.commit('selectSound', item)
    },
    del (index) {
      if (this.items.length > 0) {
        this.$store.commit('re', index)
        this.$store.commit('start', index)
      }
    },
    redo (index) {
      this.$store.commit('redo', index)
    }
  },
  computed: {
    newinputstate () {
      return this.newinput.length > 2 ? true : this.newinput.length === 0 ? null : false
    },
    items: {
      get () {
        return this.$store.state.items
      },
      set (value) {
        this.$store.commit('updateList', value)
      }
    },
    finished () {
      return this.$store.state.finished.map(item => {
        item.state = item.model.length > 2
        return item
      })
    },
    sound () {
      return this.$store.state.sound
    }
  },
  components: {
    draggable
  }
}
</script>
