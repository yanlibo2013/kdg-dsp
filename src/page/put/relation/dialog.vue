<template>
    <div class="pop-creative-list">
        <el-form :model="form">
            <el-form-item label="创意主题：" class="creative-row-wrap">
                <template slot-scope="scope">
                        <el-input class="enter-theme" v-model="form.name" @change="handleChange" placeholder="请输入内容"></el-input>
                        <label for="" class="creative-add-item">上传日期：</label>
                        <el-date-picker v-model="form.date" @change="handleChangeDate" @blur="handleChangeDate" type="date" placeholder="选择日期">
                        </el-date-picker>
</template>
                                        </el-form-item>
                                        <el-form-item>                           
<template slot-scope="scope">
    <el-table :data="list.data" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="preview" label="创意预览">
            <template slot-scope="scope">
                
    <div v-if="scope.row.file_type == 'mp4' || scope.row.file_type == 'flv'|| scope.row.file_type == 'swf'">
        <img class="theme-pic" src="../../../style/image/creative/video-img.png" alt="" />
    </div>
    <div v-else>
        <img class="theme-pic" :src="scope.row.file_path" alt="" />
    </div>
                <!-- <img class="theme-pic" :src='scope.row.file_path' alt="" /> -->
</template>
                                                    </el-table-column>
                                                    <el-table-column prop="theme" label="创意主题">
<template slot-scope="scope">
     {{ scope.row.name }}
</template>
                                                    </el-table-column>
                                                    <el-table-column prop="size" label="尺寸">
<template slot-scope="scope">
     {{ scope.row.width }}x{{ scope.row.height }}
</template>
                                                    </el-table-column>
                                                    <el-table-column prop="family" label="类目">
<template slot-scope="scope">
     文化娱乐电视
</template>
                                                    </el-table-column>
                                                    <el-table-column prop="creativeType" label="创意类型">
<template slot-scope="scope">
     {{ scope.row.file_type }}
</template>
                                                    </el-table-column>
                                                    <el-table-column prop="openType" label="打开类型">
<template slot-scope="scope">
     {{ scope.row.link_type }}
</template>

                                                    </el-table-column>
                                                    <el-table-column prop="address" label="点击跳转地址">
<template slot-scope="scope">
                   <!-- link_type为1 -->
    <div class="address-row" v-if="scope.row.link_type=='H5'">
        <span class="add-hd">H5地址：{{scope.row.landing_page}}</span>
    </div>
<!-- link_type为2 -->
<div class="address-row" v-if="scope.row.link_type=='APP下载' && scope.row.landing_page">
    <span class="add-hd">Android下载地址：{{ JSON.parse(scope.row.landing_page).landing_page }}</span>
</div>
<div class="address-row" v-if="scope.row.link_type=='APP下载' && scope.row.deep_link">
    <span class="add-hd">IOS下载地址：{{ JSON.parse(scope.row.deep_link).landing_page }}</span>
</div>
<!-- link_type为3 -->

<div class="address-row" v-if="scope.row.link_type=='应用直达' &&  scope.row.landing_page ? JSON.parse(scope.row.landing_page).landing_page:''">
    <span class="add-hd">Android跳转地址：{{ scope.row.landing_page ? JSON.parse(scope.row.landing_page).landing_page:'' }}</span>
</div>
<div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.landing_page ? JSON.parse(scope.row.landing_page).deep_link:''">
    <span class="add-hd">Android应用唤起：{{ scope.row.landing_page ? JSON.parse(scope.row.landing_page).deep_link:'' }}</span>
</div>

<div class="address-row" v-if="scope.row.link_type=='应用直达' &&  scope.row.deep_link ? JSON.parse(scope.row.deep_link).landing_page:''">
    <span class="add-hd">iOS跳转地址：{{  scope.row.deep_link ? JSON.parse(scope.row.deep_link).landing_page :''}}</span>
</div>
<div class="address-row" v-if="scope.row.link_type=='应用直达' && scope.row.deep_link ? JSON.parse(scope.row.deep_link).deep_link:''">
    <span class="add-hd">iOS应用唤起：{{ scope.row.deep_link ? JSON.parse(scope.row.deep_link).deep_link : '' }}</span>
