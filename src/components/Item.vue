<template>
  <div class="item">
    <div class="item__header">
      <slot class="item__title"></slot>
      <i class="fas fa-ellipsis-v"></i>
    </div>

    <div class="item__body">
      <div class="item__button">
        <i class="fas fa-plus item__icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'itemId'
    ]
  }
</script>
