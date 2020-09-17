<template>
  <div class="footer-wrapper">
    <div wx:if="{{config.desc}}">{{ config.desc }}</div>
    <div class="info">
      <span wx:if="{{config.author}}">作者: {{ config.author }}</span>
      <span wx:if="{{config.time}}">最后更新于: {{ config.time }}</span>
    </div>

    <div class="footer">
      <div>走出半生，归来仍是——东师青年</div>
      <div class="logo rotate">
        <img class="icon" src="https://v3.mp.innenu.com/img/logo.png" />
      </div>
    </div>
    <div class="copyright">Copyright © 2017-2020 HopeStudio</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BaseFoot extends Vue {
  // Foot description text
  @Prop({ type: String, default: "" }) private readonly desc!: string;

  // Author information
  @Prop({ type: String, default: "" }) private readonly author!: string;

  // Last edit time
  @Prop({ type: String, default: "" }) private readonly time!: string;
}
</script>
<style lang="stylus" scoped>
.footer-wrapper
  margin-top auto
  padding 10px 15px 8px
  padding-bottom env(safe-area-inset-bottom)
  color #86868b
  text-align left
  font-size 12px
  line-height 1.33337
  letter-spacing -0.01em

.footer-wrapper .info
  display flex
  flex-wrap wrap
  justify-content space-between

.footer-wrapper .footer
  display flex
  margin-top 10px
  font-size 10px
  font-weight 300
  line-height 1.6
  justify-content center
  align-items center
  letter-spacing 1px

.footer-wrapper .logo
  width 20px
  height 20px
  margin 0

.footer-wrapper .logo .icon
  width 100%
  height 100%

.footer-wrapper .copyright
  text-align center

@keyframes rotate
  from
    transform rotate(0deg)

  to
    transform rotate(360deg)

.rotate
  animation 9.5s linear 0s normal none infinite rotate
</style>
