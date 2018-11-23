<template>
    <div class="information-center" name="banner">
        <el-main>
            <!-- 个人信息 start -->
            <el-col :span="24">
                <div class="up-ingredient">
                    <el-form>
                        <el-tabs v-model="activeName">
                            <el-tab-pane class="border-bottom-2" label="个人信息" name="first">
                                <template>
                                                <div class="personal-info">
                                                    <div class="update-item-row">
                                                        <label class="update-hd">帐户：</label>
                                                        <span class="personal-detail">admin</span>
                                                    </div>
                                                    <div class="update-item-row">
                                                        <label class="update-hd">姓名：</label>
                                                        <span class="personal-detail">aaa</span>
                                                    </div>
                                                    <div class="update-item-row">
                                                        <label class="update-hd">联系电话：</label>
                                                        <span class="personal-detail">11111111</span>
                                                    </div>
                                                    <div class="update-item-row">
                                                        <label class="update-hd">所在城市：</label>
                                                        <span class="personal-detail">北京</span>
                                                    </div>
                                                    <div class="update-item-row">
                                                        <label class="update-hd">角色：</label>
                                                        <span class="personal-detail">优化师</span>
                                                    </div>
                                                    <div class="update-item-row">
                                                        <label class="update-hd">角色名称：</label>
                                                        <span class="role-detail">产品</span>
                                                        <span class="role-detail">运营</span>
                                                    </div>
                                                </div>
                                                <div class="personal-table-list">
                                                    
                                                    <el-table :data="pageList.data" style="width: 100%">
                                                        
                                                        <el-table-column prop="preview" label="客户名称">
                                                            <template slot-scope="scope">
                                                                {{scope.row.com_name }}
</template>
                    </el-table-column>
                    <el-table-column prop="theme" label="简称">
<template slot-scope="scope">
      {{scope.row.brand!="null"?scope.row.brand:"" }}
</template>
                    </el-table-column>
                    <el-table-column prop="status" label="备注">
<template slot-scope="scope">
    {{scope.row.ad_remark!="null"? scope.row.ad_remark:""}}
</template>
                    </el-table-column>
                </el-table>
                <!-- pagenation -->
                <div class="block">
                     <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination> -->

                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination>
                </div>

            </div>
        </template>
                        </el-tab-pane>
                        
            <!-- 个人信息 end -->
            
            <!-- 客户信息 start -->
                        <el-tab-pane class="customer-info-wrap border-bottom-2" label="客户信息" name="second">
