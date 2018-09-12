// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var hero3 = require("HeroPlayer"); //引用玩家的操作脚本

cc.Class({
    extends: cc.Component,

    properties: {
        // 控制时间
        times: 0,

        // 碰撞音效资源
        pengAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.moveRight();
        cc.audioEngine.setEffectsVolume(0.2);
    },

    start() {

    },

    update(dt) {

        var _label = cc.find("Canvas/Hero").getComponent(hero3);

        //障碍物碰撞框
        if (cc.rectIntersectsRect(_label.node.getBoundingBoxToWorld(), this.noteBox())) {
            cc.eventManager.removeAllListeners(); //移除所有事件监听
        }

    },

    // 左右移动
    moveRight: function() {
        var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(this.times, cc.p(240, 0)),
                cc.moveBy(this.times, cc.p(-240, 0))
            )
        );
        this.node.runAction(seq);
    },

    //当前节点世界坐标系下的范围包围盒
    noteBox: function() {

        return this.node.getBoundingBoxToWorld();

    },
});