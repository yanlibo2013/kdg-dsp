<template>

    <!-- 基础数据报表 -->
    <div class="media-create">
        <el-main>
            <el-form ref="form" :model="form">
                <el-col :span="24">
                    <h1 class="template-hd">基本资料</h1>
                    <div class="base-bd border-bottom-2">
                        <!-- 媒体名称： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体名称：</label>
                            <el-input placeholder="必填" v-model="form.name"></el-input>
                        </div>
                        <!-- 媒体名称： end -->
                        <!-- 接入方式： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>接入方式：</label>
                            <el-select class="ajust-full-width" v-model="form.accpet_type" placeholder="请选择">
                                <el-option label="API" value="API"></el-option>
                                <el-option label="SDK" value="SDK"></el-option>
                                <el-option label="JS" value="JS"></el-option>
                            </el-select>
                        </div>
                        <!-- 接入方式： end -->
                        <!-- 计费方式： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>计费方式：</label>
                            <el-select class="ajust-full-width" v-model="form.charging_type" placeholder="请选择">
                                <el-option label="包段资源" value="1"></el-option>
                                <el-option label="私有交易（PD）" value="2"></el-option>
                                <el-option label="公开竞价（RTB）" value="3"></el-option>
                            </el-select>
                        </div>
                        <!-- 计费方式： end -->
                        <!-- 预计价格配置 start -->
                        <div class="create-row price-set">
                            <label for="" class="data-item left"><i class="item-needed">*</i>预计价格配置：</label>
                            <table width="85%" class="resource-wrap" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr class="space-under">
                                        <td>
                                            <label for="" class="inferior-title left">广告位id：</label>
                                            <el-input type="textarea" v-model="form.adids" :autosize="{ minRows: 2, maxRows: 4}" @blur="getAdIds">
                                            </el-input>
                                        </td>
                                        <td>
                                            <label for="" class="inferior-title left">成交价：</label>
                                            <div class="unit-setting i-yellow">
                                                <el-input v-model="form.price" @blur="getPrice"></el-input>
                                                <span class="unit meta">元/CPM</span>
                                            </div>
                                        </td>
                                        <td>
                                            <label for="" class="inferior-title left">PV：</label>
                                            <div class="unit-setting i-yellow">
                                                <el-input v-model="form.pv"></el-input>
                                            </div>
                                        </td>
                                    </tr>
                                    <!-- <tr class="space-under"> -->
                                </tbody>
                            </table>
                        </div>
                        <!-- 预计价格配置 end -->
                        <!-- 媒体损耗系数： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体损耗系数：</label>
                            <div class="unit-setting i-blue">
                                <el-input v-model="form.media_no"></el-input>
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <!-- 媒体损耗系数 end -->
                        <!-- 媒体分类 start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体分类：</label>
                            <el-select class="ajust-full-width" placeholder="一级分类" @change="changeMediaCategory" v-model="form.media_category"> 
                                            <el-option
                                              v-for="item in media_category_options"
                                              :key="item.id"
                                              :label="item.name"
                                              :value="item.id">
                                            </el-option>
                            </el-select>
                          <!--   <el-input class="ajust-full-width" placeholder="一级分类" v-model="form.media_category"></el-input> -->
                            <el-select class="ajust-full-width" placeholder="二级分类" v-model="form.media_category_sed">
                                             <el-option
                                              v-for="item in media_category_sed_options"
                                              :key="item.id"
                                              :label="item.name"
                                              :value="item.id">
                                            </el-option>
                            </el-select>
                           <!--  <el-input class="ajust-full-width" placeholder="二级分类" v-model="form.media_category_sed"></el-input> -->
                        </div>
                        <!-- 媒体分类 end -->
                        <div class="create-row tip-space resource-type">
                            <label for="" class="data-item"><i class="item-needed">*</i>资源类型：</label>
                            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <!-- 资源类型 start -->
                        <div class="create-row tip-space status-item">
                            <label for="" class="data-item"><i class="item-needed">*</i>状态：</label>
                            <el-switch v-model="form.flag==1?true:false" 
                            active-text="关闭" inactive-text="开启" @change="modifyStatus()">
                            </el-switch>
                        </div>
                        <!-- 资源类型 end -->
                        <!-- 审核规范 start -->
                        <div class="create-row tip-space audit-speci clear">
                            <label for="" class="data-item left"><i class="item-needed">*</i>审核规范：</label>
                            <el-input class="upload-control" :class="{'upload-input':isUpload}" 
                            placeholder="请上传审核规范" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload()"></i>
                            </el-input>
                            
                            <el-button type="upload" @click="selectStandard">上传</el-button>
                            <input type="file" name="pic" accept="application/pdf, application/vnd.ms-excel" 
                            id="fileStandard" @change="upload" style="display:none" />

                        </div>
                        <!-- 审核规范 end -->
                        <!-- 请求地址 -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>请求地址：</label>
                            <el-input placeholder="bid url, 请于运维组确认" v-model="form.bid_url"></el-input>

                        </div>
                    </div>
                    <div class="is-confirm">
                        <el-button type="confirm" @click="onSubmit">确认</el-button>
                        <el-button type="cancel" @click="goBack">取消</el-button>
                    </div>
                </el-col>
            </el-form>
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
    export default {
        data: function() {
            return {
                sourceData: [{
                        key: "1",
                        value: "PC-Web"
                    },
                    {
                        key: "2",
                        value: "PC-视频"
                    },
                    {
                        key: "3",
                        value: "Mobile-APP"
                    },
                    {
                        key: "4",
                        value: "Mobile-Web"
                    },
                    {
                        key: "5",
                        value: "Mobile-视频"
                    },
                    {
                        key: "6",
                        value: "其他"
                    },
                    {
                        key: "7",
                        value: "Banner"
                    },
                    {
                        key: "8",
                        value: "Native"
                    },
                    {
                        key: "9",
                        value: "Video"
                    }
                ],
                checkedCities: [],
                cities: [
                    "PC-Web",
                    "PC-视频",
                    "Mobile-APP",
                    "Mobile-Web",
                    "Mobile-视频",
                    "其他",
                    "Banner",
                    "Native",
                    "Video"
                ],
                options: [{
                        value: "API",
                        lable: "API"
                    },
                    {
                        value: "SDK",
                        lable: "SDK"
                    },
                    {
                        value: "JS",
                        lable: "JS"
                    }
                ],
                chargTypes: [{
                        value: 1,
                        lable: "包段资源"
                    },
                    {
                        value: 2,
                        lable: "私有交易（PD）"
                    },
                    {
                        value: 3,
                        lable: "公开竞价（RTB）"
                    }
                ],
                form: {
                    name: "", //媒体信息名称
                    accpet_type: "", //接入方式（共有 API，SDK，JS 三种选择每次只能提交一种）
                    charging_type: "", //	计费方式：1包段资源，2私有交易（PD），3公开竞价（RTB）
                    price_set: [], //	预计价格配置：json格式
                    media_no: "", //媒体损耗系数 只能是（1~100 ）的整数
                    media_category: "", //	媒体分类一级（只能传入大于0的数字）
                    media_category_sed: "", //媒体分类二级（只能传入大于0的数字）
                    flag: 1, //	渠道状态：（1，开启，2关闭）
                    bid_url: "", //	请求地址（url）
                    sources_type: "", //资源类型（多选,号隔开）：资源类型（多选,号隔开）：1PC-Web 2PC-视频 3Mobile-APP 4Mobile-Web 5Mobile-视频 6其他 7 Banner 8 Native 9 Video
                    path: "", //审核规范（目前只支持pdf文件）
                    adids: "", // 预计价格配置 广告IDS
                    price: "", // 预计价格配置 价格
                    pv: ""
                },
                media_category_options:[],//一级分类
                media_category_sed_options:[],//一级分类
                isUpload: "",
                logofile: "",
                stateList: ["开启", "关闭"], //状态集合 1开启 2 关闭
                dynamicTags: ['行业一', '行业二', '行业三'],
                inputVisible: false,
                inputValue: ''
            };
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            if (this.$route.params.id) {
                meadia.getMeadiaInfo({
                    id: this.$route.params.id
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        this.form.name = data.name;
                        this.form.accpet_type = data.accpet_type;
                        this.form.media_no = data.media_no;
                        this.form.media_category = this.getMediaNameById(data.media_category,data.media_category_list) || '';
                        this.form.media_category_sed = this.getMediaNameById(data.media_category_sed,data.media_category_sed_list) || '';
                        this.form.flag = data.flag;
                        this.form.bid_url = data.bid_url;
                        this.form.charging_type = data.charging_type.toString();
                        this.form.adids = JSON.parse(data.price_set)[0].adids.toString();
                        this.form.price = JSON.parse(data.price_set)[0].price.toString();
                        this.form.pv = JSON.parse(data.price_set)[0].pv.toString();
                        this.checkedCities = this.getNameById(data.sources_type);
                        //console.log(data.sources_type);
                    }
                });
            } else {
                console.log("添加操作");
            }

            this.getMediaList(0);
           

        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            handleCheckedCitiesChange(value) {
                // let checkedCount = value.length;
                // this.checkAll = checkedCount === this.cities.length;
                // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            handlePreview() {},
            clearUpload() {
                this.isUpload = false;
                this.logofile = "";
                this.filename = "";
            },
            upload(event) {
                this.form.path = this.$el.querySelector("#fileStandard").files[0].name;
                this.logofile = this.form.path;
                this.isUpload = true;
            },
            selectStandard() {
                this.$el.querySelector("#fileStandard").click();
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            validationform() {
                if (!this.form.name) {
                    this.$message({
                        message: "请输入媒体名称",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.accpet_type) {
                    this.$message({
                        message: "请选择接入方式",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.charging_type) {
                    this.$message({
                        message: "请选择计费方式",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.adids) {
                    this.$message({
                        message: "请填写预计价格配置广告位",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.price) {
                    this.$message({
                        message: "请填写预计价格配置成交价",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.pv) {
                    this.$message({
                        message: "请填写预计价格配置PV",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.media_no) {
                    this.$message({
                        message: "请填写媒体损耗系数",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.media_category) {
                    this.$message({
                        message: "请填写媒体分类一级",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.media_category_sed) {
                    this.$message({
                        message: "请填写媒体分类二级",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.bid_url) {
                    this.$message({
                        message: "请填写请求地址",
                        type: "warning"
                    });
                    return;
                }
                return true;
            },
            getIdsByName(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.sourceData.length; k++) {
                        if (val[j] == this.sourceData[k].value) {
                            result.push(this.sourceData[k].key);
                        }
                    }
                }
                return result.toString();
            },
            getNameById(val) {
                let result = [];
                for (var j = 0; j < val.length; j++) {
                    for (var k = 0; k < this.sourceData.length; k++) {
                        if (val[j] == this.sourceData[k].key) {
                            result.push(this.sourceData[k].value);
                        }
                    }
                }
                return result;
            },

            getMediaNameById(id,ary){
                let str = "";
                for(var i=0;i<ary.length;i++){
                    if(ary[i].id == id){
                        str = ary[i].name;
                    }
                }
                return str;

            },



            getMediaList(id){//获得媒体分类的数据
                let that = this;
                 //获得媒体分类的列表数据（一，二级数据）platGetMediaList
             meadia.platGetMediaList({
                    mediaId: id
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        if(id == 0){
                            that.media_category_options = data || [];
                        }else{
                            that.media_category_sed_options = data || [];
                        }
                        
                    }
                });

            },
            changeMediaCategory(val){//一级媒体分类 
                this.form.media_category_sed = "";
                this.getMediaList(val);

            },

            onSubmit() {
                if (this.validationform()) {
                    this.form.price_set = JSON.stringify([{
                        adids: this.form.adids,
                        price: this.form.price,
                        pv: this.form.pv
                    }]);
                    // this.form.price_set = [{
                    //     adids: this.form.adids,
                    //     price: this.form.price
                    // }]
                    this.form.flag = this.form.flag ? "1" : "2";
                    this.sources_type = this.getIdsByName(this.checkedCities);
                    //  name: "", //媒体信息名称
                    // accpet_type: "", //接入方式（共有 API，SDK，JS 三种选择每次只能提交一种）
                    // charging_type: "", //	计费方式：1包段资源，2私有交易（PD），3公开竞价（RTB）
                    // price_set: [], //	预计价格配置：json格式
                    // media_no: "", //媒体损耗系数 只能是（1~100 ）的整数
                    // media_category: "", //	媒体分类一级（只能传入大于0的数字）
                    // media_category_sed: "", //媒体分类二级（只能传入大于0的数字）
                    // flag: "", //	渠道状态：（1，开启，2关闭）
                    // bid_url: "", //	请求地址（url）
                    // sources_type: "", //资源类型（多选,号隔开）：资源类型（多选,号隔开）：1PC-Web 2PC-视频 3Mobile-APP 4Mobile-Web 5Mobile-视频 6其他 7 Banner 8 Native 9 Video
                    // path: "", //审核规范（目前只支持pdf文件）
                    let fileData = new FormData();
                    if (this.$route.params.id) {
                        fileData.append("id", this.$route.params.id);
                    }
                    fileData.append("name", this.form.name);
                    fileData.append("accpet_type", this.form.accpet_type);
                    fileData.append("charging_type", this.form.charging_type);
                    fileData.append("price_set", this.form.price_set);
                    fileData.append("media_no", this.form.media_no);
                    fileData.append("media_category", this.form.media_category);
                    fileData.append("media_category_sed", this.form.media_category_sed);
                    fileData.append("flag", this.form.flag);
                    fileData.append("bid_url", this.form.bid_url);
                    fileData.append("sources_type", this.sources_type);
                    if (this.form.path != "") {
                        fileData.append("path", this.form.path);
                    }
                    meadia.editMeadia(fileData).then(res => {
                        if (res.data.code == 0) {
                            this.$message({
                                // message: res.data.msg,
                                message: "操作成功",
                                type: "success"
                            });
                            this.goBack();
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
            },
            goBack() {
                this.$router.go(-1);
            },
            getAdIds() {
                // this.form.price_set.adids = this.form.adids;
                // console.log(this.form.price_set);
                this.form.price_set = {
                    adids: this.form.adids
                };
            },
            getPrice() {
                // this.form.price_set.price = this.form.price;
                // console.log(this.form.price_set);
                this.form.price_set = {
                    price: this.form.price
                };
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../style/mixin";
    @import "../../../style/common";
    .media-create {
        .template-hd,
        .base-bd{
            background-color: #fff;
        }
        // 用于继承字号12
        .font12 {
            font-size: 12px;
        }
        .template-hd {
            padding: 20px 0 20px 30px;
            border-bottom-width: 1px;
        }
        .base-bd {
            padding: 20px 0 0 30px;
        } // single row
        .create-row {
            margin-bottom: 13px;
            .el-input {
                width: 240px;
            }
            .el-checkbox__label {
                @include sc(12px, $firstc);
            }

            .sibling-elem{
                margin: 10px 0 0 92px;
            }
            .el-checkbox{
                width: 105px;
            }
            .el-tag{
                background-color: #f3f5f9;
                color: #6cabff;
                border: 0 none;
                padding: 8px 12px 5px 11px;
                height: auto;
                line-height: 0;
                .el-icon-close{
                    right: -3px;
                }
                & + .el-tag {
                    margin-left: 10px;
                }
            }
            .el-autocomplete{
                padding-left: 94px;
                display: block;
            }
            .tags-container{
                padding: 0 0 10px 94px;
            }
        } // single row title
        .data-item {
            color: $firstc;
            margin-right: 6px;
        } // need user to fill tip
        .item-needed {
            color: $redc;
            width: 7px;
            margin-right: 7px;
            vertical-align: -2px;
        } // border radius
        .unit,
        .meta {
            @include topRightRadius(5px);
            @include bottomRightRadius(5px);
        } // set price
        .price-set {
            .inferior-title {
                color: $secondc;
                margin: 5px 6px 0 0;
                @extend .font12;
            }
            .space-under>td {
                padding-bottom: 15px;
            }
            .el-textarea {
                max-width: 320px;
            }
            textarea {
                margin-right: 10px;
            }
            .el-button--default {
                border-style: dashed;
                width: 80%;
            }
            .el-icon-plus {
                @include sc(20px, $bc);
            }
        }
        .el-input--suffix {
            margin-right: 5px;
        } // hide red need tip
        .tip-space {
            .item-needed {
                visibility: hidden;
            }
            .el-switch {
                margin-left: 27px;
            }
        } // audit specification
        .audit-speci {
            .data-item {
                margin-top: 8px;
            }
            .el-input {
                margin: 0 10px 0 5px;
            }
        } // adjust space
        .resource-type {
            margin: 21px 0 30px;
            .data-item{
                float: left;
                margin-right: 11px;
            }
        }
        .status-item {
            margin-bottom: 23px;
        } // confirm and cancel
        .is-confirm {
            padding-left: 30px;
        }
        .tips-important {
            display: inline-block;
            @include svgbg("../../../style/image/creative/tips-important.svg");
            height: 24px;
            width: 24px;
            vertical-align: -7px;
            margin-left: 5px;
            @include transX(180deg);
        }
    }


</style>