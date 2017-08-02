<template lang="pug">
  .menu-wrap
    a( 
      @click="toggleMenu"
      href=""
    ) menu  
    ul.menu_list(:class="{active:menuToggle}")
      li
        a( href="#none") menuitem
</template>

<script>
export default {
  data() {  
    return {
      menuToggle: false
    };
  },
  methods: {
    toggleMenu(e) {
      console.log(this);
      e.preventDefault();
      this.menuToggle = !this.menuToggle;
    }
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  .menu-wrap
    +span(isolate 1 at 12 last)
  .menu_list
    +span(width 50%)
    position: absolute
    top: 2.5rem
    right: 0
    display: none 
    margin: 0
    padding: 0
    min-width: 32rem
    height: 100vh
    z-index: 999    
    list-style: none
    background: #fff
    li 
      list-style: none
      margin: 0
      padding: 0
      a 
        font-size: 1.6rem
  .active 
    display: block  
</style>