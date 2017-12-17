import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false, //  播放状态
  fullScreen: false, // 全屏
  playList: [],     //  播放列表
  sequenceList: [], //  播放顺序列表
  mode: playMode.sequence,
  currentIndex: -1
}
export default state
