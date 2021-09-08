<template lang='pug'>
  nuxt-link(:to="{path: `/companies/${company.id}`}").company-card
   .company-card__img
      img(:src='company.picture' loading='lazy' :alt='company.title')
   .company-card__text
     h2.company-card__title {{company.title}}
     p.company-card__description {{company.description_short}}
     .company-card__tags
        Tag(v-for='tag in company.companySpecializations' :key='tag.id' :tag='tag').company-card__tag
   svg-icon(name='arrow').company-card__arrow
</template>

<script>
import Tag from '~/components/Tag/Tag'
export default {
  name: 'CompanyCard',
  components: { Tag },
  props: {
    company: Object,
  }
}
</script>

<style src='./company-card.scss' lang="scss">

</style>
