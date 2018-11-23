
<template>
    <div class="creative-template" name="banner">
        <el-main>
            <!-- 上传Banner素材 start -->
            <el-col :span="24">
                <div class="up-ingredient">
                    <el-form ref="form" :model="form">
                        <el-tabs>
                            <el-tab-pane class="border-bottom-2">
                                <span slot="label">
                <el-radio v-model="uploadType" label="1">上传本地文件</el-radio>
            </span>
                                <template>
                <div class="update-local-file">
                    <div class="update-item-row">
                        <label for="" class="update-hd">创意名称：</label>
                        <el-input v-model="form.local_name" placeholder="请填写创意主题" clearable></el-input>
                    </div>
                    <div class="update-item-row clear">
                        <label for="" class="update-hd">尺寸：</label>
                        <el-input v-model="form.local_w_h" class="" placeholder="请填写尺寸，如：100*100"></el-input>
                    </div>
                    <div class="update-item-row clear" v-show="!isShowtime">
                        <label for="" class="update-hd">时长：</label>
                        <el-input v-model="form.local_duration" class="" placeholder="请填写时长"></el-input>
                    </div>
                    <div class="update-item-row browse-row">
                        <label for="" class="update-hd">上传：</label>
                        <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="请上传素材文件" :readonly="true" v-model="filename">
                        <i slot="suffix" class="el-icon-close" @click="clearUpload"></i>
                        </el-input>
                        <el-button size="small" type="upload" @click="selectfile">浏览</el-button>
                        <input type="file" name="pic" accept="video/*" id="file" @change="upload" v-if="iconFileShow" 
                        style="display:none"/>
                    </div>
                </div>
</template>
                        </el-tab-pane>
                        
                        <el-tab-pane class="border-bottom-2" >
                            
                            <span slot="label" >
                                <el-radio v-model="uploadType" label="2">上传远程文件</el-radio>
                            </span>
<template>
    <div class="update-item-row">
        <label for="" class="update-hd">创意名称：</label>
        <el-input v-model="form.creative_name" placeholder="请填写创意主题"></el-input>
    </div>
    <div class="update-item-row clear">
        <label for="" class="update-hd">格式：</label>
        <el-select v-model="form.file_type" placeholder="请选择">
            <el-option v-for="item in isShowtime? options:remote" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="update-item-row clear">
        <label for="" class="update-hd">尺寸：</label>
        <el-input v-model="form.w_h" class="" placeholder="请填写尺寸，如：100*100"></el-input>
    </div>
    <div class="update-item-row clear" v-show="!isShowtime">
        <label for="" class="update-hd">时长：</label>
        <el-input v-model="form.duration" class="" placeholder="请填写时长"></el-input>
    </div>
    <div class="update-item-row clear">
        <label for="" class="update-hd">素材地址：</label>
        <el-input v-model="form.file_path" class="" placeholder="请填写第三方提供的素材地址"></el-input>
    </div>
</template>
                        </el-tab-pane>
                        <!-- 确认，取消 -->
                        <div class="is-confirm">
                            <el-button type="confirm" @click="onSubmit">确认</el-button>
                            <el-button type="cancel" @click="goBack">取消</el-button>
                        </div>
                    </el-tabs>
                     </el-form>
                </div>
                
            </el-col>
            <!-- 上传Banner素材 end -->
        </el-main>
    </div>
</template>

