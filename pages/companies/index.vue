<template lang="pug">
  main
    .companies
      .container
        h1.companies__heading Каталог компаний
        .companies__grid
          .companies__main
              SearchForm.companies__searh
              .companies__cards(v-if='!isListCompaniesEmpty')
                CompanyCard(v-for='company in companies' :key='company.id' :company='company').companies__card
              .companies__cards_empty(v-if='isListCompaniesEmpty')
                svg-icon(name='empty')
                .companies__cards-title Список компаний пуст
                .companies__cards-description Попробуйте изменить условия поиска
              Pagination(v-if='pageQuantity > 1 && !isListCompaniesEmpty' :pageQuantity='pageQuantity')
          .companies__filter
            FilterCompanies
</template>

<script>

import SearchForm from '~/components/SearchForm/SearchForm'
import CompanyCard from '~/components/CompanyCard/CompanyCard'
import FilterCompanies from '~/components/FilterCompanies/FilterCompanies'
import Header from '~/components/Header/Header'

export default {
  components: { Header, FilterCompanies, CompanyCard, SearchForm},
  data () {
    return {
      chooseCity: false,
      companies: [],
      pageQuantity: 0,
      isListCompaniesEmpty: false
    }
  },
  computed: {
    fullPath() {
      return this.$route.fullPath
    },
  },
  watch: {
    fullPath() {
      this.getData(this.fullPath)
    }
  },
  methods: {
    async getData (params) {
      if (Object.keys(this.$route.query).length > 0) {
        this.$axios.$get(`http://api-test.duotek.ru${params}&per_page=10`)
          .then(r=> {
            this.companies = r.data

            if (r.data.length > 0) {
              this.pageQuantity = r.meta.last_page
              this.isListCompaniesEmpty = false
            } else {
              this.isListCompaniesEmpty = true
            }
          })
          .catch(error => {
            this.isListCompaniesEmpty = true
            console.log(error)
          })
      } else {
        this.$axios.$get(`http://api-test.duotek.ru${params}?per_page=10`)
          .then(r=> {
            this.companies = r.data

            if (r.data.length > 0) {
              this.pageQuantity = r.meta.last_page
              this.isListCompaniesEmpty = false
            } else {
              this.isListCompaniesEmpty = true
            }
          })
      }
    }
  },

  mounted() {
    this.getData(this.$route.fullPath)
  },

  scrollToTop: true
}
</script>

<style src='./companies.scss' lang="scss">

</style>