<template>
    <h2 class="template-hd">
        基本资料</h2>
    <div class="basic-msg">
        <div class="update-item-row">
            <label class="update-hd">企业简称：</label>
            <span class="personal-detail">admin</span>
        </div>
        <div class="update-item-row">
            <label class="update-hd">公司注册名称：</label>
            <span class="personal-detail">{{custom.com_name || ''}}</span>
        </div>
        <div class="update-item-row">
            <label class="update-hd">公司注册地址：</label>
            <span class="personal-detail">{{custom.com_addr || ''}}</span>
        </div>
        <div class="update-item-row">
            <label class="update-hd">企业LOGO：</label>
            <img :src="custom.logo" alt="" />
        </div>
        <div class="update-item-row">
            <label class="update-hd">网址：</label>
            <span class="personal-detail">{{custom.web_site || ''}}</span>
        </div>
        <div class="update-item-row">
            <label class="update-hd">联系人：</label>
            <span class="personal-detail">{{custom.contacts || ''}}</span>
        </div>
        <div class="update-item-row">
            <label class="update-hd">电话：</label>
            <span class="personal-detail">{{custom.tel || ''}}</span>
        </div>
    </div>
    <div class="customer-info">
        <h2 class="template-hd">资质文件</h2>
        <div class="update-item-row clear" v-if="custom.aptitude" v-for="item,index in custom.aptitude">
            <label class="update-hd left" v-if="item.aptitude_type == 1">企业资质：</label>
            <label class="update-hd left" v-if="item.aptitude_type == 2">其他资质：</label>
            <label class="update-hd left" v-if="item.aptitude_type == 3">行业资质：</label>
            <!-- 企业资质： -->
            <table v-if="item.aptitude_type == 1 && item.aptitude_id == 1" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">营业执照</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
            <div class="update-item-row" v-if="item.aptitude_type == 1 && item.aptitude_id == 1 && item.content">
                <label class="update-hd">资质编号：</label>
                <span class="personal-detail">{{item.content}}</span>
            </div>


            <table v-if="item.aptitude_type == 1 && item.aptitude_id == 2" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">商务登记证</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
            <!-- 其他资质： -->
            <table v-if="item.aptitude_type == 2 && item.aptitude_id == 1" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">法人身份证</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
            <table v-if="item.aptitude_type == 2 && item.aptitude_id == 2" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">组织机构代码</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
            <table v-if="item.aptitude_type == 2 && item.aptitude_id == 3" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">ICP备案证明</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
            <table v-if="item.aptitude_type == 2 && item.aptitude_id == 4" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">税务登记证</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
            <!-- 行业资质： -->
                            
            <table v-if="item.aptitude_type == 3 && item.aptitude_id == 1" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">增值电信业务营业许可证</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
            <table v-if="item.aptitude_type == 3 && item.aptitude_id == 2" 
            width="35%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <span class="personal-detail">金融保险</span>
                                        </td>
                                        <td>
                                            <el-button class="mould-name" type="new">{{item.old_filename}}</el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
        </div>
        
        <!-- <div class="update-item-row clear">
                            <label class="update-hd left">其他资质：</label>
                            <div class="inferior-item-row">
                                <table width="23%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="space-under">
                                            <td>
                                                <span class="personal-detail">其他资质</span>
                                            </td>
                                            <td>
                                                <el-button class="mould-name" type="new">资质名称</el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width="23%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="space-under">
                                            <td>
                                                <span class="personal-detail">其他资质</span>
                                            </td>
                                            <td>
                                                <el-button class="mould-name" type="new">资质名称</el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> -->
                        <!-- <div class="update-item-row clear">
                            <label class="update-hd left">行业资质：</label>
                            <div class="inferior-item-row">
                                <table width="23%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="space-under">
                                            <td>
                                                <span class="personal-detail">其他资质</span>
                                            </td>
                                            <td>
                                                <el-button class="mould-name" type="new">资质名称</el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width="23%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr class="space-under">
                                            <td>
                                                <span class="personal-detail">其他资质</span>
                                            </td>
                                            <td>
                                                <el-button class="mould-name" type="new">资质名称</el-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> -->
                        </div>
                    </template>
                        </el-tab-pane>
                    </el-tabs>
                     </el-form>
                </div>
                
            </el-col>
            <!-- 客户信息 end -->
        </el-main>
    </div>
</template>

