<template>
    <div class="index">
        <h1>Main Page</h1>
        <router-link to="/workspaces">Go to workspaces</router-link>
        <p>{{ helloMsg }}</p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
                helloMsg: 'msg'
            })
        }
    }
</script>

<style>

</style>
