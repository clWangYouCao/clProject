<style lang="scss" scoped>
    @import '@/jymx-css/jymx.scss'
</style>
<template>
  <div @tdxActivity="tdxActivity">
    <div class="title">
      <div v-for="(col, colIndex) in cols" :key="colIndex" :style="getColStyle(col)">
        <text class="label">{{col.title}}</text>  
        <image v-if="colIndex==0" @click="clickFlag && statClick()" class="pic" :src="picSrc"/>
      </div>
    </div>
    <list class="list" @loadmore="fetch" @scroll="onScroll">
      <refresh class="refresh" @refresh="onrefresh" :display="refreshing ? 'show' : 'hide'">
        <loading-indicator class="indicator"></loading-indicator>
      </refresh>
      <cell
        class="row"
        :ref="'row'+index"
        v-for="(row,index) in rows" :key="index">
        <div v-for="(col, colIndex) in cols" :key="colIndex">
          <text class="label" :style="getFieldStyle(col, row[col.field])">{{row[col.field]}}</text>
        </div>
      </cell>
      <loading class="loading" @loading="onloading" :display="loading ? 'show' : 'hide'">
        <loading-indicator class="indicator"></loading-indicator>
      </loading>
    </list>
  </div>
  
</template>

<script>

const dom = weex.requireModule('dom');
const modal = weex.requireModule('modal');

import tdxCt from '@/libs/connect-weex.js';

