// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var HeroPlayer = require("HeroPlayer");
var MoveBg = require("BgMove");
var bgmu = require("AudioScript");


cc.Class({
    extends: cc.Component,

    properties: {
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        // bgsprite1 节点，用于背景移动
        bgsprite1: {
            default: null,
            type: cc.Node
        },
        // bgsprite2 节点，用于背景移动
        bgsprite2: {
            default: null,
            type: cc.Node
        },
        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // 背景音乐资源
        bgmusic: {
            default: null,
            type: cc.Node
        },
        // 游戏音乐资源
        gameAudio: {
            default: null,
            url: cc.AudioClip
        },
        // 游戏结束音乐资源
        gameOverAudio: {
            default: null,
            url: cc.AudioClip
        }

    },

    // 事件监听
    setEventControl: function() {
        var self = this;
        var hero = self.player.getComponent(HeroPlayer); //角色绑定控件
        var bg1 = self.bgsprite1.getComponent(MoveBg); //绑定背景控件
        var bg2 = self.bgsprite2.getComponent(MoveBg); //绑定背景控件
        var mus = self.bgmusic.getComponent(bgmu); //绑定背景音乐控件

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,

            // 设置是否吞没事件，在ontouchbegan方法返回true时吞没
            onTouchBegan: function(touch, event) {
                // 实现onTouchBegan事件回调函数
                var target = event.getCurrentTarget();

                // 获取时间所绑定的target
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                cc.log("当前点击坐标" + locationInNode);

                // 把当前点击点传递给声音节点，用来做点击判断
                mus.setCp(touch.getLocation());

                // 精灵移动
                hero.node.runAction(hero.setJumpUpAction());
                return true;
            },

            onTouchMove: function(touch, event) {
                // 触摸移动时触发
            },

            onTouchEnded: function(touch, event) {
                // 点击时间结束处理
                if (self.player.getPositionY() > 0) {
                    var height = self.player.getPositionY(); //背景需要移动的高度
                    self.player.setPositionY(height / 2); //设置精灵的高度位置
                    self.gainScore(); //积分更新

                    bg1.node.runAction(bg1.setMoveAction(height)); //背景实现向下滚动
                    bg2.node.runAction(bg2.setMoveAction(height)); //背景实现向下滚动
                }
            },
        }, self.node)
    },

    // 如果背景的坐标移出屏幕 开始设置新的坐标
    setBgMoveCreate: function() {
        // 如果背景1的坐标移出屏幕 开始设置新坐标
        if (this.bgsprite1.getPositionY() < -500) {
            // cc.log("背景1坐标" + this.bgsprite1.getPositionY());
            this.bgsprite2.setPositionY(this.bgsprite1.getPositionY() + this.bgsprite1.getContentSize().height);
        }

        // 如果背景2的坐标移出屏幕 开始设置新坐标
        if (this.bgsprite2.getPositionY() < -500) {
            // cc.log("背景2坐标" + this.bgsprite2.getPositionY());
            this.bgsprite1.setPositionY(this.bgsprite2.getPositionY() + this.bgsprite2.getContentSize().height);
        }
    },

    // 退出游戏
    gameOver: function() {
        // 移除所有事件监听
        cc.eventManager.removeAllListeners();
        // 停止 player 节点的跳跃动作
        this.player.stopAllActions();

        // 切换场景到结束场景
        cc.director.loadScene("GameOver");
    },

    // 积分获取
    gainScore: function() {
        this.score += 1;

        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score.toString();

        // 本地存储
        cc.sys.localStorage.setItem("ScoreDis", this.scoreDisplay.string);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 触摸监听
        this.setEventControl();

        // 初始化计分
        this.score = 0;

        // 添加判断
        this.isMoving = true;
    },

    start() {

    },

    update(dt) {
        //检测背景
        this.setBgMoveCreate();

        // gameover判断 玩家坠落到屏幕底部 游戏结束
        if (this.player.getPositionY() <= -cc.view.getVisibleSize().height / 2) {
            this.unscheduleAllCallbacks();

            if (this.isMoving) {
                this.gameOver();
                this.isMoving = false;
            }
        }

        // 判断音效
        if (this.bgmusic.getComponent(bgmu).isOpen) {
            cc.log("恢复现在正在播放的所有音效");
            cc.audioEngine.resumeAllEffects();
        } else {
            cc.log("暂停现在正在播放的所有音效");
            cc.audioEngine.pauseAllEffects();
        }
    },
});