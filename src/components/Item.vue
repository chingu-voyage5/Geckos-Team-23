<template>
  <div class="item">
    <div class="item__header" v-bind:style="{ background: color}">
    <h3><slot>{{title}}</slot></h3>
      <i class="fas fa-ellipsis-v"></i>
    </div>

    <div class="item__body">
      <div class="item__button" v-bind:style="{ background: color}">
        <i class="fas fa-plus item__icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'title',
      'color'
    ]
  }
</script>