<script>
    import {
        creative
    } from "../../../service/index";
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    // import {
    //     setWinHeight
    // } from '../../../common/utils';
    export default {
        computed: {
            isShowtime() {
                return this.$route.path.replace("/", "").indexOf("banner") >= 0;
            }
        },
        data: function() {
            return {
                //文件格式
                options: [ {
                    label: "请选择",
                    value: "0"
                },{
                    label: "png",
                    value: "1"
                }, {
                    label: "jpg",
                    value: "2"
                }, {
                    label: "gif",
                    value: "3"
                }],
                remote: [ //1:mp4   2:flv
                    {
                        label: "mp4",
                        value: "1"
                    },
                    {
                        label: "flv",
                        value: "2"
                    }
                ],
                form: {
                    ad_id: "", //客户id
                    creative_name: "", //创意主题
                    creative_file: "", //创意素材（type=1时必填）
                    type: "", //1本地上传，2远程素材
                    file_type: "", //素材类型，选填（1png,2jpg,3gif）（type=2时必填）
                    size: "1", //素材大小（type=2时必填）
                    file_path: "", //素材远程地址（type=2时必填）
                    w_h: "", //素材宽高，实例：（宽*高）（type=2时必填）
                    duration: ""
                },
                uploadType: "1", //上传类型 1本地上传，2远程素材
                filename: "",
                isUpload: false,
                iconFileShow: true,//浏览上传，重复文件可多次上传
            };
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            uploadRemoteFile(val) {
                
                console.log(val);
                this.uploadType = val;
            },
            goBack() {
                // this.$router.push({
                //     path: "/list"
                // });
                this.$router.go(-1);
            },
            selectfile() {
                this.iconFileShow = true;
                setTimeout(()=> this.$el.querySelector("#file").click(),300);
            },
            clearUpload() {
                this.logofile = "";
                this.filename = "";
                this.isUpload = false;
                this.iconFileShow = true;
                this.form.creative_file = "";
            },
            upload(event) {
                this.form.creative_file = this.$el.querySelector("#file").files[0];
                this.filename = this.$el.querySelector("#file").files[0].name;
                this.isUpload = true;
                this.iconFileShow = false;
                if(!this.form.name){
                    this.form.name = this.filename;
                }
            },
            onSubmit() {
                console.log(this.uploadType);
                if (this.uploadType == "1") {
                    if (!this.form.local_w_h) {
                        this.$message({
                            message: "请输入尺寸",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.local_duration) {
                        this.$message({
                            message: "请输入时长",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.creative_file) {
                        this.$message({
                            message: "请选择上传文件",
                            type: "warning"
                        });
                        return;
                    }
                }
                if (this.uploadType == "2") {
                    // console.log(this.form);
                    // return;
                    if (!this.form.creative_name) {
                        this.$message({
                            message: "请输入创意主题",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.file_type) {
                        this.$message({
                            message: "请选择创意格式",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.w_h) {
                        this.$message({
                            message: "请填写尺寸大小",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.duration) {
                        this.$message({
                            message: "请填写时长",
                            type: "warning"
                        });
                        return;
                    }
                    if (!this.form.file_path) {
                        this.$message({
                            message: "请填写素材地址",
                            type: "warning"
                        });
                        return;
                    }
                }
                this.form.ad_id = this.$route.params.id
                let fileData = new FormData();
                if (this.uploadType == "1") {//本地
                    fileData.append("ad_id", this.form.ad_id);

                    if(this.form.local_name){//创意主题不为必填选项
                        fileData.append("creative_name", this.form.local_name);
                    }
                    fileData.append("creative_file", this.form.creative_file);
                    fileData.append("type", this.uploadType);
                    fileData.append("duration", parseInt(this.form.local_duration)); //w_h
                    fileData.append("w_h", this.form.local_w_h);
                }
                if (this.uploadType == "2") {
                    // debugger;
                    console.log(fileData);
                    this.form.type = this.uploadType;
                    fileData.append("duration", parseInt(this.form.duration)); //w_h
                    fileData.append("w_h", this.form.w_h);
                    delete this.form.creative_file;
                }
                if (this.$route.path.replace("/", "").indexOf("banner") >= 0) {
                    creative.creativeBanner(this.uploadType == "1" ? fileData : this.form).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.clearform();
                            this.$router.go(-1);
                        } else {
                            this.$message.error(res.data.msg);
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                } else {
                    creative.creativeVideo(this.uploadType == "1" ? fileData : this.form).then(res => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.clearform();
                            this.$router.go(-1);
                        } else {
                            this.$message.error(res.data.msg);
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                }
            },
            handlePreview() {},
            handleRemove() {},
            clearform() {
                this.form = {
                    ad_id: "", //客户id
                    creative_name: "", //创意主题
                    creative_file: "", //创意素材（type=1时必填）
                    type: "", //1本地上传，2远程素材
                    file_type: "", //素材类型，选填（1png,2jpg,3gif）（type=2时必填）
                    size: "", //素材大小（type=2时必填）
                    file_path: "", //素材远程地址（type=2时必填）
                    w_h: "" //素材宽高，实例：（宽*高）（type=2时必填）
                }
                // this.$el.querySelector("#file").value = "";
                this.filename = "";
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
        },
        watch:{
        }
    };
</script>

<style lang="scss">
    @import "../../../style/common"; // 上传文件
    .up-ingredient {
        // background color
        .el-tab-pane,
        .el-tabs__header {
            background-color: #ffffff;
        }
        .el-tabs__header {
            margin: 0;
        }
        .update-hd {
            line-height: 38px;
            color: #515974;
            font-weight: bold;
            width: 75px;
            display: inline-block;
        }
        .update-local-file {
            margin-bottom: 15px;
        }
        .update-item-row {
            margin-bottom: 14px;
            .el-input {
                width: 240px;
            }
            .align-right.el-select,
            .align-right.el-input {
                margin: 0 10px 0 32px;
            }
            .el-select .el-input {
                width: 240px;
            }
            .el-button--upload {
                margin-left: 6px;
            }
        } //revised?
        .el-tab-pane {
            padding: 20px 0 16px 30px;
        }
        .el-tabs__nav-wrap:after {
            height: 1px !important;
        }
        .is-confirm {
            padding-left: 30px;
        }
        .el-tabs__nav-scroll {
            padding-left: 30px;
        }
        .el-tabs__item {
            padding: 0 15px;
            height: 20px;
            line-height: 20px;
            margin: 17px 0;
        }
        .is-active {
            color: #6cabff;
        }
        .el-radio {
            // padding: 7px 0 8px;
        }
        .el-radio__input+.el-radio__label {
            color: #7f8599;
            font-weight: normal;
        }
        .el-radio__input.is-checked+.el-radio__label {
            color: #515974;
            font-weight: bold;
        }
        .el-tabs__active-bar {
            // background-color: transparent;
        }
    }
</style>

