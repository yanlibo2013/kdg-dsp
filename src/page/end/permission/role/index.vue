<template>
    <div>
        <div class="">
            <el-main style="min-width: 1200px">
                <el-row class="role-list-content">
                    <el-col :span="24" class="border-bottom-2">
                        <div class="role-module-hd">
                            <div class="function-list">
                                <a href="javascript:void(0);" class="single-link el-link-add" @click="createRole" v-show="setPermission(48)">
                                    <i class="add-iron">+</i>
                                    <span class="add-msg">创建角色</span>
                                </a>
                                
                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open" v-show="setPermission(50)">开启</el-button>
                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close" v-show="setPermission(50)">关闭</el-button>
                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del" v-show="setPermission(56)">删除</el-button>
                
                            </div>
                            <div class="seek-box">
                                <el-select 
                                @change="changefilterstate"
                                v-model="value" 
                                placeholder="请选择">
                                    <el-option v-for="item in options" 
                                    :key="item.value" 
                                    :label="item.label" 
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="keyWords" @input="searchDataByName">
                                </el-input>
                            </div>
                        </div>
                        <el-table :data="roleList.data" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column prop="name" label="角色名称">
                                <template slot-scope="scope">  
                                  <span>{{ scope.row.name }}</span>
                                 <a href="javascript:;" @click="editRole(scope.row.id)" class="el-icon-revise" v-show="setPermission(48)"></a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
                                <template slot-scope="scope">
                                    <el-switch 
                                     v-model='scope.row.flag==1?true:false' 
                                     active-text="关闭" inactive-text="开启" 
                                     @change="modifyStatus(scope.row.id,scope.row.flag)"
                                     >
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="帐户数量">
                                <template slot-scope="scope">
                                    <a href="javascript:;" 
                                     class="link-jump" 
                                     @click="countDialog(scope.row.id)"
                                     
                                    >{{ scope.row.ad_count}}</a>
                                    <el-dialog title="帐户信息详情" 
                                     v-if="dialogTableVisible1"
                                     :visible.sync="dialogTableVisible"
                                     @close="dialogTableVisible1=false"
                                     class="account-info-dialog"
                                     >
                                        <numDidalog :data="countData"></numDidalog>
                                    </el-dialog>
                                </template>
                            </el-table-column>
                            <el-table-column prop="privilege_id" label="权限信息">
                                <template slot-scope="scope">
                                    <a href="javascript:;" 
                                    class="link-jump" 
                                    @click="privilegeDialog(scope.row.id)"
                                   
                                    >{{ scope.row.privilege_id}}</a>
                                    <el-dialog title="权限信息详情" 
                                    v-if="dialogFormVisible1"
                                    :visible.sync="dialogFormVisible"
                                     @close="closeDialogForm"
                                    >
                                      <auditDidalog :data="privilegeData" :power1="power"></auditDidalog>

                                    </el-dialog>
                                </template>
                             </el-table-column>
                            <el-table-column prop="date" label="最后更新时间">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.update_time }}</span>
                                    </template>
                            </el-table-column>
                         </el-table>
                            <!-- pagenation -->
                            <div class="block">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="roleList&&roleList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="roleList&&roleList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="roleList&&roleList.total">
                    </el-pagination>
                            </div>
                        </el-col>
                    </el-row>
                </el-main>
            </div>
        
    </div>
