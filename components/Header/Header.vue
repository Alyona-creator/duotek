<template lang="pug">
.container
  .header
    nuxt-link(to='/', aria-label='на главную').header__logo
      svg-icon(name='logo')

    nav.header__nav
      ul.header__list
        li.header__item
          nuxt-link(to='/empty/1').header__link Тендеры
        li.header__item
          nuxt-link(to='/companies').header__link Компании
        li.header__item
          nuxt-link(to='/empty/2').header__link Продукты
        li.header__item
          nuxt-link(to='/empty/3').header__link Кейсы
        li.header__item
          nuxt-link(to='/empty/4').header__link Блог

    .header__authorization
      nuxt-link(to='/empty/5').header__link Вход и регистрация

    .header__mobile-btn(class="header__catalog-btn" @click='openMenu')
      svg-icon(name='header-menu')

    nav(ref='mobileMenu' :class="{'active': mobileMenu }").mobile-menu
      button(@click='closeMenu').mobile-menu__close
        svg-icon(name='clear')
      ul.header__list
        li.header__item
          nuxt-link(to='/empty/1').header__link Тендеры
        li.header__item
          nuxt-link(to='/companies').header__link Компании
        li.header__item
          nuxt-link(to='/empty/2').header__link Продукты
        li.header__item
          nuxt-link(to='/empty/3').header__link Кейсы
        li.header__item
          nuxt-link(to='/empty/4').header__link Блог
      .mobile-menu__authorization
        nuxt-link(to='/empty/5').header__link Вход и регистрация
</template>

<script>
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';

export default {
  data() {
    return {
      text: 'Header',
      mobileMenu: false,
      scrollOptions: {
        reserveScrollBarGap: true,
      },
    }
  },
  methods: {
    openMenu() {
      this.mobileMenu = true
      disableBodyScroll(this.$refs.mobileMenu, this.scrollOptions)
    },

    closeMenu() {
      this.mobileMenu = false
      clearAllBodyScrollLocks()
    }
  }
}
</script>

<style src='./header.scss' lang="scss">

</style>
