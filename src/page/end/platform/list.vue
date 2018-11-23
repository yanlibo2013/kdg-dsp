<template>
    <div class="platform-edit">
        <el-main>
            <el-col :span="24" class="border-bottom-2">
                <!-- 新建平台 -->
                <div class="platform-btn-control">
                    <div class="creative-btn-row">
                        <a href="javascript:void(0)" v-show="setPermission(68)" class="single-link el-link-add" @click="addPlatform">
                            <i class="add-iron">+</i>
                            <span class="add-msg">新建平台</span>
                        </a>

                        
                    </div>
                </div>
                <!-- 数据表格 -->
                <el-table :data="pageList.data" style="width: 100%">
                    <el-table-column prop="media_name" label="平台名称" width="230">
                        <template slot-scope="scope">
                            <!-- <img class="platform-img left" src="//www.baidu.com/img/bd_logo1.png" alt=""  width="60" height="60" /> -->
                        <img class="platform-img left" :src="scope.row.logo" alt="" width="60" height="60" />
                            <span class="firm-name" :title="scope.row.name">
                                {{scope.row.name}}
                                <a href="javascript:void(0);" v-show="setPermission(68)"  class="el-icon-revise" @click="modify(scope.row.id)"></a>
                            </span>
</template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" v-show="setPermission(70)">
                        
<template slot-scope="scope">
    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
    </el-switch>
</template>

                    </el-table-column>
                    <el-table-column prop="policy" label="审核政策">
<template slot-scope="scope">
     
    {{scope.row.ad_auditing=="1"?"先审后投":"先投后审"}}
</template>
                    </el-table-column>
                    <el-table-column prop="source_type" label="资源类型">
<template slot-scope="scope">
     {{JSON.parse(scope.row.resource_type).join(",")}}
</template>
                    </el-table-column>
                    <el-table-column prop="materiel_type" label="物料类型">
<template slot-scope="scope">
    <a href="javascript:void(0);" class="link-jump" @click="materialType(scope.row.creative_type,JSON.parse(scope.row.creative_type_content))">{{scope.row.creative_type.join("、")}}</a>

    <el-dialog title="物料类型" :visible.sync="dialogMaterialTypeVisible" class="material-type-poplayer" width="402px" @close="closeDialog">
        <el-tabs v-model="activeName">
             <!-- isShowImage:false,
                isShowNative:false,
                isShowVideo:false,
                isShowPatch:false, -->
            <!-- 图片 start -->
            <el-tab-pane class="" label="图片" name="first" v-if="isShowImage">
                <template>
                    <el-table :data="bannerData" style="width: 100%" >
                        
                        <el-table-column>
                            <template slot-scope="scopeSub">
                              image：{{scopeSub.row.imagewh.toString()}}，{{scopeSub.row.imagetype.toString()}}

                              <!-- {{JSON.parse(scope.row.creative_type_content).banner.length}},
                              <br/>
                              {{JSON.stringify(JSON.parse(scope.row.creative_type_content).banner)}}} -->
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <!-- 原生 start -->
            <el-tab-pane class="customer-info-wrap" label="原生图文" name="second" v-if="isShowNative">
                <template>
                    
                    <el-table :data="nativeData" style="width: 100%">
                        
                        <el-table-column>
                            <template slot-scope="scopeNative">
                              {{parseInt(scopeNative.row.imagenum)==1?"单图":"组图"}}：{{scopeNative.row.imagewh.toString()}}，{{scopeNative.row.imagetype.toString()}},{{scopeNative.row.logo?"需要LOGO":"不需要LOGO"}} 
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
            <!-- 视频 start -->
            <el-tab-pane class="customer-info-wrap" label="原生视频" name="third" v-if="isShowVideo">
                <template>
                    
                    <el-table :data="videoData" style="width: 100%">
                        
                        <el-table-column>
                            <template slot-scope="scopeVideo">
                             原生视频:  {{scopeVideo.row.videowh.toString()}},{{scopeVideo.row.videotype.toString()}} ,{{scopeVideo.row.duration.toString()}}s,{{scopeVideo.row.logo?"需要LOGO":"不需要LOGO"}} 
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>

                    <el-tab-pane class="customer-info-wrap" label="贴片视频" name="fourth" v-if="isShowPatch">
                <template>
                    
                    <el-table :data="patchData" style="width: 100%">
                        
                        <el-table-column>
                            <template slot-scope="scopePatch">
                               贴片视频：{{scopePatch.row.videowh.toString()}}，{{scopePatch.row.videotype.toString()}} , {{scopePatch.row.duration.toString()}}s 
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>
                    </el-table-column>
                    <!-- <el-table-column prop="operate" label="操作">
<template slot-scope="scope">
    <span><a href="javascript:void(0);" class="link-jump" @click="modify(scope.row.id)">编辑</a></span>
    <span><a href="javascript:void(0);" class="link-jump">配置模版</a></span>
