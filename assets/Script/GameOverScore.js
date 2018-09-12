// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 积分更新
        Scores: {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 首次加载2时调用
        this.disScore();
    },

    start() {

    },

    // update(dt) {

    // },

    disScore: function() {
        // 读取本地存储的计分
        this.score = cc.sys.localStorage.getItem("ScoreDis");

        // 更新 scoreDisplay Label 的文字
        if (this.score > 0) {
            this.Scores.string = "Score: " + this.score.toString();
        }
    },
});