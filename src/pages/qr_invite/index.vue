<template>
  <div>
    <qqLuck></qqLuck>
  </div>
</template>
<script>
const qqLuck = resolve => require(["./app_qqLuck.vue"], resolve);

export default {
components: {
    qqLuck,
}
};
</script>
<style lang="scss">
.list {
  font-size: 24px;
  color: $titleColor;
}
</style>
