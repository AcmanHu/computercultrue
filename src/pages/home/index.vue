<template>
  <div class="home">
    <div class="title">
      <span class="name">{{name}}</span>
      <span class="exit" @click="exit">立即退出</span>
    </div>
    <h3 class="tag">考试场次：</h3>
    <card :text="thead"></card>
    <cont :cont="cont[key]" @refresh="refresh" v-for="(index, key) in cont" :key="key"></cont>
    <div v-show="cont.length == 0">
      <i-load-more tip="暂无数据" :loading="false"/>
    </div>
    <div class="remind">
      <p class="rem_p">温馨提醒：</p>
      <div class="remind_content">
        <p>1.考试时间为60分钟</p>
        <p>2.请提前十分钟进场</p>
      </div>
    </div>
    <h3 class="tag">我的预约：</h3>
    <card :text="thead2"></card>
    <cont2 :cont2="cont2[key]" v-for="(index, key) in cont2" :key="key"></cont2>
    <div v-show="cont2.length == 0">
      <i-load-more tip="暂无数据" :loading="false"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ajax from "@/utils/request"
import card from "@/components/card"
import cont from "@/components/cont"
import cont2 from "@/components/cont2"
export default {
  components: {
    card,
    cont,
    cont2
  },
  data () {
    return {
      name: "",
      number: "",
      cont: [],
      cont2: []
    }
  },
  computed: {
    thead () {
      return ["批次", "开考时间", "地点", "余量", "操作"]
    },
    thead2 () {
      return ["批次", "考试时间", "地点", "状态", "成绩"]
    }
  },
  methods: {
    async getExamInfo () {
      this.cont = []
      let examInfo = await ajax(
        "index.php/exam",
        "GET",
        "",
        wx.getStorageSync("token")
      )
      let info = examInfo.msg
      for (let i = 0; i < info.length; i++) {
        let A = {}
        A["batch"] = info[i].id
        A["time"] = info[i].date
        A["place"] = info[i].place
        A["residue"] = info[i].total_mount - info[i].current_mount
        A["number"] = this.number
        this.cont.push(A)
      }
    },
    async getAlreadyInfo () {
      this.cont2 = []
      let examInfo = await ajax(
        "index.php/exam/" + this.number,
        "GET",
        "",
        wx.getStorageSync("token")
      )
      let info = examInfo.msg
      for (let i = 0; i < info.length; i++) {
        let A = {}
        A["batch"] = info[i].exam_id
        A["time"] = info[i].date
        A["place"] = info[i].place
        A["status"] = info[i].status == 0 ? "待考" : "已结束"
        A["score"] = info[i].score == null ? "未录入" : info[i].score
        this.cont2.push(A)
      }
    },
    exit () {
      const url = `../login/main`
      wx.reLaunch({ url })
    },
    refresh () {
      this.getAlreadyInfo()
    }
  },
  created () {},
  onReady () {
    this.getExamInfo()
    this.getAlreadyInfo()
  },
  // 接受传递login页面传递过来的参数
  onLoad (option) {
    this.name = option.name
    this.number = option.number
  }
}
</script>

<style>
.home {
  height: 100%;
}
.title {
  height: 40px;
  line-height: 40px;
  font-weight: 700px;
  color: white;
  padding: 0 5px;
  background: #83c0ff;
}
.title .exit {
  float: right;
}
.tag {
  padding: 5px;
  font-weight: bold;
}
.remind {
  font-size: 16px;
  padding: 10px;
  border-bottom: 1px solid #edf0f6;
}
.remind .rem_p {
  color: red;
}
.remind_content {
  padding-left: 80px;
}
</style>

