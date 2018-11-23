<template>
<el-col :span="18">
                        <div class="directed-list">
                            <div class="directed-item">
                                
                            <h2 class="template-hd">
                                <span class="item-hd">已定向地域</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row"><span class="province">北京</span></p>
                                <p class="selected-area-row">
                                    <span class="province">河南：</span>
                                    <span>郑州、焦作、信阳、商丘、南阳、鹤壁</span>
                                </p>
                                <p class="selected-area-row">
                                    <span class="province">湖北：</span>
                                    <span>武汉市、黄石市、 襄樊市、十堰市、 荆州市、宜昌市、 荆门市、鄂州市、 孝感市、黄冈市、 咸宁市、随州市</span>
                                </p>
                            </div>
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向时段</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: auto; margin-top: 20px">
                                    <el-table-column prop="name" label="全选">
                                    </el-table-column>
                                    <el-table-column prop="amount" label="">
                                    </el-table-column>
                                    <el-table-column prop="amount0" label="0">
                                    </el-table-column>
                                    <el-table-column prop="amount1" label="1">
                                    </el-table-column>
                                    <el-table-column prop="amount2" label="2">
                                    </el-table-column>
                                    <el-table-column prop="amount3" label="3">
                                    </el-table-column>
                                    <el-table-column prop="amount4" label="4">
                                    </el-table-column>
                                    <el-table-column prop="amount5" label="5">
                                    </el-table-column>
                                    <el-table-column prop="amount6" label="6">
                                    </el-table-column>
                                    <el-table-column prop="amount7" label="7">
                                    </el-table-column>
                                    <el-table-column prop="amount8" label="8">
                                    </el-table-column>
                                    <el-table-column prop="amount9" label="9">
                                    </el-table-column>
                                    <el-table-column prop="amount10" label="10">
                                    </el-table-column>
                                    <el-table-column prop="amount11" label="11">
                                    </el-table-column>
                                    <el-table-column prop="amount12" label="12">
                                    </el-table-column>
                                    <el-table-column prop="amount13" label="13">
                                    </el-table-column>
                                    <el-table-column prop="amount14" label="14">
                                    </el-table-column>
                                    <el-table-column prop="amount15" label="15">
                                    </el-table-column>
                                    <el-table-column prop="amount16" label="16">
                                    </el-table-column>
                                    <el-table-column prop="amount17" label="17">
                                    </el-table-column>
                                    <el-table-column prop="amount18" label="18">
                                    </el-table-column>
                                    <el-table-column prop="amount19" label="19">
                                    </el-table-column>
                                    <el-table-column prop="amount20" label="20">
                                    </el-table-column>
                                    <el-table-column prop="amount21" label="21">
                                    </el-table-column>
                                    <el-table-column prop="amount22" label="22">
                                    </el-table-column>
                                    <el-table-column prop="amount23" label="23">
                                    </el-table-column>
                                </el-table>
                            </div>

                        
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向媒体类型</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row">
                                    <span>社交、电商、视频、资讯、直播</span>
                                </p>
                            </div>
                            
                        
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向媒体</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row">
                                    <span>微信、TIM、探探、京东、淘宝、唯品会、爱奇艺、优酷、头条、虎牙、斗鱼、熊猫</span>
                                </p>
                            </div>
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向广告位</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row">
                                    <span>广告位1、广告位2、广告位3</span>
                                </p>
                            </div>
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向广告位</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row">
                                    <span>Wifi、4G、3G、GPS</span>
                                </p>
                            </div>
                        </div>
                        
                        <div class="directed-item">
                            <h2 class="template-hd">
                                <span class="item-hd">已定向广告位</span>
                                <div class="operation-btn">
                                    <el-button type="primary">删除</el-button>
                                    <el-button type="primary">修改</el-button>
                                </div>
                            </h2>
                            <div class="template-bd">
                                <p class="selected-area-row">
                                    <span>安卓手机、IOS手机</span>
                                </p>
                            </div>
                        </div>
                        </div>
                        
                    </el-col> 
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style lang="scss">


</style>