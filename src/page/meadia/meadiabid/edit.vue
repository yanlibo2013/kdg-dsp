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
                            <el-input placeholder="必填" v-model="form.media_name"></el-input>
                        </div>
                        <!-- 媒体名称： end -->
                        <!-- app包名： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>App包名：</label>
                            <el-checkbox v-model="checkAndroid" v-show="isShowCheckAndroid">Android包名</el-checkbox>
                            <el-input placeholder="请选择" v-model="form.package_A" @change='packageChange("android")' v-show="isShowCheckAndroid"></el-input>
                            <div class="sibling-elem" v-show="isShowCheckIos">
                                <el-checkbox v-model="checkIos">iOS包名</el-checkbox>
                                <el-input placeholder="请选择" v-model="form.package_I" @change='packageChange("ios")'></el-input>
                            </div>
                        </div>
                        <!-- app包名：     end -->
                        <!-- 媒体分类 start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体分类：</label>
                            <el-select class="ajust-full-width" 
                             id="my_media_first"
                             placeholder="一级分类" 
                             @change="changeMediaCategory" 
                             v-model="form.media_category">
                                <el-option v-for="item in media_category_options" :key="item.id" :label="item.name" :value="item.id.toString()">
                                </el-option>
                            </el-select>
                            <!--   <el-input class="ajust-full-width" placeholder="一级分类" v-model="form.media_category"></el-input> -->
                            <el-select class="ajust-full-width" id="my_media_second" placeholder="二级分类" v-model="form.media_category_sed">
                                <el-option v-for="item in media_category_sed_options" :key="item.id" :label="item.name" :value="item.id.toString()">
                                </el-option>
                            </el-select>
                            <!--  <el-input class="ajust-full-width" placeholder="二级分类" v-model="form.media_category_sed"></el-input> -->
                        </div>
                        <!-- 媒体分类 end -->
                       
                        <!-- 接入方式： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>接入方式：</label>
                            <el-select class="ajust-full-width" id="my_media_accept"  v-model="form.accpet_type" placeholder="请选择" @change="getAcceptType(form.accpet_type)">
                                <el-option label="API" value="API"></el-option>
                                <el-option label="SDK" value="SDK"></el-option>
                                <el-option label="JS" value="JS"></el-option>
                                <!-- <el-option label="KAPI" value="KAPI"></el-option> -->
                            </el-select>
                            <el-checkbox v-model="checkAcceptPrice" v-show="isAcceptPrice">是否参与竞价</el-checkbox>
                            <el-checkbox v-model="checkAcceptKAPI" v-show="isAcceptKAPI">是否使用KAPI协议</el-checkbox>
                        </div>
                        <!-- 接入方式： end -->
                        <!-- 媒体损耗系数： start -->
                        <div class="create-row">
                            <label for="" class="data-item"><i class="item-needed">*</i>媒体损耗系数：</label>
                            <div class="unit-setting i-blue">
                                <el-input placeholder="请输入0至100的整数" v-model="form.media_no"></el-input>
                                <span class="unit">%</span>
                            </div>
                        </div>
                        <!-- 媒体损耗系数 end -->
                        <!-- 状态 start -->
                        <div class="create-row tip-space status-item">
                            <label for="" class="data-item"><i class="item-needed">*</i>状态：</label>
                            <el-switch v-model="flag" active-text="关闭" inactive-text="开启">
                            </el-switch>
                        </div>
                        <!-- 状态 end -->
                        <!-- 审核规范 start -->
                        <div class="create-row audit-speci clear">
                            <label for="" class="data-item"><i class="item-needed">*</i>审核规范：</label>
                            <el-input class="upload-control" :class="{'upload-input':isUpload}" placeholder="请上传审核规范" v-model="logofile" :readonly="true">
                                <i slot="suffix" class="el-icon-close" @click="clearUpload"></i>
                            </el-input>
                            <el-button type="upload" @click="selectLogo">上传</el-button>
                            <input type="file" name="pic" accept="application/pdf" id="fileLogo" @change="upload" style="display:none" v-if="iconLogoShow" />
                        </div>
                        <!-- 审核规范 end -->
                        <!-- 禁投行业 start -->
                        <div class="create-row">
                            <label for="" class="data-item left" style="padding-left:13px;width: 104px;">禁投行业：</label>
                            <div class="tags-container">
                                <el-tag :key="tag.key" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
                                    {{tag.value}}
                                </el-tag>
                            </div>
                            <!-- <el-input placeholder="请输入禁投行业" v-model="form.bid_url"></el-input> -->
                            <el-autocomplete popper-class="my-autocomplete" v-model="state3" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" @focus="clearItem">
                                <!-- <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"> -->
                                <!-- </i> -->
                                <template slot-scope="{ item }">
                                            <div class="name">{{ item.value }}</div>
                                            <!-- <span class="addr">{{ item.address }}</span> -->
