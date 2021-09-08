<template lang="pug">
  .filter-companies
    .filter-companies__select
      Select(ref="selectIndustry" :title='"Отрасль"' :text='"Все отрасли"' :definition='"industry"' :items='industry')
    .filter-companies__select
      Select(ref="selectSpecialization" :title='"Специализация"' :text='"Все специализации"' :definition='"specialization"' :items='companySpecialization')
</template>

<script>

import Select from '~/components/Select/Select'
export default {
  components: { Select },
  data() {
    return {
      industry: [],
      companySpecialization: []
    }
  },
  mounted() {
    this.$axios.$get(`http://api-test.duotek.ru/definitions`)
    .then(r => {
      this.industry = r.Industry
      this.companySpecialization = r.CompanySpecialization

      this.$route.query.industry && this.industry.forEach(item => {
        Number(this.$route.query.industry) === item.id && this.$refs.selectIndustry.addChecked(item)
      })

      this.$route.query.specialization && this.companySpecialization.forEach(item => {
        Number(this.$route.query.specialization) === item.id && this.$refs.selectSpecialization.addChecked(item)
      })
    })
  }
}

</script>

<style src='./filter-companies.scss' lang="scss">

</style>