</div>
</template>
                                                        
                                                    </el-table-column>
                                                </el-table>

                                            </template>
                                        </el-form-item>
                                        <!-- <el-form-item> -->
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="list.current_page" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="list.total">
                        </el-pagination>
                    </div>
                                        <!-- </el-form-item> -->
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        
                                        <div class="is-confirm">
                                            <el-button type="confirm" @click="onSubmit"  >确认</el-button>
                                            <el-button type="cancel" @click="close">取消</el-button>
                                        </div>

                                    </div>
                                    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose" append-to-body>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="fnn">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
    import moment from "../../../common/moment";
    import {
        put
    } from "../../../service/index";
    export default {
        data: function() {
            return {
                dialogFormVisible: false,
                form: {
                    name: "",
                    date: ""
                },
                list: [],
                planName: "",
                multipleSelection: [],
               isEmptyArr:[],
                dialogVisible: false
            };
        },
        methods: {
            // ...mapActions(["setBreadCrumb"]),
             handleClose(done) {
             this.$confirm('确认关闭？')
             .then(_ => {
            done();
             })
            .catch(_ => {});
      },
            handleSelectionChange(val) {
                  this.isEmptyArr=[];
                this.isEmptyArr=val.slice(0);
                console.log(this.isEmptyArr)
               
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getDialogList({
                    page: 1,
                    pagesize: this.pageSize,
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                });
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.getDialogList({
                    page: val,
                    pagesize: this.pageSize,
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                });
            },
            close() {
                console.log("close");
                this.$emit("hideDialog", false);
            },
            getDialogList(data) {
                put.campnoCreatlist(data).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data.data;
                        let result = [];
                        for (var j = 0; j < data.length; j++) {
                            if (data[j].link_type == "1") {
                                data[j].link_type = "H5"
                            }
                            if (data[j].link_type == "2") {
                                data[j].link_type = "APP下载"
                            }
                            if (data[j].link_type == "3") {
                                data[j].link_type = "应用直达"
                            }
                            result.push(data[j]);
                        }
                        res.data.data.data = result;
                        this.list = res.data.data;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            getDataByName() {
                this.getDialogList({
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                    // ad_id: 26,
                    // ca_id: 29,
                    seachname: this.planName
                });
            },
            handleChange() {
                this.getDialogList({
                     ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                    // ad_id: 26,
                    // ca_id: 29,
                    seachname: this.form.name
                });
            },
            handleChangeDate() {
                this.getDialogList({ 
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                    // ad_id: 26,
                    // ca_id: 29,
                    date: this.form.date ? moment(this.form.date).format("YYYY-MM-DD") : ""
                });
            },
            getIds(value) {
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    result.push(value[j].id);
                }
                return result;
            },
            fnn(){
                this.dialogVisible = false;
                
            },
            onSubmit() {
               // console.log(this.getIds(this.multipleSelection));
                console.log(this.isEmptyArr)
                let tempArr = this.isEmptyArr.filter((item)=>{
                    return item.status == 0
                });

                // if(tempArr.length>0){//有空值
                //     this.dialogVisible=true;
                // }else{
                //     alert("111")
                // }




                put.campselectCreat({ 
                    ad_id: this.$route.params.adId,
                    ca_id: this.$route.params.planId,
                    // ad_id: 26,
                    // ca_id: 29,
                    id: this.getIds(this.multipleSelection)
                }).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: "操作成功,注意有未添加第三方监测地址",
                            type: "success"
                        });
                        this.$emit("hideDialog", false);
                        this.$emit("getList", {
                            ad_id: this.$route.params.adId,
                            ca_id: this.$route.params.planId,
                        });
                        // debugger;
                        this.getDialogList({
                            ad_id: this.$route.params.adId,
                            ca_id: this.$route.params.planId,
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
        mounted() {
            // this.setBreadCrumb(this.$route.path.replace("/", ""));
            // this.getDialogList({
            //     ad_id: this.$route.params.adId,
            //     ca_id: this.$route.params.planId,
            //     // ad_id: 26,
            //     // ca_id: 29
            // });
        }
    };
</script>

<style lang="scss">
    //pop layer
    .relate-creative-list {
        .el-dialog__header {
            border-bottom: 1px solid #e1e7f0;
            padding: 15px 0 16px 30px;
            height: 56px;
        }
        .el-dialog__title {
            font-size: 16px;
            font-weight: bold;
            float: left;
        }
        .el-dialog__headerbtn {
            display: none;
        }
        .el-dialog__body {
            padding: 0;
        }
        .pop-creative-list {
            .el-form-item__label {
                text-align: left;
                font-size: 14px;
                color: #515974;
                padding: 0 0 0 30px;
            }
            .el-dialog__footer {
                padding: 0 0 30px 0;
            }
            .is-confirm {
                padding: 0 0 30px 20px;
                background-color: #fff;
                text-align: left;
            }
            .el-form-item {
                margin-bottom: 0;
                &:first-child{
                    margin: 20px 0;
                }
            }
            .el-form-item__content {
                .enter-theme {
                    width: 31.5%;
                    margin: 0 10px 0 5px;
                }
            }
            .el-table-column--selection{
                padding-left: 18px;
            }
            .el-date-editor{
                width: 240px!important;
                vertical-align: 0px !important;
            }
            .creative-row-wrap .el-input__suffix{
                right: 35px;
            }
        }
    }
</style>