<script>
    import {
        end
    } from "../../../service/index";
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import { getParam} from "../../../common/utils"
      import store from 'store';
    export default {
        computed: {
            isShowtime() {
                return this.$route.path.replace("/", "").indexOf("banner") >= 0;
            },
            ...mapState({
                currentuser: "currentuser",
                currentAd: "currentAd"
            })
        },
        data: function() {
            return {
                uploadType: "1", //上传类型 1本地上传，2远程素材
                user: "",
                custom: {},
                pageList:[],
                activeName:"first",
                pageSize:10
            };
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
              getList(data) {

                  end.customList(data).then(res => {
                if (res.data.code == 0) {
                    this.pageList = res.data.data;

                    console.log("客户列表");

                    console.log( this.pageList);
                }
            });

              },
                 handleSizeChange(val) {
                this.pageSize = val;
                // creative.creativeListPage({
                //     page: 1,
                //     pagesize: this.pageSize,
                // });
                this.getList({
                    page: 1,
                    pagesize: this.pageSize
                });
            },
            handleCurrentChange(val) {
                // creative.creativeListPage({
                //     page: val,
                //     pagesize: this.pageSize,
                // });
                this.getList({
                    page: val,
                    pagesize: this.pageSize
                });
            },
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            end.customInfo({
                // id: this.$store.state.currentCheckedAd
                id:store.get("currentAdId")
            }).then(res => {
                this.custom = res.data.data || {};
                // let aptitudes = this.custom.aptitude;
                // let result = [];
                // for(var i =0; i< aptitudes.length; i++) {
                //     if(aptitudes[i].aptitude_type== 1) {
                //         aptitudes[i].aptitude_type = "企业资质";
                //     }
                //     if(aptitudes[i].aptitude_type == 2) {
                //         aptitudes[i].aptitude_type = "其他资质";
                //     }
                //     if(aptitudes[i].aptitude_type == 3) {
                //         aptitudes[i].aptitude_type = "行业资质";
                //     }
                //     result.push(aptitudes[i]);
                // }
                //         res.data.data.aptitude = result;
                //         this.custom = res.data.data;

            });
            end.personInfo({
                id: this.currentuser.id
            }).then(res => {
                this.user = res.data.data;
            });
            // end.customList({
            //     page: 1,
            //     pagesize: 10
            // }).then(res => {
            //     if (res.data.code == 0) {
            //         this.pageList = res.data.data;

            //         console.log("客户列表");

            //         console.log( this.pageList);
            //     }
            // });

            this.getList({page:1,pagesize:10});

            // console.log("================================");

            //console.log(getParam("activeName"));

            // console.log(window.location.search);

            if(window.location.search.indexOf("activeName")>-1){
                this.activeName="second"
            }
        }
    };
</script>

<style lang="scss">
    @import '../../../style/mixin'; // 上传文件
    .up-ingredient {
        .el-main{
            background-color: transparent;
        }
        .el-tabs{
            background-color: #fff;
        }
        // head
        .el-tabs__nav-scroll {
            padding-left: 30px;
        }
        .el-tabs__active-bar{
            height: 3px;
        }
        .el-tabs__item {
            height: 56px;
            line-height: 56px;
            color: #7f8599;
        } // head font style
        .is-active {
            color: $firstc;
            font-weight: bold;
        }
        .el-tabs__header {
            margin-bottom: 17px;
        } // head line change to 1px
        .el-tabs__nav-wrap:after {
            height: 1px !important;
        } // label and name style
        .update-hd {
            width: 80px;
            line-height: 49px;
            display: inline-block;
            font-weight: bold;
            color: $firstc;
        }
        .personal-detail {
            color: #7f8599;
        }
        .role-detail {
            background-color: $bc;
            color: #777f95;
            padding: 9px 20px;
            margin-right: 8px;
            @include borderRadius(5px);
        } // table style
        .el-table{
            th:first-child,
            td:first-child {
                padding-left: 20px;
            }
            th:nth-child(2),
            td:nth-child(2) {
                text-align: center;
            }
            th:nth-child(3),
            td:nth-child(3),
            th:nth-child(3) .cell {
                text-align: right;
                padding-right: 30px;
            }
        }
         // two table
        .personal-info {
            padding: 0 0 23px 30px;
            border-bottom: 1px solid $bc;
        }
        .customer-info-wrap {
            padding-left: 20px;
            .template-hd {
                padding: 0 0 18px 10px;
                border-bottom-width: 1px;
            }
            .basic-msg {
                padding: 28px 10px 8px;
            }
            .customer-info {
                padding: 0 0 51px 10px;
                .template-hd {
                    padding-left: 0;
                    margin-bottom: 16px;
                }
            }
            .resource-wrap {
                padding-left: 4px;
            }
            .update-hd {
                width: 104px;
            }
            tr td {
                line-height: 49px;
                &:first-child{
                    width: 50%;
                }
            }
            .inferior-item-row {
                margin-left: 104px;
            }
        }
        .block .el-pagination{
            padding: 30px 40px 30px 30px;
        }
    }
</style>