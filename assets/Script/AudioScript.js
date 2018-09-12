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
        // 是否开启音乐 默认开启
        isOpen: true,
        // 游戏音乐资源
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        // 需要切换的资源
        textureOn: {
            default: null,
            url: cc.Texture2D
        },
        // 需要切换的资源
        textureOff: {
            default: null,
            url: cc.Texture2D
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 开启音乐
        this.isOpen = true;
        cc.audioEngine.playMusic(this.gameAudio, true);
    },

    start() {

    },

    // update(dt) {

    // },

    // 检查音乐开启状态
    checkMusic: function() {
        return isOpen;
    },

    // 切换资源
    setRes: function() {
        // 加载 SpriteFrame
        var self = this;
        var name = "on";

        if (this.isOpen) {
            name = "of";
        }

        cc.loader.loadRes("test assets/menu_music_" + name, cc.SpriteFrame, function(err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

    },

    // 获取点击坐标
    setCp: function(pos) {
        var rec = cc.rectContainsPoint(this.node.getBoundingBoxToWorld(), pos);

        if (rec) {
            if (this.isOpen) {
                // 暂停播放音乐
                cc.audioEngine.pauseMusic();
                cc.log("暂停播放音乐");
                this.isOpen = false;
            } else {
                // 恢复背景音乐
                cc.audioEngine.resumeMusic();
                cc.log("恢复背景音乐");
                this.isOpen = true;
            }
            this.setRes();
        }
    },
});