<template>
    <div class="">
        <el-main>
            <el-row class="media-list-content">
                <el-col :span="24" class="border-bottom-2">
                    <div class="media-module-hd ">
                        <div class="function-list" style="min-height:78px">
                            <a href="javascript:void(0);" class="single-link el-link-add" @click="edit('')" v-show="setPermission(30)">
                                <i class="add-iron" >+</i>
                                <span class="add-msg" >创建媒体</span>
                            </a>
                            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open" v-show="setPermission(32)">开启</el-button>
                            <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close" v-show="setPermission(32)">关闭</el-button>
                            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del" v-show="setPermission(33)">删除</el-button>
                        </div>
                        <div class="seek-box">
                            <!-- <el-select v-model="value" placeholder="请选择">
                                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                        </el-option>
                                                    </el-select> -->
                            <!-- <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" 
                             clearable>
                            </el-input> -->

                            <div class="el-input el-input--prefix">

                                <input autocomplete="off" placeholder="请输入关键词" prefixicon="el-icon-search" 
                                v-model="keyWords" @keyup="searchDataByName" clearable="true" class="el-input__inner">
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
                                                <el-table-column prop="media_name" label="媒体ID" width="85">
                            <template slot-scope="scope">
                                        <span>
                                            {{ scope.row.media_id }}
                                            </span>
                                                       
</template>
                            </el-table-column>
                        <el-table-column prop="media_name" label="媒体名称" width="180">
                            <template slot-scope="scope">
                                            <span :title="scope.row.name" style="display:inline-block;width:120px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;"><a class="link-jump" href="javascript:void(0);" @click="goRelation(scope.row.id)">{{ scope.row.name }}</a></span>
                                            <a href="javascript:void(0);" class="el-icon-revise" @click="edit(scope.row.id)" v-show="setPermission(30)"></a>
                            </template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="110">
<template slot-scope="scope">
    <el-switch v-model='scope.row.flag==1?true:false' active-text="关闭" inactive-text="开启" 
    @change="modifyStatus(scope.row.id,scope.row.flag)">
    </el-switch>
</template>
                            </el-table-column>
                                                        <el-table-column prop="num" label="包名">
<template slot-scope="scope">
    <span>Andriod:{{ scope.row.package_A }}</span>
    <br>
     <span>IOS:{{ scope.row.package_I!="undefined"?scope.row.package_I:"" }}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="接入方式">
                                
<template slot-scope="scope">
    <span>{{ scope.row.accpet_type }}</span>
</template>
                            </el-table-column>
                                                        <el-table-column prop="num" label="损耗系数" width="90">
<template slot-scope="scope">
    <span>{{ scope.row.media_no }}</span>
</template>
                            </el-table-column>
                                                                                    <el-table-column prop="num" label="媒体类型">
<template slot-scope="scope">
    <span>{{ scope.row.media_category }},{{ scope.row.media_category_sed }}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="sources_type_name" label="审核规范">
<template slot-scope="scope">
    <!-- <span>{{ scope.row.path_name }}</span> -->
     <a :href="scope.row.path">{{ scope.row.path_name }}</a>
