<template>
    <div class="id-edit-create" name="banner">
        <el-main>
            <!-- 个人信息 start -->
            <el-col :span="24">
                <div class="up-ingredient">
                    <el-form :model="form">
                        <el-col :span="24" class="margin-bottom-20 border-bottom-2">
                            <h1 class="template-hd">基本资料</h1>
                            <div class="base-bd">
                                <!-- 帐户： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">帐户：</label>
                                    <el-input placeholder="12字以内，允许汉字或英文" v-model="form.email"></el-input>
                                </div>
                                <!-- 帐户： end -->
                                <!-- 原始密码： start -->
                                <div class="basic-set-row" v-if="hasOldPassword">
                                    <i class="item-needed" v-if="isEdit"></i>
                                    <i class="item-needed" v-else>*</i>
                                    <label for="" class="data-item">原始密码：</label>
                                    <el-input type="password" placeholder="20字以内，允许汉字或英文" v-model="form.oldpassword"></el-input>
                                </div>
                                <!-- 原始密码： end -->
                                <!-- 新密码： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed" v-if="isEdit"></i>
                                    <i class="item-needed" v-else>*</i>
                                    <label for="" class="data-item">新密码：</label>
                                    <el-input type="password" placeholder="6到64个文字，不输入表示不修改密码" v-model="form.password"></el-input>
                                </div>
                                <!-- 新密码： end -->
                                <!-- 确认密码： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed" v-if="isEdit"></i>
                                    <i class="item-needed" v-else>*</i>
                                    <label for="" class="data-item">确认密码：</label>
                                    <el-input type="password" placeholder="6到64个文字，不输入表示不修改密码" v-model="form.password_confirmation"></el-input>
                                </div>
                                <!-- 确认密码： end -->
                                <!-- 姓名： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item">姓名：</label>
                                    <el-input placeholder="汉字或英文" v-model="form.name"></el-input>
                                </div>
                                <!-- 姓名： end -->
                                <!-- 联系电话： start -->
                                <div class="basic-set-row">
                                    <i class="item-needed">*</i>
                                    <label for="" class="data-item ">联系电话：</label>
                                    <el-input class="" placeholder="固话或移动电话" v-model="form.tel"></el-input>
                                </div>
                                <!-- 联系电话： end -->
                                <!-- 所在城市： start -->
                                <!-- <div class="basic-set-row">
                                    <label for="" class="data-item ">所在城市：</label>
                                    <el-input class="" placeholder="" v-model="form.city"></el-input>
                                </div> -->
                                <!-- 所在城市： end -->
                            </div>
                        </el-col>
                        <el-col :span="24" class="margin-bottom-20 border-bottom-2" v-if="role_id != ''">
                            <p class="template-hd">角色</p>
                            <div class="base-bd">
                                <div class="basic-set-row">
                                    <label class="data-item">角色名称：</label>
                                    <span class="role-detail" v-for="item in role_id">{{item}}</span>
                                </div>
                            </div>
                        </el-col>

                        <el-col :span="24" class="border-bottom-2" v-if="pageList.data">
                            <p class="template-hd">客户信息</p>
                            <div class="personal-table-list">
                                
                                <el-table :data="pageList.data" style="width: 100%">
                                    
                                    <el-table-column prop="preview" label="客户名称">
                                        <template slot-scope="scope">
                                            {{scope.row.com_name}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="theme" label="简称">
                                        <template slot-scope="scope">
                                            {{scope.row.brand}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="status" label="备注">
                                        <template slot-scope="scope">
                                            {{scope.row.ad_remark}}
                                        </template>
                                    </el-table-column>
                                </el-table>
                                
                                <div class="block">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                                    :total="pageList&&pageList.total">
                                    </el-pagination>
                                </div>

                            </div>
                        </el-col>
                        
                        <el-col :span="24" class="margin-bottom-20">
                            <div class="is-confirm">
                                <el-button type="confirm" @click="onSubmit">确认</el-button>
                                <el-button type="cancel" @click="goBack">取消</el-button>
                            </div>
                        </el-col>
                    </el-form>
                </div>
                
            </el-col>
        </el-main>
    </div>
</template>

<script>
    import {
        end
    } from "../../../../service/index";
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        getParam,
        testPhone
    } from "../../../../common/utils"
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
                pageList: [],
                custom: "",
                pageList:[],
                // activeName:"first",
                form: {
                    email: "",//帐户
                    oldpassword: "",//原始密码
                    password: "",//密码
                    password_confirmation: "",//确认密码
                    name: "",//姓名
                    tel: "",//联系电话
                    city: "",//所在城市

                },
                role_id: [],
                hasOldPassword: false,
                isEdit: false,//编辑时不显示必填项
            };
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            validateForm(){
                let that =this;
                //帐户-邮箱格式
                if(!this.form.email){
                    this.$message({
                    message:'帐户请输入12字以内汉字或英文',
                    type:'warning'
                    })
                    return false;
                }
                //姓名-10
                if(!this.form.name){
                    this.$message({
                    message:'姓名请输入汉字或英文',
                    type:'warning'
                    })
                    return false;
                }
                //电话
                // if (!testPhone(this.form.tel)) {
                if (!this.form.tel) {
                    this.$message({
                        message: "请输入联系电话",
                        type: "warning"
                    });
                    return;
                }
                return true;
            },
            validatePwd() {
                //新密码
                if(!this.form.password){
                    this.$message({
                        message:'密码请输入6到64个字符',
                        type:'warning'
                    })
                    return false;
                }
            },
            validatePwdConfirm() {
                //确认密码
                if(!this.form.password_confirmation){
                    this.$message({
                        message:'确认密码请输入6到64个字符',
                        type:'warning'
                    })
                    return false;
                }
            },
            validateOldPwd() {
                //原始密码
                if(!this.form.oldpassword){
                    this.$message({
                        message:'原始密码请输入20个以内字符',
                        type:'warning'
                    })
                    return false;
                }
            },
            validateEmpty() {
                this.$message({
                    message:'修改密码时请输入原始密码，新密码和确认密码',
                    type:'warning'
                })
                // return false;
            },
            onSubmit(){
                let that = this;
                let fileData = new FormData();
                fileData.append("email", this.form.email);
                fileData.append("name", this.form.name);
                fileData.append("tel", this.form.tel);
                
                if(this.form.city) {
                    fileData.append("city", this.form.city);
                }
                //编辑
                if (this.$route.params.id && this.validateForm()){
                    fileData.append("id",this.$route.params.id);
                    if(this.form.password && this.form.password_confirmation && this.form.oldpassword) {
                        if(this.form.password != this.form.password_confirmation) {
                            this.$message({
                                message:'新密码和确认密码不一致',
                                type:'warning'
                            })
                            return false;
                        }
                        fileData.append("password",this.form.password);
                        fileData.append("password_confirmation",this.form.password_confirmation);
                        fileData.append("password_old",this.form.oldpassword);
                    } else if(this.form.oldpassword && !this.form.password || this.form.oldpassword && !this.form.password_confirmation) {
                        this.validateEmpty();
                        return false;
                    }
                     else if(this.form.password && !this.form.oldpassword || this.form.password && !this.form.password_confirmation) {
                        this.validateEmpty();
                        return false;
                    } else if(this.form.password_confirmation && !this.form.password || this.form.password_confirmation && !this.form.oldpassword) {
                        this.validateEmpty();
                        return false;
                    }
                    
                    end.adEdit(fileData).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.$router.go(-1);
                        } else {
                            this.$message.warning(res.data.msg);
                        }
                        if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });

                } else {//创建，就需要密码
                    this.validatePwd();
                    this.validatePwdConfirm();
                    if(this.form.password) {
                        fileData.append("password", this.form.password);
                    }
                    if(this.form.password_confirmation) {
                        fileData.append("password_confirmation", this.form.password_confirmation);
                    }

                    if(this.validateForm()){
                        end.accountadd(fileData).then(res => {
                            if (res.data.code == 0) {
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                
                                this.$router.go(-1);
                            } else {
                                this.$message.warning(res.data.msg);
                            }

                            if (res.data.code == -1) {
                                this.$router.push({
                                    path: "/login"
                                });
                            }
                        });
                    }


                }
                
            },
            goBack() {
                this.$router.go(-1);
            },
            // getList(data) {
            //     end.materialList(data).then(res => {
            //         if (res.data.code == 0) {
            //             // this.listData = res.data.data;
            //             let data = res.data.data.data;
                        
            //         }
            //         if (res.data.code == -1) {
            //             this.$router.push({
            //                 path: "/login"
            //             });
            //         }
            //     });
            // },
            handleSizeChange(val){
                end.personInfo({
                    id: parseInt(this.$route.params.id),
                    pagesize:val
                    
                }).then(res => {
                    this.pageList = res.data.data;
                });
            },
            handleCurrentChange(val){
                end.personInfo({
                    id: parseInt(this.$route.params.id),
                    page:val
                }).then(res => {
                    this.pageList = res.data.data;
                });
            },
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));

            if (this.$route.params.id) {
                //显示非必填项
                this.isEdit = true;
                // 基本资料
                this.hasOldPassword = true;
                end.adminInfo({
                    id: parseInt(this.$route.params.id)
                }).then(res => {
                    let data = res.data.data;
                    this.form.email = data.email;
                    this.form.password = data.password;
                    this.form.password_confirmation = data.password_confirmation;
                    this.form.name = data.name;
                    this.form.tel = data.tel;
                    if(data.city){
                        this.form.city = data.city;
                    }
                    this.role_id = data.role_id;
                });
                //获取客户信息列表
                end.personInfo({
                    id: parseInt(this.$route.params.id)
                }).then(res => {
                    this.pageList = res.data.data;
                });
            }

            // console.log("================================");
            

            //console.log(getParam("activeName"));

            // console.log(window.location.search);

            // if(window.location.search.indexOf("activeName")>-1){
            //     this.activeName="second"
            // }
        }
    };
