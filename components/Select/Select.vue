<template lang="pug">
  .select(:class='{"active": isOpenList}')
    .select__title {{title}}
    .dropdown-wrapper(ref="dropdownWrapper")
      .select__checked(@click='toggleList')
        span.select__checked-empty(v-if='!isChecked') {{text}}
        .select__checked-full(v-if='isChecked') {{checkedText}}
          button(type='button' @click.stop.prevent='clearChecked').select__checked-clear
            svg-icon(name='clear')
        svg-icon(name='chevron-bottom').chevron-bottom
      .select__list
        .select__item(v-for='item in items' :key='item.id' @click='addChecked(item)') {{item.title}}
</template>

<script>

export default {
  props: {
    items: Array,
    title: String,
    text: String,
    definition: String
  },

  data() {
    return {
      isOpenList: false,
      isChecked: false,
      checkedText: '',
    }
  },
  methods: {
    addChecked(item) {
      this.isOpenList = false

      if (this.checkedText === item.title) {
        this.clearChecked()
        this.checkedText = ''
      } else {
        switch (this.definition) {
          case 'industry':
            this.$route.query.page && this.$router.push({query: {'industry': item.id}})
            !this.$route.query.page && this.$router.push({ query: Object.assign({}, this.$route.query, {'industry': item.id}) })
            break;
          case 'specialization':
            this.$route.query.page && this.$router.push({query: {'specialization': item.id}})
            !this.$route.query.page && this.$router.push({ query: Object.assign({}, this.$route.query, {'specialization': item.id}) });
            break;
        }
        this.isChecked = true
        this.checkedText = item.title
      }
    },
    clearChecked() {
      this.isChecked = false
      this.isOpenList = false

      const newQuery = JSON.parse(JSON.stringify(this.$route.query))

      this.definition === 'industry' && delete newQuery.industry
      this.definition === 'specialization' && delete newQuery.specialization

      this.$router.push({ query: newQuery });
    },
    toggleList() {
      this.isOpenList = !this.isOpenList
    }
  },
  mounted() {
    document.body.addEventListener('click', (event) => {
      const target = event.composedPath().includes(this.$refs.dropdownWrapper)
      !target && (this.isOpenList = false)
    })
  }
}

</script>

<style src='./select.scss' lang="scss">

</style>
