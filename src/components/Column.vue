<template>
    <div class="column">
        <div class="column__header">
            <slot class="column__title"></slot>
            <i class="fas fa-ellipsis-v"></i>
        </div>

        <Item v-for="item in items" :key="item.id">
            <h2 class="item__title">{{ item.title }}</h2>
        </Item>

        <div class="column__add-item"
             @click="addItem">
            <i class="fa fa-plus column__icon"></i>
        </div>
    </div>
</template>

<script>
    import Item from '../components/Item'

    import { mapState } from 'vuex'

    export default {
        methods: {
            addItem () {
                this.$store.commit('addItem', { title: 'Item' })
            }
        },
        computed: {
            ...mapState([
                'items',
                'filterItems'
            ])
        },
        components: {
            Item
        }
    }
</script>
