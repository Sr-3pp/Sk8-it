<script lang="ts" setup>
const props = defineProps<{
  multiple?: boolean;
}>();

const activeItems = ref<string[]>([])
const activeItem = defineModel()

const emit = defineEmits<{
  (e: 'update:items', items: { from: number, to: number }): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'update:modelValue', value: string[]): void;
  (e: 'update:modelValue', value: string | string[]): void;
}>();

const toggle = (title: string) => {
  if (activeItems.value.includes(title)) {
    activeItems.value = activeItems.value.filter((panel) => panel !== title);
  } else {
    if (props.multiple) {
      activeItems.value.push(title);
    } else {
      activeItems.value = [title];
    }
  }
};

const draggedIdx = ref<number | null>(null);

const draggHandler = (index: number) => {
  draggedIdx.value = index;
};

const dropHandler = (index: number) => {
  if (draggedIdx.value === null || draggedIdx.value === index) return

  emit('update:items', {  
    from: draggedIdx.value,
    to: index,
  });
  
  draggedIdx.value = null;
};


provide('dropdownGroup', {
  activeItems,
  toggle,
})

watch(activeItem, (val) => {
  toggle(val as string);
})

</script>

<template lang="pug">
.dropdown-group(ref="dropdownGroup")
  slot(:active-item="activeItem" :dragg-handler="draggHandler" :drop-handler="dropHandler")
</template>


<style lang="scss" scoped>
.dropdown-group {
  display: flex;
  flex-direction: column;
  gap: unit(20);
}
</style>