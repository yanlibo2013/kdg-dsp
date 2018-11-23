<template>
    <div>
        <local v-if='result=="local"'></local>
        <date v-if='result=="date"'></date>
        <result v-if='result=="result"'></result>
        <network v-if='result=="3"'></network>
        <meadia v-if='result=="4"'></meadia>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import local from "./local.vue"
    import date from "./date.vue"
    import meadia from "./meadia.vue"
    import network from "./network.vue"
    import result from "./result.vue"
    export default {
        data: function() {
            return {}
        },
        components: {
            // headTop
            local,
            date,
            meadia,
            network,
            result
        },
        computed: {
            ...mapState({
                result: "result"
            })
        },
    }
</script>

<style scoped>

</style>