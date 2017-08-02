<template lang="pug">
  .menu-wrap
    a( 
      @click="toggleMenu"
      href=""
    ) menu  
    ul.container(:class="{active:menuToggle}")
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
  .active 
    display: block
  ul
    +span(isolate 12 at 1)
    position: absolute
    top: 2.0rem
    left: 0
    display: none 
    margin: 0
    padding: 0
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
</style>