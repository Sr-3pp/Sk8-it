<script lang="ts" setup>
definePageMeta({
  layout: 'raw',
});

const formHandler = () => {
  // Handle form submission
  console.log('Form submitted:', blogForm.value);
};

const blogForm = ref<{
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: Array<{ component: string, props: Object }>;
  image: string;
  image_alt: string;
  image_caption: string;
  image_file: File | null;
  draft: boolean;
}>({
  title: '',
  description: '',
  date: new Date().toISOString(),
  tags: [],
  content: Array<{ component: string, props: Object}>(),
  image: 'https://picsum.photos/1100/300',
  image_alt: '',
  image_caption: '',
  image_file: null,
  draft: false,
});

const getIcon = (component: string) => {
  const icons: { [key: string]: string } = {
    BlogText: 'text',
    BlogImg: 'image',
    BlogCarrousel: 'stack',
  };
  return icons[component] || 'question';
};

const updateOrder = (order: { from: number, to: number }) => {
  const { from, to } = order;
  const item = blogForm.value.content[from];
  blogForm.value.content.splice(from, 1);
  blogForm.value.content.splice(to, 0, item);
};

const setPreview = (file: File) => {
  blogForm.value.image_file = file;
  const url = URL.createObjectURL(file);
  blogForm.value.image = url;
};

</script>

<template lang="pug">
.preview
  .preview__elements
    .preview__elements__actions
      Dropdown
        template(#label)
          p Add Element
        template(#content)
          BlogElements(
            @insertElement="(el) => blogForm.content.push(el)"
          )
      button(
        @click="formHandler"
      ) Submit
    DropdownGroup(@update:items="updateOrder")
      template(#default="{draggHandler, dropHandler}")
        Dropdown(v-for="(item, index) in blogForm.content"
          :key="index"
          :draggable="true"
          @dragstart="draggHandler(index)"
          @dragover.prevent
          @drop="dropHandler(index)"
        )
          template(#label)
            .preview__elements__actions__label
              Icon(:name="getIcon(item.component)")
              p {{ item.props.caption || item.props.text }}
          template(#actions)
            .preview__elements__actions__label__actions
              button(@click="blogForm.content.splice(index, 1)")
                Icon(name="trash")
              button(@click="draggHandler(item, index)")
                Icon(name="draggable")
          template(#content)
            BlogAsset(
              :item="item"
              @update="(key, value) => item.props[key] = value"
              @update:carrousel="(key, idx, value) => item.props.items[idx][key] = value"
              @delete:carrousel="(idx) => item.props.items.splice(idx, 1)"
            )

  .preview__content
    Container
      .preview__content__form
        fieldset
          FormInput(
            v-model="blogForm.title"
            type="text",
            label="Title",
            placeholder="Enter the title of the blog entry"
          )
          FormInput.description(
            v-model="blogForm.description"
            type="text",
            label="Description",
            placeholder="Enter a short description"
          )
        fieldset
          FormInput.description(
            v-model="blogForm.image_caption"
            type="text",
            label="Caption",
            placeholder="Enter the title of the blog entry"
          )
          FormInput(
            v-model="blogForm.image_alt"
            type="text",
            label="Alt",
            placeholder="Enter a short description"
          )
        .preview__content__form__image(type="button")
          h1 {{ blogForm.title }}
          label.preview__content__form__image__label
            img(:src="blogForm.image" alt="Image preview")
            input(type="file" accept="image/*" @change="setPreview($event.target.files[0])")
      BlogContent(:content="blogForm.content")
  
    BlogTagInput(
      :tags="blogForm.tags"
      label="Tags"
      placeholder="Enter tags for the blog entry"
      @update:tags="blogForm.tags.push($event)"
      @remove:tag="blogForm.tags.splice($event, 1)"
    )
</template>

<style lang="scss">
.preview {
  --sidebar-width: #{unit(340)};
  display: flex;
  border: 1px solid #ccc;

  &__elements{
    width: var(--sidebar-width);
    flex-shrink: 0;
    height: 100vh;
    overflow: auto;
    
    &__actions{
      padding: unit(20);
      display: flex;
      flex-wrap: wrap;
      gap: unit(10);
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: #fff;


      &__label{
        display: flex;
        gap: unit(10);
        align-items: center;
        justify-content: space-between;

        .icon{
          flex-shrink: 0;
        }

        p{
          max-width: unit(150);
          width: 100%;
          height: unit(16);
          font-size: unit(12);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-align: left;
        }

        &__actions{
          display: flex;
          gap: unit(10);
          padding: unit(10);

          button{
            background-color: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            color: #333;

            &:hover{
              color: #000;
            }
          }
        }
      }
    }

    .dropdown-group{
      width: 100%;
      padding: unit(20);
    }
  }
  
  &__content{
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: unit(20);
    align-items: center;
    background-color: #ccc;
    padding-bottom: unit(100);

    .container{
      max-width: unit(800);
    }

    &__form{
      position: sticky;
      top: 0;
      z-index: 2;
      padding: unit(20);
      margin-bottom: auto;
      display: flex;
      flex-direction: column;
      justify-content: end;
      gap: unit(20);
      width: 100%;
      height: unit(250);
      background-color: #fff;
      border-bottom-left-radius: unit(10);
      border-bottom-right-radius: unit(10);
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

      fieldset{
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        gap: unit(20);
        width: calc(100% - unit(40));
        border: none;
        padding: 0;

        .description{
          width: 100%;
        }
      }

      &__image{
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        border-bottom-left-radius: unit(10);
        border-bottom-right-radius: unit(10);
        overflow: hidden;
        padding: 0;

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        &__label{
          display: flex;
          width: 100%;
          height: 100%;
          background-color: transparent;
          border: none;
          padding: 0;
          cursor: pointer;

          input{
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
          }
        }

        h1{
          position: absolute;
          top: unit(20);
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          text-align: center;
          text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        }
      }
    }
    
    .blog-tag-input{
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 2;
      padding: unit(10);
      display: flex;
      gap: unit(10);
      width: calc(100% - var(--sidebar-width));
      background-color: #fff;
      border-top-left-radius: unit(10);
      border-top-right-radius: unit(10);
      box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
  
      .sk-input{
        width: 100%;
        max-width: unit(300);
        flex-grow: 1;
        margin-bottom: auto;
      }
    }
  }


}
</style>