</template>
<script>
    import {
        end
    } from "../../../../service/index"
    import {isPermission} from "../../../../common/utils";
    import {
        mapState,
        mapActions
    } from "vuex";
    import numDidalog from '../dialog/numDialog'
    import auditDidalog from '../dialog/auditDialog'
    // import headTop from '../../components/header/head'
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    const sizeOptions = ['300x250', '320x250', '1000x90', '480x320', '1280x720'];
    const typeOptions = ['Banner', 'Video', 'Native'];
    const statusOptions = ['开启', '关闭'];
    export default {
        data() {
            return {
                multipleSelection: [],
                keyWords: "",
                options: [{ //下拉选项
                    value: '0',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '已开启'
                }, {
                    value: '2',
                    label: '已关闭'
                }],
                //角色列表
                roleList: [],
                isLighten: false,
                dialogTableVisible: false,
                dialogTableVisible1: false,
              
                dialogFormVisible: false,
                dialogFormVisible1: false,
                value: "",
                postData:{
                    page:1,
                    pagesize:10
                },
                countData:[],//账户数据
                privilegeData:[],//权限选中的权限数据
                power:[],//所有的权限数据
                showStatus: "",
                confirmBtnCustom: "",
                boxCustomClass: "",
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList(this.postData);

             //获得所有的权限
             end.publicPrivilege().then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        func(data);
                        function func (DD){
                             DD.forEach((item)=>{
                                item.expanded = true;
                                item.checked = false;
                                item.isChecked = false;
                                item.selected = false;
                                if(item.children && item.children.length >0){
                                    func(item.children)
                                }
                             })
                        };
                        data = data.map((item,index)=>{
                            let arr =[];
                            arr.push(item)
                            return arr
                        });
                        this.power = data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: "error"
                        });
                    }
             });
        },
        components: {
            // headTop
            numDidalog,
            auditDidalog,
        },
        computed: {},
        methods: {
            ...mapActions(["setBreadCrumb"]),
            //账户数量弹窗
            countDialog(id){
                
                   end.getAllRoleAccount({
                        id: id
                        }).then(res => {
                            if (res.data.code == 0) {
                                if(res.data && res.data.data.length >0 ){
                                    this.countData = res.data.data;
                                    this.dialogTableVisible1=true;
                                    setTimeout(()=>this.dialogTableVisible = true,300)
                                   
                                }
                                    
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: "error"
                                });
                            }
                    });
            },
            setPermission(val){
                return isPermission(val);
            },
            //权限信息弹窗  获取角色对应的全新信息 roleHave
            privilegeDialog(id){
                this.privilegeData=[];
                end.roleHave({
                    id: id
                    }).then(res => {
                        if (res.data.code == 0) {
                            if(res.data && res.data.data.length >0 ){
                                this.privilegeData = res.data.data;
                                this.dialogFormVisible1=true;
                                setTimeout(()=>this.dialogFormVisible = true,300)
                            }
                                
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: "error"
                            });
                        }
                });
               

            },
            changefilterstate(val){
                if(val == 0){
                    delete this.postData.flag
                }else{
                    this.postData.flag = val;
                }
                this.getList(this.postData);
            },
            createRole() {//创建角色
                this.$router.push({
                     path: "/roleEdit"
                });
            },
            editRole(id) {//创建角色
                this.$router.push({
                     path: "/roleEdit/"+id
                });
            },
            modifyStatus(id,flag) {
                if(flag == 2) {
                    this.showStatus='开启角色后，该角色下的账户将可以正常使用！确认开启？';
                    this.boxCustomClass = 'customOpenFontMore';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='关闭角色后，该角色下所有账户将不能登录系统！确认关闭？';
                    this.boxCustomClass = 'customCloseFontMore';
                    this.confirmBtnCustom = 'close-clicked1';
                }
				
                this.$confirm(this.showStatus, '', {
                    customClass: this.boxCustomClass,
                    confirmButtonText: '确定',
                    confirmButtonClass: this.confirmBtnCustom,
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
                    if(flag ==1){
                        end.flagCloseajax({
                            id: [id]
                            }).then(res => {
                                if (res.data.code == 0) {
                                    this.$message({
                                        message: "操作成功",
                                        type: "success"
                                    });
                                    this.getList(this.postData);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: "error"
                                    });
                                }
                        });
                    }else if(flag == 2){
                        end.flagOpenajax({
                            id: [id]
                            }).then(res => {
                                if (res.data.code == 0) {
                                    this.$message({
                                        message: "操作成功",
                                        type: "success"
                                    });
                                    this.getList(this.postData);
                                } else {
                                    this.$message({
                                        showClose: true,
                                        message: res.data.msg,
                                        type: "error"
                                    });
                                }
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
                
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (this.multipleSelection.length != 0) {
                    this.isLighten = true;
                } else {
                    this.isLighten = false;
                }
            },
            getids() {
                let ids = [];
                for (var j = 0; j < this.multipleSelection.length; j++) {
                    ids.push(this.multipleSelection[j].id);
                }
                return ids;
            },
            open() {

                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('开启角色后，该角色下的账户将可以正常使用！确认开启？', '', {
                    customClass: 'customOpenFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					end.flagOpenajax({
						// ad_id: this.$route.params.id,
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								// message: res.data.msg,
								message: "操作成功",
								type: "success"
							});
							this.getList(this.postData);
						} else {
							 this.loading2 = false;
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: "error"
							});
						}
					});
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消开启'
                    });
                });
            },
            close() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('关闭角色后，该角色下所有账户将不能登录系统！确认关闭？', '', {
                    customClass: 'customCloseFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					end.flagCloseajax({
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							 this.getList(this.postData);
						} else {
							 this.loading2 = false;
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: "error"
							});
						}
					});
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消关闭'
                    });
                });
            },
            del() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('删除角色后，该角色下所有账户同步删除，且不能登录系统！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {	
					end.roleDelect({
						// ad_id: this.$route.params.id,
						// id: "[" + this.getids() + "]"
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								// message: res.data.msg,
								message: "操作成功",
								type: "success"
							});
							this.getList(this.postData);
						} else {
							 this.loading2 = false;
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: "error"
							});
						}
					});
	
				}).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                
            },
            searchDataByName() {
                this.postData.search = this.keyWords;
                this.getList(this.postData);
             
            },
            getList(data) {
                //debugger;
                end.getlistPage(data).then(res => {
                    if (res.data.code == 0) {
                        this.roleList = res.data.data;
                    }
                });
            },
            //创意尺寸
            handleSizeChange(val) {
                this.postData.pageSize = val
                this.getList(this.postData);
            },
            handleCurrentChange(val) {
                //创意列表
                this.postData.page = val
                this.getList(this.postData);
            },
            closeDialogForm(){//关闭对话框
                setTimeout(()=>{
                     this.dialogFormVisible1=false
                     this.dialogFormVisible=false
                },500)
               
            }   
        }
    }
