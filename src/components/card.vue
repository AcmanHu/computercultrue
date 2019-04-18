<template>
  <div>
    <i-row i-class="rowclass">
        <i-col span="4" i-class="colclass">{{text[0]}}</i-col>
        <i-col span="6" i-class="colclass">{{text[1]}}</i-col>
        <i-col span="5" i-class="colclass">{{text[2]}}</i-col>
        <i-col span="4" i-class="colclass">{{text[3]}}</i-col>
        <i-col span="5" i-class="colclass">{{text[4]}}</i-col>
    </i-row>
  </div>
</template>

<script>
export default {
  props: ['text']
}
</script>

<style>
  .rowclass{
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #edf0f6;
    border-bottom: 1px solid #edf0f6;
  }
</style>
