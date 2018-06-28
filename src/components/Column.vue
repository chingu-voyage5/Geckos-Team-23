<template>
    <div class="column">
        <div class="column__header">
            <slot class="column__title"></slot>
            <i class="fas fa-ellipsis-v" @click="openDropdown"></i>

            <div class="dropdown" v-if="showDropdown">
                <i class="fas fa-caret-up dropdown__arrow"></i>
                <div class="dropdown__body"></div>
            </div>
        </div>

        <Item v-for="item in filterItems"
              :key="item.id"
              :itemId="item.id">
            <input class="item__input" v-model="item.title">
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
        data () {
            return {
                showDropdown: false
            }
        },
        methods: {
            addItem () {
                this.$store.commit('addItem', { title: 'Item', columnId: this.columnId, id: this.items.length + 1 })
            },
            openDropdown () {
                this.showDropdown = !this.showDropdown
            }
        },
        computed: {
            ...mapState([
                'items'
            ]),
            filterItems () {
                const items = this.items
                const column = this.columnId

                return items.filter(item => column === item.columnId)
            }
        },
        components: {
            Item
        },
        props: [
            'columnId'
        ]
    }
</script>
