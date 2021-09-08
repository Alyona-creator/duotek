<template lang="pug">
  main
    .container
      .company
        button(@click='goBack').company__back
          svg-icon(name='back')
          |Компании
        h2.company__title {{companyData.title}}
        .company__grid
          .company__main
            .company__cells
              .company__cell
                span.company__cell-value {{companyData.age}}
                span.company__cell-property лет
              .company__cell
                span.company__cell-value {{companyData.staff}}
                span.company__cell-property человек

            .company__heading.company__heading_first {{companyData.description_short}}
            .company__description {{companyData.description_full}}

            .company__block-tags(v-if='isCompanySpecializations')
              .company__heading Проектная специализация
              .company__tags
                Tag(v-for='tag in companyData.companySpecializations' :key='tag.id' :tag='tag').company__tag

            .company__block-tags(v-if='isIndustries')
              .company__heading Отрасль
              .company__tags
                Tag(v-for='tag in companyData.industries' :key='tag.id' :tag='tag').company__tag

          .company__aside
            img(:src='companyData.picture' loading='lazy' :alt='companyData.title').company__aside-img

            .company__info-wrapper
              .company__info
                span.company__info-value Сайт:
                .company__info-property
                  span(v-if='!isUrl') -
                  span(v-if='isUrl') {{companyData.url}}
              .company__info
                span.company__info-value Город:
                .company__info-property
                  span(v-if='!isCityTitle') -
                  span(v-if='isCityTitle') {{companyData.city.title}}
              .company__info
                span.company__info-value E-mail:
                .company__info-property
                  span(v-if='!isEmail') -
                  span(v-if='isEmail') {{companyData.contact_email}}
              .company__info
                span.company__info-value Телефон:
                .company__info-property
                  span(v-if='!isPhone') -
                  span(v-if='isPhone') {{formattedPhone}}
              .company__info
                span.company__info-value Whatsapp:
                .company__info-property
                  span(v-if='!isWhatsapp') -
                  span(v-if='isWhatsapp') {{companyData.contact_whatsapp}}
              .company__info
                span.company__info-value Skype:
                .company__info-property
                  span(v-if='!isSkype') -
                  span(v-if='isSkype') {{companyData.contact_skype}}
</template>

<script>
import Tag from '~/components/Tag/Tag'
export default {
  components: { Tag },
  data() {
    return {
      companyData: {},
      isIndustries: false,
      isCompanySpecializations: false,
      isCityTitle: false,
      isUrl: false,
      isWhatsapp: false,
      isPhone: false,
      isEmail: false,
      isSkype: false,
      phone: ''
    }
  },
  computed: {
    formattedPhone() {
      return this.phone.replace(/([1-9]{1})([\d]{3})([\d]{3})([\d]{2})([\d]{2})/g,'+$1 ($2) $3-$4-$5');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.$axios.$get(`http://api-test.duotek.ru/companies/info?id=${this.$route.params.slug}`)
      .then(r => {
        this.companyData = r.data
        this.isIndustries = r.data.industries.length > 0
        this.isCompanySpecializations = r.data.companySpecializations.length > 0
        this.isCityTitle = Boolean(r.data.city.title)
        this.isUrl = Boolean(r.data.url)
        this.isWhatsapp = Boolean(r.data.contact_whatsapp)
        this.isPhone = Boolean(r.data.contact_phone)
        this.isEmail = Boolean(r.data.contact_email)
        this.isSkype = Boolean(r.data.contact_skype)
        this.phone = r.data.contact_phone
      })
  }
}
</script>

<style src='./company.scss' lang="scss">

</style>
