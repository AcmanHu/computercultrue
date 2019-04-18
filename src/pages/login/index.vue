<template>
  <div class="login">
    <div class="bg">
      <img class="bgimg" mode="aspectFill" src="../../../static/images/login.png" alt>
    </div>
    <div class="content">
      <div class="exp-container">
        <div class="exp">
          <input
            type="number"
            class="exp__input"
            id="example"
            v-model="number"
            name="test"
            placeholder="请输入学号"
            required
          >
          <label class="exp_label" for="example">学号</label>
        </div>
        <div class="exp">
          <input
            type="email"
            class="exp__input"
            id="example2"
            v-model="name"
            name="test"
            placeholder="请输入姓名"
            required
          >
          <label class="exp_label" for="example2">姓名</label>
        </div>
      </div>
      <div class="btn">
        <i-button class="ibtn" @click="login" type="primary">登陆</i-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ajax from "@/utils/request";
export default {
  components: {},

  data () {
    return {
      number: "",
      name: ""
    };
  },
  created () {},
  methods: {
    async login () {
      let data = {
        number: this.number,
        name: this.name
      };
      let userInfo = await ajax("index.php/login", "post", data);
      if (userInfo) {
        wx.setStorageSync("token", userInfo.msg);
        const url = `../home/main?name=${this.name}&number=${this.number}`;
        wx.reLaunch({ url });
      }
    }
  }
};
</script>

<style>
.login {
  position: relative;
  height: 100%;
}
.bg {
  position: absolute;
  height: 100%;
  width: 100%;
}
.bg .bgimg {
  height: 100%;
  width: 100%;
  display: block;
}
.content {
  position: absolute;
  height: 200px;
  width: 100%;
  top: 50%;
  z-index: 2;
}
.exp-container {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}

.exp {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  margin-bottom: 5px;
  position: relative;
  flex-wrap: wrap;
}

.exp_label {
  transition: 0.3s;
  margin-bottom: 5px;
}

.exp_label:before {
  content: attr(data-icon);
  font-weight: normal;
  font-family: "Ionicons";
  font-size: 24px;
  position: absolute;
  left: 0;
  transform: rotateY(90deg);
  bottom: 0;
  height: 52px;
  background: transparent;
  color: #000;
  transform-origin: left;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s 0s ease, transform 0.3s 0s ease;
  width: 42px;
}

.exp__input {
  border: 1px solid #ddd;
  padding: 0 10px;
  width: 100%;
  height: 44px;
  transition: 0.3s;
  font-weight: normal;
  box-sizing: border-box;
  font-family: "Work Sans", sans-serif;
  outline: none;
}

.exp__input:focus {
  padding-left: 42px;
  border-color: #bbb;
}

.exp__input:focus + label:before {
  transform: rotateY(0deg);
}

.exp__input:valid {
  padding-left: 42px;
  border-color: green;
}

.exp__input:valid + label {
  color: green;
}

.exp__input:valid + label:before {
  transform: rotateY(0deg);
  color: green;
  font-size: 34px;
  content: attr(data-icon-ok);
}

.exp-title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 30px;
  font-weight: normal;
}

.exp-title span {
  display: inline-block;
  padding: 5px;
  font-size: 22px;
  background: #feffd4;
}
</style>

