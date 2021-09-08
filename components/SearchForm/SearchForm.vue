<template lang="pug">
  form.search-form
    label
      svg-icon(name="search").search-form__icon
      input(v-model='value' type="text" placeholder="Поиск продукта или отрасли")
      button(v-if='isShowClear' type='button' @click.stop.prevent='clearChecked').search-form__checked-clear
        svg-icon(name='clear')
      button(@click.stop.prevent='changeRouter').search-form__button Найти
</template>

<script>
export default {
  data() {
    return {
      value: null,
      isShowClear: false
    }
  },
  watch: {
    value() {
      if (this.$route.query.search) {
        this.isShowClear = true
      } else {
        this.value && (this.isShowClear = true)
        !this.value && (this.isShowClear = false)
      }
    }
  },
  methods: {
    changeRouter() {
      if (this.value) {
        this.$route.query.page &&
         (this.$router.push({query: {'search': this.value}}))

        !this.$route.query.page &&
         (this.$router.push({ query: Object.assign({}, this.$route.query, {'search': this.value}) }))
      }
    },
    clearChecked() {
      if(this.value) {
        this.value = null
      }
      const newQuery = JSON.parse(JSON.stringify(this.$route.query))
      delete newQuery.search
      this.$router.push({ query: newQuery });
    },
  },
  mounted() {
    if (this.$route.query.search) {
      this.value = this.$route.query.search
    }
  }
}
</script>

<style src='./search-form.scss' lang="scss">

</style>

