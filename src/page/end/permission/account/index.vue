<template>
    <div class="">
        <el-main>
            <el-row class="audit-list-content border-bottom-2">
                <el-col :span="24">
                    <div class="grid-content ">
                        <div class="function-list">
                            <a href="javascript:void(0);" class="single-link el-link-add" @click="create" v-show="setPermission(44)">
                                <i class="add-iron">+</i>
                                <span class="add-msg">创建帐号</span>
                            </a>

            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open" v-show="setPermission(46)">开启</el-button>
            <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close" v-show="setPermission(46)">关闭</el-button>
            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del" v-show="setPermission(47)">删除</el-button>
                        </div>
                        <div class="seek-box">
                            <el-select v-model="flagValue" placeholder="请选择" @change="filterStatus(flagValue)">
                                <el-option v-for="item in options" :key="item.value" :label="item.flag" :value="item.value">
                                </el-option>
                            </el-select>

                            <div class="el-input el-input--prefix">
                                <input autocomplete="off" placeholder="请输入关键词" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keyWords" @keyup="searchDataByName" />
                                <span class="el-input__prefix">
                                    <i class="el-input__icon el-icon-search"></i>
                                </span>
                                
                                <span class="el-input__prefix custom__close" v-show="clearIt">
                                    <span class="el-input__prefix-inner">
                                        <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearInput"></i>
                                    </span>
                                </span>
                            </div>

                        </div>
                    </div>
                    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="帐户名">
                            <template slot-scope="scope">
                                        <span>{{ scope.row.email }}</span>
                                        <a href="javascript:void(0);" class="el-icon-revise" @click="modify(scope.row.id)" v-show="setPermission(44)"></a>
</template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态">
<template slot-scope="scope">
<el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.flag)">
</el-switch>
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="姓名">
<template slot-scope="scope">
<span>{{ scope.row.name }}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="联系电话">
<template slot-scope="scope">
<span>{{ scope.row.tel }}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="角色">
<template slot-scope="scope">
<span>{{ scope.row.role_id}}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="authority" label="客户信息">
<template slot-scope="scope">
<a href="javascript:void(0);" class="link-jump" @click="customeInfo(scope.row.id)">{{ scope.row.count }}</a>
        <el-dialog class="advertiseList" title="客户信息详情" 
        :show-close="true" :visible.sync="advertiseVisible">
            <el-table :data="auditList" style="width: 100%;border:1px solid #e1e7f0;" cellpadding="0"cellspacing="1">
                <el-table-column label="广告主">
                    <template prop="name" slot-scope="scope">
                        {{scope.row.com_name}}
                    </template>
                </el-table-column>
                <el-table-column label="公司简称">
                    <template prop="simplename" slot-scope="scope">
                        {{scope.row.brand}}
                    </template>
                </el-table-column>
                
            </el-table>
        </el-dialog>
</template>
                            </el-table-column>
                            <el-table-column prop="date" label="最后更新时间" width="95">
<template slot-scope="scope">
<span>{{ scope.row.update_time }}</span>
</template>
                            </el-table-column>
                        </el-table>
                        <!-- pagenation -->
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page="list&&list.current_page" :page-sizes="[10, 20, 30, 40]" 
                :page-size="list&&list.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                :total="list&&list.total">
                </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </div>
    
</template>