</script>
        
<style lang="scss">
    // @import '../../style/mixin';
    @import '../../../../style/mixin';
    @import '../../../../style/common';
    .role-list-content{
        .el-dialog__body{
            overflow:auto
        }
        .grid-content {
            background-color: #fff;
            position: relative;
        } //rolelist
        .seek-box {
            position: absolute;
            right: 30px;
            top: 20px;
            .el-input {
                width: auto;
            }
        }
        .function-list {
            padding: 20px 0 20px 30px;
            background-color: #fff;
            .el-link-add{
                vertical-align: -3px;
            }
        }
        .el-icon-revise {
            vertical-align: -4px;
            cursor: pointer;
            background: url("../../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            &:hover {
                background: url("../../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .el-table{
            th:first-child,
            td:first-child{
                padding-left: 16px;
            }
            th:nth-child(3),
            td:nth-child(3){
                text-align: center;
            }
        }
        // power msg module start
        // extend class position
        .position-absolute{
            position: absolute;
        }
        .position-relative{
            position: relative;
        }
        // authority msg
        .margin-bottom-10{
            margin-bottom: 10px;
        }
        .border-left{
            border-left: 1px solid #e1e7f0;
            display: block;
            position: absolute;
            top: -10px;
        }
        // pop layer header
            .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
        }
        // pop layer width
        .el-dialog{
            width: 80%;
        }
        .account-info-dialog{
            .el-dialog{
                width: 390px;
            }
        }
        .power-msg{
            height: 500px;
            position: relative;
            font-size: 12px;
            // line
            .border-left-wrap{
                @extend .border-left;
                left: 10px;
                top: 28px;
            }
            .power-msg-item{
                color: #515974;
                width: 100px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 5px;
                border: 1px solid #e1e7f0;
                @extend .margin-bottom-10;
                cursor: pointer;
            }
            .power-active{
                background-color: #bec0cd;
                color: #ffffff;
                border-color: #bec0cd;
            }
            // each class style
            .inferior-class{
                margin-left: 20px;
                @extend .position-relative;
            }
            .third-class{
                margin-left: 30px;
                @extend .position-relative;
                .power-group{
                    padding-left: 10px;
                }
            }
            .fouth-class{
                margin-left: 50px;
                @extend .position-relative;
                .power-group{
                    padding-left: 10px;
                }
            }
            .class-item{
                @extend .position-relative;
                margin-bottom: 10px;
            }
            .last-class{
                @extend .position-relative;
                margin-left: 40px;
            }
            // 横线
            .column{
                @extend .position-absolute;
                width: 10px;
                height: 1px;
                left: -10px;
                top: 14px;
                background-color: #e1e7f0;
            }
        }
    }
    .el-message-box__wrapper{
        .customOpenFontMore,
        .customCloseFontMore,
        .customDeleteFontMore{
            .el-icon-close{
                background: url("../../../../style/image/common/close-icon.svg") 0 0 no-repeat;
            }
            .el-icon-warning{
                background: url("../../../../style/image/common/question_blue.svg") 0 0 no-repeat;
            }
        }
        .customCloseFontMore{
            .el-icon-warning{
                background: url("../../../../style/image/common/question_grey.svg") 0 0 no-repeat;
            }
        }
        .customDeleteFontMore{
            .el-icon-warning{
                background: url("../../../../style/image/common/question_red.svg") 0 0 no-repeat;
            }
        }
    }
</style>