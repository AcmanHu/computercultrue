<template>
  <div>
    <i-row i-class="cont_row">
        <i-col span="4" i-class="cont_col">{{cont.batch}}</i-col>
        <i-col span="6" i-class="cont_col">
          <div>{{date[0]}}<br>{{date[1]}}</div>
        </i-col>
        <i-col span="5" i-class="cont_col">{{cont.place}}</i-col>
        <i-col span="4" i-class="cont_col">{{cont.residue}}</i-col>
        <i-col span="5" i-class="cont_col">
            <div class="operate" @click="opperat">立即预约</div>
        </i-col>
    </i-row>
    <i-modal title="提醒" :visible="visible1" @ok="CloseOK" @cancel="CloseCancel">
        <view>预约后将无法修改和取消！是否继续</view>
    </i-modal>
  </div>
</template>

<script>
/* eslint-disable */

import ajax from '@/utils/request'
export default {
  props: ['cont'],
  data () {
    return {
      visible1: false
    }
  },
  computed: {
    date () {
      return this.cont.time.split(' ')
    }
  },
  methods: {
    async CloseOK () {
      this.visible1 = false
      let order = await ajax(`index.php/exam/${this.cont.number}?exam=${this.cont.batch}`, 'PUT', '', wx.getStorageSync("token"))
      if(order.code == 1) {
        this.$emit('refresh');
        wx.showToast({
          title: order.msg,
          icon: 'none',
          duration: 2000
        })
      }
    },
    CloseCancel (){
      this.visible1 = false
    },
    opperat () {
      this.visible1 = true
    },
  },
}
</script>

<style>
.cont_row{
  font-size: 16px;
  padding: 10px 0;
  text-align: center;
  border-bottom:1px solid #edf0f6;
}
.operate{
  color: blue;
}
</style>
