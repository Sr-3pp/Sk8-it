<script lang="ts" setup>
defineProps<{
  content: {
    component: string;
    props: Record<string, any>;
  }[];
}>();
</script>

<template lang="pug">
ul.blog-content
  li(v-for="(item, index) in content" :class="{'is-carrousel': item.component.includes('Carrousel')}" :key="index")
    component(:is="item.component" v-bind="item.props")
</template>


<style lang="scss" scoped>
.blog-content {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  border-radius: unit(20);
  color: #333;
  padding: 0;

  li {
    width: 100%;
    padding: unit(20);

    &.is-carrousel {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>