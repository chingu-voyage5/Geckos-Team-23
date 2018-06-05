<template>
    <div class="index">
        <h1>Main Page</h1>
        <router-link to="/workspaces">Go to workspaces</router-link>
        <p>{{ helloMsg }}</p>
        <hr>
        <ul>
            <li v-for="workspace in workspaces"
                :key="workspace.id">{{ workspace.title }}</li>
        </ul>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import mockData from '../mockData.json'

    export default {
        data () {
            return {
                workspaces: mockData.workspaces
            }
        },
        computed: {
            ...mapState({
                helloMsg: 'msg'
            })
        },
        created () {
            console.log(mockData)
        }
    }
</script>

<style>

</style>
