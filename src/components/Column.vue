<template>
    <div class="column">
        <div class="column__header">
            <h2 class="column__title">Column #1</h2>
            <i class="fas fa-ellipsis-v"></i>
        </div>

        <Item/>

        <div class="column__button">
            <i class="fa fa-plus column__icon"></i>
        </div>

        <ul>
            <li v-for="column in showColumns" :key="column.id">{{ column.title }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import Item from '../components/Item'

    export default {
        data () {
            return {

            }
        },
        computed: {
            ...mapState([
                'showColumns'
            ])
        },
        components: {
            Item
        }
    }
</script>

<style>

</style>
