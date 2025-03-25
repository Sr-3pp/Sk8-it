<script setup lang="ts">
const props = defineProps<{
  size: string | number;
  sizeSm?: string | number;
  sizeMd?: string | number;
  sizeLg?: string | number;
  sizeXl?: string | number;
  grow?: boolean;
}>();

const colSizes = computed(() => {
  const sizes: any = {};

  Object.entries(props).forEach(([key, value]: any) => {
    if (key.includes("size") && value) {
      const br = key.replace("size", "").toLowerCase();
      sizes[`--col-width${br ? `-${br}` : ""}`] =
        typeof value == "string"
          ? value.includes("/")
            ? value.split("/").reduce((acc: string, val: string) => {
                return 100 * (Number(acc) / Number(val)) + "%";
              })
            : "100%"
          : "100%";
    }
  });

  return sizes;
});
</script>

<template lang="pug">
.grid-col(:style="{...colSizes, flexGrow: props.grow ? 1 : 0}")
  slot
</template>

<style scoped lang="scss">
.grid-col {
  display: flex;
  flex-direction: column;
  flex-basis: calc(var(--col-width) - var(--gap));
  width: calc(var(--col-width) - var(--gap));
  flex-shrink: 1;
  flex-grow: 1;

  @media #{$breakpoint-sm} {
    flex-basis: calc(var(--col-width-sm, var(--col-width)) - var(--gap));
    width: calc(var(--col-width-sm, var(--col-width)) - var(--gap));
  }

  @media #{$breakpoint-md} {
    flex-basis: calc(
      var(--col-width-md, var(--col-width-sm, var(--col-width))) - var(--gap)
    );
    width: calc(
      var(--col-width-md, var(--col-width-sm, var(--col-width))) - var(--gap)
    );
  }

  @media #{$breakpoint-lg} {
    flex-basis: calc(
      var(
          --col-width-lg,
          var(--col-width-md, var(--col-width-sm, var(--col-width)))
        ) - var(--gap)
    );
    width: calc(
      var(
          --col-width-lg,
          var(--col-width-md, var(--col-width-sm, var(--col-width)))
        ) - var(--gap)
    );
  }

  @media #{$breakpoint-xl} {
    flex-basis: calc(
      var(
          --col-width-xl,
          var(
            --col-width-lg,
            var(--col-width-md, var(--col-width-sm, var(--col-width)))
          )
        ) - var(--gap)
    );

    width: calc(
      var(
          --col-width-xl,
          var(
            --col-width-lg,
            var(--col-width-md, var(--col-width-sm, var(--col-width)))
          )
        ) - var(--gap)
    );
  }
}
</style>
