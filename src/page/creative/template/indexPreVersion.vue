<template>
    <!-- 上传Naite素材 -->
    <div class="upload-native-list">
        <el-main>
            <el-row class="native-list-content">
                <el-col :span="24" class="margin-bottom-20">
                    <h1 class="template-hd">筛选项</h1>
                    <div class="creative-param">
                        <div class="creative-nav-row c-size clear">
                            <el-collapse>
                                <el-collapse-item name="1">
                                    <template slot="title" style="height:48px;">
            <span class="fold-iron"></span>
            <span class="hd left">模板尺寸：</span>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedSizes" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="size in sizeData" :label="size" :key="size">{{size}}</el-checkbox>
                </el-checkbox-group>
</template>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="creative-nav-row c-type clear">
                            <span class="hd align-right left">媒体：</span>
                            <div class="bd">
                                <el-checkbox :indeterminate="isIndeterminateType" v-model="checkAllType" @change="handleCheckAllChangeType">全选</el-checkbox>
                                <el-checkbox-group v-model="checkedType" @change="handleCheckedTypeChange">
                                    <el-checkbox v-for="type in typeList" :label="type" :key="type">{{type}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24" class="border-bottom-2">
                    <div class="native-list-bd">
                                <el-input class="el-search right" placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="searchname" @change="getDataByName">
                                </el-input>
                            
                    <el-table :data="pageList.data" style="width: 100%">
                        
                           <el-table-column prop="preview" label="模版预览" :label-width="formLabelWidth">
<template slot-scope="scope">
    <img class="theme-pic" src="../../../style/image/creative/theme-pic.jpg" alt="" />
    <span class="see-iron" @click="preTempalte(scope.row.id)"></span>
</template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="theme" label="模板名称" :label-width="formLabelWidth">
<template slot-scope="scope">
    <el-button class="mould-name" type="text" @click="addNative( scope.row.id)">
        <a href="javascript:void(0);" class="link-jump">{{ scope.row.name }}</a>
    </el-button>
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="status" label="状态">
                            
<template slot-scope="scope">
    <el-switch :v-model="scope.row.flag" active-text="关闭" inactive-text="开启">
    </el-switch>
</template>
                        </el-table-column> -->
                        <el-table-column prop="size" label="尺寸" :label-width="formLabelWidth">
<template slot-scope="scope">
     {{ scope.row.width }}x{{ scope.row.height }}
</template>
                        </el-table-column>
                        <el-table-column prop="family" label="选用媒体" :label-width="formLabelWidth">
<template slot-scope="scope">
     {{ scope.row.media_info }}
</template>
                        </el-table-column>
                        <!-- <el-table-column prop="creativeType" label="创意类型">
<template slot-scope="scope">
     图片JPG
</template>
                        </el-table-column> -->
                        <!-- <el-table-column prop="openType" label="打开类型">
<template slot-scope="scope">
     {{ scope.row.link_type }}
</template>

                        </el-table-column> -->
                        <!-- <el-table-column prop="address" label="点击跳转地址">
<template slot-scope="scope">
    <div class="address-row">
        <span class="add-hd">下载地址</span>
        <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea2"></el-input>
    </div>
</template>
                            
                        </el-table-column> -->
                        <!-- <el-table-column prop="date" label="上传日期">
<template slot-scope="scope">
     {{ scope.row.create_time }}
</template>
                        </el-table-column> -->
                    </el-table>

                     <el-dialog title="制作原生创意" :visible.sync="dialogNatieFormVisible" class="create-origin-poplayer">
        <el-form ref="nativeform" :model="nativeform" >
            <el-form-item label="模版名称：">
                <span class="module-name">{{currentItem.name}}</span>
            </el-form-item>
            <!-- img start -->
            <el-form-item label="图片：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.img">

                    <el-input class="upload-control" 
                    :class="{'upload-input':nativeform.isUploadImg == 'img'}" 
                    :placeholder="'尺寸'+currentItem.main_info.img.w+'*'+currentItem.main_info.img.h+'，大小'+currentItem.main_info.img.size+'kb'" 
                    :readonly="true" v-model="nativeform.imgFileName">
                    <i slot="suffix" class="el-icon-close" @click="clearUpload('img')"></i>
                    </el-input>
                    <el-button size="small" type="upload" @click="selectfile('imgUpload')">上传</el-button>
                    <input ref="imgUpload" type="file" name="pic" accept="*" 
                    @change="upload('img',$event)" style="display:none"/>
   
                <!-- <span class="tips-important"></span> -->

            </el-form-item>
            <!-- img end -->
            <!-- video start -->
            <el-form-item label="视频：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.video">

                <el-input class="upload-control" 
                :class="{'upload-input':nativeform.isUploadVideo == 'video'}" 
                :placeholder="'尺寸'+currentItem.main_info.video.w+'*'+currentItem.main_info.video.h+',大小'+currentItem.main_info.video.size+'kb,时长'+currentItem.main_info.duration+'s'" 
                :readonly="true" v-model="nativeform.videoFileName">
                <i slot="suffix" class="el-icon-close" @click="clearUpload('video')"></i>
                </el-input>
                <el-button size="small" type="upload" @click="selectfile('videoUpload')">上传</el-button>
                <input ref="videoUpload" type="file" name="pic" accept="*" 
                @change="upload('video',$event)" style="display:none"/>
   
                <!-- <span class="tips-important"></span> -->

            </el-form-item>
            <!-- video end -->
            <!-- icon start -->
            <el-form-item label="icon：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.icon">
                    <el-input class="upload-control" 
                    :class="{'upload-input':nativeform.isUploadIcon == 'icon'}" 
                    :placeholder="'尺寸'+currentItem.main_info.icon.w+'*'+currentItem.main_info.icon.h+'，大小'+currentItem.main_info.icon.size+'kb'" 
                    :readonly="true" v-model="nativeform.iconFileName">
                    <i slot="suffix" class="el-icon-close" @click="clearUpload('icon')"></i>
                    </el-input>
                    <el-button size="small" type="upload" @click="selectfile('iconUpload')">上传</el-button>
                    <input ref="iconUpload" type="file" name="pic" accept="*" 
                    @change="upload('img',$event)" style="display:none"/>
   
                <!-- <span class="tips-important"></span> -->

            </el-form-item>
            <!-- icon end -->

            <!-- img1 start -->
            <el-form-item label="组图一：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.img1">
                <el-input class="upload-control" 
                    :class="{'upload-input':nativeform.isUploadImg1 == 'img1'}" 
                    :placeholder="'尺寸'+currentItem.main_info.img1.w+'*'+currentItem.main_info.img1.h+'，大小'+currentItem.main_info.img1.size+'kb'" 
                    :readonly="true" v-model="nativeform.img1FileName">
                    <i slot="suffix" class="el-icon-close" @click="clearUpload('img1')"></i>
                    </el-input>
                    <el-button size="small" type="upload" @click="selectfile('img1Upload')">上传</el-button>
                    <input ref="img1Upload" type="file" name="pic" accept="*" 
                    @change="upload('img1',$event)" style="display:none"/>
                <!-- <span class="tips-important"></span> -->
            </el-form-item>
            <!-- img1 end -->

            <!-- img2 start -->
            <el-form-item label="组图二：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.img2">
                <el-input class="upload-control" 
                    :class="{'upload-input':nativeform.isUploadImg2 == 'img2'}" 
                    :placeholder="'尺寸'+currentItem.main_info.img2.w+'*'+currentItem.main_info.img2.h+'，大小'+currentItem.main_info.img2.size+'kb'" 
                    :readonly="true" v-model="nativeform.img2FileName">
                    <i slot="suffix" class="el-icon-close" @click="clearUpload('img2')"></i>
                    </el-input>
                    <el-button size="small" type="upload" @click="selectfile('img2Upload')">上传</el-button>
                    <input ref="img2Upload" type="file" name="pic" accept="*" 
                    @change="upload('img2',$event)" style="display:none"/>
                <!-- <span class="tips-important"></span> -->
            </el-form-item>
            <!-- img2 end -->

            <!-- img3 start -->
            <el-form-item label="组图三：" class="browse-row" v-if="currentItem.main_info&&currentItem.main_info.img3">
                <el-input class="upload-control" 
                    :class="{'upload-input':nativeform.isUploadImg3 == 'img3'}" 
                    :placeholder="'尺寸'+currentItem.main_info.img3.w+'*'+currentItem.main_info.img3.h+'，大小'+currentItem.main_info.img3.size+'kb'" 
                    :readonly="true" v-model="nativeform.img3FileName">
                    <i slot="suffix" class="el-icon-close" @click="clearUpload('img3')"></i>
                    </el-input>
                    <el-button size="small" type="upload" @click="selectfile('img3Upload')">上传</el-button>
                    <input ref="img3Upload" type="file" name="pic" accept="*" 
                    @change="upload('img3',$event)" style="display:none"/>
                <!-- <span class="tips-important"></span> -->
            </el-form-item>
            <!-- img3 end -->

            <el-form-item label="标题：" v-if="currentItem.main_info&&currentItem.main_info.title">
                <el-input v-model="nativeform.title" 
                :placeholder="'请输入大于'+currentItem.main_info.title.min+'，小于'+currentItem.main_info.title.max+'个字符的标题'" clearable></el-input>
                <!-- <span class="tips-important"></span> -->
            </el-form-item>
            <el-form-item label="描述：" v-if="currentItem.main_info&&currentItem.main_info.desc">
                <el-input  v-model="nativeform.desc" 
                :placeholder="'请输入小于'+currentItem.main_info.desc.max+'个字符的描述'" clearable></el-input>
                <!-- <span class="tips-important"></span> -->
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <div class="is-confirm">
                <el-button type="confirm" @click="submitNativeForm">确认</el-button>
                <el-button type="cancel" @click="closeDialog(false)">取消</el-button>
            </div>
        </div>
    </el-dialog>
                    
                    </div>
                    <div class="block">
                          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                    :current-page="pageList&&pageList.current_page" :page-sizes="[10, 20, 30, 40]" 
                    :page-size="pageList&&pageList.per_page"  layout="total, sizes, prev, pager, next, jumper" 
                    :total="pageList&&pageList.total">
                    </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </div>

</template>

<script>
    import {
        creative
    } from "../../../service/index"
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        data: function() {
            return {
                adList: [], //客户
                adUser: '',
                pageList: [],
                pageSize: 10,
                searchname: "", //
                //创意尺寸
                checkAll: false,
                checkedSizes: [],
                sizeData: [], //创意尺寸
                isIndeterminate: false,
                //媒体类型
                checkAllType: false,
                checkedType: [],
                typeList: [], //媒体类型
                isIndeterminateType: false,
                typeSourceDate: [],
                dialogFormVisible: false,
                nativeform: {
                    name: "",
                    img: "",
                    img1: "",
                    img2: "",
                    img3: "",
                    icon: "",
                    video: "",
                    imgFileName: "",
                    img1FileName: "",
                    img2FileName: "",
                    img3FileName: "",
                    iconFileName: "",
                    videoFileName: "",
                    img1Upload:"",
                    img2Upload:"",
                    img3Upload:"",
                    title: "",
                    desc: "",
                    isUploadImg: "",
                    isUploadVideo: "",
                    isUploadIcon: "",
                    isUploadImg1: "",
                    isUploadImg2: "",
                    isUploadImg3: ""
                },
                currentId: "",
                dialogNatieFormVisible: false,
                formLabelWidth: "20%",
                currentItem: "",
                filename: "",
            }
        },
        mounted() {
            this.setBreadCrumb(this.$route.path.replace("/", ""));
            //创意尺寸
            creative.creativeTemplateSizeList().then(res => {
                if (res.data.code == 0) {
                    this.sizeData = res.data.data.res;
                    this.typeSourceDate = res.data.data.media;
                    for (var key in this.typeSourceDate) {　　　
                        this.typeList.push(this.typeSourceDate[key].name);　　
                    }
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            //当前用户下所有客户
            // creative.getAcountInformation().then(res => {
            //     if (res.data.code == 0) {
            //         this.adList = res.data.data.data;
            //     }
            // });
            //创意列表
            this.getList({
                page: 1,
                pagesize: 10
            });
        },
        methods: {
            ...mapActions([
                "setBreadCrumb"
            ]),
            //创意尺寸
            handleSizeChange(val) {
                this.pageSize = val;
                // creative.creativeListPage({
                //     page: 1,
                //     pagesize: this.pageSize,
                // });
                this.getList({
                    page: 1,
                    pagesize: this.pageSize
                });
            },
            handleCurrentChange(val) {
                // creative.creativeListPage({
                //     page: val,
                //     pagesize: this.pageSize,
                // });
                this.getList({
                    page: val,
                    pagesize: this.pageSize
                });
            },
            //创意尺寸
            handleCheckAllChange(val) {
                this.checkedSizes = val ? this.sizeData : [];
                this.isIndeterminate = false;
                this.getList({
                    size: this.checkedSizes,
                     media: this.gitTypeIds(this.checkedType),
                });
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.sizeData.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.sizeData.length;
                this.getList({
                    size: value,
                     media: this.gitTypeIds(this.checkedType),
                });
            },
            //创意类型
            handleCheckAllChangeType(val) {
                this.checkedType = val ? this.typeList : [];
                this.isIndeterminateType = false;
                this.getList({
                    media: this.gitTypeIds(this.checkedType),
                      size: this.checkedSizes,
                });
                // console.log(this.checkedType);
                // console.log("ids")
                //console.log(this.gitTypeIds(this.checkedType));
            },
            handleCheckedTypeChange(value) {
                let checkedCount = value.length;
                this.checkAllType = checkedCount === this.typeList.length;
                this.isIndeterminateType =
                    checkedCount > 0 && checkedCount < this.typeList.length;
                this.getList({
                    media: this.gitTypeIds(value),
                     size: this.checkedSizes,
                });
                //console.log(this.gitTypeIds(this.checkedType));
            },
            getList(data) {
                creative.creativeTempListPage(data).then(res => {
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
                        this.pageList = res.data.data;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            getStateValue(value) {
                let sourceData = [{
                    key: "开启",
                    value: "1"
                }, {
                    key: "关闭",
                    value: "2"
                }]; //状态集合 1开启 2 关闭
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    for (var k = 0; j < sourceData.length; k++) {
                        if (!sourceData[k]) {
                            break;
                        }
                        if (value[j] == sourceData[k].key) {
                            result.push(sourceData[k].value);
                        }
                    }
                }
                return result;
            },
            gitTypeIds(value) {
                let sourceData = this.typeSourceDate;
                console.log(sourceData);
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    for (var key in sourceData) {
                        if(value[j]==sourceData[key].name){
                            result.push(sourceData[key].id);
                        }
                    }

                }
                return result;
            },
            changUser() {
                console.log(this.adUser);
            },
            getDataByName() {
                this.getList({
                    page: 1,
                    pagesize: 10,
                    seachname: this.searchname
                });
            },
            getIds(value) {
                let result = [];
                for (var j = 0; j < value.length; j++) {
                    result.push(value[j].id);
                }
                return result;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            preTempalte(val) {
                // console.log(val);
                // return;
                this.$router.push({
                    path: "/pretemplate/" + val
                    // path: "/pretemplate"
                });
            },
            addNative(val) {
                this.currentId = val;
                creative.creativeTempInfo({
                    id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        let data = res.data.data;
                        this.currentItem = data;
                        // this.currentItem.title = data.main_info.title;
                        // this.currentItem.desc = data.main_info.desc;
                        // this.currentItem.img = data.main_info.img;
                        this.dialogNatieFormVisible = true;
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            submitNativeForm() {
                // let data = {
                //     ad_id: this.$route.params.id,
                //     template_id: this.currentId
                // };
                // if (this.currentItem.main_info && this.currentItem.main_info.title) {
                //     data.title = this.nativeform.title;
                // }
                // if (this.currentItem.main_info && this.currentItem.main_info.desc) {
                //     data.desc = this.nativeform.desc;
                // }
                let fileData = new FormData();
                fileData.append("ad_id", this.$route.params.id);
                fileData.append("template_id", this.currentId);
                if (this.currentItem.main_info && this.currentItem.main_info.title) {
                    // data.title = this.nativeform.title;
                    fileData.append("title", this.nativeform.title);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.desc) {
                    fileData.append("desc", this.nativeform.desc);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.img) {
                    fileData.append("img", this.nativeform.img);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.img1) {
                    fileData.append("img1", this.nativeform.img1);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.img2) {
                    fileData.append("img2", this.nativeform.img2);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.img3) {
                    fileData.append("img3", this.nativeform.img3);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.icon) {
                    fileData.append("icon", this.nativeform.icon);
                }
                if (this.currentItem.main_info && this.currentItem.main_info.video) {
                    fileData.append("video", this.nativeform.video);
                }
                creative.creativeNative(fileData).then(res => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.dialogNatieFormVisible = false;
                        this.getList({
                            page: 1,
                            pagesize: 10
                        });
                        this.clearform();
                    } else {
                        this.$message.error(res.data.msg);
                    }

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            closeDialog(val) {
                this.dialogNatieFormVisible = false;
                this.clearform();
            },
            clearform() {
                this.nativeform = {
                    name: "",
                    img: "",
                    img1: "",
                    img2: "",
                    img3: "",
                    icon: "",
                    video: "",
                    imgFileName: "",
                    img1FileName: "",
                    img2FileName: "",
                    img3FileName: "",
                    iconFileName: "",
                    videoFileName: "",
                    img1Upload:"",
                    img2Upload:"",
                    img3Upload:"",
                    title: "",
                    desc: "",
                    isUploadImg: "",
                    isUploadVideo: "",
                    isUploadIcon: "",
                    isUploadImg1: "",
                    isUploadImg2: "",
                    isUploadImg3: ""
                }
            },
            clearUpload(val) {
                if(val == 'img1') {
                    this.nativeform.isUploadImg1 = "";
                    this.nativeform.img1FileName = "";
                } else if(val == 'img2') {
                    this.nativeform.isUploadImg2 = "";
                    this.nativeform.img2FileName = "";
                } else if(val == 'img3') {
                    this.nativeform.isUploadImg3 = "";
                    this.nativeform.img3FileName = "";
                } else if(val == 'img') {
                    this.nativeform.isUploadImg = "";
                    this.nativeform.imgFileName = "";
                } else if(val == 'icon') {
                    this.nativeform.isUploadIcon = "";
                    this.nativeform.iconFileName = "";
                } else if(val == 'video') {
                    this.nativeform.isUploadVideo = "";
                    this.nativeform.videoFileName = "";
                }
            },
            upload(key, event) {
				if(key == 'img1') {
                    this.nativeform.img1 = event.currentTarget.files[0];
                    this.nativeform.img1FileName = event.currentTarget.files[0].name;
                    this.nativeform.isUploadImg1 = 'img1';
				} else if(key == 'img2') {
					this.nativeform.img2 = event.currentTarget.files[0];
					this.nativeform.img2FileName = event.currentTarget.files[0].name;
					this.nativeform.isUploadImg2 = 'img2';
				} else if(key == 'img3') {
					this.nativeform.img3 = event.currentTarget.files[0];
					this.nativeform.img3FileName = event.currentTarget.files[0].name;
					this.nativeform.isUploadImg3 = 'img3';
				} else if(key == 'img') {
					this.nativeform.img = event.currentTarget.files[0];
					this.nativeform.imgFileName = event.currentTarget.files[0].name;
					this.nativeform.isUploadImg = 'img';
				} else if(key == 'icon') {
					this.nativeform.icon = event.currentTarget.files[0];
					this.nativeform.iconFileName = event.currentTarget.files[0].name;
					this.nativeform.isUploadIcon = 'icon';
				} else if(key == 'video') {
					this.nativeform.video = event.currentTarget.files[0];
					this.nativeform.videoFileName = event.currentTarget.files[0].name;
					this.nativeform.isUploadVideo = 'video';
				}
				
				
            },
            selectfile(key){
                if(key == 'img1Upload') {
                    this.$refs.img1Upload.click();
                } else if(key == 'img2Upload') {
                    this.$refs.img2Upload.click();
                } else if(key == 'img3Upload') {
                    this.$refs.img3Upload.click();
                } else if(key == 'imgUpload') {
                    console.log(7777)
                    this.$refs.imgUpload.click();
                } else if(key == 'iconUpload') {
                    this.$refs.iconUpload.click();
                } else if(key == 'videoUpload') {
                    this.$refs.videoUpload.click();
                }
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../style/mixin'; // 创意列表-共用样式
    .upload-native-list {
        .el-main {
            background-color: transparent;
        }
        .el-col-24 {
            background-color: #fff;
        }
        .choose-ad {
            font-size: 14px;
            color: #515974;
            margin-right: 5px;
        }
        .creative-nav-row {
            padding: 15px 0;
            position: relative;
            &:first-child {
                padding: 0;
            }
        } // fold icon
        .fold-iron {
            background-color: #6cabff;
            position: absolute;
            top: 10px;
            right: 30px;
            height: 28px;
            width: 39px;
            @include borderRadius(5px);
        }
        .el-checkbox {
            float: left;
            margin-right: 21px;
        }
        .creative-btn-row {
            position: relative;
            padding: 10px 0;
        } // search input item
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
        } // row
        .creative-param {
            padding: 9px 0 10px 30px;
            border-bottom: 2px solid #e1e7f0;
            span {
                font-size: 12px;
                line-height: 20px;
            }
            .hd {
                margin-right: 6px;
                font-weight: bold;
                color: #515974;
            }
            .align-right {
                margin-right: 30px;
            }
            .el-checkbox-group {
                padding-left: 66px;
            }
            .el-collapse-item__arrow {
                float: none;
                position: absolute;
                top: 1px;
                right: 36px;
                z-index: 20;
                color: #ffffff;
                @include transX(90deg);
            }
            .el-collapse-item__arrow.is-active {
                @include transX(-90deg);
            }
        } // table style
        .el-table th:first-child,
        .el-table td:first-child {
            padding-left: 21px;
        }
        .el-table th:nth-child(4),
        .el-table td:nth-child(4) {
            text-align: right;
            padding-right: 16px;
        }
        .el-table th:nth-child(3),
        .el-table td:nth-child(3) {
            text-align: center;
        }
        .el-collapse-item__header {
            height: 52px;
            line-height: 52px;
            padding-right: 70px;
            overflow: hidden;
            border-bottom: 0 none;
            .hd {
                line-height: 52px;
            }
        }
        .el-collapse {
            border: 0 none;
        }
        .el-collapse-item__wrap {
            border-bottom: none;
        }
        .el-collapse-item__header.is-active {
            height: 104px;
            -webkit-transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out;
            transition: .3s height ease-in-out, .3s padding-top ease-in-out, .3s padding-bottom ease-in-out
        }
        .el-collapse-item__content {
            padding-bottom: 0;
        }
    } // 上传native素材
    .native-list-content {
        .mould-name {
            color: #5198f7;
            padding: 0!important;
            .link-jump {
                color: #5198f7;
                &:hover {
                    font-weight: bold;
                    text-decoration: underline;
                }
            }
        }
        .native-list-bd {
            // margin-top: 20px;
            .el-search {
                padding: 20px 20px 20px 0;
                width: 240px;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 20px!important;
            }
            .el-input__prefix {
                left: 78% !important;
            }
        } // pop layer start
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
            padding-right: 0;
            width: 75px;
        }
        .el-dialog__body {
            padding: 6px 0 0 30px;
        }
        .el-dialog__footer {
            padding: 0 0 30px 0;
        } // pop layer end
        .el-input {
            width: 41.5%;
        }
        .upload-wrap {
            display: inline-block;
        }
        .el-input {
            margin-right: 6px;
        }
        .el-form-item {
            margin-bottom: 12px;
            &:nth-child(2) {
                .tips-important {
                    margin-left: 11px;
                }
            }
        }
        .module-name {
            font-size: 12px;
            color: #b1b2c4;
        }
        .is-confirm {
            padding: 20px 0 0 30px;
            background-color: #fff;
            text-align: left;
            .el-button--confirm,
            .el-button--cancel{
                width: 109px;
            }
        }
        .tips-important {
            display: inline-block;
            @include svgbg("../../../style/image/creative/tips-important.svg");
            height: 24px;
            width: 24px;
            vertical-align: -7px;
            @include transX(180deg);
        }
        .see-iron {
            display: inline-block;
            @include svgbg("../../../style/image/creative/see-iron.svg");
            height: 19px;
            width: 25px;
            margin-left: 16px;
            vertical-align: 23px;
            cursor: pointer;
        }
    } // create origin pop layer
    .create-origin-poplayer {
        .el-input {
            width: 240px;
        }
        .browse-row .el-upload-list {
            left: 75px;
        }
    }
</style>