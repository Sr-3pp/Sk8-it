<script lang="ts" setup>
const Elements = [
  {
    name: "Text",
    icon: "text"
  },
  {
    name: "Image",
    icon: "image"
  },
  {
    name: "Carrousel",
    icon: "stack"
  },
]
const components = import.meta.glob('@/components/Blog/*.vue');
const nuxtApp = useNuxtApp();

const emit = defineEmits<{
  (e: 'insertElement', el: { component: string, props: Object}): void
}>();

class defaultContent{
  private defaults = {
    text: {
      component: 'BlogText',
      props: {
        text: 'lerem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        alignment: 'left',
        size: 'normal',
      },
    },
    image: {
      component: 'BlogImg',
      props: {
        src: 'https://picsum.photos/1100/300',
        alt: 'test image'
      },
    },
    carrousel: {
      component: 'BlogCarrousel',
      props: {
        items: [
          {
            src: 'https://picsum.photos/500/300',
            alt: 'test image 1',
            caption: 'Image 1 caption',
          },
          {
            src: 'https://picsum.photos/500/300',
            alt: 'test image 2',
            caption: 'Image 2 caption',
          },
          {
            src: 'https://picsum.photos/500/300',
            alt: 'test image 3',
            caption: 'Image 3 caption',
          },
        ],
      },
    },
  }

  element;

  constructor(kind: "image" | "text" | "carrousel") {
    this.element = this.defaults[kind];
  }
}

const insertElement = async (type: "text" | "image" | "carrousel") => {
  const el: { component: string, props: Object} = new defaultContent(type).element;
  const componentName = el.component;

  if (!nuxtApp.vueApp.component(componentName)) {

    const componentInstance = async (name: string) => {
      const filename = name.replace('Blog', '');
      const key = `/components/Blog/${filename}.vue`;
      
      const loader = components[key];
      if (!loader) return null;

      return await loader();
    };
    
    const module: any = await componentInstance(componentName);
    if (module?.default) {
      nuxtApp.vueApp.component(componentName, module!.default);
    }
  }

  emit('insertElement', el);
}
</script>

<template lang="pug">
ul.blog-elements
  li.blog-elements__item(v-for="(item, index) in Elements"
    :key="index"
    @click="insertElement(item.name.toLowerCase())"
  )
    Icon(:name="item.icon")
    p {{ item.name }}
</template>

<style lang="scss" scoped>
.blog-elements {
  display: flex;
  gap: unit(20);

  &__item{
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: unit(10);
    padding: unit(10);
    border-radius: unit(5);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>