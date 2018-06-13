<template>
    <div class="workspace">
        <ul class="workspace__list">
            <Column v-for="column in columns"
                    :key="column.id"
                    :columnId="column.id">
                <h2 class="column__title">
                    {{ column.title }}
                </h2>
            </Column>
        </ul>

        <div class="workspace__add-button"
             @click="addColumn">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</template>

<script>
    import Column from './Column'

    import { mapState } from 'vuex'

    export default {
        methods: {
            addColumn () {
                this.$store.commit('addColumn', { title: 'Column' })
            }
        },
        computed: {
            ...mapState([
                'columns'
            ])
        },
        components: {
            Column
        }
    }
</script>