</template>
                            </el-table-column>
                            <el-table-column prop="date" label="最后更新时间" width="120">
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
        meadia
    } from "../../../service/index"
    import {isPermission} from "../../../common/utils";
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
                    value: '选项1',
                    label: '客户1'
                }, {
                    value: '选项2',
                    label: '客户2'
                }, {
                    value: '选项3',
                    label: '客户3'
                }],
                //列表
                list: [],
                isLighten: false,
                clearIt: false,
                currentPage:"",
                pageSize:10,
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
            goRelation(val){
                this.$router.push({
                    path: "/advertise/"+val
                });

            },
             setPermission(val){
                return isPermission(val);
            },
            modifyStatus(val, flag) { //改变状态
                // console.log(flag);
                if(flag == 2) {
                    this.showStatus='媒体开启后，可在该媒体正常投放！确认开启？';
                    this.boxCustomClass = 'customOpenFontMore';
                    this.confirmBtnCustom = 'el-button--confirm';
                } else {
                    this.showStatus='媒体关闭后，将不能在该媒体进行投放！确认关闭？';
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
                    if (flag!=1) {
                        meadia.bidMeadiaOpen({
                            id: [val]
                        }).then(res => {
                            if (res.data.code == 0) {
                                this.loading2 = false;
                                this.$message({
                                    message: "操作成功",
                                    type: "success"
                                });
                                this.getList({
                                    page: this.currentPage,
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

                            if (res.data.code == -1) {
                            this.$router.push({
                                path: "/login"
                            });
                        }
                    });
                } else {
                    meadia.bidMeadiaClose({
                        id: [val]
                    }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
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
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                });

               
                //closeMeadia
                // end.flagCloseajax({
                //     // ad_id: this.$route.params.id,
                //     // id: "[" + val + "]"
                //     id: [val]
                // }).then(res => {
                //     if (res.data.code == 0) {
                //         //this.loading2 = false;
                //         this.$message({
                //                message: "操作成功",
                //             type: "success"
                //         });
                //         this.getList({
                //             page: 1,
                //             pagesize: 10,
                //         });
                //     } else {
                //         this.$message({
                //             showClose: true,
                //             message: res.data.msg,
                //             type: "error"
                //         });
                //     }
                // });
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
            edit(val) {
                if (!val) {
                    this.$router.push({
                        path: "/meadiaeditbid"
                    });
                } else {
                    this.$router.push({
                        path: "/meadiaeditbid/" + val
                    });
                }
            },
            open() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.$confirm('媒体开启后，可在该媒体正常投放！确认开启？', '', {
                    customClass: 'customOpenFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'el-button--confirm',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {

					meadia.bidMeadiaOpen({
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
                this.$confirm('媒体关闭后，将不能在该媒体进行投放！确认关闭？', '', {
                    customClass: 'customCloseFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'close-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {
					meadia.bidMeadiaClose({
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
                this.$confirm('媒体删除后，将不能在该媒体进行投放！确认删除？', '', {
                    customClass: 'customDeleteFontMore',
                    confirmButtonText: '确定',
                    confirmButtonClass: 'delete-clicked1',
                    cancelButtonText: '取消',
                    cancelButtonClass: 'el-button--cancel',
                    type: 'warning'
                }).then(() => {	
					meadia.bidMeadiaDel({
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

						  if (res.data.code == -1) {
							this.$router.push({
								path: "/login"
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
            clearInput() {
                this.clearIt = false;
                this.keyWords = "";
                this.getList({
                    page: 1,
                    pagesize: 10,
                    searchname: this.keyWords
                });

            },
            searchDataByName() {
                this.keyWords? this.clearIt = true: this.clearIt = false;
                this.getList({
                    page: 1,
                    pagesize: 10,
                    searchname: this.keyWords
                });
            },
            getNameById(id, obj) { //通过获得name  7,8,9
                if (!id) {
                    return
                }
                let name = "";
                let idAry = id.split(",");
                for (var i = 0; i < idAry.length; i++) {
                    for (var attr in obj) {
                        if (attr == idAry[i]) {
                            if (i == idAry.length - 1) { //最后一项  
                                name += obj[attr]
                            } else {
                                name += obj[attr] + ",";
                            }
                            break;
                        }
                    }
                }
                return name;
            },
            getList(data) {
                let that = this;
                meadia.meadiaListbid(data).then(res => {
                    if (res.data.code == 0) {
                        this.list = res.data.data;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
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
                this.getList({
                    page: val,
                    pagesize: this.pageSize
                });

                this.currentPage=val;
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
            }
        }
    }
</script>

        
<style lang="scss">
    @import '../../../style/mixin';
    @import '../../../style/common';
    .media-list-content {
        .media-module-hd {
            position: relative;
        }
        .el-col-24 {
            background-color: #fff;
        }
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
            .el-link-add {
                vertical-align: -3px;
            }
        }
        .el-icon-revise {
            vertical-align: -4px;
            cursor: pointer;
            background: url("../../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            &:hover {
                background: url("../../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .el-table {
            .el-table-column--selection .cell{
                padding: 0;
            }
            th:first-child,
            td:first-child {
                padding: 0 0 0 30px;
            }
            th:nth-child(2),
            td:nth-child(2),
            th:nth-child(3),
            td:nth-child(3),
            th:nth-child(5),
            td:nth-child(5),
            th:nth-child(4),
            td:nth-child(4) {
                text-align: center;
            }
            // th:nth-child(4),
            // td:nth-child(4) {
            //     padding-left: 30px;
            // }
            th:last-child,
            td:last-child {
                text-align: left;
                padding-right: 30px;
            }
        }
        .block .el-pagination {
            padding: 30px;
        }

          .link-jump{
            color: #6cabff;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .el-message-box__wrapper{
        .customOpenFontMore,
        .customCloseFontMore,
        .customDeleteFontMore{
            .el-icon-close{
                background: url("../../../style/image/common/close-icon.svg") 0 0 no-repeat;
            }
            .el-icon-warning{
                background: url("../../../style/image/common/question_blue.svg") 0 0 no-repeat;
            }
        }
        .customCloseFontMore{
            .el-icon-warning{
                background: url("../../../style/image/common/question_grey.svg") 0 0 no-repeat;
            }
        }
        .customDeleteFontMore{
            .el-icon-warning{
                background: url("../../../style/image/common/question_red.svg") 0 0 no-repeat;
            }
        }
    }
</style>