<template>
    <div>
        <!-- 创意列表 -->
        <div class="creative-origin-list">
            <el-main>
                <el-row class="creative-origin-content">
                    <el-col :span="24">
                        <div class="template-hd">筛选项</div>
                        <div class="creative-param">
                            <div class="creative-nav-row c-size clear">
                                <span class="hd left">创意尺寸：</span>
                                <div class="bd">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                    <el-checkbox-group v-model="checkedSizes" @change="handleCheckedSizesChange">
                                        <el-checkbox v-for="size in sizes" :label="size" :key="size">{{size}}</el-checkbox>
                                    </el-checkbox-group>
                                    <span class="fold-iron"></span>
                                </div>
                            </div>
                            <div class="creative-nav-row c-type clear">
                                <span class="hd left">创意类型：</span>
                                <div class="bd">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                    <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
                                        <el-checkbox v-for="type in types" :label="type" :key="type">{{type}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                            <div class="creative-nav-row c-status clear">
                                <span class="hd left">创意状态：</span>
                                <div class="bd">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                    <el-checkbox-group v-model="checkedStatuss" @change="handleCheckedStatussChange">
                                        <el-checkbox v-for="status in statuss" :label="status" :key="status">{{status}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                        <div class="creative-btn-control">
                            <div class="input-plan-box">
                                <el-button class="mould-name" type="new" @click="dialogFormVisible = true"><i class="add-iron">+</i>添加创意</el-button>
                                <el-dialog title="添加创意" :visible.sync="dialogFormVisible">
                                </el-dialog>
                                <el-button type="click" :class="{'open-clicked1':isLighten}" @click="open">开启</el-button>
                                <el-button type="click" :class="{'close-clicked1':isLighten}" @click="close">关闭</el-button>
                                <el-button type="click" :class="{'delete-clicked1':isLighten}" @click="del">删除</el-button>
                                <el-button type="click" :class="{'expose-clicked1':isLighten}" @click="reviseExpose">修改曝光监测</el-button>
                                <el-button type="click" :class="{'expose-clicked1':isLighten}" @click="reviseClick">修改点击监测</el-button>
                            </div>
                            <div class="seek-box">
                                <el-select v-model="value" placeholder="全部">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <el-table :data="creatNewList.data" style="width: 100%">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="file_path" label="创意预览">
                                <template slot-scope="scope">
                                            <img class="theme-pic" :src="scope.row.file_path" style="width: 60px;height: 60px" alt="" />
</template>
                        </el-table-column>
                         <!-- v-for="item,index in creatNewList.data" -->
                        <el-table-column prop="name" label="创意主题">
<template slot-scope="scope">
    <el-input v-model="scope.row.name" placeholder="请输入内容">
    </el-input>
</template>
                        </el-table-column>
                        <el-table-column prop="flag" label="状态">
<template slot-scope="scope">
    <el-switch v-model="scope.row.flag==1?true:false" @change="singleswitch(scope.row)" active-text="关闭" inactive-text="开启">
    </el-switch>
</template>
                        </el-table-column>
                        <el-table-column prop="size" label="尺寸">
<template slot-scope="scope">
     {{scope.row.width}}X{{scope.row.height}}
</template>
                        </el-table-column>
                        <el-table-column prop="family" label="类型">
<template slot-scope="scope">
     {{scope.row.type}}
</template>
                        </el-table-column>
                        <el-table-column prop="file_type" label="创意类型">
<template slot-scope="scope">
     {{scope.row.file_type}}
</template>
                        </el-table-column>
                        <el-table-column prop="link_type" label="打开类型">
<template slot-scope="scope">
    <!-- link_type 判断1:H5,2:App下载,3:应用直达，用中文显示 -->
    <div class="cell" v-if="scope.row.link_type=='1'">H5</div>
    <div class="cell" v-if="scope.row.link_type=='2'">App下载</div>
    <div class="cell" v-if="scope.row.link_type=='3'">应用直达</div>
</template>

                        </el-table-column>
                        
                        <el-table-column prop="landing_page,deep_link,link_type" label="点击跳转地址">
                            
<template slot-scope="scope">
    <!-- 1-H5   只有 landing_page 
                    2-App landing_page 为 Android地址
                        deep_link  为Ios地址
                            3-应用直达: 
                        landing_page Android 的 json {landing_page:Android跳转地址;deep_link:Android唤起地址}
                        deep_link ios的json {landing_page:ios跳转地址;deep_link:ios唤起地址}                    -->
    <!-- H5地址：landing_page   下载地址：deep_link -->
    <div class="address-row" v-if="scope.row.link_type==1">
        <span class="add-hd">H5地址：{{scope.row.landing_page}}</span>
    </div>
    <div class="address-row" v-else-if="scope.row.link_type==2">
        <span class="add-hd">android地址：{{scope.row.landing_page}}</span>
        <span class="add-hd">ios地址：{{scope.row.deep_link}}</span>
    </div>
    <div class="address-row" v-else-if="scope.row.link_type==3">
        <span class="add-hd">android地址：{{scope.row.landing_page}}</span>
    </div>
</template>
                            
                        </el-table-column>
                        <el-table-column prop="landing_page,deep_link" label="第三方监测地址">
<template slot-scope="scope">
    <!-- 1：landing_page-H5有这个,如果APP的话，2：landing-page是anroid ，deep_link是IOS的，3 landing_page是android的到达地址和（落地页：就是唤醒地址） deep_link是IOS的。你返回的是JSON串，是否需要改？有两个下标，分别是;landing_page和deep_link . landing_page是起始页，deep_link是 -->
    <div class="address-row" v-if="scope.row.deep_link">
        <!-- deep_link--判断一下,H5没有下载地址，有链接地址 -->
        <span class="add-hd">点击监测</span>
        <!-- <el-input type="textarea" autosize placeholder="请输入内容" :value="aaa"></el-input> -->
        <!-- <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2">{{scope.row.deep_link}}</el-input> -->
    </div>
    <div class="address-row" v-else-if="scope.row.landing_page">
        <span class="add-hd">曝光监测</span>
        <el-input type="textarea" v-model="scope.row.landing_page" autosize placeholder="请输入内容"></el-input>
    </div>
    <div class="address-row" v-else-if="scope.row.deep_link&&scope.row.landing_page">
        <span class="add-hd">点击监测</span>
        <el-input type="textarea" v-model="scope.row.landing_page" autosize placeholder="请输入内容"></el-input>
        <span class="add-hd">曝光监测</span>
        <el-input type="textarea" v-model="scope.row.deep_link" autosize placeholder="请输入内容"></el-input>
    </div>
    <div class="address-row" v-else>
        <a href="" class="single-link el-link-add"><i class="add-iron">+</i>曝光监测</a>
        <a href="" class="single-link el-link-add"><i class="add-iron">+</i>点击监测</a>
    </div>
</template>
                        </el-table-column>

                        <el-table-column prop="create_time" label="上传日期">
<template slot-scope="scope">
     {{scope.row.create_time}}
</template>
                        </el-table-column>
                    </el-table>
                    
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                        :current-page="creativelist&&creativelist.current_page" :page-sizes="[10, 20, 30, 40]" 
                        :page-size="creativelist&&creativelist.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                        :total="creativelist&&creativelist.total">
                        </el-pagination>

                    </div>
                </el-col>
            </el-row>

        </el-main>
    </div>
    </div>
</template>

<script>
    import 'element-ui/lib/theme-chalk/index.css'
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        home,
        put
    } from "../../service/index";
    import addcreate from "./dialog/addcreate.vue";
    import headTop from '../../components/header/head'
    import store from 'store';
    // import {cityGuess, hotcity, groupcity} from '../../service/getData'
    const sizeOptions = ['300x250', '320x250', '1000x90', '480x320', '1280x720'];
    const typeOptions = ['Banner', 'Video', 'Native'];
    const statusOptions = ['开启', '关闭'];
    export default {
        data() {
            return {
                loading2: false,
                isIndeterminate: true,
                sourceData: [], //关联table
                creatNewList: [],
                multipleSelection: [],
                input1: '',
                input21: '',
                value3: '',
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                checkAll: false, //创意列表全选
                checkedSizes: ['上海', '北京'],
                checkedTypes: ['上海', '北京'],
                checkedStatuss: ['上海', '北京'],
                sizes: sizeOptions,
                types: typeOptions,
                statuss: statusOptions,
                isIndeterminate: true,
                checkedType: ['aa', 'bb'],
                types: typeOptions,
                input: '',
                textarea2: '',
                tableData2: [{
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
                }, {
                    name: '运营',
                    status: '开',
                    num: '17',
                    authority: '10/35',
                    date: '2016-05-02 16:51:08'
                }],
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
                value: '',
                dialogVisible: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '74px',
                input10: '',
                isLighten: false
            }
        },
        mounted() {
            // if (store.get("user")) {
            //     this.getCurrentUser(store.get("user"));
            // }
            put.creativelistPage().then(res => {
                let _this = this;
                if (res.data.code == 0) {
                    _this.creatNewList = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            put.creativelistPage({
                page: 1,
                pagesize: 10,
                flag: 1,
                ad_id: this.$route.params.id
            }).then(res => {
                this.creativelistPage(res.data.data);

                  if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
            });;
            this.getcreativelist({
                page: 1,
                pagesize: 10,
                // flag: "1",
                ad_id: this.$route.params.id
            });
            this.setBreadCrumb(this.$route.path.replace("/", ""));
        },
        components: {
            headTop,
            addcreate
        },
        computed: {
            ...mapState({
                creativelist: "creativelist"
            })
        },
        methods: {
            ...mapActions([
                "creativelistPage",
                "setBreadCrumb",
                "getCurrentUser"
            ]),
            go() {
                this.$router.push({
                    path: "/createplan/" + this.$route.params.id
                });
            },
            getcreativelist(data) {
                put.creativelistPage(data).then(res => {
                    // debugger;
                    this.creativelistPage(res.data.data);

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            show() {
                this.showDialog("addcreate");
                this.dialogFormVisible = true;
            },
            //点击图标刷新页面
            reload() {
                //window.location.reload();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // buttons light
                if (this.multipleSelection.length != 0) {
                    this.isLighten = true;
                } else {
                    this.isLighten = false;
                }
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
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.sizes.length;
            },
            handleCheckedTypesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.types.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.types.length;
            },
            handleCheckedStatussChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.statuss.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.statuss.length;
            },
            submitUpload() { //请选择客户
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            singleswitch(rows) {
                // console.log("singleswitch");
                // console.log(rows);
                this.loading2 = true;
                // debugger;
                put.campflagCloseajax({
                    ad_id: this.$route.params.id,
                    id: "[" + rows.id + "]"
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getplanlist({
                            page: 1,
                            pagesize: 10,
                            // flag: "1",
                            ad_id: this.$route.params.id
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
            },
            //计划列表
            open() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.loading2 = true;
                put.campflagOpenajax({
                    ad_id: this.$route.params.id,
                    id: "[" + this.getids() + "]"
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getplanlist({
                            page: 1,
                            pagesize: 10,
                            // flag: "1",
                            ad_id: this.$route.params.id
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
            },
            close() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.loading2 = true;
                put.campflagCloseajax({
                    ad_id: this.$route.params.id,
                    id: "[" + this.getids() + "]"
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getplanlist({
                            page: 1,
                            pagesize: 10,
                            // flag: "1",
                            ad_id: this.$route.params.id
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
            },
            del() {
                if (!this.getids()) {
                    this.$message({
                        message: '请选择操作记录',
                        type: 'warning'
                    });
                    return;
                }
                this.loading2 = true;
                put.campcampDelect({
                    ad_id: this.$route.params.id,
                    id: "[" + this.getids() + "]"
                }).then(res => {
                    if (res.data.code == 0) {
                        this.loading2 = false;
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.getplanlist({
                            page: 1,
                            pagesize: 10,
                            // flag: "1",
                            ad_id: this.$route.params.id
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
            },
            reviseExpose() {},
            reviseClick() {},
            getids() {
                let ids = [];
                // debugger;
                for (var j = 0; j < this.multipleSelection.length; j++) {
                    ids.push(this.multipleSelection[j].id);
                }
                return ids.toString();
            }
        }
    }
</script>
<style lang="scss">
    @import '../../style/mixin'; // 创意列表-共用样式
    .creative-origin-list {
        .el-main {
            background-color: #fbfbfb;
            .template-hd,
            .creative-param,
            .native-list-bd,
            .creative-btn-control {
                background-color: #fff;
            }
        }
        .choose-ad {
            font-size: 14px;
            color: #515974;
            margin-right: 5px;
        }
        .creative-nav-row {
            padding: 15px 0;
            position: relative;
        }
        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 10px;
            right: 30px;
            height: 28px;
            width: 39px;
            padding-left: 4px;
            @include borderRadius(5px);
            @include svgbg("../../style/image/common/down_arrow_fold_white.svg");
            background-position: center center;
        }
        .el-checkbox {
            float: left;
            margin-right: 21px;
        }
        .creative-btn-row {
            position: relative;
            padding: 10px 0;
        }
        .search-input {
            position: absolute;
            width: 182px;
            right: 0px;
            top: 0px;
        }
        .theme-pic {
            width: 60px;
            height: 60px;
        }
        .template-hd {
            padding: 17px 0 18px 30px;
            border-bottom-width: 1px;
        }
        .el-checkbox__label {
            color: #515974;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #7f8599;
        }
        .creative-param {
            padding: 9px 0 10px 30px;
            border-bottom: 2px solid #e1e7f0;
            span {
                font-size: 12px;
                line-height: 20px;
            }
            .hd {
                margin-right: 6px;
            }
            .align-right {
                margin-right: 30px;
            }
        }
        .el-table {
            th:first-child,
            td:first-child {
                padding-left: 16px;
            }
            th:nth-child(4),
            td:nth-child(4) {
                text-align: center;
            }
        }
    } // 只创意列表
    .creative-origin-content {
        .creative-param {
            .hd {
                margin-right: 19px;
            }
        }
        .template-hd {
            padding: 10px 0 10px 30px;
        }
        .creative-btn-control {
            margin-top: 30px;
            padding: 20px 0 20px 30px;
            position: relative;
        }
        .el-button--new {
            padding: 0 20px!important;
            margin-right: 6px;
        }
        .seek-box {
            position: absolute;
            right: 30px;
            top: 24px;
            .el-input {
                width: auto;
            }
            .el-input--suffix {
                margin-right: 8px;
            }
        }
        .creative-btn-row {
            padding-top: 0;
        } //pop layer
        .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
        }
        .el-dialog__title {
            font-size: 16px;
            font-weight: bold;
        }
        .el-dialog__headerbtn {
            display: none;
        }
        .el-form-item__label {
            text-align: left;
            font-size: 14px;
            color: #515974;
            padding: 0 0 0 30px;
        }
        .el-dialog__body {
            // padding: 6px 0 0 30px;
            padding: 0;
        }
        .el-dialog__footer {
            padding: 0 0 30px 0;
        }
        .is-confirm {
            padding: 20px 0 0 30px;
            background-color: #fff;
            text-align: left;
        }
        .el-form-item {
            margin: 20px 0;
        }
        .el-form-item__content {
            .el-input {
                width: 30%;
                margin: 0 10px 0 5px;
            }
        }
    }
</style>