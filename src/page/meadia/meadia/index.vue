<template>
    <div class="">
        <el-main>
            <el-row class="media-list-content">
                <el-col :span="24" class="border-bottom-2">
                    <div class="media-module-hd ">
                        <div class="function-list">
                            <a href="javascript:void(0);" class="single-link el-link-add" @click="edit('')"><i class="add-iron" >+</i>创建媒体</a>
                            
            <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
            <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
            <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
            
                        </div>
                        <div class="seek-box">
                            <!-- <el-select v-model="value" placeholder="请选择">
                                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                                    </el-option>
                                                </el-select> -->
                            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="keyWords" @change="searchDataByName" clearable>
                            </el-input>
                        </div>
                    </div>
                    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="媒体名称" width="180">
                            <template slot-scope="scope">
                                                                                                                                                                                        <span>{{ scope.row.name }}</span>
                                                                                                                                                                                        <a href="javascript:void(0);" class="el-icon-revise" @click="edit(scope.row.id)"></a>
</template>
                            </el-table-column>
                            <el-table-column prop="status" label="状态" width="180">
<template slot-scope="scope">
<el-switch v-model='scope.row.Iconflag' active-text="关闭" inactive-text="开启" @change="modifyStatus(scope.row.id,scope.row.Iconflag)">
</el-switch>
</template>
                            </el-table-column>
                            <el-table-column prop="num" label="接入类型" width="180">
<template slot-scope="scope">
<span>{{ scope.row.accpet_type }}</span>
</template>
                            </el-table-column>
                            <el-table-column prop="sources_type_name" label="资源类型" width="180">

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
                isLighten: false
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
            modifyStatus(val,flag) {//改变状态
                console.log(flag)
                if(flag){
                       meadia.openMeadia({
                        id: [val]
                        }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: 1,
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
                     meadia.closeMeadia({
                        id: [val]
                        }).then(res => {
                        if (res.data.code == 0) {
                            this.loading2 = false;
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.getList({
                                page: 1,
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
                        path: "/meadiaedit"
                    });
                } else {
                    this.$router.push({
                        path: "/meadiaedit/" + val
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
                meadia.openMeadia({
                    // ad_id: this.$route.params.id,
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            page: 1,
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
            },
            close() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                meadia.closeMeadia({
                    // ad_id: this.$route.params.id,
                    // id: "[" + this.getids() + "]"
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            page: 1,
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
            },
            del() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                meadia.delMeadia({
                    // ad_id: this.$route.params.id,
                    // id: "[" + this.getids() + "]"
                    id: this.getids()
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getList({
                            page: 1,
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
            },
            searchDataByName() {
                this.getList({
                    page: 1,
                    pagesize: 10,
                    searchname: this.keyWords
                });
            },
             getNameById(id,obj){//通过获得name  7,8,9
                if(!id){
                    return
                }
                let name = "";
                let idAry = id.split(",");
                for(var i=0;i<idAry.length;i++){
                    for(var attr in obj){
                        if(attr == idAry[i]){
                            if(i == idAry.length-1){//最后一项  
                                name += obj[attr]
                            }else{
                                name += obj[attr] + "," ;
                            }
                            break;
                        }
                   }
                }
                
                return name;
             },
            getList(data) {
                let that = this;
                meadia.getMeadiaList(data).then(res => {
                    if (res.data.code == 0) {
                        res.data.data.list.data.forEach(function(item,index){
                             item.sources_type_name = that.getNameById(item.sources_type,res.data.data.source_type_lists)

                            if(item.flag ==1){
                                item.Iconflag = true;
                            }else if(item.flag == 2){
                                item.Iconflag = false;
                            }

                            })
                        this.list = res.data.data.list;
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
    .media-list-content{
        .media-module-hd {
            position: relative;
        }
        .el-col-24{
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
            .el-link-add{
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
        .el-table{
            th:first-child,
            td:first-child{
                padding-left: 16px;
            }
            th:nth-child(2),
            td:nth-child(2),
            th:nth-child(3),
            td:nth-child(3),
            th:nth-child(5),
            td:nth-child(5){
                text-align: center;
            }
            th:nth-child(4),
            td:nth-child(4){
                padding-left: 30px;
            }
            th:last-child,
            td:last-child{
                text-align: right;
                padding-right: 30px;
            }
        }
        .block .el-pagination{
            padding: 30px;
        }
    }
</style>