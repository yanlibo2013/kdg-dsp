<template>
    <!-- new vision start -->
    <!-- 媒体资源 -->
    <div class="select-bd">
        <div class="basic-set-row common-search-list">
            <label for="" class="data-item second-title left">媒体：</label>
            <el-tabs type="card" @tab-click="tabChange" v-model="activeTab">
                <el-tab-pane name="1-1">
                    <span slot="label">
                                                                                                                                    <span class="select-item ">无限制</span>
                    <i class="el-vertical-line">|</i>
                    </span>
                </el-tab-pane>
                <!-- 按媒体名称 -->
                <el-tab-pane name="1-2" class="margin-bottom-20">
                    <span slot="label">
                                                                                                                                    <span class="select-item">按媒体名称</span>
                    <i class="el-vertical-line">|</i>
                    </span>
                    <!-- <transfer list="按媒体名称"></transfer> -->
                    <!-- left hobbies -->
                    <div class="single-row-search re-orientation-item left">
                        <div class="el-input el-input--prefix">
                            <input autocomplete="off" placeholder="请输入应用名称..." type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keywordMeadia" @keyup="searchDataBykeyword(keywordMeadia)" />
                            <span class="el-input__prefix search-unit">
                                                                                                                                    <i class="el-input__icon el-icon-search"></i>
                                                                                                                                </span>
                            <span class="el-input__prefix close-unit" v-show="keywordMeadia!=''?true:false">
                                                                                                                                    <span class="el-input__prefix-inner">
                                                                                                                                        <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearMeadia"></i>
                                                                                                                                    </span>
                            </span>
                        </div>
                        <el-col :span="24">
                            <div class="district-bd innerbox">
                                <div class="check-all-wrap">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                </div>
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-col>
                    </div>
                    <!-- right hobbies -->
                    <div class="area-list">
                        <span class="turn-iron"></span>
                        <div class="inferior-hd">
                            <span class="clear-all" @click="allClearMeadia">全部清除</span>
                        </div>
                        <div class="inferior-bd clear">
                            <div class="innerbox">
                                <ul class="area-item-row">
                                    <li class="search-item" v-for="item in checkedCities" :key="item">
                                        <span class="account-name">{{item}}</span>
                                        <i class="el-icon-close" @click="removeMeadiaItem(item)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 按媒体名称 end-->
                <!-- 按媒体分类 start-->
                <el-tab-pane name="1-3" class="margin-bottom-20" v-show="false">
                    <span slot="label">
                                                                                                                        <span class="select-item" v-show="false">按媒体分类</span>
                    <i class="el-vertical-line"></i>
                    </span>
                    <!-- <transfer list="按媒体分类"></transfer> -->
                    <!-- left hobbies -->
                    <div class="single-row-search re-orientation-item left">
                        <div class="el-input el-input--prefix">
                            <input autocomplete="off" placeholder="请输入应用名称..." type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keywordMeadia" @keyup="searchDataBykeyword(keywordMeadia)" />
                            <span class="el-input__prefix search-unit">
                                                                                                                                    <i class="el-input__icon el-icon-search"></i>
                                                                                                                                </span>
                            <span class="el-input__prefix close-unit" v-show="keywordMeadia!=''?true:false">
                                                                                                                                    <span class="el-input__prefix-inner">
                                                                                                                                        <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearMeadia"></i>
                                                                                                                                    </span>
                            </span>
                        </div>
                        <el-col :span="24">
                            <div class="district-bd innerbox">
                                <div class="check-all-wrap">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                </div>
                                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                                    <!-- <el-checkbox v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox> -->
                                    <el-checkbox v-for="item in resourceMeadia" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-col>
                    </div>
                    <!-- right hobbies -->
                    <div class="area-list">
                        <span class="turn-iron"></span>
                        <div class="inferior-hd">
                            <span class="clear-all" @click="allClearMeadia">全部清除</span>
                        </div>
                        <div class="inferior-bd clear">
                            <div class="innerbox">
                                <ul class="area-item-row">
                                    <li class="search-item" v-for="item in checkedCities" :key="item">
                                        <span class="account-name">{{item}}</span>
                                        <i class="el-icon-close" @click="removeMeadiaItem(item)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 按媒体分类 end-->
            </el-tabs>
        </div>
        <!-- 广告位 start -->
        <div class="basic-set-row common-search-list">
            <label for="" class="data-item second-title left">广告位：</label>
            <el-tabs type="card" @tab-click="tabChangeAd" v-model="activeTabAd">
                <el-tab-pane name="2-1">
                    <span slot="label">
                                                                                                                                    <span class="select-item ">无限制</span>
                    <i class="el-vertical-line">|</i>
                    </span>
                </el-tab-pane>
                <!-- 按媒体名称 -->
                <el-tab-pane name="2-2" class="margin-bottom-20">
                    <span slot="label">
                                                                                                                                    <span class="select-item">按广告位名称</span>
                    <i class="el-vertical-line"></i>
                    </span>
                    <!-- <transfer list="按广告位名称"></transfer> -->
                    <div class="single-row-search re-orientation-item left">
                        <div class="el-input el-input--prefix">
                            <input autocomplete="off" placeholder="请输入应用名称..." type="text" rows="2" validateevent="true" prefixicon="el-icon-search" clearable="true" class="el-input__inner" v-model="keywordAd" @keyup="searchDataBykeywordAd(keywordAd)" />
                            <span class="el-input__prefix search-unit">
                                                                                                        <i class="el-input__icon el-icon-search"></i>
                                                                                                    </span>
                            <span class="el-input__prefix close-unit" v-show="keywordAd!=''?true:false">
                                                                                                        <span class="el-input__prefix-inner">
                                                                                                            <i class="el-input__icon el-icon-circle-close el-input__clear" @click="clearAd"></i>
                                                                                                        </span>
                            </span>
                        </div>
                        <el-col :span="24">
                            <div class="district-bd innerbox">
                                <div class="check-all-wrap">
                                    <el-checkbox :indeterminate="isIndeterminateAD" v-model="checkAllAD" @change="handleCheckAllChangeAD">全选</el-checkbox>
                                </div>
                                <el-checkbox-group v-model="checkedCitiesAD" @change="handleCheckedCitiesChangeAD">
                                    <!-- <el-checkbox v-for="city in citiesAD" :label="city" :key="city">{{city}}</el-checkbox> -->
                                     <el-checkbox v-for="city in combinationData" :label="city.name" :key="city.id">{{city.name}}</el-checkbox>
                                    <!-- combinationData -->
                                    <!-- <el-checkbox v-for="city in resourceAdList" :label="city.ad_name" :key="city.id">{{city.ad_name}}</el-checkbox> -->
                                </el-checkbox-group>
                            </div>
                        </el-col>
                    </div>
                    <!-- right hobbies -->
                    <div class="area-list">
                        <span class="turn-iron"></span>
                        <div class="inferior-hd">
                            <span class="clear-all" @click="allClearAd">全部清除</span>
                        </div>
                        <div class="inferior-bd clear">
                            <div class="innerbox">
                                <ul class="area-item-row">
                                    <li class="search-item" v-for="item in checkedCitiesAD" :key="item">
                                        <span class="account-name">{{item}}</span>
                                        <i class="el-icon-close" @click="removeAdItem(item)"></i>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <!-- 按媒体名称 end-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        put,
        meadia
    } from "../../../service/index";
    import transfer from "./transfer";
    import _ from "lodash";
    export default {
        components: {
            transfer
        },
        data: function() {
            return {
                // meadialist: [],
                adlist: [],
                meadiagroup: [],
                adgroup: [],
                keywordMeadia: "",
                keywordAd: "",
                //媒体
                checkAll: false,
                checkedCities: [],
                cities: [],
                isIndeterminate: false,
                resourceMeadia: [],
                activeTab: "1-1",
                //广告位
                checkAllAD: false,
                checkedCitiesAD: [],
                citiesAD: [],
                isIndeterminateAD: false,
                resourceAdList: [],
                activeTabAd: "2-1",
                //
                meadiaIds: [],
                adIdsList: [],
                repeaData: [],
                combinationData:[],
                resCombinationData:[]
            }
        },
        mounted() {
            this.checkedCities = [];
            // this.$store.state.meadia.length == 0 && put.mediaMediaName().then(res => {
            //     if (res.data.code == 0) {
            //         // this.meadialist = res.data.data;
            //         this.getMeadiaList(res.data.data);
            //     }
            // });
            // put.mediaadName({plat_id:[parseInt(this.$route.params.id)]});
            meadia.meadiaListbid().then(res => {
                if (res.data.code == 0) {
                    this.resourceMeadia = res.data.data.data;
                    _.forEach(this.resourceMeadia, element => {
                        this.cities.push(element.name);
                    });
                }
            });
        },
        computed: {
            ...mapState({
                meadialist: "meadialist",
                // checkeedMeadiaItem:'checkeedMeadiaItem',
            }),
            ...mapGetters({
                isshowmeadia: "isshowmeadia",
                isshowposition: "isshowposition",
                statecheckeedMeadia: "statecheckeedMeadia"
            }),
            meadia: {
                get: function() {
                    this.meadiagroup = this.$store.state.meadia
                    return this.$store.state.meadia;
                },
                set: function(newValue) {
                    this.$store.state.meadia = newValue;
                }
            },
            adposition: {
                get: function() {
                    return this.$store.state.adposition;
                },
                set: function(newValue) {
                    this.$store.state.adposition = newValue;
                }
            },
            adNamelist() {
                let resusl = [];
                _.forEach(this.resourceAdList, item => {
                    resusl.push(item.ad_name);
                });
                this.citiesAD = resusl;
                return this.citiesAD;
            }
            // adNamelist: {
            //     get: function() {
            //         let resusl = [];
            //         _.forEach(this.resourceAdList, item => {
            //             resusl.push(item.ad_name);
            //         });
            //         return resusl;
            //     },
            //     set: function(newValue) {
            //         this.$store.state.adposition = newValue;
            //     }
            // },
        },
        methods: {
            ...mapActions(["getMeadiaList", "getAdPositionList", "chekAllMeadia", "chekAllAdPosition"]),
            getRepeatItem(val) {
                // var arr = [12,3,4,3,4,5,22,3,4,6,7,6,75,67,56,7,12];
                // var Arr = [];
                // var repArr = [];
                // for(var i = 0; i<arr.length; i++){
                //     if(Arr.indexOf(arr[i]) == -1){
                //         Arr.push(arr[i])
                //     }else{
                //         if(repArr.indexOf(arr[i]) == -1){
                //             repArr.push(arr[i])
                //         }
                //     }
                // }
                var arr = val;
                var Arr = [];
                var repArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (Arr.indexOf(arr[i]) == -1) {
                        Arr.push(arr[i])
                    } else {
                        if (repArr.indexOf(arr[i]) == -1) {
                            repArr.push(arr[i])
                        }
                    }
                }
                // console.log("不重复元素");
                // var evens = _.remove(array, function(n) {
                //     return n % 2 == 0;
                // });
                //return {arr:Arr,repArr:repArr}
                return repArr;
            },
            //get all ad ids
            getAdIdsByresourceData() {
                // let resusl = [];
                // _.forEach(this.resourceAdList, element => {
                //     _.forEach(this.checkedCitiesAD, item => {
                //         if (element.ad_name == item) {
                //             resusl.push(element.ad_id);
                //         }
                //     })
                // });
                // resusl = _.uniq(resusl);
                // return resusl;

                 let resusl = [];
                _.forEach(this.combinationData, element => {
                    _.forEach(this.checkedCitiesAD, item => {
                        if (element.name == item) {
                            resusl.push(element.id);
                        }
                    })
                });
               
                return resusl;
            },
            //get all meadia ids
            getIdsByresourceData() {
                let resusl = [];
                _.forEach(this.resourceMeadia, element => {
                    _.forEach(this.checkedCities, item => {
                        if (element.name == item) {
                            resusl.push(element.id);
                        }
                    })
                });
                resusl = _.uniq(resusl);
                return resusl;
            },
            getNameByresourceData() {
                let resusl = [];
                _.forEach(this.resourceMeadia, element => {
                    resusl.push(element.name);
                });
                return resusl;
            },
            searchDataBykeyword(val) {
                console.log(val);
                let data = _.filter(this.getNameByresourceData(), function(item) {
                    return item.indexOf(val) > -1;
                });
                this.cities = data;
            },
            clearMeadia() {
                this.keywordMeadia = "";
                this.searchDataBykeyword("");
            },
            tabChange(val) {
                this.checkedCities = [];
                this.checkAll = false;
                this.isIndeterminate = false;
                if (this.activeTab == "1-1") {
                    this.getAdList([-1]);
                }
            },
            getCombinationData(){

               let resusl = [];
                _.forEach(this.resourceAdList, item => {
                    // resusl.push(item.ad_name);

                    if(this.isRepeatItme(item.ad_name)){
                        resusl.push({name:item.ad_name+"("+item.ad_id+")",id:item.ad_id});

                    }else{

                        resusl.push({name:item.ad_name,id:item.ad_id});

                    }
                     
                    // _.forEach(this.repeaData, val => {
                    // });
                });
                return resusl;


            },
            getAdList(val) {
                if (val.length == 0) {
                    this.resourceAdList = []
                    return;
                }
                meadia.getAdByMeadia({
                    media_id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.resourceAdList = res.data.data;

                        //获取重复元素
                       
                        this.citiesAD = this.getAdNameByData();

                         this.repeaData = this.getRepeatItem(this.citiesAD);

                         let data=this.getCombinationData();

                          this.combinationData=data;
                          this.resCombinationData=data;


                        //  this.combinationData=this.getCombinationData();
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            initAdList(val) {
                if (val.length == 0) {
                    this.resourceAdList = []
                    return;
                }
                meadia.getAdByMeadia({
                    media_id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.resourceAdList = res.data.data;
                        //this.citiesAD = _.uniq(this.getAdNameByData());

                         this.citiesAD = this.getAdNameByData();

                         this.repeaData = this.getRepeatItem(this.citiesAD);

                         this.combinationData=this.getCombinationData();
                        if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                            this.checkedCitiesAD = this.getAdName(this.$store.state.checkedAdItem);
                            this.chekAllAdPosition(this.checkedCitiesAD);
                            if (this.checkedCitiesAD.length > 0) {
                                this.activeTabAd = "2-2"
                            }
                        }
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            //媒体
            allClearMeadia() {
                this.checkedCities = [];
                this.checkAll = false;
                this.getAdList(this.getIdsByresourceData());
            },
            removeMeadiaItem(val) {
                this.checkedCities = _.pull(_.cloneDeep(this.checkedCities), val);
                this.isIndeterminate = this.checkedCities.length > 0 && this.checkedCities.length < this.cities.length;
                this.getAdList(this.getIdsByresourceData());
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;
                this.getAdList(this.getIdsByresourceData());
                this.chekAllMeadia(this.checkedCities);
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
                this.getAdList(this.getIdsByresourceData());
                //console.log(this.checkedCities);
            },
            //广告位
            handleCheckAllChangeAD(val) {
                this.checkedCitiesAD = val ? _.uniq(this.citiesAD) : [];
                this.isIndeterminateAD = false;
                this.chekAllAdPosition(this.checkedCitiesAD);
            },
            handleCheckedCitiesChangeAD(value) {
                let checkedCount = value.length;
                this.checkAllAD = checkedCount === this.citiesAD.length;
                this.isIndeterminateAD = checkedCount > 0 && checkedCount < this.citiesAD.length;
                this.chekAllAdPosition(this.checkedCitiesAD);
            },
            clearAd() {
                this.keywordAd = "";
                this.searchDataBykeywordAd("");
            },
            allClearAd() {
                this.checkedCitiesAD = [];
                this.checkAllAD = false;
                this.isIndeterminateAD = false;
            },
            searchDataBykeywordAd(val) {
                // let data = _.filter(this.getAdNameByData(), function(item) {
                //     return item.indexOf(val) > -1;
                // });
                // this.citiesAD = data;
                let data = _.filter(this.resCombinationData, function(item) {
                    return item.name.indexOf(val) > -1;
                });
                this.combinationData = data;
                //combinationData
            },
            removeAdItem(val) {
                this.checkedCitiesAD = _.pull(_.cloneDeep(this.checkedCitiesAD), val);
                this.isIndeterminateAD = this.checkedCitiesAD.length > 0 && this.checkedCitiesAD.length < this.citiesAD.length;
                // this.checkedCities = _.pull(_.cloneDeep(this.checkedCities), val);
                // this.isIndeterminate = this.checkedCities.length > 0 && this.checkedCities.length < this.cities.length;
            },
            getAdNameByData() {
                let resusl = [];
                _.forEach(this.resourceAdList, item => {
                    resusl.push(item.ad_name);
                });
                return resusl;
            },
            isRepeatItme(val){

                let result=false;

                _.forEach(this.repeaData,item=>{
                    if(item==val){
                        result=true;
                    }
                })

                return result;

            },
            tabChangeAd(val) {
                this.checkedCitiesAD = [];
                this.checkAllAD = false;
                this.isIndeterminateAD = false;
            },
            getMeadiaName(res, val) {
                let result = [];
                _.forEach(res, item => {
                    _.forEach(val, sub => {
                        if (item.id == sub) {
                            result.push(item.name);
                        }
                    });
                });
                return result;
            },
            getAdName(val) {
                let result = [];
                _.forEach(this.combinationData, item => {
                    _.forEach(val, sub => {
                        if (item.id == sub) {
                            result.push(item.name);
                        }
                    });
                });
                return result;
            },
            getMeadiaType() {
                return {
                    meadia: this.activeTab,
                    ad: this.activeTabAd
                }
            },
            initMeadiaComponets() {
                meadia.meadiaListbid().then(res => {
                    if (res.data.code == 0) {
                        // this.resourceMeadia = res.data.data.data;
                        // _.forEach(this.resourceMeadia, element => {
                        //     this.cities.push(element.name);
                        // });
                        this.initData(res.data.data.data);
                    }
                });
            },
            initData(val) {
                if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                    this.checkedCities = _.uniq(this.getMeadiaName(val, _.cloneDeep(this.$store.state.checkeedMeadiaItem)));
                    this.chekAllMeadia(this.checkedCities);
                    if (this.checkedCities.length > 0) {
                        this.activeTab = "1-2"
                        // this.checkAll = true;
                    }
                    if (this.$store.state.checkeedMeadiaItem.length > 0) {
                        this.initAdList(_.cloneDeep(this.$store.state.checkeedMeadiaItem));
                    }
                }
                if (this.$store.state.meadia.length > 0) {
                    this.checkedCities = _.cloneDeep(this.$store.state.meadia);
                    this.activeTab = "1-2";
                }
            }
        }
    }
</script>

<style scoped>

</style>