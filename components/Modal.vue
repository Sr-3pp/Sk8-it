<script setup>
import { useLockScroll } from "../composables/useLockScroll";

const dialog = ref(null);

const isOpen = ref(false);

const { lockScroll } = useLockScroll();

const toggle = () => {
  isOpen.value ? dialog.value.close() : dialog.value.showModal();
  isOpen.value = !isOpen.value;
  lockScroll(isOpen.value);
};

const handleBackdrop = (e) => {
  if (e.target === dialog.value) {
    toggle();
  }
};

defineExpose({
  toggleDialog: toggle,
});
</script>

<template>
  <dialog ref="dialog" class="dialog" @click="handleBackdrop">
    <div class="dialog-container">
      <button class="dialog-close" @click="toggle">
        <slot name="button"> ✕ </slot>
      </button>
      <div v-if="$slots.header" class="dialog-header">
        <slot name="header" />
      </div>
      <div v-if="$slots.body" class="dialog-body">
        <slot name="body" />
      </div>
      <div v-if="$slots.footer" class="dialog-footer">
        <slot name="footer" />
      </div>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.dialog {
  --bg: #{$color-primary-bg-light};

  padding: 0;
  margin: 0;
  max-width: inherit;
  max-height: inherit;
  height: 100%;
  width: 100%;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  border: none;
  background: none;
  overflow: visible;
  scale: 0;
  opacity: 0;
  transition: scale 0.35s ease-in-out, opacity 0.35s ease-in-out,
    display 0.35s ease-in-out allow-discrete;

  &-container {
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
    border-radius: unit(20);
    background-color: var(--bg);
    max-width: 80vw;
    max-height: 80vh;
  }

  &-header {
    border-bottom: 1px solid $color-primary-text-dark;
  }

  &-header,
  &-body,
  &-footer {
    padding: 1rem;
  }

  &-body {
    overflow: auto;
  }

  &-close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background: none;
    border: none;
    cursor: pointer;
    background-color: red;
    width: unit(40);
    height: unit(40);
    aspect-ratio: 1;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-primary-text-light;
    border-radius: unit(99);
    border: solid thin $color-primary-text-dark;
  }

  &-footer {
    position: sticky;
    bottom: 0;
  }

  &::backdrop {
    background-color: rgba($color-primary-bg-dark, 0.6);
    backdrop-filter: blur(unit(5));
  }

  &[open] {
    display: flex;
    scale: 1;
    opacity: 1;

    @starting-style {
      scale: 0;
      opacity: 0;
    }
  }
}
</style>
