<template lang='pug'>
  .tag {{tag.title}}
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: Object
  }
}
</script>

<style src='./tag.scss' lang="scss">

</style>