</template>
                    </el-table-column> -->
                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination>
                </div>

            </el-col>
        </el-main>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        end
    } from "../../../service/index";
    import {isPermission} from "../../../common/utils";
    export default {
        data: function() {
            return {
                Iconflag: true,
                tableData: [{
                    media_name: '',
                    status: '',
                    policy: '',
                    source_type: '',
                    materiel_type: '',
                    operate: ''
                }],
                pageSize: 10,
                pageList: [],
                currentPage:"",
                dialogMaterialTypeVisible: false,
                activeName: 'first',
                isShowImage:false,
                isShowNative:false,
                isShowVideo:false,
                isShowPatch:false,

                // dialog

                bannerData:[],
                nativeData:[],
                videoData:[],
                patchData:[]
            }
        },
        methods: {
            setPermission(val){
                return isPermission(val);
            },
            ...mapActions(["setBreadCrumb"]),
            closeDialog(){

                //console.log("closeDialog");
                this.isShowImage=false;
                this.isShowNative=false;
                this.isShowVideo=false;
                this.isShowPatch=false;

            },
            addPlatform() {
                this.$router.push({
                    path: "/platformadd"
                });
            },
            materialType(data,val) {

                //console.log(val);
                this.dialogMaterialTypeVisible = true;

                this.bannerData=val.banner;
                this.nativeData=val.native;
                this.videoData=val["video-native"];
                this.patchData=val.video;

                _.forEach(data,val=>{

                    if(val=="图片"){
                        this.isShowImage=true;

                    }
                     if(val=="原生图文"){
                         this.isShowNative=true;
                        
                    }
                     if(val=="原生视频"){

                         this.isShowVideo=true;
                        
                    }
                     if(val=="贴片视频"){

                         this.isShowPatch=true;
                        
                    }

                })
            },
            getList(data) {
                end.platformList(data).then(res => {
                    if (res.data.code == 0) {
                        this.pageList = res.data.data;

                        let data=this.pageList.data;

                        _.forEach(data,val=>{

                          let arr=[];
                          let item=JSON.parse(val.creative_type_content);

                          console.log(item);

                          if(item.banner){
                              arr.push("图片");
                          }

                          if(item.native){
                              arr.push("原生图文");
                          }

                          if(item["video-native"]){
                               arr.push("原生视频");

                          }

                          if(item.video){
                              arr.push("贴片视频");
                          }

                          val.creative_type=arr;



                        })

                        this.pageList.data=data;

                        console.log(this.pageList.data);

                        // console.log(JSON.parse(this.pageList.data[0].creative_type)["5"]);

                        // _.forEach(JSON.parse(this.pageList.data[0].creative_type),item => {

                        //     console.log(item);
                            
                        // });
                    }
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getList({
                    page: 1,
                    pagesize: this.pageSize,
                });
            },
            handleCurrentChange(val) {
                //创意列表
                this.getList({
                    page: val,
                    pagesize: this.pageSize,
                });

                this.currentPage=val;
            },
            modify(val) {
              
                    this.$router.push({
                       path: "/platformedit/" + val
                    });
             
               
            },
              modifyStatus(val, flag) {
                console.log(flag);
                if (flag == "1") {
                    end.closePlatform({
                        id: [val]
                    }).then(res => {
                        if (res.data.code == 0) {
                            //this.loading2 = false;
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.currentPage,

                                pagesize: 10,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                }else{
                    end.openPlatform({
                        id: [val]
                    }).then(res => {
                        if (res.data.code == 0) {
                            //this.loading2 = false;
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: this.currentPage,

                                pagesize: 10,
                            });
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                }
            },
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList({
                page: 1,
                pagesize: 10
            });
        },
    }
</script>

<style lang="scss">
    @import '../../../style/mixin';
    @import '../../../style/common';
    .platform-edit {
        .platform-btn-control {
            padding: 20px 0 20px 30px;
            background-color: #fff;
        }
        .platform-img {
            border-radius: 5px;
            margin-right: 20px;
        }
        .firm-name {
            display: table-cell;
            vertical-align: middle;
            height: 60px;
        }
        .el-table {
            th:first-child,
            td:first-child {
                padding-left: 20px;
            }
            th:nth-child(2),
            td:nth-child(2) {
                text-align: center;
            }
            .link-jump {
                color: #6cabff;
                padding-right: 21px;
                &:hover {
                    text-decoration: underline;
                }
            }
            // edit icon
            .el-icon-revise {
                cursor: pointer;
                margin-left: 20px;
                background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
                height: 19px;
                width: 19px;
                vertical-align: -4px;
                &:hover {
                    background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
                }
            }
        }
        //material type poplayer
        .material-type-poplayer{
            .el-dialog__header{
                border-bottom: 2px solid #e1e7f0;
                padding: 26px 30px 14px;
            }
            .el-dialog__headerbtn{
                right: 30px;
                top: 27px;
            }
            .el-dialog__body{
                padding: 0;
            }
            .el-tabs__header{
                margin-bottom: 0;
            }
            .el-tabs__nav{
                margin-left: 30px;
            }
            // nav border bottom
            .el-tabs__nav-wrap::after{
                height: 1px;
                background-color: #e1e7f0;
            }
            th{
                display: none;
            }
            // blue line height setting
            .el-tabs__active-bar{
                height: 4px;
            }
            .el-tabs__nav{
                margin-left: 30px;
            }
            .el-tabs__item{
                height: 50px;
                line-height: 50px;
                @include sc(12px, #bdbecd);
                &.is-active{
                    color: #515974;
                }
            }
        }
        .block {
            background-color: #fff;
        }
    }
</style>