<script>
    import {
        end,
        home
    } from "../../../../service/index"
    import {isPermission} from "../../../../common/utils";
    import {
        mapState,
        mapActions
    } from "vuex";
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
                options: [{ //请选择客户
                    value: 0,//不要传值给后台
                    flag: '请选择'
                }, {
                    value: 1,
                    flag: '开启'
                }, {
                    value: 2,
                    flag: '关闭'
                }],
                flagValue: "",
                //列表
                list: [],
                isLighten: false,
                clearIt: false,//清空图标是否显示
                // 弹出层显示广告主
                advertiseVisible: false,
                auditList:[{ //请选择客户
                    name: '',
                    simplename: ''
                }],
                showStatus: "",
                confirmBtnCustom: "",
                boxCustomClass: "",
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            this.getList({
                page: 1,
                pagesize: 10
            });
        },
        components: {
            // headTop
        },
        computed: {},
        methods: {
            ...mapActions(["setBreadCrumb"]),
            clearInput() {
                this.clearIt = false;
                this.keyWords = "";
                this.getList({
                    page: 1,
                    pagesize: 10,
                    search: this.keyWords
                });

            },
            setPermission(val){
                return isPermission(val);
            },
            customeInfo(val) {
                home.publicAdvertiserInfo({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.auditList = res.data.data;
                        console.log(this.auditList);
                        this.advertiseVisible = true;
                    }
                })
            },
            filterStatus(val) {
                let data = {};
                data.page = 1;
                data.pagesize = 10;
                if(val != '0') {
                    data.flag = val;
                }
                this.getList(data);
            },
            modifyStatus(val, flag) {
                console.log(flag);
                if(flag == 2) {
                    this.showStatus='开启账户后，用户可用此账户进行登录！确认开启？';
                    this.boxCustomClass = 'customOpenFontMore';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='关闭账户后，该账户不能再登录系统！确认关闭？';
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
					if (flag == 1) {
						end.adminFlagCloseajax({
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
									page: this.list.current_page,
									flag: this.flagValue,
									pagesize: 10,
								});
							} else {
								this.$message({
									showClose: true,
									message: res.data.msg,
									type: "error"
								});
							}
						});
					}else{
						end.adminFlagOpenajax({
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
									page: this.list.current_page,
									flag: this.flagValue,
									pagesize: 10,
								});
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
                console.log(val);
                // buttons light
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('开启账户后，用户可用此账户进行登录！确认开启？', '', {
                    customClass: 'customOpenFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					end.adminFlagOpenajax({
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
                            this.getList({
                                page: this.list.current_page,
                                flag: this.flagValue,
                                pagesize: 10,
                            });
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }

                this.$confirm('关闭账户后，该账户不能再登录系统！确认关闭？', '', {
                    customClass: 'customCloseFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					end.adminFlagCloseajax({
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getList({
								page: this.list.current_page,
								flag: this.flagValue,
								pagesize: 10,
							});
						} else {
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
                if (this.getids().length == 0) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }

                this.$confirm('删除账户后，将一同删除账户资料，且该账户不能再登录系统！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {	
					end.adDelect({
						id: this.getids()
					}).then(res => {
						if (res.data.code == 0) {
							this.loading2 = false;
							this.$message({
								message: "操作成功",
								type: "success"
							});
							this.getList({
								page: this.list.current_page,
								pagesize: 10,
							});
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
                this.keyWords? this.clearIt = true: this.clearIt = false;
                this.getList({
                    page: 1,
                    pagesize: 10,
                    search: this.keyWords
                });
            },
            getList(data) {
                // end.customeList(data).then(res => {
                end.adminGetlistPage(data).then(res => {
                    if (res.data.code == 0) {
                        this.list = res.data.data;
                    }
                });
            },
            //创意尺寸
            handleSizeChange(val) {
                this.pageSize = val;
                //创意列表
                this.getList({
                    page: 1,
                    pagesize: this.pageSize
                });
            },
            handleCurrentChange(val) {
                //创意列表
                let data = {};
                data.page = val;
                data.pagesize = this.pageSize;
                if(this.flagValue!=0) {
                    data.flag = this.flagValue;
                }
                this.getList(data);
            },
            //创意列表全选
            handleCheckAllChange(val) {
                this.checkedSizes = val ? sizeOptions : [];
                this.checkedTypes = val ? typeOptions : [];
                this.checkedStatuss = val ? statusOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedSizesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizes.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.sizes.length;
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.types.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.types.length;
            },
            handleCheckedStatussChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statuss.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.statuss.length;
            },
            create() {
                this.$router.push({
                    path: "/accountcreate"
                });
            },
            modify(val) {
                this.$router.push({
                    path: "/accountedit/" + val
                });
            }
        }
    }
</script>

        
<style lang="scss">
    @import '../../../../style/mixin';
    
    .audit-list-content{
        background-color: #fff;
        .single-link {
            display: inline-block;
            color: #7f8599;
            background-color: #fff;
            width: 165px;
            height: 38px;
            line-height: 38px;
            transition: .1s;
            border-radius: 4px;
            text-align: center;
        }//rolelist
        .path {
            height: 72px;
            line-height: 72px;
            a,
            i {
                @include sc(18px,
                #a5a6bb);
                float: left;
            }
            i {
                margin: 0 10px;
            }
            span {
                vertical-align: top;
            }
        }
        .grid-content {
            position: relative;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 0px;
            .el-input {
                width: auto;
                margin-left: 7px;
            }
        }
        .el-icon-revise {
            cursor: pointer;
            margin-left: 20px;
            background: url("../../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            vertical-align: -4px;
            &:hover {
                background: url("../../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .function-list {
            margin: 20px 0 20px 30px;
            .single-link{
                width: 115px;
                vertical-align: -3px;
                margin-right: 9px;
            }
            .add-iron{
                font-size: 22px;
            }
            .add-msg{
                vertical-align: 3px;
                margin-left: -8px;
                color: #6cabff;
            }
            .el-button+.el-button{
                margin-left: 6px;
            }
        }
        .el-table{
            span{
                color: #515974;
            }
            th:first-child,
            td:first-child{
                padding-left: 16px;
                .cell{
                    padding-right: 0;
                }
            }
            th:nth-child(2),
            td:nth-child(2),
            th:nth-child(3),
            td:nth-child(3){
                text-align: center;
            }
            th:nth-child(4),
            td:nth-child(4){
                padding-left: 30px;
            }
            th:last-child,
            td:last-child{
                text-align: left;

            }
        }
        .block .el-pagination{
            padding: 30px;
        }
        // 弹出层样式
        .advertiseList{
            .el-dialog{
                width: 600px;
            }
            .el-dialog__header{
                border-bottom: 1px solid #f3f5f9;
            }
            .el-dialog__body{
                padding: 20px 30px 27px;
            }
            .remove-border{
                height: 0;
                background-color: #fff;
            }
            .el-table{
                &::before{
                    @extend .remove-border;
                }
                border-radius: 5px;
                th,
                td{
                    background-color: #fff;
                    padding: 6px 0 6px 30px;
                    border: 0 none;
                }
                th .cell{
                    color: #7f8599;
                }
                th:nth-child(2){
                    text-align: left;
                }
            }
            .el-table--border::after,
            .el-table--group::after{
                @extend .remove-border;
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