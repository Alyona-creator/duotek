<template lang="pug">
  section.pagination(aria-label="Пагинация")
    button(@click='changePage(1)' :class='{"disabled": currentPage === 1}').pagination__button
      svg-icon(name="chevrons-left")

    button(@click='changePage(currentPage - 1)' :class='{"disabled": currentPage === 1}').pagination__button
      svg-icon(name="chevron-left")

    ul.pagination__items(v-if="pageQuantity <= paginationSize")
      template(v-for="page in pageQuantity")
        li(:key="page")
          button(@click='changePage(page)' :class='{"disabled": currentPage === page}').pagination__button {{ page }}

    ul.pagination__items(v-if="pageQuantity > paginationSize && currentPage < 5")
      template(v-for="page in pageQuantity")
        li(v-if="page <= 7" :key="page")
          button(@click='changePage(page)' :class='{"disabled": currentPage === page}').pagination__button {{ page }}
        li(v-if="page !== currentPage && page === 8" :key="page")
          span.spacer ...
        li(v-if="page !== currentPage && page === pageQuantity" :key="page")
          button(@click='changePage(page)' :class='{"disabled": currentPage === page}').pagination__button {{ page }}

    button(@click='changePage(currentPage + 1)' :class='{"disabled": currentPage === pageQuantity}').pagination__button
      svg-icon(name="chevron-right")

    button(@click='changePage(pageQuantity)' :class='{"disabled": currentPage === pageQuantity}').pagination__button
      svg-icon(name="chevrons-right")
</template>

<script>
export default {
  props: {
    pageQuantity: Number,
  },
  data () {
    return {
      paginationSize: 7
    }
  },
  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1
    }
  },
  methods: {
    changePage(pageNumber) {
      if(pageNumber > 1) {
        this.$router.push({query: {'page': pageNumber}})
      } else {
        this.$router.replace('/companies')
      }
    }
  }
}
</script>

<style lang="scss" src="./pagination.scss"></style>
