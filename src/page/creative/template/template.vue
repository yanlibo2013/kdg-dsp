<template>
    <!-- 创意模板 -->
    <div class="creative-template">
        <el-main>
            <el-col :span="24" class="creative-template-wrap border-bottom-2">
                <el-col :span="14" class="first-row">
                <h1 class="template-hd">模版展示</h1>
                        <template>
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in 1" :key="item">
                    <h3>{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
                        </template>

                        <!-- <template>
                                <el-carousel indicator-position="outside">
                                    <el-carousel-item v-for="item in imgList" :key="item.id">
                                        <img :src="item.src"/>
                                    </el-carousel-item>
                                </el-carousel>
                        </template> -->
            </el-col>
            <el-col :span="10">
                <h1 class="template-hd second-msg-title">基础信息</h1>
                <table width="100%" class="basic-msg" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td><strong>模版名称：</strong></td>
                            <td>{{templateInfo.name}}</td>
                        </tr>
                        <tr>
                            <td rowspan="3" style="vertical-align: top;"><strong>模版规则：</strong></td>
                            <td>
                                <strong>图片要求：</strong>
                                <span>{{templateInfo.main_info&&templateInfo.main_info.img.w}}*{{templateInfo.main_info&&templateInfo.main_info.img.h}},{{templateInfo.main_info&&templateInfo.main_info.img.file_type}},{{templateInfo.main_info&&templateInfo.main_info.img.size}}KB以内；</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>标题描述：</strong>
                                <span>{{templateInfo.main_info&&templateInfo.main_info.title.max}}个字以内；</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>描述要求：</strong>
                                <span>{{templateInfo.main_info&&templateInfo.main_info.desc.max}}个字以内；</span>
                            </td>
                        </tr>
                        
                        <tr>
                            <td rowspan="4" style="vertical-align: top;"><strong>量级：</strong></td>
                            <td>
                                <strong class="margin-space">总量级：</strong>
                                <span>1000000PV/天；</span>
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <strong>网易新闻APP：</strong>
                                <span>1000PV/天</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>凤凰新闻APP：</strong>
                                <span>1000PV/天</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
            </el-col>
                        

        </el-main>
    </div>
</template>

<script>
    import {
        creative
    } from "../../../service/index"
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        data: function() {
            return {
                templateInfo: "",
                imgList: []
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            //
            creative.creativeTempInfo({
                id: this.$route.params.id
            }).then(res => {
                if (res.data.code == 0) {
                    this.templateInfo = res.data.data;
                    let list = JSON.parse(res.data.data.path);
                    for (var j = 0; j < list.length; j++) {
                        this.imgList.push({
                            src: list[j],
                            id: j
                        });
                    }
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
        },
    }
</script>


<style lang="scss">
    .creative-template {
        .creative-template-wrap{
            background-color: #fff;
        }
        .el-carousel__item h3 {
            color: #475669;
            font-size: 18px;
            opacity: 0.75;
            line-height: 300px;
            margin: 0;
        }
        .el-carousel__item:nth-child(2n) {
            background-color: #99a9bf;
        }
        .el-carousel__item:nth-child(2n+1) {
            background-color: #d3dce6;
        }
        .template-hd {
            font-weight: bold;
            padding: 16px 0 17px 30px;
            border-bottom-width: 1px;
        }
        .first-row {
            padding-right: 30px;
            .el-carousel {
                margin: 20px 40px 0 30px;
            }
        }
        .basic-msg {
            font-size: 14px;
            color: #515974;
            padding-left: 30px;
            td {
                line-height: 49px;
            }
            strong {
                margin-right: 10px;
            }
            span {
                color: #7f8599;
            }
            .margin-space {
                margin-right: 52px;
            }
        }
    } // 上传文件
    // .up-ingredient {
    //     .el-tabs__header {
    //         margin-bottom: 20px;
    //     }
    //     .update-hd {
    //         margin-right: 5px;
    //         line-height: 38px;
    //         color: #515974;
    //     }
    //     .update-local-file {
    //         margin-bottom: 15px;
    //     }
    //     .update-item-row {
    //         margin-bottom: 14px;
    //         .el-input {
    //             width: 22.8%;
    //         }
    //         .align-right.el-select,
    //         .align-right.el-input {
    //             margin: 0 10px 0 32px;
    //         }
    //         .el-select .el-input {
    //             width: 240px;
    //         }
    //     }
    //     .el-tab-pane {
    //         padding: 0 0 16px 30px;
    //     }
    //     .el-tabs__nav-wrap:after {
    //         height: 1px!important;
    //     }
    //     .is-confirm {
    //         padding-left: 30px;
    //     }
    //     .el-tabs__nav-scroll {
    //         padding-left: 30px;
    //     }
    //     .el-tabs__item {
    //         padding: 0 15px;
    //     }
    //     .is-active {
    //         color: #6cabff;
    //     }
    //     .el-radio__input+.el-radio__label {
    //         color: #7f8599;
    //         font-weight: normal;
    //     }
    //     .el-radio__input.is-checked+.el-radio__label {
    //         color: #515974;
    //         font-weight: bold;
    //     }
    // }
    @media screen and (max-width:1366px) {
        .creative-template .second-msg-title,
        .creative-template .basic-msg{
            padding-left: 10px;
        }

        .creative-template .basic-msg strong{
            margin-right: 0;
        }
        .creative-template .basic-msg span{
            font-size: 13px;
        }
        .creative-template .basic-msg .margin-space{
            margin-right: 43px;
        }
        
    }
</style>