</template>
                            </el-autocomplete>
                        </div>
                        <!-- 禁投行业 end -->

                         <!-- 适用行业： start-->
                        <div class="create-row rule-set clear">
                            <label for="" class="data-item left"><i class="item-needed">*</i>适用行业：</label>                                                                                              
                                <el-select 
                                    v-model="form.firstindustry" 
                                    placeholder="一级分类" 
                                    @change="getSubData(form.firstindustry)"
                                >
                                <el-option 
                                    v-for="item in firoptions" 
                                    :key="item.value" 
                                    :label="item.label" 
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>                                       
                            <el-select v-model="form.secondindustry" placeholder="二级分类">
                                <el-option v-for="item in secoptions" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <!-- 适用客户 end-->

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
        meadia,
        end
    } from "../../../service/index"
    import {
        mapState,
        mapActions
    } from "vuex";
    import _ from "lodash";
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
                    },
                    // {
                    //     value: "KAPI",
                    //     lable: "KAPI"
                    // },
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
                    media_name: "", //媒体信息名称
                    accpet_type: "", //接入方式（共有 API，SDK，JS 三种选择每次只能提交一种）
                    media_no: "", //媒体损耗系数 只能是（1~100 ）的整数
                    package_A: "", //app包名：Android包名
                    package_: "", //app包名：IOS包名（Android和IOS必须存在一个）
                    media_category: "", //媒体一级分类
                    media_category_sed: "", //媒体二级分类
                    firstindustry: "", //客户一级分类
                    secondindustry: "", //客户二级分类
                    flag: "", //1 开启 2关闭
                    path: "", //审核规范
                    prohibit: "", //禁投行业
                    id: "",
                    accpet_type_bidprice: 0, //是否参与竞价  1 参与   0 不参与
                    plant_id:"1"
                },
                media_category_options: [], //一级分类
                media_category_sed_options: [], //一级分类
                stateList: ["开启", "关闭"], //状态集合 1开启 2 关闭
                flag: false,
                logofile: "",
                isUpload: "",
                checkAndroid: false,
                checkIos: false,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                restaurants: [
                ],
                state3: '',
                checkAcceptPrice: false,
                checkAcceptKAPI: false,
                isAcceptPrice: false,
                isAcceptKAPI: false,
                isShowCheckAndroid:true,
                isShowCheckIos:true,
                platformlist:[],
                iconLogoShow: true,//审核规范上传重复文件控制
                firoptions:[],//客户一级分类
                secoptions:[],//客户二级分类
                firstindustry:'',//编辑的一级客户
                secondindustry:'',//编辑的二级客户
            };
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
             //获得使用客户的数据 
            
           
             if(!this.$route.params.id){
                   this.getSubData();
             }
         
            if (this.$route.params.id) {
                meadia.getMeadiaInfobid({
                    id: this.$route.params.id
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        this.form.media_name = data.name;
                        if(data.accpet_type == "KAPI") {
                            this.form.accpet_type = "API";
                            this.isAcceptKAPI = true;
                            this.checkAcceptKAPI = true;
                        } else {
                            this.form.accpet_type = data.accpet_type;
                        }
                          this.form.plant_id = data.plant_id;
                        this.form.media_no = data.media_no;
                        this.form.media_category = data.media_category.toString();
                        this.form.media_category_sed = data.media_category_sed.toString()
                        this.form.flag = data.flag;
                        this.flag=data.flag=="1"?true:false;
                        this.logofile = data.path_name;
                        if(data.firstindustry){
                            this.firstindustry=data.firstindustry;
                            this.form.firstindustry = data.firstindustry.toString();//101
                        }
                        if(data.secondindustry){
                              this.secondindustry=data.secondindustry;
                        }
                        this.getSubData();
                        //通过id然后获得名字，填充到下拉中
                        if(this.firoptions.length > 0){
                            this.firoptions.forEach((item)=>{
                                if(item.value == data.firstindustry){
                                     this.form.firstindustry = item.label
                                }
                            })
                        }
                        if (data.path_name) {
                            this.isUpload = true;
                        }
                        if (data.package_A&&data.package_A!="undefined") {
                            console.log("package_A if");
                            this.form.package_A = data.package_A;
                            this.checkAndroid = true;
                        }else{
                             console.log("package_A else");
                            this.isShowCheckAndroid=false;
                        }
                        if(data.package_I&&data.package_I!="undefined"){
                            console.log("package_I if");
                             this.form.package_I = data.package_I;
                            this.checkIos = true;
                        }else{
                            console.log("package_I else");
                            this.isShowCheckIos=false;
                        }
                        if (data.media_category) {
                            this.getMediaList(parseInt(data.media_category));
                        }
                       
                        if (data.accpet_type_bidprice == 1) {
                            this.isAcceptPrice = true;
                            this.checkAcceptPrice = true;
                        }
                        this.form.prohibit=data.prohibit;
                        // console.log(JSON.stringify(data.prohibit))
                        // if(JSON.stringify(data.prohibit) != null) {
                            _.forEach(data.prohibit,(value)=>{
                                this.dynamicTags.push({key:value.categroy_id,value:value.name});
                            });
                        // }
                        
                        this.form.id = this.$route.params.id;
                    }
                });
               
            } else {
               
            }
             this.getMediaList(0);
            end.industryType({
                type: 1
            }).then(res => {
                if (res.data.code == 0) {
                    let result = [];
                    for (var key in res.data.data) {
                        result.push({
                            key: key,
                            value: res.data.data[key]
                        });
                    }
                    this.restaurants = this.loadAll(result);
                }
                  if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
            });
            meadia.getPlatformLiist().then(res=>{
                if(res.data.code==0){
                    this.platformlist=res.data.data;
                }
                  if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
            });
        },
        methods: {
            ...mapActions(["setBreadCrumb"]),
            getAcceptType(val) {
                if (val == "API") {
                    this.isAcceptPrice = true;
                    this.isAcceptKAPI = true;
                } else {
                    this.isAcceptPrice = false;
                    this.isAcceptKAPI = false;
                }
            },
           
            getSubData(val) {//获得使用客户
                   let temparr=[];
                   if(!val){
                        end.industryType({
                          id: 0
                       })
                        .then(res => {                             
                            let data = res.data.data;
                            this.form.secondindustry = "";
                            for(let attr in data){
                                    let obj ={};
                                    obj.label=data[attr];
                                    obj.value=attr;
                                    temparr.push(obj)
                            } 
                            this.firoptions = temparr.slice(0);
                            // if(this.firstindustry){//有一级分类
                            //     this.firoptions.forEach((item)=>{
                            //         if(item.value == this.firstindustry){
                            //             this.form.firstindustry = item.label
                            //         }
                            //     })
                            //  }
                             
                             if(this.$route.params.id && this.firstindustry){//编辑的时候，请求二级，然后进行赋值
                                  this.getSubData(this.firstindustry)
                             }
                        });
                   }else{
                    end.industryType({
                        id: val
                    })
                    .then(res => {                             
                        let data = res.data.data;
                        this.form.secondindustry = "";
                        for(let attr in data){
                                let obj ={};
                                obj.label=data[attr];
                                obj.value=attr;
                                temparr.push(obj)
                        } 
                          this.secoptions = temparr.slice(0);
                         if(this.$route.params.id && this.secondindustry){//编辑的时候，请求二级，然后进行赋值
                                this.form.secondindustry = this.secondindustry.toString()
                         }
                    });
                   }
                    
            },
            clearItem() {
                //this.state3="";
                //this.restaurants=[];
            },
            handleCheckedCitiesChange(value) {
                // let checkedCount = value.length;
                // this.checkAll = checkedCount === this.cities.length;
                // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            arrayUnique(arr, name) {
                var hash = {};
                return arr.reduce(function (item, next) {
                    hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
                    return item;
                }, []);
            },
            handleSelect(item) {
                this.dynamicTags.push(item);
                
                this.dynamicTags = this.arrayUnique(this.dynamicTags,'key');
                console.log(this.dynamicTags);
                this.state3="";
                this.restaurants=_.pull(this.restaurants,item);
            },
            loadAll(val) {
                return val;
            },
            handlePreview() {},
            selectLogo() {
                this.iconLogoShow = true;
                setTimeout(()=>this.$el.querySelector('#fileLogo').click(),300);
            },
            clearUpload() {
				this.isUpload = false;
                this.logofile = "";
                this.iconLogoShow = true;
			},
            upload(event) {
                this.form.path = this.$el.querySelector("#fileLogo").files[0];
                this.logofile = this.form.path.name;
                this.isUpload = true;
                this.iconLogoShow = false;
            },
            validationform() {
                if (!this.form.media_name) {
                    this.$message({
                        message: "请输入媒体名称",
                        type: "warning"
                    });
                    return;
                }
                if (!this.checkAndroid && !this.checkIos) {
                    this.$message({
                        message: "请选择APP包名",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.media_category) {
                    this.$message({
                        message: "请输入媒体一级分类",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.firstindustry) {
                    this.$message({
                        message: "请输入客户一级分类",
                        type: "warning"
                    });
                    return;
                }
                if (!this.form.secondindustry) {
                    this.$message({
                        message: "请输入客户二级分类",
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
                // if (!this.form.plant_id) {
                //     this.$message({
                //         message: "请选平台",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!parseInt(this.form.media_no)) {
                if (!toString(this.form.media_no)) {
                    this.$message({
                        message: "请填写媒体损耗系数：0至100的整数",
                        type: "warning"
                    });
                    return;
                }
                // if (!this.form.adids) {
                //     this.$message({
                //         message: "请填写禁投行业",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.form.price) {
                //     this.$message({
                //         message: "请填写预计价格配置成交价",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.form.pv) {
                //     this.$message({
                //         message: "请填写预计价格配置PV",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.form.media_category) {
                //     this.$message({
                //         message: "请填写媒体分类一级",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.form.media_category_sed) {
                //     this.$message({
                //         message: "请填写媒体分类二级",
                //         type: "warning"
                //     });
                //     return;
                // }
                // if (!this.form.bid_url) {
                //     this.$message({
                //         message: "请填写请求地址",
                //         type: "warning"
                //     });
                //     return;
                // }
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
            getMediaNameById(id, ary) {
                let str = "";
                for (var i = 0; i < ary.length; i++) {
                    if (ary[i].id == id) {
                        str = ary[i].name;
                    }
                }
                return str;
            },
            getMediaList(id) { //获得媒体分类的数据
                console.log(id);
                let that = this;
                //获得媒体分类的列表数据（一，二级数据）platGetMediaList
                meadia.platGetMediaList({
                    mediaId: id
                }).then(res => {
                  
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        if (id == 0) {
                            that.media_category_options = data || [];
                        } else {
                            that.media_category_sed_options = data || [];
                            //console.log(this.media_category_options);
                        }
                    }
                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
           getTypeList(id) { //获得适用用户分类的数据
           
                let that = this;
                //获得适用用户分类的列表数据（一，二级数据）platGetMediaList
                end.industryType({
                    id: id
                }).then(res => {
                 //1   3
               
                  if (res.data.code == 0) {
                        let data = res.data.data;                      
                        for(var attr in data){//100  200
                            if(this.firstindustry == attr ){ 
                                            
                                   this.form.firstindustry = data[attr]                            
                                   }
                                  
                            }
                        }
                       
                   
                     
                });
            },
            changeMediaCategory(val) { //一级媒体分类 
                this.form.media_category_sed = "";
                this.getMediaList(val);
            },
            onSubmit() {
                console.log(typeof this.form.media_no)
                if (this.validationform()) {
                    this.form.price_set = JSON.stringify([{
                        adids: this.form.adids,
                        price: this.form.price,
                        pv: this.form.pv
                    }]);
                    this.form.flag = this.flag ? "1" : "2";
                    this.sources_type = this.getIdsByName(this.checkedCities);
                    let fileData = new FormData();
                    if (this.$route.params.id) {
                        fileData.append("id", this.$route.params.id);
                    }
                    fileData.append("media_name", this.form.media_name);
                    fileData.append("accpet_type", this.form.accpet_type);
                    fileData.append("media_no", this.form.media_no);
                    fileData.append("plant_id", this.form.plant_id);
                    fileData.append("package_A", this.form.package_A);
                    fileData.append("package_I", this.form.package_I);
                    fileData.append("flag", this.form.flag);
                    fileData.append("media_category", this.form.media_category);
                    fileData.append("media_category_sed", this.form.media_category_sed);
                    fileData.append("accpet_type_bidprice", this.checkAcceptPrice ? 1 : 0);
                    fileData.append("firstindustry", this.form.firstindustry); //一级分类
                    fileData.append("secondindustry", this.form.secondindustry); //二级分类
                  
                    // KAPI
                    if (this.form.accpet_type == 'API' && this.checkAcceptKAPI) {
                        fileData.append("accpet_type", "KAPI");
                    }
                    //禁投行业
                    let data = [];
                    _.forEach(this.dynamicTags, function(value) {
                        data.push(value.key);
                    });
                    if(data.length>0){
                        fileData.append("prohibit", JSON.stringify(data));
                    }
                    if (this.$route.params.id) {
                        fileData.append("id", this.form.id);
                    }
                    if (this.form.path != "") {
                        fileData.append("path", this.form.path);
                    }
                    meadia.bidMeadiaEdit(fileData).then(res => {
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
            },
            packageChange(val) {
                // if (val == "ios" && this.form.package_I != "") {
                //     this.checkIos = true;
                // } else {
                //     this.checkIos = false;
                // }
                // if (val == "android" && this.form.package_A != "") {
                //     this.checkAndroid = true;
                // } else {
                //     this.checkAndroid = false;
                // }
                // console.log(this.form.package_I);
                // console.log(this.form.package_A);
                if (this.form.package_I) {
                    this.checkIos = true;
                } else {
                    this.checkIos = false;
                }
                if (this.form.package_A) {
                    this.checkAndroid = true;
                } else {
                    this.checkAndroid = false;
                }
            }
        }
    };
</script>
<style lang="scss">
    @import "../../../style/mixin";
    @import "../../../style/common";
    .media-create {
        .template-hd,
        .base-bd {
            background-color: #fff;
        } // 用于继承字号12
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
            .sibling-elem {
                margin: 10px 0 0 119px;
            }
            .el-checkbox {
                width: 105px;
            }
            .el-checkbox+.el-checkbox{
                margin: 0 20px 0 0;
            }
            .el-tag {
                background-color: #f3f5f9;
                color: #6cabff;
                border: 0 none;
                padding: 8px 12px 5px 11px;
                margin-bottom: 10px;
                height: auto;
                line-height: 0;
                .el-icon-close {
                    right: -3px;
                }
                &+.el-tag {
                    margin-left: 10px;
                }
            }
            .el-autocomplete {
                padding-left: 119px;
                display: block;
            }
            .tags-container {
                padding-left: 120px;
            }
        } // single row title
        .data-item {
            color: $firstc;
            width: 115px;
            display: inline-block;
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
                // margin-left: 27px;
            }
        } // audit specification
        .audit-speci {
            .data-item {
                margin-top: 8px;
            }
            .el-input {
                margin: 0 6px 0 0;
            }
        } // adjust space
        .resource-type {
            margin: 21px 0 30px;
            .data-item {
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