//stageselect.js

var label03;
var point = 100; //強化ポイント初期値
var cpoint; //強化ポイント表示

//ユニット毎の強化レベル
var lv_U01 = 1;
var lv_U02 = 1;
var lv_U03 = 1;
var lv_U04 = 1;
var lv_U05 = 1;

//ユニット毎のHP
var hp_U01 = 10;
var hp_U02 = 10;
var hp_U03 = 30;
var hp_U04 = 20;
var hp_U05 = 10;

//ユニット毎の攻撃力
var pow_U01 = 1;
var pow_U02 = 2;
var pow_U03 = 1;
var pow_U04 = 3;
var pow_U05 = 4;

var power = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        //スプライトシート読み込み
        cache = cc.spriteFrameCache;
        cache.addSpriteFrames(res.unit_plist, res.unit_png);

        //BGM
        audioEngine.stopMusic();//前BGMの停止
        //音楽再生エンジン
        audioEngine = cc.audioEngine;

        if (!audioEngine.isMusicPlaying()) {
          audioEngine.playMusic(res.kyouka_mp3 , true);
        }

        //背景
        var background = new cc.Sprite(res.background06_png);
        var size = cc.director.getWinSize();
        background.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        var backgroundLayer = cc.Layer.create();
        backgroundLayer.addChild(background);
        background.setScale(1.5);
        this.addChild(backgroundLayer);

        //タイトル枠
        back = cc.Layer.create();
        this.addChild(back);
        bg = cc.Sprite.create(res.background11_png);
        back.addChild(bg, 0);
        bg.setPosition(size.width * 0.5,size.height * 0.92, 15);

        //ユニット強化
        label01 = cc.LabelTTF.create("ユニット強化", "Arial", 40);
        label01.setColor(255,255,255);
        this.addChild(label01); //文字つける時はこっち*/
        label01.setPosition(size.width * 0.5,size.height * 0.92, 15);

        //ユニット枠
        waku01 = cc.Layer.create();
        this.addChild(waku01);
        waku = cc.Sprite.create(res.waku_png);
        waku01.addChild(waku, 0);
        waku.setPosition(size.width * 0.295,size.height * 0.45, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //悪魔アイコン1
        aku01 = cc.Layer.create();
        this.addChild(aku01);
        ma01 = cc.Sprite.create(cache.getSpriteFrame("akuma01"));
        aku01.addChild(ma01, 0);
        ma01.setPosition(size.width * 0.075,size.height * 0.75, 15);

        //ユニット1強化
        maou_unit01 = cc.Layer.create();
        this.addChild(maou_unit01);
        tx01 = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01") );
        maou_unit01.addChild(tx01, 0);
        tx01.setPosition(size.width * 0.11,size.height * 0.75, 15);

        hosi01 = cc.Layer.create();
        this.addChild(hosi01);
        powtx01 = cc.Sprite.create(cache.getSpriteFrame("powhosi01") );
        //hosi01.setScale(0.7);
        hosi01.addChild(powtx01, 0);
        powtx01.setPosition(size.width * 0.25,size.height * 0.78, 15);

        hp01 = cc.Layer.create();
        this.addChild(hp01);
        hptx01 = cc.Sprite.create(cache.getSpriteFrame("hphosi01") );
        //hp01.setScale(0.7);
        hp01.addChild(hptx01, 0);
        hptx01.setPosition(size.width * 0.25,size.height * 0.72, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //悪魔アイコン2
        aku02 = cc.Layer.create();
        this.addChild(aku02);
        ma02 = cc.Sprite.create(cache.getSpriteFrame("akuma01"));
        aku02.addChild(ma02, 0);
        ma02.setPosition(size.width * 0.075,size.height * 0.6, 15);

        //ユニット2強化
        maou_unit02 = cc.Layer.create();
        this.addChild(maou_unit02);
        tx02 = cc.Sprite.create(cache.getSpriteFrame("maou_otomo02_01") );
        maou_unit02.addChild(tx02, 0);
        tx02.setPosition(size.width * 0.11,size.height * 0.6, 15);

        hosi02 = cc.Layer.create();
        this.addChild(hosi02);
        powtx02 = cc.Sprite.create(cache.getSpriteFrame("powhosi02"));
        hosi02.addChild(powtx02, 0);
        //hosi02.setScale(0.7);
        powtx02.setPosition(size.width * 0.25,size.height * 0.63, 15);

        hp02 = cc.Layer.create();
        this.addChild(hp02);
        hptx02 = cc.Sprite.create(cache.getSpriteFrame("hphosi01"));
        hp02.addChild(hptx02, 0);
        //hp02.setScale(0.7);
        hptx02.setPosition(size.width * 0.25,size.height * 0.57, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //悪魔アイコン3
        aku03 = cc.Layer.create();
        this.addChild(aku03);
        ma03 = cc.Sprite.create(cache.getSpriteFrame("akuma01"));
        aku03.addChild(ma03, 0);
        ma03.setPosition(size.width * 0.075,size.height * 0.45, 15);

        //ユニット3
        maou_unit03 = cc.Layer.create();
        this.addChild(maou_unit03);
        tx03 = cc.Sprite.create(cache.getSpriteFrame("maou_otomo03_01") );
        maou_unit03.addChild(tx03, 0);
        tx03.setPosition(size.width * 0.11,size.height * 0.45, 15);

        hosi03 = cc.Layer.create();
        this.addChild(hosi03);
        powtx03 = cc.Sprite.create(cache.getSpriteFrame("powhosi01"));
        hosi03.addChild(powtx03, 0);
        //hosi03.setScale(0.7);
        powtx03.setPosition(size.width * 0.25,size.height * 0.48, 15);

        hp03 = cc.Layer.create();
        this.addChild(hp03);
        hptx03 = cc.Sprite.create(cache.getSpriteFrame("hphosi03") );
        hp03.addChild(hptx03, 0);
        //hp03.setScale(0.7);
        hptx03.setPosition(size.width * 0.25,size.height * 0.42, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //悪魔アイコン4
        aku04 = cc.Layer.create();
        this.addChild(aku04);
        ma04 = cc.Sprite.create(cache.getSpriteFrame("akuma01"));
        aku04.addChild(ma04, 0);
        ma04.setPosition(size.width * 0.075,size.height * 0.3, 15);

        //ユニット4
        maou_unit04 = cc.Layer.create();
        this.addChild(maou_unit04);
        tx04 = cc.Sprite.create(cache.getSpriteFrame("maou_otomo04_01") );
        maou_unit04.addChild(tx04, 0);
        tx04.setPosition(size.width * 0.11,size.height * 0.3, 15);

        hosi04 = cc.Layer.create();
        this.addChild(hosi04);
        powtx04 = cc.Sprite.create(cache.getSpriteFrame("powhosi03") );
        hosi04.addChild(powtx04, 0);
        //hosi04.setScale(0.7);
        powtx04.setPosition(size.width * 0.25,size.height * 0.33, 15);

        hp04 = cc.Layer.create();
        this.addChild(hp04);
        hptx04 = cc.Sprite.create(cache.getSpriteFrame("hphosi02"));
        hp04.addChild(hptx04, 0);
        //hp04.setScale(0.7);
        hptx04.setPosition(size.width * 0.25,size.height * 0.27, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //悪魔アイコン2
        aku05 = cc.Layer.create();
        this.addChild(aku05);
        ma05 = cc.Sprite.create(cache.getSpriteFrame("akuma01"));
        aku05.addChild(ma05, 0);
        ma05.setPosition(size.width * 0.075,size.height * 0.15, 15);

        //ユニット5
        maou_unit05 = cc.Layer.create();
        this.addChild(maou_unit05);
        tx05 = cc.Sprite.create(cache.getSpriteFrame("maou_otomo05_01") );
        maou_unit05.addChild(tx05, 0);
        tx05.setPosition(size.width * 0.11,size.height * 0.15, 15);

        hosi05 = cc.Layer.create();
        this.addChild(hosi05);
        powtx05 = cc.Sprite.create(cache.getSpriteFrame("powhosi04") );
        hosi05.addChild(powtx05, 0);
        //hosi05.setScale(0.7);
        powtx05.setPosition(size.width * 0.25,size.height * 0.19, 15);

        hp05 = cc.Layer.create();
        this.addChild(hp05);
        hptx05 = cc.Sprite.create(cache.getSpriteFrame("hphosi01") );
        hp05.addChild(hptx05, 0);
        //hp05.setScale(0.7);
        hptx05.setPosition(size.width * 0.25,size.height * 0.13, 15);
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

        //ポイント背景
        back02 = cc.Layer.create();
        this.addChild(back02);
        bg02 = cc.Sprite.create(res.background12_png );
        back02.addChild(bg02, 0);
        //hp05.setScale(0.7);
        bg02.setPosition(size.width * 0.8,size.height * 0.35, 15);

        //ステージ選んで
        label03 = cc.LabelTTF.create("クリアptで\nユニットを強化", "Arial", 25);
        label03.setColor(255,255,255);
        this.addChild(label03); //文字つける時はこっち
        label03.setPosition(size.width * 0.8,size.height * 0.3, 15);

        //クリアポイント
        cpoint = cc.LabelTTF.create("クリアpt:" + point, "Arial", 25);
        cpoint.setColor(color06);
        this.addChild(cpoint); //文字つける時はこっち*/
        cpoint.setPosition(size.width * 0.8,size.height * 0.45, 15);

        var drop01 = cc.Sprite.create(res.kodomo_png);　
        drop01.setPosition(size.width * 0.7, size.height * 0.609);
        this.addChild(drop01);

        //ポイント背景
        back03 = cc.Layer.create();
        this.addChild(back03);
        bg03 = cc.Sprite.create(res.background13_png );
        back03.addChild(bg03, 0);
        //hp05.setScale(0.7);
        bg03.setPosition(size.width * 0.8,size.height * 0.1, 15);

        //ヘルプ
        help03 = cc.Layer.create();
        this.addChild(help03);
        hel03 = cc.Sprite.create(res.help04 );
        help03.addChild(hel03, 0);
        //hp05.setScale(0.7);
        hel03.setPosition(size.width * 0.5,size.height * 0.15, 15);

        //ステージ選択へ
        unit = cc.LabelTTF.create("ステージ選択へ", "Arial", 25);
        unit.setColor(255,255,255);
        this.addChild(unit); //文字つける時はこっち*/
        unit.setPosition(size.width * 0.8,size.height * 0.1, 15);

        cc.eventManager.addListener(kyoukaTouch, this);

        //■■■■■画像変更■■■■■■■■■■■■■■■■■■■■■■■■■■
        //ユニット01
        switch(lv_U01){
          case 2 :  hptx01.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    break;

          case 3 :  powtx01.setSpriteFrame(cache.getSpriteFrame("powhosi02"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    break;

          case 4 :  hptx01.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma01.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    break;
        }
        //ユニット02
        switch(lv_U02){
          case 2 :  powtx02.setSpriteFrame(cache.getSpriteFrame("powhosi03"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    break;

          case 3 :  powtx02.setSpriteFrame(cache.getSpriteFrame("powhosi04"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    break;

          case 4 :  hptx02.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma02.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    break;
        }
        //ユニット03
        switch(lv_U03){
          case 2 :  powtx03.setSpriteFrame(cache.getSpriteFrame("powhosi02"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    break;

          case 3 :  powtx03.setSpriteFrame(cache.getSpriteFrame("powhosi03"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    break;

          case 4 :  hptx03.setSpriteFrame(cache.getSpriteFrame("hphosi04"));
                    ma03.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    break;
        }
        switch(lv_U04){
          case 2 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    break;

          case 3 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi04"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    break;

          case 4 :  hptx04.setSpriteFrame(cache.getSpriteFrame("hphosi05"));
                    ma04.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    break;
        }
        switch(lv_U05){
          case 2 :  hptx05.setSpriteFrame(cache.getSpriteFrame("hphosi02"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma02"));
                    break;

          case 3 :  powtx05.setSpriteFrame(cache.getSpriteFrame("powhosi05"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma03"));
                    break;

          case 4 :  hptx05.setSpriteFrame(cache.getSpriteFrame("hphosi03"));
                    ma05.setSpriteFrame(cache.getSpriteFrame("akuma04"));
                    break;
        }

        //ステージ画面チュートリアル
        helpmode02 = cc.Layer.create();
        this.addChild(helpmode02);
        mode02 = cc.Sprite.create(res.tuto02);
        helpmode02.addChild(mode02, 10);
        mode02.setPosition(cc.p(size.width / 2.0, size.height / 2.0));
        mode02.setVisible(false);
    },

});

var PowerSelectScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new power();
        this.addChild(layer1);
    }
});
