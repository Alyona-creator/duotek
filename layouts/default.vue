<template lang='pug'>
.page
  header.page__header(:class='{"page__header_blue": headerBlue}')
    Header(ref='header')
  .page__body
    Nuxt
  footer.page__footer
    Footer
</template>
<script>
export default {
  computed: {
    headerBlue() {
      return (this.$route.name === 'companies-slug')
    }
  },
  watch: {
    '$route' () {
      this.$refs.header.closeMenu()
    }
  }
}
</script>
