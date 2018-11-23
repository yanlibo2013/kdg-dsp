<template>
    <div class="time-slot">
        <el-tabs type="card" v-model="activeTabPeriod" @tab-click="tabChangePeriod(activeTabPeriod)">
            <el-tab-pane name="6-1-1">
                <span slot="label">
                                                                                                                    <span class="select-item ">全天投放</span>
                <i class="el-vertical-line">|</i>
                </span>
            </el-tab-pane>
            <el-tab-pane name="6-2-1" class="margin-bottom-30">
                <span slot="label">
                                                                                                        <span class="select-item">设置时段</span>
                <i class="el-vertical-line"></i>
                </span>
                <table  style="    position: relative;
    left: 100px;  cursor: pointer; ">
                    <thead>
                        <tr>
                            <th @click="checkedAll">全选</th>
                            <th class="special-cell"></th>
                            <th v-for="h in hours" @click="singeHour(h)" :key="h">{{h}}</th>
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
                            <td v-for="(h,index) in monday" @click="activateMondayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("二")'>二</th>
                            <td v-for="(h,index) in tuesday" @click="activateTuesdayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("三")'>三</th>
                            <td v-for="(h,index) in wendesday" @click="activateWendesdayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("四")'>四</th>
                            <td v-for="(h,index) in tursday" @click="activateThusdayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("五")'>五</th>
                            <td v-for="(h,index) in friday" @click="activateFridayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("六")'>六</th>
                            <td v-for="(h,index) in saturday" @click="activateSaturDayCell(h)" :class='h.value=="1"?"selcted":""' :key="index">{{h.key}}</td>
                        </tr>
                        <tr>
                            <th @click='allDay("日")'>日</th>
                            <td v-for="(h,index) in weekday" @click="activateWeekDayCell(h)" :class='h.value=="1"?"selcted":""' :key="index"> {{h.key}}</td>
                        </tr>

                    </tbody>
                </table>
            </el-tab-pane>
        </el-tabs>
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
    export default {
        data: function() {
            return {
                hours: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
                activeTabPeriod: "6-1-1",
                checkAllDays: "0",
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
                ismondaystatus: false, //默认全天24小时不全选
                istuesdaystatus: false,
                iswesdaystatus: false,
                isthuesdaystatus: false,
                isfridaystatus: false,
                isstadaystatus: false,
                issundaystatus: false,
            }
        },
        computed: {
            ...mapState({
                monday: "monday",
                tuesday: "tuesday",
                wendesday: "wendesday",
                tursday: "tursday",
                friday: "friday",
                saturday: "saturday",
                weekday: "weekday",
            })
        },
        methods: {
            ...mapActions([
                "checkedAllMonday",
                "checkedAllTuesdays",
                "checkedAllWendesday",
                "checkedAllthursday",
                "checkedAllFriday",
                "checkedAllSaturday",
                "checkedAllWeekdays",
                 "modifyMonday",
                "modifyTuesDay",
                "modifyWendesDay",
                "modifyThuesDay",
                "modifyFriDay",
                "modifySaturDay",
                "modifyWeekDay",
            ]),
            checkedAll() {
                if (this.checkAllDays == "0") {
                    this.setAll();
                    this.checkAllDays = "1";
                    // this.isResultTimePeriod = true;
                } else {
                    this.unSetAll();
                    this.checkAllDays = "0";
                    // this.isResultTimePeriod = false;
                }
            },
            allDay(val) {
                let self = this;
                // this.isResultTimePeriod = true;
                if (val == "一") {
                    console.log("一");
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
            singeHour(val) {
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
            tabChangePeriod(val) {
                if (val == "6-1-1") {
                    // this.timePeriod=[];
                    this.setAll();
                    this.checkAllDays = "1";
                    // this.isResultTimePeriod = true;
                }
                if (val == "6-2-1") {
                    // this.timePeriod=[];
                    this.unSetAll();
                    this.checkAllDays = "0";
                    // this.isResultTimePeriod = false;
                }
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

                    console.log("ismondaystatus");

                    console.log(this.ismondaystatus);
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
            activateMondayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyMonday(val);
                // this.isResultTimePeriod = true;
            },
            activateTuesdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyTuesDay(val);
                // this.isResultTimePeriod = true;
            },
            activateWendesdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyWendesDay(val);
                // this.isResultTimePeriod = true;
            },
            activateThusdayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyThuesDay(val);
                // this.isResultTimePeriod = true;
            },
            activateFridayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyFriDay(val);
                // this.isResultTimePeriod = true;
            },
            activateSaturDayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifySaturDay(val);
                // this.isResultTimePeriod = true;
            },
            activateWeekDayCell(val) {
                if (val.value == "0") {
                    val.value = "1"
                } else {
                    val.value = "0"
                }
                this.modifyWeekDay(val);
                // this.isResultTimePeriod = true;
            },
        },
        mounted() {}
    }
</script>

<style lang="scss">
.time-slot {

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
            padding: 12px;
            border: 1px solid #e8edf4;
        }
        thead th {
            font-size: 10px;
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
    } 
</style>