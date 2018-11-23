<template>
    <div id="container-wrap" class="container-wrap" ref="containerWrap">
        <!-- 侧边栏 -->
        <vSidebar></vSidebar>
        <div class="main-container">
            <vHeader></vHeader>
            <transition name="router-anim" enter-active-class="animated fadeInRight" leave-active-class="">
                    <router-view></router-view>
                </transition>
        </div>
    </div>
</template>

<script>
    import vSidebar from '../components/common/Sidebar';
    import vHeader from '../components/header/head';
    import {
        mapState,
        mapActions
    } from "vuex";
    export default {
        data() {
            return {
                value6: "",
                example0: "",
                leftHeightStyles: {},
                winHeight: ""
            };
        },
        updated: function() {},
        mounted() {
            // this.setHeight();
        },
        watch: {
            // '$route':'setHeight'
            // '$route' (to, from) {
            //     let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //     let containerHeight = this.$refs['container-wrap'].offsetHeight;
            //     alert(3)
            //     console.log(windowHeight, containerHeight);
            //     this.setHeight();
            // }
        },
        components: {
            vSidebar,
            vHeader,
        },
        computed: {},
        methods: {
            //  setHeight() {
            //     let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //     let containerHeight = this.$refs['container-wrap'].offsetHeight;
            //     alert(2)
            //     if(containerHeight < windowHeight){
            //         alert(1)
            //         this.winHeight = windowHeight;
            //     }
            // }
        }
    };
</script>

        
<style lang="scss">
    @import "../style/mixin"; // single-link
    .single-link {
        display: inline-block;
        color: #7f8599;
        background-color: #fff;
        width: 165px;
        height: 38px;
        line-height: 38px;
        border: 1px solid #e3e8f1;
        transition: 0.1s;
        border-radius: 4px;
        text-align: center;
    } // .content{
    //     overflow-y:scroll;
    //     max-height: 90vh
    // }
</style>