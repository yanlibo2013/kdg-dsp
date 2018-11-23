<template>
    <div class="">

        <el-main>
            <el-row class="role-info-content">
                <el-col :span="24">
                    <div class="grid-content ">
                        <div class="function-list">
                            <a href="" class="single-link">创建角色</a>
                            
        <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
        <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
        <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                        </div>
                        <div class="seek-box">
                            <el-dropdown>
                                <el-button type="primary">
                                全部<i class="el-icon-arrow-down el-icon--down"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>客户1</el-dropdown-item>
                                    <el-dropdown-item>客户2</el-dropdown-item>
                                    <el-dropdown-item>客户3</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="input21">
                            </el-input>
                        </div>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="name" label="角色名称" width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                                <a href="" class="el-icon-revise"></a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="180">
                            <template slot-scope="scope">
                                <el-switch v-model="value3" active-text="关闭" inactive-text="开启">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="num" label="帐户数量" width="180">
                        </el-table-column>
                        <el-table-column prop="authority" label="权限信息" width="180">
                        </el-table-column>
                        <el-table-column prop="date" label="最后更新时间">
                        </el-table-column>
                    </el-table>
                    <!-- pagenation -->
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>

</template>

<script>
    import 'element-ui/lib/theme-chalk/index.css'
    import {
        mapState,
        mapActions
    } from "vuex";
    // import headTop from '../../components/header/head'
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    const sizeOptions = ['300x250', '320x250', '1000x90', '480x320','1280x720'];
    const typeOptions = ['Banner', 'Video', 'Native'];
    const statusOptions = ['开启', '关闭'];
    export default {
        data() {
            return {
                input1: '',
                input21: '',
                value3: '',
                tableData: [{
                    name: '系统管理员',
                    status: '关',
                    num: '17',
                    authority: '10/35',
                    date: '2016-05-02 16:51:08'
                }, {
                    name: '销售',
                    status: '开',
                    num: '17',
                    authority: '10/35',
                    date: '2016-05-02 16:51:08'
                }, {
                    name: '产品',
                    status: '开',
                    num: '17',
                    authority: '10/35',
                    date: '2016-05-02 16:51:08'
                },{
                    name: '运营',
                    status: '开',
                    num: '17',
                    authority: '10/35',
                    date: '2016-05-02 16:51:08'
                }],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                isLighten: false
            }
        },
        mounted() {

        },
        components: {
            // headTop
        },
        computed: {
        },
        methods: {
            ...mapActions(["actionHomeList"]),
            //点击图标刷新页面
            reload() {
                //window.location.reload();
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // buttons light
                if (this.multipleSelection.length != 0) {
                    this.isLighten = true;
                } else {
                    this.isLighten = false;
                }
            }
        }
    }
</script>

        
<style lang="scss">
    @import '../../style/mixin';
    .role-info-content{
        .single-link{
            display: inline-block;
            color: #7f8599;
            background-color: #fff;
            width: 165px;
            height: 38px;
            line-height: 38px;
            border: 1px solid #e3e8f1;
            transition: .1s;
            border-radius: 4px;
            text-align: center;
        }
        .grid-content{
            background-color: #fff;
            position: relative;
        }
        .seek-box{
            position: absolute;
            right: 30px;
            top: 0px;
            .el-input{
                width: auto;
            }
        }
        .el-icon-revise{
            cursor: pointer;
            background: url("../../style/image/role/revise.svg") 0 0 no-repeat;
            height: 19px;
            width: 19px;
            &:hover{
                background: url("../../style/image/role/revise_hover.svg") 0 0 no-repeat;
            }
        }
        .el-switch{
            width: 54px!important;
            height: 22px!important;
        }
        .el-switch__core{
            width: 48px!important;
        }
        .el-switch__label{
            position: absolute;
            z-index: 1;
            color: #b8b8c9;
            &.is-active span{
                color: #fff;
            }
            & *{
                font-size: 12px;
            }
        }
        .el-switch__label--left{
            left: 6px;
        }
        
        .el-switch__label--right{
            right: 6px;
        }
        .function-list{
            margin:20px 0 20px 30px;
        }
        .el-pagination{
            margin:34px 0 25px 20px;
        }
        .el-table{
            th:nth-child(4),
            td:nth-child(4){
                text-align: center;
            }
        }
    }
    
    </style>