</script>

<style lang="scss">
    @import '../../../../style/mixin'; // 上传文件
    .id-edit-create {
        // head style
        .template-hd {
            padding: 16px 0 18px 30px;
            border-bottom: 1px solid $bc;
            @include bg-white($fc);
        } // body style
        .base-bd {
            padding: 20px 0 18px 30px;
            @include bg-white($fc);
            .select-info-tip {
                color: #ff7a81;
                padding: 10px 0 0 16px;
            }
        } // each row style, contain label and input
        .basic-set-row {
            margin-bottom: 10px;
            .item-needed{
                color: #ff6870;
                display: inline-block;
                width: 7px;
                margin-right: 7px;
                vertical-align: -2px;
            }
            .data-item {
                line-height: 38px;
                height: 38px;
                color: $firstc;
                width: 72px;
                font-weight: bold;
                display: inline-block;
            }
            .el-input {
                width: 240px;
            }
            .role-detail{
                background-color: #e1e7f0;
                color: #515974;
                font-weight: bold;
                padding: 9px 20px;
                margin-right: 6px;
                border-radius: 5px;
            }
        }
        // table
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
        .block{
            @include bg-white($fc);
            
        }
        // confirm or cancel
        .is-confirm {
            padding-left: 30px;
        }
    }
</style>