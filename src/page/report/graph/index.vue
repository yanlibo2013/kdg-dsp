<template>
    <!-- 可视化图表 -->
    <div class="base-data-report">
        <el-main>
            <!-- 查询纬度 start -->
            <el-col :span="24">
                <h1 class="template-hd">查询纬度</h1>
                <div class="base-bd border-bottom-2">
                    <div class="base-row">

                        <span class="label-title">日期：</span>
                        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                        <span class="label-title">客户:</span>
                        <el-select v-model="value" placeholder="请输入关键词" @change="getAdvertiser">
                            <el-option v-for="item in advertiser" :key="item.id" :label="item.com_name" :value="item.id">
                            </el-option>
                        </el-select>
                        <span class="label-title">投放计划:</span>
                        <el-select v-model="value" placeholder="请输入关键词">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    
                    <div class="base-row">
                        <template>
                            <el-radio v-model="checked">消耗</el-radio>
                            <el-radio v-model="checked">展示</el-radio>
                            <el-radio v-model="checked">点击数</el-radio>
                        </template>
                    </div>
                    
                </div>
                
            </el-col>
            <!-- 查询纬度 end -->
            <!-- 地域分布 start -->
            <el-col :span="24">
                <h2 class="template-hd">地域分布</h2>
                <div class="base-bd border-bottom-2">
                    <div class="base-row">

                        地域分布图
                    </div>
                    
                </div>
                
            </el-col>
            <!-- 地域分布 end -->

            <!-- 性别年龄分布 start -->
            <el-col :span="24">
                <el-col :span="12">
                    <h2 class="template-hd">性别分布</h2>
                    <div class="base-bd border-bottom-2">
                        <div class="base-row">

                            性别分布图
                        </div>
                        
                    </div>

                </el-col>
                <el-col :span="12">
                    <h2 class="template-hd">年龄分布</h2>
                    <div class="base-bd border-bottom-2">
                        <div class="base-row">

                            年龄分布图
                        </div>
                        
                    </div>
                </el-col>
            </el-col>
            <!-- 性别年龄分布 end -->
            <!-- 性别年龄分布 start -->
            <el-col :span="24">
                <el-col :span="12">
                    <h2 class="template-hd">媒体类型分布</h2>
                    <div class="base-bd border-bottom-2">
                        <div class="base-row">

                            媒体类型分布
                        </div>
                        
                    </div>

                </el-col>
                <el-col :span="12">
                    <h2 class="template-hd">展现类型分布</h2>
                    <div class="base-bd border-bottom-2">
                        <div class="base-row">

                            展现类型分布
                        </div>
                        
                    </div>
                </el-col>
            </el-col>
            <!-- 性别年龄分布 end -->
            <!-- 报表 start -->
            <el-col :span="24">
                <div class="base-row">

                    <span class="label-title">导出报表：</span>
                    <el-select v-model="value" placeholder="全部" @change="getAdvertiser">
                        <el-option v-for="item in advertiser" :key="item.id" :label="item.com_name" :value="item.id">
                        </el-option>
                    </el-select>
                    <span class="label-title">广告名称：</span>
                    
                    <div class="search-input">
                        <el-input placeholder="请输入关键词" prefix-icon="el-icon-search" v-model="searchname" @change="getDataByName">
                        </el-input>
                    </div>
                    
                </div>
                <div class="base-row">
                    <el-table :data="pageList.data" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column prop="preview" label="日期">
<template slot-scope="scope">
    2017/12/05
</template>
                        </el-table-column>
                        <el-table-column prop="theme" label="客户">
<template slot-scope="scope">
   葱葱郁郁
</template>
                        </el-table-column>
                        <el-table-column prop="status" label="计划">
                            
<template slot-scope="scope">
    默认计划
</template>
                        </el-table-column>
                        <el-table-column prop="size" label="创意">
<template slot-scope="scope">
    测试素材
</template>
                        </el-table-column>
                        <el-table-column prop="family" label="消耗">
<template slot-scope="scope">
    1230908
</template>
                        </el-table-column>
                        <el-table-column prop="creativeType" label="媒体">
<template slot-scope="scope">
     芒果TV
</template>
                        </el-table-column>
                        <el-table-column prop="openType" label="展现类型">
<template slot-scope="scope">
    NATION
</template>

                        </el-table-column>
                        <el-table-column prop="address" label="曝光数">
<template slot-scope="scope">
    129,232,3
</template>
                            
                        </el-table-column>
                        <el-table-column prop="date" label="点击数">
<template slot-scope="scope">
    129,232,3
</template>
                        </el-table-column>
                        <el-table-column prop="date" label="点击率">
<template slot-scope="scope">
    2%
</template>
                        </el-table-column>
                        <el-table-column prop="date" label="平均CPM">
<template slot-scope="scope">
    12.00
</template>
                        </el-table-column>
                        <el-table-column prop="date" label="平均CPC">
<template slot-scope="scope">
    2.00
</template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 报表 end -->
        </el-main>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    export default {
        data: function(){
            return {
                checked: false

            }
        },
        
        methods: {
            ...mapActions(["setBreadCrumb"])

        }
        
    }
</script>

<style lang="scss">
    @import '../../../style/mixin';
    @import '../../../style/common';
    
.base-data-report{
    // 用于继承字号12
    .font12{
        font-size: 12px;
    }
    .el-main{
        background-color: transparent;
    }
    .template-hd,
    .base-bd,
    .display-dimension,
    .export-report{
        background-color: #fff;
    }
    .template-hd{
        padding: 20px 0 20px 30px;
        border-bottom-width: 1px;
    }
    .base-bd{
        padding: 20px 0 0 30px;
    }
    // single row
    .base-row{
        margin-bottom: 23px;
        &:last-child{
            margin-bottom: 0;
        }
    }
    .client-row{
        margin-bottom: 0;
    }
    // date style
    .el-date-editor{
        margin-right: 8px;
        width: 240px;
    }
    // row label
    .data-item{
        margin-right: 5px;
        color: $firstc!important;
    }
    .el-checkbox+.el-checkbox{
        margin: 0 0 0 16px;
    }
    .el-checkbox__label{
        color: $firstc!important;
        @extend .font12;
    }
    .resource-data-item{
        margin-top: 9px;
    }
    // resource row style
    .resource-wrap{
        .el-input{
            width: 100px;
        }
        .multiply{
            margin: 0 11px;
        }
        tr.space-under>td{
            padding-bottom: 20px;
        }
        .ajust-full-width{
            .el-input{
                width: 240px;
            }
        }
        .classify{
            .el-input{
                width: 115px;
            }
            &:first-child{
                margin-right: 7px;
            }
        }
    }
    // display dimension
    .display-dimension{
        .template-hd{
            padding-top: 7px;
        }
        .show-bd{
            padding:20px 0 30px 30px;
        }
        .checkbox-group-item{
            margin-bottom: 20px;
        }
        .show-title{
            color: $secondc;
            margin-right: 5px;
        }
        .el-checkbox__label{
            color: $secondc!important;
            @extend .font12;
        }
        .is-confirm{
            padding-top: 10px;
            background-color: $fc;
        }
    }
    // export report template
    .export-report{
        margin-top: 20px;
        .export-hd{
            padding: 20px 0 20px 30px;
        }
        .export-title{
            color: $firstc;
            padding-right: 1px;
        }
        .ajust-full-width{
            margin-right: 16px;
        }
        .el-input--prefix{
            width: 180px;
            margin-right: 5px;
        }
        .el-input__inner{
            padding: 0 28px 0 14px!important;
        }
        .el-input__prefix{
            left: 83%!important;
        }

    }

}
</style>