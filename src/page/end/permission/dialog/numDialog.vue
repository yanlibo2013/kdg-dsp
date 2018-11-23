<template>
    <!-- <el-table :data="gridData"> -->
    <el-table :data="infos" style="margin-top: -31px;width:100%"  height="250">
        <el-table-column property="account" label="帐户名" width="240"  prop="email">
            
        </el-table-column>
        <el-table-column property="name" label="姓名" width="108"  prop="name">
            
        </el-table-column>
    </el-table>
</template>
<script>
    import 'element-ui/lib/theme-chalk/index.css'
    import {
        mapState,
        mapActions
    } from "vuex";
    // import headTop from '../../components/header/head'
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    export default {
        data() {
            return {
                infos:[]
            }
        },
        props:["data"],
        mounted() {
            // this.actionHomeList();
            this.infos = this.data
        },
        components: {
            // headTop
        },
        
        updated(){
            this.infos = this.data
        },
        methods: {
            // ...mapActions(["actionHomeList"]),
            //点击图标刷新页面
            reload() {
                //window.location.reload();
            }
        },
    }
</script>
        
<style lang="scss">
</style>