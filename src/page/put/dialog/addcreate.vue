<template>
    <div class="add-create">
        aaa
    </div>
</template>

<script>
    import {
        put
    } from "../../../service/index";
    export default {
        computed: {
            // city() {
            //     return this.city;
            // },
            // province() {
            //     return this.province;
            // }
        },
        data: function() {
            return {
                province: [],
                cities: [],
                search: "",
                //父节点
                checkAllParent: false,
                checkedCitiesParent: [],
                isIndeterminateParent: true,
                sourceData: [],
                //子节点
                checkAllSub: false,
                checkedCitiesSub: [],
                isIndeterminateSub: true,
            }
        },
        mounted() {
            //初始化数据
            put.campRegion().then(res => {
                if (res.data.code == 0) {
                    let data = this.sourceData = res.data.data;
                    for (var j = 0; j < data.length; j++) {
                        this.province.push(data[j].name);
                    }
                }
                if (res.data.code == -1) {
                    this.$router.push({
                        path: "/login"
                    });
                }
            });
        },
        methods: {
            //父级
            handleCheckAllChangeParent(val) {
                this.checkedCitiesParent = val ? this.province : [];
                this.checkedCitiesParent = false;
                console.log(this.checkedCitiesParent);
            },
            handleCheckedCitiesChangeParent(value) {
                let id = this.getIdByName(value[value.length - 1]);
                this.getCityById(id);
                let checkedCount = value.length;
                this.checkAllParent = checkedCount === this.province.length;
                this.checkedCitiesParent = checkedCount > 0 && checkedCount < this.province.length;
            },
            //子级
            handleCheckAllChangeSub(val) {
                console.log(val);
                this.checkedCitiesSub = val ? this.cities : [];
                this.checkedCitiesSub = false;
            },
            handleCheckedCitiesChangeSub(value) {
                // let id = this.getIdByName(value[value.length - 1]);
                // this.getCityById(id);
                let checkedCount = value.length;
                this.checkAllSub = checkedCount === this.cities.length;
                this.checkedCitiesSub = checkedCount > 0 && checkedCount < this.cities.length;
            },
            getIdByName(val) {
                let ids = [];
                let data = this.sourceData;
                for (var j = 0; j < data.length; j++) {
                    if (val == data[j].name) {
                        ids.push(data[j].id);
                    }
                }
                return ids;
            },
            getCityById(val) {
                this.cities = ["city1", "city2", "city3"];
                // put.campRegion(val).then(res => {
                //     if (res.data.code == 0) {
                //         let data = res.data.data;
                //         for (var j = 0; j < data.length; j++) {
                //             this.cities.push(data[j].name);
                //         }
                //     }
                // });
                //console.log(this.cities);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../../style/mixin'; // 地域定向
    .redirect {
        .local {
            .select-bd {
                padding-left: 0;
            }
            .el-menu-item,
            .el-submenu__title {
                height: 34px;
                line-height: 34px;
                border-left-color: #fff;
                color: $firstc!important;
                &:hover {
                    background-color: #e1e7f0;
                    border-left-color: #ff6870;
                }
            }
            .redirect-config-select {
                border-right: 1px solid #e1e7f0;
                width: 220px;
                height: 507px;
                .is-round {
                    padding: 0 60px!important;
                    margin: 20px 0 20px 30px;
                }
            }
            .el-menu {
                background-color: #ffffff!important;
            }
            .el-menu-item,
            .el-submenu__title {
                border-width: 3px!important;
                font-size: 12px;
            }
            .el-menu-item {
                padding-left: 27px!important;
            }
            .el-submenu__title {
                padding-left: 27px!important;
            }
            .el-menu-item.is-active {
                border-left-color: #ff6870;
                background-color: #e1e7f0!important;
            }
            .el-menu-item [class^=el-icon-] {
                margin-right: 10px;
            }
            .el-submenu [class^="el-icon-"] {
                margin-right: 10px!important;
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
            .el-icon-resource {
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
            .el-menu-item-group {
                .el-menu-item {
                    padding-left: 51px!important;
                }
            }
            .el-checkbox__label {
                color: #bdbecd;
            }
            .is-checked+.el-checkbox__label {
                color: #515974;
            }
        }
        .select-bd {
            padding: 20px 0 0 30px;
            .el-checkbox+.el-checkbox {
                margin-left: 17px;
            }
        }
        .re-orientation-item {
            width: 270px;
            .orientation-bd {
                height: 361px;
                border: 1px solid #e1e7f0;
                border-top: 0 none;
                @include bottomLeftRadius(5px);
                @include bottomRightRadius(5px);
                .el-col-11 {
                    border-right: 1px solid #e1e7f0;
                }
            }
            .el-checkbox {
                display: block;
                padding: 8px 0 8px 20px;
                &.is-checked {
                    background-color: #f6f8fa;
                }
            }
            .el-input {
                width: 100%;
            }
            .el-checkbox__label {
                font-size: 12px;
            }
            .re-orientation-item {
                width: 38%;
            }
            .el-checkbox+.el-checkbox {
                margin-left: 0;
            }
            .el-input__inner {
                padding-left: 12px!important;
                @include bottomRightRadius(0);
                @include bottomLeftRadius(0);
            }
        }
        .area-list {
            margin-left: 308px;
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
            }
            .inferior-bd {
                padding: 0 20px;
                height: 360px;
            }
            .area-item-row {
                .el-checkbox+.el-checkbox {
                    margin-left: 20px;
                }
            }
            .area-item-row:first-child {
                padding: 7px 0 10px;
            }
            .area-province {
                padding: 10px 0 2px;
            }
            .el-checkbox-group {
                padding: 7px 0 8px;
            }
        }
        .is-confirm {
            background-color: #fbfbfb;
            padding-top: 30px;
        }
    }
</style>