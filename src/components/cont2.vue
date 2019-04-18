<template>
  <div>
    <i-row i-class="cont_row">
        <i-col span="4" i-class="cont_col">{{cont2.batch}}</i-col>
        <i-col span="6" i-class="cont_col">
          <div>{{date[0]}}<br>{{date[1]}}</div>
        </i-col>
        <i-col span="5" i-class="cont_col">{{cont2.place}}</i-col>
        <i-col span="4" i-class="cont_col status">{{cont2.status}}</i-col>
        <i-col span="5" i-class="cont_col">{{cont2.score}}</i-col>
    </i-row>
  </div>
</template>

<script>
export default {
  props: ['cont2'],
  computed: {
    date () {
      return this.cont2.time.split(' ')
    }
  }
}
</script>

<style>
.cont_row{
  font-size: 16px;
  padding: 10px 0;
  text-align: center;
  border-bottom:1px solid #edf0f6;
}
.status{
  color: blue;
}
</style>