export default {
  data() {
    return {
      rows: [],
      row: {},
      tabItems: ["千档盘口", "逐笔成交"],
      cols: [
        {
          title: "暂停",
          field: "Second"
        },
        {
          title: "委托价",
          field: "Now",
          align: "right"
        },
        {
          title: "手数",
          field: "NowVol",
          align: "right"
        },
        {
          title: "主动方",
          field: "InOutFlag"
        }
      ],
      param: "",
      bReverse: 1,
      xh: 0,
      num: 100,
      lastSeq: 0,
      tempMaxSeq: 0,
      count: 1,
      isAutoRefresh: true,
      isPush: false,
      refreshing: false,
      loading: false,
      clickFlag: true,
      timer:0,
      skin: "white"
    }
  },
  computed: {
    picSrc: function() {
      // 开始▷ 暂停||
      let picArr = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MzBCMENFM0ExRjYxMUU4OUM1Q0Q5N0EwMjUzM0NCQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MzBCMENFNEExRjYxMUU4OUM1Q0Q5N0EwMjUzM0NCQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMEIwQ0UxQTFGNjExRTg5QzVDRDk3QTAyNTMzQ0JDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUzMEIwQ0UyQTFGNjExRTg5QzVDRDk3QTAyNTMzQ0JDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+A/7mZQAAAhVJREFUeNrEV79LQlEUvl5FKhLdHAMXIYgW3aMQIhIicsgmBwscA/sjlFoD3+Bm0NJgRCBRo6hDQw0uQqNTiWERKH23jvAon+/e96MOfJwL75z7vfPuPT+ep16vMzPxcj4HlQQSQAyIAAF63Ac6QAuoAdVYPD4w29MzjRiEYagjYB+YZ3LyCpSAAl6ga2TEp5BmodrAoQIpI1vh0241m1npiEHohyoDaeaMVIAMov8wjJhILx0kZbTXFaL3T/vUZbpATssa7f2bmM40zdyTtP7Mue72Fpn7UgR5WB+xSJmgpPMusAo8WSAOEhfzNBsNURy6CinjG45GQ3ylENYasKNILvI8zKkiSeepICX9AqSwPADeFPM8ye3eYuSnqFJx4EHBLcGp9jKb5I9EfirrwqngMwfI34EcltvAs4l5hOu6DHPoBS6g1k3MApz9k3Dqp44JCsQW1LWJWd9HTXzZAcIZqGMgJ2He4TQ52CVdhGpIkn65cBpX7JBm6eWXFNxqgrhKZUxKUCq9pEPAOY05s4ols8pR9gbkLCspEK5A34u1hY9UEsPgOJ0KQE/S8Qy4BRYskPaI67stImrRnfJ/kL758eTJdV1Ho8HMLamAVDOauTJ2b7mB3NDek4c9RC1G0E2HIxd7bfwcb30TGr0w2MPNvaM5LGiRsEdnqin9SdCZR4ETlTwnW+ETNSI1/Xdy86ftU4ABAAF/pM5YD8yvAAAAAElFTkSuQmCC",
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NzBENDk4M0ExRjYxMUU4QjM3OUVFMTBFMTlGRjVEQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NzBENDk4NEExRjYxMUU4QjM3OUVFMTBFMTlGRjVEQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3MEQ0OTgxQTFGNjExRThCMzc5RUUxMEUxOUZGNURDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3MEQ0OTgyQTFGNjExRThCMzc5RUUxMEUxOUZGNURDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+GMnT8wAAAeZJREFUeNrEl7FOAkEQhpeRgERRQqWdNDYUJgTegAqfQBLojBWNFjwDhTRamNBdIm+AJNJqQsBQaWGFpTYGpVBJJP4TB3PBO24x3PonXza5u92fYW9m5wLtdlt5aYkogiEHsiAFEiAqt4egD3qgBZrpTObNa83ALGMYxjEcgn2wpvT0Cmqgih/w7PYQzTAtYrgDR3OYKnmW59zddLtF7YhhGMJwCgpqMbJACdGPXCMW0/oCTVkcdR3Rh2b91Rzprlq8eM0TR2PZ04LyT0X7npPt7a0o/1WBedweMadMTGPiPXhyuM5pc6sxPyZeKtDtdLg4PGikzAfYBGlwOXVvD1yARxDRyPMtkoqkk6fvn+MxV6QXp4glXUaaeZ4jKYOmlSWpvaaVIin4ppUg2yljUlFS/ySS89S0hiSHuGn1SToH0+qRtCum1WLjppQxL4VxmIQxrjrcW0fxD2IMarZGTZIyWNOYsAw64Nzh3hm4Aisa69S4GZykUxUMNCZtgw2H63zU7WjMH4jX97GIqPlYKxvY2/Kk8/wpIDC3pDHzSxZMLbeeqwQaPpg2ZG3nZg9R83maX3DkvFZ+ur399fqL+QFS51r6sNgfDQeyp9ZcXxKy50lwrJnn9jzlOUk3U89vJz8/2r4EGAC2s4uKGPDvWAAAAABJRU5ErkJggg=="];
      return this.isAutoRefresh ? picArr[1] : picArr[0];
    }
  },
  methods: {
    getColStyle: function(col) {
      let width = (750 / this.cols.length).toFixed(2);
      let align = col.align;
      if(align == "left") {
        align = "flex-start";
      } else if(align == "right") {
        align = "flex-end";
      } else {
        align = "center";
      }
      
      return {
        width: width + "px",
        flexDirection: "row",
        justifyContent: align
      }
    },
    getFieldStyle: function(col, val) {
      let width = (750 / this.cols.length).toFixed(2);
      let field = col.field;
      let align = col.align;
      let color = "#101419";

      if(field == "InOutFlag") {
        if(val == "B") {
          color = "#FF4B3D";
        } else if(val == "S") {
          color = "#04AC3E";
        }
      }
      if(field == "Now") {
        color = "#04AC3E";
      }

      if(field == "NowVol") {
        if(Number(val) >= 500)
        color = "#E01FD5";
      }

      if(align == "left") {
        align = "left";
      } else if(align == "right") {
        align = "right";
      } else {
        align = "center";
      }

      return {
        color: color,
        textAlign: align,
        width: width + 'px'
      }
    },

    // 上一页
    onrefresh: function() {

      var pos = this.xh - this.rows.length - this.num;
      var pageSize = 0;
      if(pos < 0) {
        pos = 0;
        pageSize = this.xh - this.rows.length;
      }
      else {
        pageSize = 100;
      }

      this.queryData(pos, pageSize, 0)

      this.refreshing = true;
      if(!this.isAutoRefresh) {
        this.isPush = false;
        this.bReverse = 0;
        this.xh = this.lastSeq - this.rows.length - 50; 
        this.num = 50;
        if(this.xh <=0 ) {
          this.xh = 0;
          this.num = this.lastSeq - this.rows.length;
        }
        this.queryData();
      } else {
        setTimeout(() => {
          this.refreshing = false;
        }, 100);
      }
    },

    // 下一页
    onloading: function() {

      var pos = this.xh
      var pageSize = this.num

      this.queryData(pos, pageSize, 0, 2)


      this.loading = true;
      if(!this.isAutoRefresh) {
        this.isPush = true;
        this.bReverse = 0;

        
        this.num = 50;
        this.xh = this.lastSeq;
        
        this.queryData();
        
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }
    },
    scrollBottom: function() {
      this.$nextTick(() => {
        let index = this.rows.length - 1;
        let el = this.$refs['row'+index][0];
        dom.scrollToElement(el, {});
      });
    },
    scrollTop: function() {
      this.$nextTick(() => {
        let el = this.$refs.row0[0];
        dom.scrollToElement(el, {});
      });
    },
    statClick: function() {
      this.isAutoRefresh = !this.isAutoRefresh;
      this.timer = 0;
      this.cols[0]["title"] = this.isAutoRefresh ? "暂停" : "刷新";
      if(this.isAutoRefresh) {
        this.querySeqNum();
      }
      console.log("--isAutoRefresh--", this.isAutoRefresh);
    },

    // 定时刷新函数
    querySeqNum: function() {
      this.isPush = false;
      //自动刷新每次拉取最新100条数据


      this.xh = 0;
      this.bReverse = 1;
      this.queryData(0, 100, 1, 0);

      //判断是否在开市时间内
      // let flag = this.isOpenTime();
      
      // if(this.isAutoRefresh) {
      //   if(flag) {
      //     clearTimeout(this.timer);
      //     this.timer = setTimeout(()=>{
      //       if(this.timer) {
      //         this.querySeqNum();
      //       }
      //     },3000);
      //   } else {
      //     this.clickFlag = false;
      //     this.isAutoRefresh = false;
      //     this.cols[0]["title"] = this.isAutoRefresh ? "暂停" : "刷新";
      //   }
      // }
    },
    queryData: function(pos, pageSize, reverse, type) {

      this.param["Startxh"] = pos;
      this.param["WantNum"] = pageSize;
      this.param["bReverse"] = reverse;
      console.log(JSON.stringify(this.param));
      tdxCt.HQCallTql("HQServ.PBZBCJ", this.param, {}, data => {

        // 定时回调
        if(type == 0) {
          this.xh = maxseq
          this.rows = data.rows
        }
        // 上一页回调
        else if(type == 1) {
          this.rows = 
        }

        // 下一页回调
        else if(type == 2) {
          this.xh = this.xh + data.rows.length;

        }
        

        console.log(data);
        let res = JSON.parse(data);
        if(this.isAutoRefresh) {
          this.lastSeq = res["MaxTic2Seq"];
        }
        let listHead = res["ListHead"];
        let listItem = res["ListItem"];
        if(!listHead || !listItem) {
          this.refreshing = false;
          this.loading = false;
          return
        }
        listHead = res["ListHead"]["ItemHead"];
        let keyIndex = [];
        let tempRows = [];
        for(let i = 0, len = listHead.length; i < len; i++) {
          let key = listHead[i];
          switch(key) {
            case "Second":
              keyIndex[0] = i;
              break;
            case "Now":
              keyIndex[1] = i;
              break;
            case "NowVol":
              keyIndex[2] = i;
              break;
            case "InOutFlag":
              keyIndex[3] = i;
              break;
            default:
              break;
          }
        }
        let opObj = {
          "0": "B",
          "1": "S",
          "2": ""
        };
        for(let j = 0, jLen = listItem.length; j < jLen; j++) {
          this.row = {};
          let item = listItem[j]["Item"];
          this.row["Second"] = this.getTime(item[keyIndex[0]]);
          this.row["Now"] = item[keyIndex[1]] / 10000;
          this.row["NowVol"] = item[keyIndex[2]];
          this.row["InOutFlag"] = opObj[item[keyIndex[3]]];
          if(this.isPush) {
            this.rows.push(this.row);
          } else {
            tempRows.push(this.row);
          }
        }
        console.log(this.rows);

        if(this.isAutoRefresh) {
          this.rows = tempRows;
          this.scrollBottom();
        } else {
          if(!this.isPush) {
            this.rows = tempRows.concat(this.rows);
            this.refreshing = false;
          } else {
            this.scrollBottom();
            this.loading = false;
          }
        }
      })
    },
    getBackgroundColor: function() {
      let search = location.search.substr(1);
      let key = "color";
      let reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
      let r = search.match(reg);
      if(r != null) {
        this.skin = r[2];
      }
      console.log("skin", this.skin);
    },
    getTime: function(seconds) {
      let msec = (new Date().setHours(0, 0, 0, 0)) + Number(seconds)*1000;
      let date = new Date(msec);
      let hour = date.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return hour + ":" + minute + ":" + second;
    },
    isOpenTime: function() {
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      let flag = true;
      if(hour > 8 && hour < 12) { //9:25-11:30 13:00-15:00
        if((hour == 9 && minute < 25) || (hour == 11 && minute > 30)) {
          flag = false;
        }
      } else if(hour > 12 && hour < 16) {
          if(hour == 15 && minute > 0) {
              flag = false;
          }
      } else {
        flag = false;
      }
      return flag;
    },
    init: function() {
      let rp = this.$getConfig();
      this.param = {
        "Head": {
          "ExHQFlag": 4
        },
        "Setcode": parseInt(rp.Setcode),
        "Code": rp.Code,
        "bReverse": this.bReverse,
        "Startxh": 0,
        "WantNum": 100
      };
      this.querySeqNum();
    }
  },
  mounted: function() {
    this.init();
  }
}
</script>

