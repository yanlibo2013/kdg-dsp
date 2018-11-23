<template>
    <!-- 定向条件 -->
    <div class="redirect clear border-bottom-2">
        <h2 class="template-hd">定向条件</h2>
        <el-col :span="6" class="redirect-config-select" >
            <div class="innerbox">
                <el-button type="danger" round @click="showResult">已定向</el-button>
                <!-- 小菜单栏 -->
                <el-menu class="inner-menu" @select="handleSelect">
                    <el-menu-item index="1-1">
                        <template slot="title">
                             <i class="el-icon-resource"></i>媒体资源
                        </template>
                            </el-menu-item>



                            <el-menu-item index="2-1">
<template slot="title">
    <i class="el-icon-thirdgroup"></i>
    人群
</template>
                            </el-menu-item>
                            <el-menu-item index="3-1">
<template slot="title">
    <i class="el-icon-interests"></i>
    兴趣
</template>
                            </el-menu-item>
                            <el-menu-item index="4-1">
<template slot="title">
    <i class="el-icon-area"></i>
    地域
</template>
                            </el-menu-item>
                            <!-- <el-menu-item index="5-1">
<template slot="title">
    <i class="el-icon-timeslot"></i>
    周期时段
</template>
                            </el-menu-item> -->

                            <el-menu-item index="6-1">
<template slot="title">
    <i class="el-icon-network"></i>
    上网类型
</template>
                            </el-menu-item>
                            
                            <el-menu-item index="7-1">
<template slot="title">
    <i class="el-icon-webconfig"></i>
    设备类型
</template>
                            </el-menu-item>

                        </el-menu>
            </div>

            
            
                        
                    </el-col>
                    		
                    <el-col :span="18" class="right-line">
                    <!-- 媒体资源 start -->

                         <div :class="isShowMeadia">
                            <h2 class="template-hd">媒体资源</h2>
                            <vMedia ref="vMedia" :isShow='isShow'></vMedia>
                                
                        </div>
                    <!-- 媒体资源 end -->
                        
                    <!-- 人群 start -->
                        <div v-if='isShow=="2-1"' class="third-party-group">

                            <div class="animated bounceInRight">
                                 <h2 class="template-hd animated bounceInRight">人群</h2>
                        
                            <div class="select-bd margin-bottom-10 animated bounceInRight">
                                <!-- 性别： -->
                                <div class="group-each-item">
                                    <label for="" class="data-item left">性别：</label>
                                      <el-checkbox label="无限制" v-model="unCheckSex" @change="unlimitsex"></el-checkbox>
                                   
                                    <el-checkbox-group v-model="checkedsex" @change="handleCheckedSex">
                                         
                                        <el-checkbox v-for="item in sex" :label="item" :key="item">{{item}}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <!-- 年龄： -->
                                <div class="group-each-item">
                                    <label for="" class="data-item left">年龄：</label>
                                      <el-checkbox label="无限制" v-model="unCheckAge" @change="unlimitage"></el-checkbox>
                                    <el-checkbox-group v-model="checkedage" @change="handleCheckedAge">
                                        <el-checkbox v-for="item in age" :label="item" :key="item">{{item}}</el-checkbox>
                                    </el-checkbox-group>
                                    
                                </div>


                            </div>

                            </div>
                           
                        </div>

                    <!-- 人群 end -->
			        <!-- 兴趣 start -->
                        <div v-if='isShow=="3-1"' class="hobbies-interests animated bounceInRight">
                            <div class="animated bounceInRight">

                                  <h2 class="template-hd ">兴趣</h2>
                            
                            <div class="select-bd t">
                                <div class="basic-set-row common-search-list">
                                <label for="" class="data-item left">分类：</label>
                                <el-tabs type="card" v-model="activeTabinterest" @tab-click="tabChange(activeTabinterest)">
                                    <el-tab-pane name="3-1" >
                                        <span slot="label" >
                                                        <span class="select-item ">无限制</span>
                                        <i class="el-vertical-line">|</i>
                                        </span>
                                    </el-tab-pane>
                                    <el-tab-pane name="3-2">
                                        <span slot="label">
                                                        <span class="select-item">按兴趣分类</span>
                                        <i class="el-vertical-line"></i>
                                        </span>
                                        <div class="single-row-search re-orientation-item left">
    
                                            <el-col :span="12">
                                                <div class="district-hd">
                                                    <span class="clear-all">一级分类</span>
                                                </div>
                                                <div class="district-bd innerbox">
                                                    <el-checkbox-group v-model="checkedhobby" @change="handleCheckedCitiesChangeHobby">
                                                        <el-checkbox v-for="item in firoptions" :label="item.label" :key="parseInt(item.value)">{{item.label}}
                                                            <i class="el-icon-arrow-right"></i>
                                                        </el-checkbox>
                                                    </el-checkbox-group>

                                                </div>
                                            </el-col>
                                            
                                            <el-col :span="12">
                                                <div class="district-hd">
                                                    <span class="clear-all">二级分类</span>
                                                </div>
                                                <div class="district-bd innerbox">
                                                    <el-checkbox-group v-model="checkedhobbySub">
                                                       <el-checkbox v-for="item in secoptions" :label="item.label" :key="parseInt(item.value)">{{item.label}}
                                                            <i class="el-icon-arrow-right"></i>
                                                        </el-checkbox>
                                                    </el-checkbox-group>
                                                </div>
                                            </el-col>
                                        </div>
                                        <div class="area-list">
                                            <span class="turn-iron"></span>
                                            <div class="inferior-hd">
                                                <span class="clear-all" @click="allClearHobby">全部清除</span>
                                            </div>
                                            <div class="inferior-bd clear">
                                                <div class="innerbox">
                                                    <ul class="area-item-row" v-for="item in checkedhobbySub">
                                                        <li class="search-item">
                                                            <span class="account-name">{{item}}</span>
                                                            <i class="el-icon-close" @click="delHobby(item)"></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </el-tab-pane>
                                </el-tabs>
                            </div>

                            </div>
                          

                            </div>
                        </div>
                    <!-- 兴趣 end -->
                    <!-- 地域 start -->
                        <div :span="18" class="orientation-wrap  " v-if='isShow=="4-1"'>
                            <h2 class="template-hd animated bounceInRight">地域</h2>
                            <div class="select-bd animated bounceInRight">
                                <!-- 地域组件 start -->
                                <vLocal ref="vlocal" :isShow='isShow'></vLocal>

                                <!-- 地域组件 end -->
                                <div class="area-list">
                                    <span class="turn-iron"></span>
                                    <div class="inferior-hd" @click="allClear">全部清除</div>
                                        <el-scrollbar class="inferior-bd clear">
<template v-for="item in terrainResult">
    <template v-if="item.chiled">
                                                                                        <div class="area-item-row">
                                                                                                <p class="area-province">{{item.name}}</p>
                                                                                                <!-- <label v-for="(subItem,i) in item.cityies" :key="i" >{{subItem}}</label> -->
                                                                                            <el-checkbox-group v-model="checkedCities1">
                                                                                                <el-checkbox v-for="(subItem,i) in item.chiled"  :label="subItem.name" :disabled="true" :checked='true' >{{subItem.name}}</el-checkbox>
                                                                                            </el-checkbox-group>
                                                                                        </div>
</template>
<template v-else>
    <p class="area-province">
        {{item.name}}</p>
