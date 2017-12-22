<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommend.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="(item,index) in recommend">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <li>{{testMum}}</li>
          <ul>
            <li @click="testClick" v-for="(item,index) in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="Loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  // src/components/recommend/recommend.vue
  import Slider from 'base/slider/slider'
  import { getRecommend, getDiscList } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { registerWindow } from 'common/js/app'
  import { setupWebViewJavascriptBridge } from 'common/js/app'
  // import { JsBridge } from 'common/js/jsBridge'
  export default {
    components: {
      Slider,
      Scroll,
      Loading
    },
    data () {
      return {
        testMum: 1,
        recommend: [],
        discList: []
      }
    },
    mounted () {
      // JsBridge.registerHandler(
      //   'testJs',//注册的方法名，供原生调用
      //   (data, responseCallback) => {
      //     data = JSON.stringify(data) //  收到原生发来的数据
      //     responseCallback('js say: got it!')//处理完成后返回给原生
      //   })
    },
    created () {
      setTimeout(() => {
        this._getRecommend()
      }, 20)
      this._getDiscList()
    },
    methods: {
      testClick (event, index) {
        let _this = this
        let params = JSON.stringify({
          data: `call js confirm in js`,
          callback: registerWindow(`setLocation`, (res) => {
            this.testMum = res
          })
        })
        window.webkit.messageHandlers.Location.postMessage(params)
        // console.log(window)
        // window.webkit.messageHandlers.AppModel.postMessage({body: 'call js confirm in js'});
        // WebViewJavascriptBridge.callHandler('test', null, function (response) {
        //   document.write(response)
        // alert(response)
        // document.getElementById('returnValue').value = response
        // })
        // window.webkit.messageHandlers.test.postMessage({body: 'call js confirm in js'})
        // let command = {
        //   'test': '成功'
        // }
        // JsBridge.callHandler(
        //   'action',  //  原生声明的函数名称
        //   {data: command},  //  发送给原生的数据
        //   (res) => {
        //     document.write(res)
        //     // res = JSON.parse(res) //  原生处理完成后返回的数据
        //   }
        // )
        // latte.event(JSON.stringify(command))
      },
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommend = res.data.slider
          }
        })
      },
      _getDiscList () {
        getDiscList().then((res) => {
          this.discList = res.data.list
        })
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl";
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