</template>
                                                    </template>
                                        </el-scrollbar>
                                </div>

                            </div>
                        </div>
                    
                    <!-- 地域 end -->
                    <!-- 周期时段 start -->
                        <div v-if='isShow=="5-1"' class="animated bounceInRight">
                            <h2 class="template-hd">周期时段</h2>
                            <div class="select-bd time-direct">
                                <div class="basic-set-row common-search-list">
                                    <label for="" class="data-item left">投放周期：</label>
                                    <el-tabs type="card" v-model="activeTabDate" @tab-click="tabChangeDate(activeTabDate)">
                                        <el-tab-pane name="5-1-1" >
                                            <span slot="label" >
                                                            <span class="select-item ">持续投放</span>
                                            <i class="el-vertical-line">|</i>
                                            </span>
                                        </el-tab-pane>
                                        <!-- 按媒体名称 -->
                                        <el-tab-pane name="5-2-1" class="margin-bottom-15">
                                            <span slot="label">
                                                            <span class="select-item">设置周期</span>
                                            <i class="el-vertical-line"></i>
                                            </span>
                                            <el-date-picker class="close-icon-adjust" v-model="timePeriod" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeDate">
                                            </el-date-picker>
                                        </el-tab-pane>
                                        <!-- 按媒体名称 end-->
                                    </el-tabs>
                                </div>
                                <!-- 投放时段 -->
                                <div class="basic-set-row common-search-list">
                                    <label for="" class="data-item left">投放时段：</label>
                                    <el-tabs type="card" v-model="activeTabPeriod" @tab-click="tabChangePeriod(activeTabPeriod)">
                                        <el-tab-pane name="6-1-1" >
                                            <span slot="label" >
                                                            <span class="select-item ">全天投放</span>
                                            <i class="el-vertical-line">|</i>
                                            </span>
                                        </el-tab-pane>
                                        <!-- 按媒体名称 -->
                                        <el-tab-pane name="6-2-1" class="margin-bottom-30">
                                            <span slot="label">
                                                <span class="select-item">设置时段</span>
                                                <i class="el-vertical-line"></i>
                                            </span>
                                             <!-- <DragSelect  selectorClass="item">
                                                         <template slot-scope="{ selectedItems }"> -->
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th @click="checkedAll">全选</th>
                                                        <th class="special-cell"></th>
                                                        <th v-for="h in hours" @click="singeHour(h)">{{h}}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   
                                                    <tr>
                                                        <th class="special-cell-t"></th>
                                                        <th class="special-cell-s"></th>
                                                        <td colspan="24" class="special-cell-t"></td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("一")'>一</th>
                                                        <th rowspan="7" class="special-cell"></th>
                                                        <td v-for="h in monday" @click="activateMondayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("二")'>二</th>
                                                        <td v-for="h in tuesday" @click="activateTuesdayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("三")'>三</th>
                                                    <td v-for="h in wendesday" @click="activateWendesdayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("四")'>四</th>
                                                    <td v-for="h in tursday" @click="activateThusdayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("五")'>五</th>
                                                    <td v-for="h in friday" @click="activateFridayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("六")'>六</th>
                                                    <td v-for="h in saturday" @click="activateSaturDayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                    <tr>
                                                        <th @click='allDay("日")'>日</th>
                                                    <td v-for="h in weekday" @click="activateWeekDayCell(h)" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                    </tr>
                                                   
                                                </tbody>
                                            </table>

                                             <!-- </template>
                                                     </DragSelect> -->

                                        </el-tab-pane>
                                        <!-- 按媒体名称 end-->
                                    </el-tabs>
                                </div>





                            </div>
                        </div>
    
                    <!-- 周期时段 end -->
                    <!-- 上网类型 start -->
                    
                        <div v-if='isShow=="6-1"' class="network-type">

                            <div class="animated bounceInRight">
                                <h2 class="template-hd">上网类型</h2>
                            </div>

                            
                            
                            <div class="select-bd margin-bottom-10 animated bounceInRight">
                                <label for="" class="data-item left animated bounceInRight">联网类型：</label>
                                 <el-checkbox label="无限制" v-model="unCheckNetWork" @change="unlimitNetWork" class="animated bounceInRight"></el-checkbox>
                            <el-checkbox-group v-model="checkedNetworkType" @change="handleCheckedNetworkTypeChange" class="el-checkbox-group animated bounceInRight">
                                
                                <el-checkbox v-for="item in network" :label="item" :key="item">{{item}}</el-checkbox>
                            </el-checkbox-group>
                            </div>

                        </div>

                    <!-- 上网类型 end -->
                    <!-- 设备类型 start -->
                    
                        <div :span="18"  v-if='isShow=="7-1"' class="network-type">


                            <h2 class="template-hd animated bounceInRight" >设备类型</h2>
                            <div class="select-bd animated bounceInRight" >
                                <label for="" class="data-item left">设备类型：</label>
                                 <el-checkbox label="无限制" v-model="unCheckNetDevice" @change="unlitmitdevice"></el-checkbox>
                                <el-checkbox-group v-model="checkedDeviceType" @change="handleCheckedDeviceChange" >
                                    <el-checkbox v-for="item in device" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    <!-- 设备类型 end -->
                    <!-- 已定向内容展示 start -->
                    <div class="config-scroll">
                        <div class="innerbox">
                        <el-col :span="18" v-if='isShow=="result"' class="already-direct-wrap animated bounceInUp">
                            <div class="directed-list " >
                                   <div class="directed-item" v-if='meadia.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向媒体</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("1-1-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("1-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                            <span>{{meadia.join("、")}}</span>
                                        </p>
                                    </div>
                                    
                                
                                </div>

                                
                                

                                <div class="directed-item" v-if='adposition.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向广告位</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("1-1-2")'>删除</el-button>
                                            <el-button type="revise" @click='modify("1-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                            <span>{{this.$store.state.adposition.join("、")}}</span>
                                        </p>
                                    </div>
                                </div>

                                 <div class="directed-item" v-if='unCheckSex||checkedsex.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向性别</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("2-1-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("2-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                            <!-- <span>{{this.$store.state.adposition.join("、")}}</span> -->
                                            <span>{{unCheckSex?"无限制":checkedsex.join(",")}}</span> 
                                        </p>
                                    </div>
                                </div>

                                   <div class="directed-item" v-if='unCheckAge||checkedage.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向年龄</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("2-1-2")'>删除</el-button>
                                            <el-button type="revise" @click='modify("2-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                            <!-- <span>{{this.$store.state.adposition.join("、")}}</span> -->
                                            <span>{{unCheckAge?"无限制":checkedage.join(",")}}</span> 
                                        </p>
                                    </div>
                                </div>

                                <div class="directed-item" v-if='checkedhobbySub.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定兴趣</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("3-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("3-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                            <!-- <span>{{this.$store.state.adposition.join("、")}}</span> -->
                                            <span>{{checkedhobbySub.join(",")}}</span> 
                                        </p>
                                    </div>
                                </div>

                                <div class="directed-item  " v-if="terrainResult.length!=0">
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向地域</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("4-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("4-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row" v-for="item in terrainResult">
                                            <span class="province">{{item.name}}:</span>
                                            <span class="city-items">{{getSubCity(item.chiled).join("、")}}</span>
                                        </p>
                                    </div>
                                </div>

                                  <div class="directed-item" v-if='timePeriod.length>0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向周期</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("5-1-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("5-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                           <span> 开始时间{{startDate}} 结束时间{{endDate}} </span> 
                                        </p>
                                    </div>
                                </div>

                                <div class="directed-item" v-if="isResultTimePeriod">
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向时段</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("2-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("5-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd time-direct" >
                                        <table>
                                            <col v-for="h in hours"></col>
                                            <thead>
                                                <tr>
                                                    <th @click="checkedAll">全选</th>
                                                    <th class="special-cell"></th>
                                                    <th v-for="h in hours">{{h}}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th class="special-cell-t"></th>
                                                    <th class="special-cell-s"></th>
                                                    <td colspan="24" class="special-cell-t"></td>
                                                </tr>
                                                <tr>
                                                    <th>一</th>
                                                    <th rowspan="7" class="special-cell"></th>
                                                    <td v-for="h in monday"  :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>二</th>
                                                    <td v-for="h in tuesday" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>三</th>
                                                <td v-for="h in wendesday"  :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>四</th>
                                                <td v-for="h in tursday" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>五</th>
                                                <td v-for="h in friday"  :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>六</th>
                                                <td v-for="h in saturday"  :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                                <tr>
                                                    <th>日</th>
                                                <td v-for="h in weekday" :class='h.value=="1"?"selcted":""'>{{h.key}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                            
                                </div>

                                <div class="directed-item" v-if='unCheckNetWork||checkedNetworkType.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向网络类型</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("6-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("6-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                           <span>{{unCheckNetWork?"无限制":checkedNetworkType.join(",")}}</span> 
                                        </p>
                                    </div>
                                </div>

                                <div class="directed-item" v-if='unCheckNetDevice||this.checkedDeviceType.length!=0'>
                                    <h2 class="template-hd">
                                        <span class="item-hd">已定向设备</span>
                                        <div class="operation-btn">
                                            <el-button type="danger" @click='del("7-1")'>删除</el-button>
                                            <el-button type="revise" @click='modify("7-1")'>修改</el-button>
                                        </div>
                                    </h2>
                                    <div class="template-bd">
                                        <p class="selected-area-row">
                                             <span>{{unCheckNetDevice?"无限制":checkedDeviceType.join(",")}}</span> 
                                        </p>
                                    </div>
                                    
                                
                                </div>

                             

                               
                            </div>
                            
                        </el-col>
                        </div>

                    </div>
                    <!-- 已定向内容展示 end -->
                    </el-col>
		             
                    
                </div>
</template>

<script>
    import {
        mapState,
        mapActions,
        mapGetters
    } from "vuex";
    import {
        put,
        end,
        meadia
    } from "../../../service/index";
    import _ from "lodash";
    // import rn from "random-number";
    import randomstring from "random-string";
    import vLocal from "./local"
    import vMedia from "./meadia"
    import fileServer from 'file-saver';
    import moment from "../../../common/moment";
    import DragSelect from 'vue-drag-select'
    export default {
        // props: ['detailsItem'],
        components: {
            vLocal,
            vMedia,
            DragSelect
        },
        computed: {
            ...mapState({
                terrainResult: "terrainResult",
                result: "result",
                monday: "monday",
                tuesday: "tuesday",
                wendesday: "wendesday",
                tursday: "tursday",
                friday: "friday",
                saturday: "saturday",
                weekday: "weekday",
                networktype: "networktype",
                meadia: "meadia",
                adposition: "adposition",
                adList: "adList"
            }),
            // setSubAllchecked() {
            //     return this.checkedCitiesSub.length == this.cities.length && this.checkedCitiesSub.length != 0;
            // },
            setSubAllchecked: {
                get: function() {
                    return this.checkedCitiesSub.length == this.cities.length && this.checkedCitiesSub.length != 0;
                },
                set: function(val) {
                    //console.log(val);
                    // console.log(this.checkedCitiesSub);
                    // return this.checkedCitiesSub.length == this.cities.length ?true:false;
                    if (val) {
                        //console.log(this.checkedCitiesSub);
                        console.log("if");
                        let result = [];
                        for (var j = 0; j < this.cities.length; j++) {
                            result.push(this.cities[j].name);
                        }
                        //this.checkedCitiesSub=result;
                        console.log(this.checkedCitiesSub);
                    } else {
                        console.log("else");
                        this.checkedCitiesSub = [];
                    }
                }
            },
            dynamicSourceData() {
                console.log("dynamicSourceData");
                return this.sourceData;
            },
            searchData() {
                var search = this.search;
                if (search) {
                    return this.province.filter(function(province) {
                        return Object.keys(province).some(function(key) {
                            return String(province[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.province;
            },
            getAdData() {
                return this.Ad;
            },
            isShowMeadia() {
                //media-adsite animated bounceInRight hide-meadia
                let result = "";
                if (this.isShow == "1-1") {
                    result = "media-adsite animated bounceInRight";
                } else {
                    result = "media-adsite animated bounceInRight hide-meadia";
                }
                return result;
            }
        },
        data: function() {
            return {
                activeTabinterest: "3-1",
                activeTabDate: "5-1-1",
                activeTabPeriod: "6-1-1",
                inferiorBoxFixed: false,
                //地域定向条件
                //北京
                activeNamebudget: "",
                allcities: [],
                checkAllbeijing: true,
                checkedbeijing: [],
                beijing: [],
                isIndeterminatebeijing: false,
                //河北
                checkAllhebei: false,
                checkedhebei: [],
                hebei: [],
                isIndeterminatehebei: false,
                //山西
                checkAllshanxi: false,
                checkedshanxi: [],
                shanxi: [],
                isIndeterminateshanxi: false,
                detailsItem: "",
                province: [],
                cities: [],
                search: "",
                sourceData: [], //城市父节点
                sourceDataSub: [], //城市子节点
                sourceMediaData: [],
                hours: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                checkAllDays: "0",
                //父节点
                checkAll: false,
                checkedCities: [],
                isIndeterminate: false,
                //子节点
                checkAllSub: false,
                checkedCitiesSub: [],
                isIndeterminateSub: false,
                oldValue: [],
                oldValueSub: [],
                isShow: "",
                //网络类型
                checkAllNet: false,
                checkAllDevice: false,
                isIndeterminateNet: false,
                isIndeterminateDevice: false,
                checkedNetworkType: [],
                checkedDeviceType: [],
                checkedThirdGroup: ['A', 'B', 'C'],
                network: ["wifi", "5G", "4G", "3G", "2G", "GPRS"],
                device: ["Android", "iOS"],
                //资源
                checkAllMeadia: false,
                checkAllAd: false,
                isIndeterminateMeadia: false,
                isIndeterminateAd: false,
                checkedMeadia: [],
                checkedAd: [],
                Meadia: [],
                Ad: [],
                //第三方媒体人群
                checkAllMeadiaPerson: false,
                checkAllPerson: false,
                isIndeterminateMeadiaPerson: false,
                isIndeterminatePerson: false,
                checkedMeadiaPerson: [],
                checkedmeadiathird: [],
                checkedage: [],
                checkedsex: [],
                checkedindustry: [],
                checkedinterest: [],
                checkededuction: [],
                checkedincome: [],
                checkedhobby: [],
                meadiathird: [{
                    key: "51",
                    value: "虎扑"
                }, {
                    key: "52",
                    value: "音悦台"
                }, {
                    key: "53",
                    value: "触宝"
                }, {
                    key: "54",
                    value: "百合婚恋"
                }, {
                    key: "55",
                    value: "芒果TV"
                }, {
                    key: "56",
                    value: "风行视频"
                }, {
                    key: "57",
                    value: "WPS"
                }],
                age: [
                    "<=18",
                    "19-23",
                    "24-30",
                    "31-40",
                    "41-50",
                    ">50"
                ],
                sex: ["男", "女"],
                industry: ["高新科技", "信息传媒", "金融", "服务业", "教育", "医疗服务", "艺术娱乐", "制造加工", "地产建筑", "贸易零售", "公共服务", "开采冶金", "交通仓储", "农林牧渔"],
                interest: ["运动", "饮食", "音乐", "舞蹈", "影视", "旅行", "阅读"],
                eduction: ["初中", "高中", "专科", "本科", "硕士", "博士"],
                income: [
                    "[0, 3000]",
                    "[3000, 5000]",
                    "[5000, 8000]", "[8000, 10000]",
                    "[10000, 15000]",
                    '[15000, "+∞"]'
                ],
                hobby: ["体育", "游戏", "音乐", "综艺节目", "电影", "电视剧", "动漫", "婚恋", "社交", "办公"],
                //兴趣 
                ismondaystatus: false, //默认全天24小时不全选
                istuesdaystatus: false,
                iswesdaystatus: false,
                isthuesdaystatus: false,
                isfridaystatus: false,
                isstadaystatus: false,
                issundaystatus: false,
                zero: false,
                first: false,
                second: false,
                third: false,
                fifth: false,
                sixth: false,
                seventh: false,
                eighth: false,
                ninth: false,
                firstten: false,
                eleventh: false,
                twelfth: false,
                thirteenth: false,
                fourteen: false,
                fifteen: false,
                sixteen: false,
                seventeen: false,
                eightteen: false,
                nineteen: false,
                twenty: false,
                twenty1: false,
                twenty2: false,
                twenty3: false,
                twenty4: false,
                peoplepackageleft: [{
                    id: "first",
                    name: ""
                }],
                peoplepackage: [],
                oldCheckedCity: [],
                oldCheckedCitySub: [],
                isResultTimePeriod: false,
                timePeriod: [], //投放周期
                firoptions: [],
                secoptions: [],
                checkedhobbySub: [],
                oldValueNetWork: [],
                unCheckNetWork: true,
                unCheckNetDevice: true,
                unCheckSex: true,
                unCheckAge: true,
                checkedCities1: [],
                startDate: "",
                endDate: "",
                resourceTypeData: [],
                dataintrest: []
            };
        },
        mounted() {
            // 小菜单栏悬浮滚动
            window.addEventListener("scroll", this.handleScroll);
            if (this.$route.path.replace("/", "").indexOf("createplan") >= 0) {
                this.$store.state.terrainResult = [];
            }
            // if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
            //     this.isResultTimePeriod = true;
            // }
            //地域  //地域
            put.campRegion().then(res => {
                if (res.data.code == 0) {
                    // console.log(res);
                    //this.province = res.data.data;
                    let data = res.data.data;
                    this.sourceData = data;
                    // console.log(this.sourceData);
                    // console.log(this.sourceData);
                    //console.log(this.sourceData);
                    for (var j = 0; j < data.length; j++) {
                        this.province.push(data[j].name);
                    }
                    // console.log("地域1");
                    // console.log(data);
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            put.campRegion({
                id: [-1]
            }).then(res => {
                if (res.data.code == 0) {
                    this.allcities = res.data.data;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            //获取全部城市
            // put.campRegion({
            //     id: [-1]
            // }).then(res => {
            //     if (res.data.code == 0) {
            //         let data = res.data.data;
            //         this.getAllProvinceCities(data);
            //         console.log("地域2");
            //         console.log(data);
            //     }
            //     if (res.data.code == -1) {
            //         this.$router.push({
            //             path: "/login"
            //         });
            //     }
            // });
            //媒体
            put.mediaMediaName().then(res => {
                if (res.data.code == 0) {
                    this.getMeadiaList(res.data.data);
                    this.sourceMediaData = res.data.data;
                    let meadia = [];
                    for (var j = 0; j < res.data.data.length; j++) {
                        meadia.push(res.data.data[j].media_name);
                    }
                    this.Meadia = meadia;
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
            //广告位
            // put.mediaadName({
            //     plat_id: [5]
            // }).then(res => {
            //     if (res.data.code == 0) {
            //         this.getAdPositionList(res.data.data);
            //         let ad = [];
            //         for (var j = 0; j < res.data.data.length; j++) {
            //             ad.push(res.data.data[j].ad_name);
            //         }
            //         this.Ad = ad;
            //     }
            //     if (res.data.code == -1) {
            //         this.$router.push({
            //             path: "/login"
            //         });
            //     }
            // });
            this.getInterestData([0], data => {
                this.resourceTypeData = data;
                _.forEach(data, item => {
                    this.firoptions.push({
                        value: item.categroy_id,
                        label: item.name
                    });
                });
                //编辑操作
                // if (this.$route.path.replace("/", "").indexOf("editplan") >= 0) {
                //      _.forEach(data,p=>{
                //         _.forEach(this.dataintrest,s=>{
                //             if(p.categroy_id==s){
                //                 this.checkedhobbySub.push(p.name);
                //                 this.secoptions.push(p.name);
                //             }
                //         });
                //     });
                // }
            });
            //媒体资源
        },
        deactivated() {
            //离开页面需要remove这个监听器，不然卡。
            window.removeEventListener("scroll", this.handleScroll);
        },
        methods: {
            ...mapActions([
                "addProvince",
                "addCities",
                "updateTerrain",
                "updateProvince",
                "getMeadiaList",
                "getAdPositionList",
                "chekAllAdPosition",
                "chekAllMeadia",
                "chekAllType",
                "chekAllDevice",
                "modifyMonday",
                "modifyTuesDay",
                "modifyWendesDay",
                "modifyThuesDay",
                "modifyFriDay",
                "modifySaturDay",
                "modifyWeekDay",
                "checkedAllMonday",
                "checkedAllTuesdays",
                "checkedAllWendesday",
                "checkedAllthursday",
                "checkedAllFriday",
                "checkedAllSaturday",
                "checkedAllWeekdays",
                "getAllProvinceCities",
                "dynamicGetAd"
            ]),
            getClasses(item, selectedItems) {
                const isActive = !!(selectedItems.find((selectedItem) => {
                    return parseInt(selectedItem.dataset.item, 10) === item
                }))

                console.log(item);
                console.log(selectedItems);
                return {
                    item: true,
                    active: isActive
                }
            },
            handleScroll() {
                let scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                let inferiorTop = document.querySelector("#upperPart") ?
                    document.querySelector("#upperPart").offsetHeight :
                    0;
                inferiorTop = inferiorTop + 172;
                if (scrollTop > inferiorTop) {
                    this.inferiorBoxFixed = true;
                } else {
                    this.inferiorBoxFixed = false;
                }
            },
            download() {
                put.downTxt().then(res => {
                    if (res.data.code == 0) {
                        this.downloadTxt(res.data.data, "template");
                    }
                });
            },
            downloadTxt(val, filename) {
                let str = ""
                _.forEach(val, function(item) {
                    _.forEach(item, function(val, key) {
                        if (key == item.length - 1) {
                            str += val + "\r\n"
                        } else {
                            str += val;
                        }
                    })
                });
                var blob = new Blob([str], {
                    type: "text/plain;charset=utf-8"
                });
                fileServer.saveAs(blob, filename + ".txt");
            },
            getSubCity(val) {
                let result = [];
                let data = _.forEach(val, function(value) {
                    result.push(value.name);
                });
                //console.log(data);
                return result;
            },
            getSubdata(val) {
                //onsole.log(val);
                put.campRegion({
                    id: [val]
                }).then(res => {
                    if (res.data.code == 0) {
                        //console.log(res.data.data);
                        // for (var k = 0; k < removeCity.length; k++) {
                        //     _.pull(this.checkedCitiesSub, removeCity[k]);
                        // }
                        let data = res.data.data;;
                        for (var j = 0; j < data.length; j++) {
                            //_.pull(this.cities, data[j]);
                            _.remove(this.cities, function(o) {
                                return o.id == data[j].id;
                            });
                            this.cities.push(data[j]);
                        }
                        // console.log("subdata");
                        // console.log(this.cities);
                        // console.log(this.cities.length);
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            getCurrentHour(key) {
                if (key == "0") {
                    return this.zero;
                }
                if (key == "1") {
                    return this.first;
                }
                if (key == "2") {
                    return this.second;
                }
                if (key == "3") {
                    return this.third;
                }
                if (key == "4") {
                    return this.third;
                }
                if (key == "5") {
                    return this.fifth;
                }
                if (key == "6") {
                    return this.sixth;
                }
                if (key == "7") {
                    return this.seventh;
                }
                if (key == "8") {
                    return this.eighth;
                }
                if (key == "9") {
                    return this.ninth;
                }
                if (key == "10") {
                    return this.firstten;
                }
                if (key == "11") {
                    return this.eleventh;
                }
                if (key == "12") {
                    return this.twelfth;
                }
                if (key == "13") {
                    return this.thirteenth;
                }
                if (key == "14") {
                    return this.fourteen;
                }
                if (key == "15") {
                    return this.fifteen;
                }
                if (key == "16") {
                    return this.sixteen;
                }
                if (key == "17") {
                    return this.seventeen;
                }
                if (key == "18") {
                    return this.eightteen;
                }
                if (key == "19") {
                    return this.nineteen;
                }
                if (key == "20") {
                    return this.twenty;
                }
                if (key == "21") {
                    return this.twenty1;
                }
                if (key == "22") {
                    return this.twenty2;
                }
                if (key == "23") {
                    return this.twenty3;
                }
            },
            singeHour(val) {
                this.isResultTimePeriod = true;
                this.setTimeStatus(val, this.getCurrentHour(val));
            },
            ergodic(data, key, val) {
                for (let j = 0; j < data.length; j++) {
                    if (key == data[j].key) {
                        data[j].value = val;
                        //this.modifyMonday(data[j]);
                    }
                }
            },
            setTimeStatus(key, status) {
                let days = [
                    this.$store.state.monday,
                    this.$store.state.tuesday,
                    this.$store.state.wendesday,
                    this.$store.state.tursday,
                    this.$store.state.friday,
                    this.$store.state.saturday,
                    this.$store.state.weekday,
                ];
                if (!status) { //全选
                    for (var j = 0; j < days.length; j++) {
                        this.ergodic(days[j], key, "1");
                    }
                    this.changHourStatus(key, true);
                } else {
                    for (var j = 0; j < days.length; j++) {
                        this.ergodic(days[j], key, "0");
                    }
                    this.changHourStatus(key, false);
                }
            },
            changHourStatus(key, status) {
                if (key == "0") {
                    this.zero = status;
                }
                if (key == "1") {
                    this.first = status;
                }
                if (key == "2") {
                    this.second = status;
                }
                if (key == "3") {
                    this.third = status;
                }
                if (key == "4") {
                    this.third = status;
                }
                if (key == "5") {
                    this.fifth = status;
                }
                if (key == "6") {
                    this.sixth = status;
                }
                if (key == "7") {
                    this.seventh = status;
                }
                if (key == "8") {
                    this.eighth = status;
                }
                if (key == "9") {
                    this.ninth = status;
                }
                if (key == "10") {
                    this.firstten = status;
                }
                if (key == "11") {
                    this.eleventh = status;
                }
                if (key == "12") {
                    this.twelfth = status;
                }
                if (key == "13") {
                    this.thirteenth = status;
                }
                if (key == "14") {
                    this.fourteen = status;
                }
                if (key == "15") {
                    this.fifteen = status;
                }
                if (key == "16") {
                    this.sixteen = status;
                }
                if (key == "17") {
                    this.seventeen = status;
                }
                if (key == "18") {
                    this.eightteen = status;
                }
                if (key == "19") {
                    this.nineteen = status;
                }
                if (key == "20") {
                    this.twenty = status;
                }
                if (key == "21") {
                    this.twenty1 = status;
                }
                if (key == "22") {
                    this.twenty2 = status;
                }
                if (key == "23") {
                    this.twenty3 = status;
                }
            },
            allDay(val) {
                let self = this;
                this.isResultTimePeriod = true;
                if (val == "一") {
                    this.setAllDayStatus(val, this.$store.state.monday, function(val) {
                        self.modifyMonday(val)
                    }, this.ismondaystatus);
                }
                if (val == "二") {
                    this.setAllDayStatus(val, this.$store.state.tuesday, function(val) {
                        self.modifyTuesDay(val)
                    }, this.istuesdaystatus);
                }
                if (val == "三") {
                    this.setAllDayStatus(val, this.$store.state.wendesday, function(val) {
                        self.modifyWendesDay(val)
                    }, this.iswesdaystatus);
                }
                if (val == "四") {
                    this.setAllDayStatus(val, this.$store.state.tursday, function(val) {
                        self.modifyThuesDay(val)
                    }, this.isthuesdaystatus);
                }
                if (val == "五") {
                    this.setAllDayStatus(val, this.$store.state.friday, function(val) {
                        self.modifyFriDay(val)
                    }, this.isfridaystatus);
                }
                if (val == "六") {
                    this.setAllDayStatus(val, this.$store.state.saturday, function(val) {
                        self.modifySaturDay(val)
                    }, this.isstadaystatus);
                }
                if (val == "日") {
                    console.log(val);
                    this.setAllDayStatus(val, this.$store.state.weekday, function(val) {
                        self.modifyWeekDay(val)
                    }, this.issundaystatus);
                }
            },
            setAllDayStatus(day, val, actions, status) {
                // this.isalldaystatus = status;
                if (!status) { //全选
                    for (var j = 0; j < val.length; j++) {
                        val[j].value = "1";
                        actions(val);
                    }
                    this.changeAllStatus(day, true);
                } else {
                    for (var k = 0; k < val.length; k++) {
                        val[k].value = "0";
                        actions(val);
                    }
                    this.changeAllStatus(day, false);
                }
                // return val;
            },
            changeAllStatus(day, val) {
                if (day == "一") {
                    this.ismondaystatus = val;
                }
                if (day == "二") {
                    this.istuesdaystatus = val;
                }
                if (day == "三") {
                    this.iswesdaystatus = val;
                }
                if (day == "四") {
                    this.isthuesdaystatus = val;
                }
                if (day == "五") {
                    this.isfridaystatus = val;
                }
                if (day == "六") {
                    this.isstadaystatus = val;
                }
                if (day == "日") {
                    this.issundaystatus = val;
                }
            },
            handleSelect(key, keyPath) {
                this.isShow = key;
            },
            //父节点
            handleCheckAllChange(val) {
                //console.log(this.checkAll);
                console.log(val);
                this.checkedCities = val ? this.province : [];
                //this.checkedCitiesSub=val?this.oldCheckedCitySub:[];
                this.checkAllSub = val ? true : false;
                if (val) {
                    this.checkedCitiesSub = [];
                    for (var j = 0; j < this.cities.length; j++) {
                        this.checkedCitiesSub.push(this.cities[j].name);
                    }
                } else {
                    this.checkedCitiesSub = [];
                }
                //this.checkAll = false;
                return;
                // this.cities = [];
                // this.checkedCities = val ? this.province : [];
                // this.isIndeterminate = false;
                // //
                // var ids = this.getIdByName(this.checkedCities);
                // put.campRegion({
                //     id: ids
                // }).then(res => {
                //     if (res.data.code == 0) {
                //         let data = res.data.data;
                //         this.sourceDataSub = data;
                //         for (var j = 0; j < data.length; j++) {
                //             this.cities.push(data[j].name);
                //         }
                //     }
                // });
            },
            handleCheckedCitiesChange(value) {
                //console.log(value);
                //控制全选button 状态
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.province.length;
                this.isIndeterminate = this.province.length == checkedCount ? true : false
                this.isIndeterminate = checkedCount.length == this.province.length ? true : false;
                if (
                    this.oldValue.length < value.length ||
                    (value.length == 0 && this.oldValue.length == 0)
                ) {
                    //console.log("add");
                    let difference = _.difference(value, this.oldValue);
                    //console.log(difference[0]);
                    let currentCityid = this.getCurrentCityIdByName(difference[0]);
                    //console.log(currentCityid);
                    put.campRegion({
                        id: [currentCityid]
                    }).then(res => {
                        if (res.data.code == 0) {
                            let data = res.data.data;
                            this.sourceDataSub = data;
                            for (var j = 0; j < data.length; j++) {
                                this.checkedCitiesSub.push(data[j].name);
                            }
                            if (this.checkedCitiesSub.length == this.cities.length) {
                                this.checkAllSub = true;
                            } else {
                                this.checkAllSub = false;
                            }
                            this.oldCheckedCitySub = this.checkedCitiesSub;
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                    // this.addProvince({
                    //     name: difference[0]
                    // });
                    // console.log("被选中元素");
                    // console.log(this.checkedCitiesSub);
                } else {
                    let difference = _.difference(this.oldValue, value);
                    let currentCityid = this.getCurrentCityIdByName(difference[0]);
                    put.campRegion({
                        id: [currentCityid]
                    }).then(res => {
                        if (res.data.code == 0) {
                            let data = res.data.data;
                            let removeCity = [];
                            this.sourceDataSub = data;
                            for (var j = 0; j < data.length; j++) {
                                removeCity.push(data[j].name);
                            }
                            this.checkedCitiesSub = _.difference(this.checkedCitiesSub, removeCity);
                            if (this.checkedCitiesSub.length == this.cities.length) {
                                this.checkAllSub = true;
                            } else {
                                this.checkAllSub = false;
                            }
                            this.oldCheckedCitySub = this.checkedCitiesSub;
                        }

                          if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    });
                    // console.log("remove");
                    // console.log(difference[0]);
                    // console.log(currentCityid);
                    //var bar = _.reject(foo, ['id', 0])
                    // let data = _.reject(this.$store.state.terrainResult, [
                    //     "name",
                    //     difference[0]
                    // ]);
                    // let province = _.reject(this.$store.state.terrainResult, [
                    //     "name",
                    //     difference[0]
                    // ]);
                    // this.updateTerrain(data);
                    // this.updateProvince(province);
                }
                this.oldValue = value;
                this.oldCheckedCity = this.checkedCities;
            },
            getCurrentCityIdByName(val) {
                let result = "";
                for (var j = 0; j < this.sourceData.length; j++) {
                    if (val == this.sourceData[j].name) {
                        result = this.sourceData[j].region_id
                    }
                }
                return result;
            },
            //子节点
            handleCheckAllChangeSub(val) {
                if (this.checkAllSub) {
                    //console.log(this.getCityeName(this.cities));
                    this.checkedCitiesSub = this.getCityeName(this.cities);
                    //this.checkedCities = this.oldCheckedCity;
                    // console.log(this.oldCheckedCity);
                } else {
                    //console.log(this.getCityeName(this.cities));
                    this.checkedCitiesSub = [];
                    //this.checkedCities = [];
                    //this.checkAll=false
                }
                // this.checkedCitiesSub = val ? this.cities : [];
                // this.isIndeterminateSub = false;
                // let allCities = this.getAllCheckedCities(this.sourceDataSub);
                // this.updateTerrain([]);
                // this.updateTerrain(allCities);
                // put.campRegion({
                //     id: [-1]
                // }).then(res => {
                //     if (res.data.code == 0) {
                //         let data = res.data.data;
                //         this.sourceDataSub = data;
                //         // let allCities = this.getAllCheckedCities(this.sourceDataSub);
                //         // console.log(allCities);
                //         // this.updateTerrain([]);
                //         // this.updateTerrain(allCities);
                //     }
                // });
            },
            getCityeName(val) {
                //console.log(val);
                let result = [];
                for (var j = 0; val.length; j++) {
                    if (!val[j]) {
                        break;
                    }
                    result.push(val[j].name);
                }
                return result;
            },
            getAllCheckedCities(data) {
                let sub = data;
                let result = [];
                let parent = this.sourceData;
                for (var j = 0; j < parent.length; j++) {
                    let item = {
                        name: parent[j].name,
                        cities: []
                    };
                    for (var k = 0; k < sub.length; k++) {
                        if (parent[j].region_id == sub[k].pid) {
                            item.cities.push(sub[k].name);
                        }
                    }
                    result.push(item);
                }
                return result;
            },
            getProvince() {
                let sourceProvince = this.$store.state.province; //checkedCities
                let list = [];
                for (var j = 0; j < this.checkedCities.length; j++) {
                    list.push(sourceProvince[j]);
                }
                return list;
            },
            handleCheckedCitiesChangeSub(value) {
                let checkedCount = value.length;
                this.checcheckAllSubkAll = checkedCount === this.checkedCitiesSub.length;
                this.checkAllSub = this.cities.length == checkedCount ? true : false;
                this.oldCheckedCitySub = this.checkedCitiesSub;
                //console.log(this.allcities);
                if (
                    this.oldValueSub.length < value.length ||
                    (value.length == 0 && this.oldValueSub.length == 0)
                ) {
                    console.log("添加子节点");
                    let difference = _.difference(value, this.oldValueSub);
                    //console.log(difference[0]);
                    // console.log(this.allcities.length);
                    // return;
                    let currentItem = {};
                    //let allcity = this.allcities;
                    _.forEach(this.allcities, function(item, index) {
                        let sub = item.chiled;
                        _.forEach(collection, function(name, index) {})
                    })
                    // for (var j = 0; j < allcity.length; j++) {
                    //     let sub = allcity[j].chiled;
                    //     //console.log(sub);
                    //     for (var k = 0; sub.length; k++) {
                    //     }
                    // }
                    //console.log(currentItem);
                    //this.addCities(currentItem);
                } else {
                    console.log("移除子节点");
                    //let difference = _.difference(this.oldValueSub, value);
                    //console.log(difference[0]);
                }
                this.oldValueSub = value;
                //this.oldCheckedCitySub=checkedCitiesSub;
                // console.log(this.checkedCitiesSub.length == checkedCount ? true : false);
                // console.log(this.checkedCitiesSub);
                // console.log(value);
                // console.log( this.$store.state.province);
                // return;
                // console.log(value);
                // let sourceProvince = this.$store.state.province;
                // this.addCities({
                //     province: this.getProvince(),
                //     cities: value
                // });
                // let checkedCount = value.length;
                // this.checkAllSub = checkedCount === this.cities.length;
                // // this.isIndeterminateSub =
                // //     checkedCount > 0 && checkedCount < this.cities.length;
                // this.isIndeterminateSub = checkedCount.length == this.province.length ? true : false;
            },
            getIdsByMeadiaName(val) {
                let ids = [];
                let data = this.sourceMediaData;
                for (var k = 0; k < val.length; k++) {
                    for (var j = 0; j < data.length; j++) {
                        if (val[k] === data[j].media_name) {
                            ids.push(data[j].plat_id);
                        }
                    }
                }
                return ids;
            },
            getIdByName(val) {
                let ids = [];
                let data = this.sourceData;
                for (var k = 0; k < val.length; k++) {
                    for (var j = 0; j < data.length; j++) {
                        if (val[k] === data[j].name) {
                            ids.push(data[j].region_id);
                        }
                    }
                }
                return ids;
            },
            getCityById(val) {
                this.cities = [];
                put.campRegion(val).then(res => {
                    if (res.data.code == 0) {
                        //this.province = res.data.data;
                        let data = res.data.data;
                        for (var j = 0; j < data.length; j++) {
                            this.cities.push(data[j].name);
                        }
                        //console.log(this.cities);
                    }
                });
            },
            allClear() {
                this.updateTerrain([]);
                // this.updateProvince([]);
                //this.checkedCities = [];
                // this.checkedCitiesSub = [];
                // this.oldValue = [];
                //this.isIndeterminate = true;
                // this.isIndeterminateSub = false;
                //this.checkAll = false;
                // this.checkAllSub = false;
                this.$refs.vlocal.clearLocal();
            },
            //网络类型
            handleCheckedNetworkTypeChange(value) {
                this.chekAllType(value);
                let checkedCount = value.length;
                this.checkAllNet = checkedCount === this.network.length;
                this.isIndeterminateNet = checkedCount > 0 && checkedCount < this.network.length;
                this.unCheckNetWork = false;
            },
            handleCheckAllChangeNet(val) {
                this.checkedNetworkType = val ? this.network : [];
                this.isIndeterminateNet = false;
                this.chekAllType(this.checkedNetworkType);
            },
            handleCheckedDeviceChange(value) {
                this.chekAllDevice(value);
                let checkedCount = value.length;
                this.checkAllDevice = checkedCount === this.device.length;
                this.isIndeterminateDevice = checkedCount > 0 && checkedCount < this.device.length;
                this.unCheckNetDevice = false;
            },
            handleCheckAllChangeDevice(val) {
                this.checkedDeviceType = val ? this.device : [];
                this.isIndeterminateDevice = false;
                this.chekAllDevice(this.checkedDeviceType);
            },
            handleCheckedMeadiaChange(value) {
                this.chekAllMeadia(value);
                let checkedCount = value.length;
                this.checkAllMeadia = checkedCount === this.Meadia.length;
                this.isIndeterminateMeadia = checkedCount > 0 && checkedCount < this.Meadia.length;
                this.getMeadiaName(this.getIdsByMeadiaName(value));
            },
            handleCheckAllChangeMeadia(val) {
                this.checkedMeadia = val ? this.Meadia : [];
                this.isIndeterminateMeadia = false;
                this.chekAllMeadia(this.checkedMeadia);
                this.getMeadiaName(this.getIdsByMeadiaName(this.checkedMeadia));
            },
            handleCheckedAdChange(value) {
                this.chekAllAdPosition(value);
                let checkedCount = value.length;
                this.checkAllAd = checkedCount === this.Ad.length;
                this.isIndeterminateAd = checkedCount > 0 && checkedCount < this.Ad.length;
            },
            handleCheckAllChangeAd(val) {
                this.checkedAd = val ? this.Ad : [];
                this.isIndeterminateAd = false;
                this.chekAllAdPosition(this.checkedAd);
            },
            activateMondayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyMonday(val);
                this.isResultTimePeriod = true;
            },
            activateTuesdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyTuesDay(val);
                this.isResultTimePeriod = true;
            },
            activateWendesdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyWendesDay(val);
                this.isResultTimePeriod = true;
            },
            activateThusdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyThuesDay(val);
                this.isResultTimePeriod = true;
            },
            activateFridayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyFriDay(val);
                this.isResultTimePeriod = true;
            },
            activateSaturDayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifySaturDay(val);
                this.isResultTimePeriod = true;
            },
            activateWeekDayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyWeekDay(val);
                this.isResultTimePeriod = true;
            },
            setAll() {
                for (var j = 0; j < this.$store.state.monday.length; j++) {
                    this.$store.state.monday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.tuesday.length; j++) {
                    this.$store.state.tuesday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.wendesday.length; j++) {
                    this.$store.state.wendesday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.tursday.length; j++) {
                    this.$store.state.tursday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.friday.length; j++) {
                    this.$store.state.friday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.saturday.length; j++) {
                    this.$store.state.saturday[j].value = "1";
                }
                for (var j = 0; j < this.$store.state.weekday.length; j++) {
                    this.$store.state.weekday[j].value = "1";
                }
                this.checkedAllMonday(this.$store.state.monday);
                this.checkedAllTuesdays(this.$store.state.tuesday);
                this.checkedAllWendesday(this.$store.state.wendesday);
                this.checkedAllthursday(this.$store.state.tursday);
                this.checkedAllFriday(this.$store.state.friday);
                this.checkedAllSaturday(this.$store.state.saturday);
                this.checkedAllWeekdays(this.$store.state.weekday);
            },
            unSetAll() {
                for (var j = 0; j < this.$store.state.monday.length; j++) {
                    this.$store.state.monday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.tuesday.length; j++) {
                    this.$store.state.tuesday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.wendesday.length; j++) {
                    this.$store.state.wendesday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.tursday.length; j++) {
                    this.$store.state.tursday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.friday.length; j++) {
                    this.$store.state.friday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.saturday.length; j++) {
                    this.$store.state.saturday[j].value = "0";
                }
                for (var j = 0; j < this.$store.state.weekday.length; j++) {
                    this.$store.state.weekday[j].value = "0";
                }
                this.checkedAllMonday(this.$store.state.monday);
                this.checkedAllTuesdays(this.$store.state.tuesday);
                this.checkedAllWendesday(this.$store.state.wendesday);
                this.checkedAllthursday(this.$store.state.tursday);
                this.checkedAllFriday(this.$store.state.friday);
                this.checkedAllSaturday(this.$store.state.saturday);
                this.checkedAllWeekdays(this.$store.state.weekday);
            },
            checkedAll() {
                if (this.checkAllDays == "0") {
                    this.setAll();
                    this.checkAllDays = "1";
                    this.isResultTimePeriod = true;
                } else {
                    this.unSetAll();
                    this.checkAllDays = "0";
                    this.isResultTimePeriod = false;
                }
            },
            showResult() {
                this.isShow = "result";
                if (!this.timePeriod) {
                    this.timePeriod = [];
                }
            },
            modify(val) {
                this.isShow = val;
            },
            del(val) {
                if (val == "1-1-1") {
                    //this.allClear();
                    this.$store.state.meadia = [];
                }
                if (val == "1-1-2") {
                    this.$store.state.adposition = [];
                }
                if (val == "2-1") {
                    this.unSetAll();
                    this.checkAllDays = "0";
                    this.isResultTimePeriod = false;
                }
                if (val == "3-1") {
                    // this.chekAllType([]);
                    // this.checkedNetworkType = [];
                    this.checkedhobbySub = [];
                }
                if (val == "3-2") {
                    this.chekAllDevice([]);
                    this.checkedDeviceType = [];
                }
                if (val == "4-1") {
                    this.allClear();
                    // this.chekAllMeadia([]);
                    // this.checkedMeadia = [];
                }
                if (val == "4-2") {
                    this.chekAllAdPosition([]);
                    this.checkedAd = [];
                }
                if (val == "6-1") {
                    this.unCheckNetWork = true;
                    this.checkedNetworkType = [];
                }
                if (val == "7-1") {
                    this.unCheckNetDevice = true;
                    this.checkedDeviceType = [];
                }
                //v-if='unCheckAge||checkedage.length!=0'>
                //性别
                if (val == "2-1-1") {
                    this.unCheckSex = true;
                    this.checkedsex = [];
                }
                //年龄
                if (val == "2-1-2") {
                    this.unCheckAge = true;
                    this.checkedage = [];
                }
                //周期时段
                if (val == "5-1-1") {
                    this.timePeriod = [];
                }
            },
            setDetailsItem(val) {
                this.detailsItem = val;
            },
            getMeadiaName(val) {
                put.mediaadName({
                    media_id: val
                }).then(res => {
                    if (res.data.code == 0) {
                        this.getAdPositionList(res.data.data);
                        let ad = [];
                        for (var j = 0; j < res.data.data.length; j++) {
                            ad.push(res.data.data[j].ad_name);
                        }
                        this.Ad = ad;
                    }
                    if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    if (res.data.code == 1) {
                        // this.dynamicGetAd([]);
                        this.Ad = [];
                    }
                });
            }, //上传人群包名
            selectfile(val) {
                this.$el.querySelector("#file" + val).click();
            },
            clearUpload() {
                this.isUpload = false;
                this.logofile = "";
            },
            uploadfile(val, fileList, key) {
                let file = this.$el.querySelector("#file" + val).files[0];
                let data = _.forEach(fileList, function(item) {
                    if (item.id == val) {
                        item.name = file.name;
                        item.file = file;
                    }
                });
                if (key == "left") {
                    this.peoplepackageleft = fileList;
                }
                if (key == "right") {
                    this.peoplepackage = fileList;
                }
            },
            addPepolePackage() {
                this.peoplepackage.push({
                    id: randomstring(),
                    name: ""
                });
            },
            delPackage(val) {
                let data = _.reject(this.peoplepackage, {
                    id: val
                });
                this.peoplepackage = data;
            },
            //地域定向
            //北京
            handleCheckAllbeijing(val) {
                // console.log(val);
                // //console.log(this.sourceData);
                // return
                delete this.sourceData[j].isIndeterminate;
                return;
                for (var j = 0; this.sourceData.length; j++) {
                    //console.log(this.sourceData[j].isIndeterminate);
                    // console.log(this.sourceData[j]);
                    // console.log(this.sourceData[j].isIndeterminate);
                    if (!this.sourceData[j]) {
                        break;
                    }
                    if (this.sourceData[j].isIndeterminate && this.sourceData[j].id == val.id) {
                        console.log("非激活状态");
                        //this.sourceData[j].isIndeterminate = false;
                        //  console.log(this.sourceData);
                        // return;
                    } else {
                        if (!this.sourceData[j].isIndeterminate && this.sourceData[j].id == val.id) {
                            console.log("激活状态");
                            this.sourceData[j].isIndeterminate = true;
                            //  console.log(this.sourceData);
                            // return;
                        }
                    }
                }
                // console.log(val);
                console.log(this.sourceData);
                // this.checkAllbeijing = val ? this.beijing : [];
                // this.isIndeterminatebeijing = false;
                //console.log(this.checkAllbeijing);
            },
            handleCheckedbeijingChange(value) {
                // let checkedCount = value.length;
                // this.checkAllbeijing = checkedCount === this.beijing.length;
                // this.isIndeterminatebeijing = this.beijing.length == checkedCount ? true : false;
                // console.log(this.checkedbeijing);
            },
            //河北
            handleCheckAllhebei(val) {
                this.checkAllhebei = val ? this.hebei : [];
                this.isIndeterminatehebei = false;
            },
            handleCheckedhebeiChange(value) {
                let checkedCount = value.length;
                this.checkAllhebei = checkedCount === this.hebei.length;
                this.isIndeterminatehebei = this.hebei.length == checkedCount ? true : false;
                //console.log(this.checkAllhebei);
            },
            //山西
            handleCheckAllshanxi(val) {
                this.checkAllshanxi = val ? this.shanxi : [];
                this.isIndeterminateshanxi = false;
            },
            handleCheckedshanxiChange(value) {
                let checkedCount = value.length;
                this.checkAllshanxi = checkedCount === this.shanxi.length;
                this.isIndeterminateshanxi = this.shanxi.length == checkedCount ? true : false;
                //console.log(this.checkedshanxi);
            },
            // clearLocal() {
            //     this.$refs.vlocal.clearLocal();
            // }
            //  checkAllbeijing: false,
            //     checkedbeijing: [],
            //     beijing: [],
            //     isIndeterminatebeijing: false,
            //媒体资源
            getMeadiaData() {
                
                let data = {
                    meadia: this.$refs.vMedia ? this.$refs.vMedia.getIdsByresourceData() : [],
                    ad: this.$refs.vMedia ? this.$refs.vMedia.getAdIdsByresourceData() : []
                }
                // let data = {
                //     meadia: this.$refs.vMedia.getIdsByresourceData(),
                //     ad:  this.$refs.vMedia.getAdIdsByresourceData()
                // }
                return data;
            },
            getHobbyByData(val) {
                let result = [];
                _.forEach(this.firoptions, item => {
                    result.push(item.label);
                });
                return result;
            },
            getHobbyValueByData(val) {
                let result = [];
                _.forEach(this.firoptions, p => {
                    _.forEach(val, s => {
                        if (p.label == s) {
                            result.push(p.value);
                        }
                    });
                });
                return result;
            },
            handleCheckedCitiesChangeHobby(value) {
                // if (
                //     this.oldValue.length < value.length ||
                //     (value.length == 0 && this.oldValue.length == 0)
                // ) {
                //     //console.log("add");
                //     let difference = _.difference(value, this.oldValue);
                //     let hobbyIds = this.getHobbyValueByData(difference);
                // } else {
                //     //console.log("remove");
                //     let difference = _.difference(this.oldValue, value);
                // }
                // this.oldValue = value;
                // console.log(this.getHobbyValueByData(value));
                this.secoptions = [];
                let intrestIds = this.getHobbyValueByData(value);
                if (intrestIds.length == 0) {
                    this.secoptions = [];
                    return;
                }
                this.getInterestData(intrestIds, data => {
                    _.forEach(data, item => {
                        this.secoptions.push({
                            value: item.categroy_id,
                            label: item.name
                        });
                    });
                });
                // _.uniq(this.secoptions);
            },
            handleClick() {},
            getInterestData(val, fn) {
                put.getInterestType({
                    id: val
                }).then(res => {
                    let data = res.data.data;
                    //console.log(data)
                    fn(data)
                });
            },
            getInterestAllData(val, fn) {
                put.getInterestType({
                    type: 1
                }).then(res => {
                    let data = res.data.data;
                    //console.log(data)
                    fn(data)

                      if (res.data.code == -1) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                });
            },
            delHobby(val) {
                this.checkedhobbySub = _.pull(_.cloneDeep(this.checkedhobbySub), val);
            },
            allClearHobby(val) {
                this.checkedhobby = [];
                this.checkedhobbySub = [];
                this.secoptions = [];
            },
            unlimitNetWork() {
                this.checkedNetworkType = [];
            },
            unlitmitdevice() {
                this.checkedDeviceType = [];
            },
            unlimitsex() {
                this.checkedsex = [];
            },
            unlimitage() {
                this.checkedage = [];
            },
            handleCheckedSex() {
                this.unCheckSex = false;
            },
            handleCheckedAge() {
                this.unCheckAge = false;
            },
            getMeadiaType() {
                return this.$refs.vMedia && this.$refs.vMedia.getMeadiaType()
            },
            getHobbyIds(val) {
                let result = [];
                _.forEach(this.secoptions, p => {
                    _.forEach(this.checkedhobbySub, s => {
                        if (p.label == s) {
                            result.push(p.value);
                        }
                    });
                });
                return result;
            },
            tabChange(val) {
                //兴趣
                if (val == "3-1") {
                    this.checkedhobby = [];
                    this.checkedhobbySub = [];
                }
                if (val == "3-2") {}
                if (val == "6-1") {}
            },
            tabChangeDate(val) {
                if (val == "5-1-1") {
                    this.timePeriod = [];
                }
            },
            tabChangePeriod(val) {
                if (val == "6-1-1") {
                    // this.timePeriod=[];
                    this.setAll();
                    this.checkAllDays = "1";
                    this.isResultTimePeriod = true;
                }
                if (val == "6-2-1") {
                    // this.timePeriod=[];
                    this.unSetAll();
                    this.checkAllDays = "0";
                    this.isResultTimePeriod = false;
                }
            },
            changeDate(val) {
                if (!this.timePeriod) {
                    return;
                }
                this.startDate = moment(this.timePeriod[0]).format(
                    "YYYY-MM-DD"
                );
                this.endDate = moment(this.timePeriod[1]).format(
                    "YYYY-MM-DD"
                );
            },
            MeadiaComponets() {
                this.$refs.vMedia.initMeadiaComponets();
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../style/mixin"; // 地域定向
    @import "../../../style/common"; // 地域定向
    .el-checkbox-group {
        display: inline-block
    }
    .redirect {
        width: 100%; // position: absolute;
        // set background color white
        @include bg-white($fc);
        .template-bd {
            border-bottom: 1px solid #e1e7f0 !important;
        }
        .config-scroll {
            // height: 500px;
        }
        .right-line {
            padding-left: 20px;
            margin-left: 220px;
            min-height: 405px;
            border-left: 1px solid #e1e7f0;
        }
        .el-scrollbar__wrap {
            overflow: auto;
        } // right side padding space remove
        .select-bd {
            padding-left: 0;
        } // small menu style
        .redirect-config-select {
            float: none;
            width: 220px;
            position: absolute;
            z-index: 1000; // bottom: 0;
            // height: 1rem;
            // width: 100%;
            &.isFixed {
                position: fixed;
                top: 0;
                z-index: 9999;
            }
            .is-round {
                padding: 0 60px !important;
                margin: 20px 0 20px 30px;
            }
            .el-menu {
                background-color: #ffffff !important;
                border-right: 0 none;
                padding-bottom: 89px;
            }
            .el-menu-item,
            .el-submenu__title {
                border-left: 3px solid #fff!important; // border-left-color: #fff;
                font-size: 12px;
                height: 34px;
                line-height: 34px;
                color: $firstc !important;
                &:hover {
                    background-color: #e1e7f0;
                    border-left-color: #ff6870!important;
                }
            }
            .el-menu-item {
                padding-left: 27px !important;
            }
            .el-submenu__title {
                padding-left: 27px !important;
            }
            .el-menu-item.is-active {
                border-left-color: #ff6870!important;
                background-color: #e1e7f0 !important;
            }
            .small-menu-theme {
                vertical-align: -3px;
            }
            .el-menu-item [class^="el-icon-"] {
                margin-right: 10px;
            }
            .el-submenu [class^="el-icon-"] {
                margin-right: 10px !important;
            }
            .el-checkbox__label {
                font-size: 12px;
            }
            .el-submenu__icon-arrow:before {
                content: "";
            }
            .el-icon-area,
            .el-icon-timeslot,
            .el-icon-webconfig,
            .el-icon-resource,
            .el-icon-interests,
            .el-icon-introductbag,
            .el-icon-thirdgroup,
            .el-icon-network {
                width: 13px !important;
                height: 13px;
            }
            .el-icon-area {
                @include svgbg("../../../style/image/put/area.svg");
                height: 12px;
            }
            .el-icon-timeslot {
                @include svgbg("../../../style/image/put/timeslot.svg");
            }
            .el-icon-webconfig {
                @include svgbg("../../../style/image/put/webconfig.svg");
            }
            .el-icon-resource {
                @include svgbg("../../../style/image/put/resource.svg");
            }
            .el-icon-thirdgroup {
                @include svgbg("../../../style/image/put/thirdgroup.svg");
                height: 10px;
            }
            .el-icon-interests {
                @include svgbg("../../../style/image/put/interests.svg");
                height: 11px;
            }
            .el-icon-introductbag {
                @include svgbg("../../../style/image/put/introductbag.svg");
                height: 11px;
            }
            .el-icon-network {
                @include svgbg("../../../style/image/put/network.svg");
                height: 11px;
            }
        }
        .el-menu-item-group {
            .el-menu-item {
                padding-left: 51px !important;
            }
            .not-checked {
                @include svgbg("../../../style/image/creative/checkbox-nochecked.svg");
            }
            .already-checked {
                @include svgbg("../../../style/image/creative/checkbox-checked.svg");
            }
            .el-menu-item-group__title {
                padding: 0;
            }
        }
        .el-checkbox__label {
            color: #bdbecd;
            font-size: 12px;
        } // right side change content
        .select-bd {
            padding: 20px 0 0 30px;
        }
    } // area direct content left
    .re-orientation-item {
        width: 488px;
        .orientation-bd {
            height: 265px;
            border: 1px solid #e1e7f0;
            border-top: 0 none;
            @include bottomLeftRadius(5px);
            @include bottomRightRadius(5px);
            .el-col-12:first-child {
                border-right: 1px solid #e1e7f0;
            }
        }
        .el-checkbox {
            display: block;
            padding: 8px 0 8px 20px;
            &.is-checked,
            &:hover {
                background-color: #f6f8fa;
                .el-checkbox__label {
                    color: #515974;
                }
            }
        }
        .el-input {
            width: 100%;
        }
        .el-checkbox__label {
            font-size: 12px;
            .el-icon-arrow-right {
                position: absolute;
                top: 39%;
                right: 7px;
                margin-top: -1px;
            }
        }
        .el-checkbox+.el-checkbox {
            margin-left: 0;
        }
        .el-input__inner {
            padding-left: 12px !important;
            @include bottomRightRadius(0);
            @include bottomLeftRadius(0);
        }
        .el-checkbox-group {
            padding: 0 0 8px;
        } // district head
        .district-hd {
            height: 38px;
            line-height: 38px;
            border: 1px solid #e1e7f0;
            padding-left: 19px;
            span {
                @include sc(12px, #7f8599);
            }
        }
        .district-bd {
            border-right: 1px solid #e1e7f0;
        }
        .el-col-8 {
            height: 100%;
            &:last-child .district-hd {
                border-right: 0 none;
            }
        }
        .el-col-12 {
            &:nth-child(2) .district-hd,
            &:nth-child(2) .district-bd {
                border-left: 0 none;
            }
        }
    } // area direct content right
    .area-list {
        margin-left: 528px;
        border: 1px solid #e1e7f0;
        position: relative;
        @include borderRadius(5px);
        .turn-iron {
            @include svgbg("../../../style/image/put/turn.svg");
            width: 20px;
            height: 17px;
            position: absolute;
            top: 50%;
            margin-top: -8px;
            left: -30px;
        }
        .inferior-hd {
            padding: 11px 0 9px 18px;
            font-size: 12px;
            color: #e95058;
            border-bottom: 1px solid #e1e7f0;
            .clear-all {
                @include sc(12px, #e95058);
                cursor: pointer;
            }
        }
        .inferior-bd {
            height: 226px;
            overflow-y: hidden;
        }
        .area-item-row {
            .el-checkbox {
                margin: 0 20px 15px 0;
            } // .el-checkbox+.el-checkbox{
            //     margin: 0 20px 0 0;
            // }
            // @extend .checkbox-margin;
        }
        .el-checkbox-group {
            padding: 7px 0 8px;
        }
        .area-item-row {
            .search-item {
                padding: 0 15px 0 19px;
                height: 36px;
                line-height: 36px;
                position: relative;
                cursor: pointer;
                &:hover {
                    background-color: #f6f8fa;
                }
            }
            .account-name {
                @include sc(12px, #515974);
            }
            .el-icon-close {
                color: #515974;
                position: absolute;
                top: 12px;
                right: 13px;
                cursor: pointer;
            }
        }
    } //media
    .media-adsite,
    .time-direct,
    .hobbies-interests {
        .basic-set-row {
            margin-bottom: 0;
        }
    }
    // .media-adsite{
        .el-input__prefix{
            &.close-unit{
                left: 83%!important;
            }
            &.search-unit{
                left: 89%!important;
            }
        }
     //ad site
    .network-type {
        .select-bd {
            padding-top: 30px;
        }
        .data-item {
            padding-right: 4px;
        }
        .el-checkbox__label {
            padding: 0 0 10px 10px;
        }
        .el-checkbox:first-child {
            padding-right: 20px;
        }
        .el-checkbox+.el-checkbox {
            margin: 0 20px 0 0;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #515974;
        }
    } // checkbox margin adjust
    .checkbox-margin {
        .el-checkbox+.el-checkbox {
            margin-left: 20px;
        }
    } // third party group
    .third-party-group {
        .select-bd {
            padding-top: 14px;
        }
        .group-each-item {
            .data-item,
            .el-checkbox-group {
                padding: 14px 0;
            }
            .data-item {
                padding-right: 18px;
            }
            .el-checkbox__input+.el-checkbox__label,
            .el-checkbox__input.is-checked+.el-checkbox__label {
                color: #515974;
            }
        }
        .group-package {
            padding: 16px 0;
            .data-item {
                padding: 8px 4px 0 0;
            }
        }
        div.single-row-search {
            margin-left: 0;
        }
    } // hobbies-interests
    .hobbies-interests {
        .select-bd {
            padding: 28px 0 0 30px;
            &:last-child {
                margin-bottom: 30px;
            }
        }
        .hobbies-classify {
            width: 300px;
            border-radius: 5px;
            border: 1px solid #e1e7f0;
        }
    } // instruction-group
    .instruction-group {
        // head
        .template-hd {
            @include sc(14px, #7f8599);
            font-weight: normal;
        }
        .blue-font {
            font-weight: bold;
            color: #6cabff;
        } // body
        .group-item {
            border: 1px solid #e1e7f0;
            padding: 20px;
            width: 480px;
            margin: 0 20px 20px 0;
        }
        .operate-row {
            margin-bottom: 15px;
            .update-hd {
                line-height: 38px;
                color: #515974;
                width: 70px;
                display: inline-block;
            }
            .el-input {
                width: 240px;
            }
            .el-upload-list {
                left: 74px;
            }
            .el-button--upload {
                padding: 0 30px!important;
            }
        }
        .btn-row {
            margin-left: 75px;
            .el-button+.el-button {
                margin-left: 0;
            }
            .el-button--confirm {
                padding: 0 25px!important;
            }
        }
    } // confirm and chancel
    .is-confirm {
        background-color: #fbfbfb;
        padding-top: 30px;
    } // already direct content
    .already-direct-wrap {
        width: 100%;
    }
    .directed-list {
        margin-top: 20px;
        .template-hd {
            position: relative;
            font-size: 14px;
            border-width: 1px;
        }
        .item-hd {
            font-weight: bold;
            color: #515974; // font-weight: bold;
        }
        .operation-btn {
            position: absolute;
            right: 30px;
            top: 8px;
        }
        .directed-item {
            margin-bottom: 20px;
            margin-right: 10px;
            .template-hd,
            .template-bd,
            table {
                background-color: #fbfbfb;
            }
        }
        .selected-area-row {
            line-height: 28px;
            font-size: 14px;
            padding-left: 30px;
            span,
            .province {
                color: #515974;
                font-weight: bold;
            }
            .city-items {
                font-weight: normal;
            }
        }
        .template-bd {
            padding: 12px 0 22px;
            border-bottom: 0 none !important;
        }
    } // time direct
    .time-direct {
        .el-date-editor {
            margin-left: 84px;
            width: 270px!important;
        }
        table {
            background-color: #fff;
            font-size: 12px;
            border-collapse: collapse;
            border: none;
        }
        table,
        td,
        th {
            margin: 0;
            padding: 0;
            vertical-align: middle;
            text-align: center;
        }
        tbody td,
        tbody th {
            padding: 15px;
            border: 1px solid #e8edf4;
        }
        thead th {
            font-size: 14px;
            color: #515974;
            font-weight: bold;
            line-height: 17px;
            padding: 9px;
            text-align: center;
            border: 1px solid #e8edf4;
        }
        tbody td {
            color: #aeb2be;
            font-weight: normal;
            &.selcted {
                background-color: #6cabff;
                color: #d8e9ff;
            }
        }
        .special-cell {
            border-top: none;
            padding: 10px;
            border-bottom: none;
        }
        .special-cell-s {
            padding: 10px;
            border: none;
        }
        .special-cell-t {
            border-right: none;
            border-left: none;
            padding: 10px;
        }
    } //地域
    .orientation-wrap {
        .area-item-row:first-child {
            padding: 7px 0 10px;
        }
        .area-province {
            padding: 10px 0 2px;
        }
        .small-menu-theme {
            font-size: 12px;
            margin: 9px 0 0 7px;
            display: inline-block;
        }
        .orientation-bd {
            height: 227px;
        }
        .label-wrap {
            padding-left: 20px;
            .el-checkbox {
                padding: 8px 0;
            }
        }
        .re-orientation-item {
            width: 300px;
        }
        .area-list {
            margin-left: 340px;
            .inferior-bd {
                padding: 0 20px;
            }
        }
        .el-input__suffix{
            right: 25px;
        }
        .el-input__prefix{
            left: 89%!important;
        }
    }
    .hide-meadia {
        display: none
    } // .el-checkbox__label {
    //     display: none
    // }
    // .el-checkbox-label-hide>span:nth-of-type(2) {
    //     display: none!important
    // }
    // 自适应
    @media screen and (max-width:1680px) {
        .time-direct tbody td {
            padding: 13px;
        }
    }
    @media screen and (max-width:1366px) {
        .redirect .time-direct {
            padding-left: 0;
        }
        .time-direct tbody td {
            padding: 0 5px!important;
        }
        .time-direct thead th {
            padding: 9px 7px!important;
        }
    }

      .item.active {
           background-color: #6cabff;
                color: #d8e9ff;
      }
</style>