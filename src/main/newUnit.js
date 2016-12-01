addunit = cc.Layer.extend({

  ctor: function(){
     this._super();
     //unit = new Unit();
     //this.addChild(unit);
    },
   addItem:function(){

     var unit = new Unit();
     this.addChild(unit);
   },

});

var Unit = cc.Sprite.extend({
  winsize: null,
 ctor: function() {
   this._super();
   this.winsize = cc.director.getWinSize();
   //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
   //this.initWithFile(cache.getSpriteFrame("maou_otomo01_01"));
   switch (unitup) {
     case 1:
     var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
     //スプライトフレームを作成
         var frame0 = cache.getSpriteFrame("maou_otomo01_01");
         var frame1 = cache.getSpriteFrame("maou_otomo01_02");
         var frame2 = cache.getSpriteFrame("maou_otomo01_03");
         sprite_p.hpP = hp_U01;
         sprite_p.atk = pow_U01;
       break;

     case 2:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo02_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo02_01");
         var frame1 = cache.getSpriteFrame("maou_otomo02_02");
         var frame2 = cache.getSpriteFrame("maou_otomo02_03");
         sprite_p.hpP = hp_U02;
         sprite_p.atk = pow_U02;
       break;

     case 3:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo03_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo03_01");
         var frame1 = cache.getSpriteFrame("maou_otomo03_02");
         var frame2 = cache.getSpriteFrame("maou_otomo03_03");
         sprite_p.hpP = hp_U03;
         sprite_p.atk = pow_U03;
       break;

     case 4:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo04_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo04_01");
         var frame1 = cache.getSpriteFrame("maou_otomo04_02");
         var frame2 = cache.getSpriteFrame("maou_otomo04_03");
         sprite_p.hpP = hp_U04;
         sprite_p.atk = pow_U04;
       break;

     case 5:
         var sprite_p = cc.Sprite.create(cache.getSpriteFrame("maou_otomo05_01"));
         var frame0 = cache.getSpriteFrame("maou_otomo05_01");
         var frame1 = cache.getSpriteFrame("maou_otomo05_02");
         var frame2 = cache.getSpriteFrame("maou_otomo05_03");
         sprite_p.hpP = hp_U05;
         sprite_p.atk = pow_U05;
       break;
}

   //var sprite = cc.Sprite.create(cache.getSpriteFrame("maou_otomo01_01"));
   //console.log("Y座標" + raneY);
   //sprite_p.numberP = array01;
   sprite_p.attackP = false;
   sprite_p.deth = false;

   //------アニメーションの追加
       var animationframe = [];

         //for (z = 0; z < 2; z++) {
           //スプライトフレームを配列に登録
           //animationframe.push("frame" + z);
           animationframe.push(frame0);
           animationframe.push(frame1);
           animationframe.push(frame2);
         //}
       //スプライトフレームの配列を連続再生するアニメーションの定義
       var animation = new cc.Animation(animationframe, 0.2);
       //永久ループのアクションを定義
       var action = new cc.RepeatForever(new cc.animate(animation));
       //実行
       sprite_p.runAction(action);
   //-------アニメーションの追加おわり

   sprite_p.setPosition(50, raneY);
   unitArray01.push(sprite_p);
   go.setVisible(false);


   this.addChild(sprite_p);
   array01++;

   this.schedule(this.update, 0.025);

 },
 //-------アップデート--------
 update: function(dt) {

if(unitArray01.length > 0){
 if(array01i < 0){
   //console.log("ユニット長さ" + unitArray01.length);
   array01i = unitArray01.length -1;
 }
   //ユニット配列
   if(array01i >= 0){

     if(unitArray01[array01i].attackP == false){
       //移動速度変更
       unitArray01[array01i].setPositionX(unitArray01[array01i].getPositionX() + 1);

//----------------↓ユニット攻城HPへらし↓-------
       if(unitArray01[array01i].getPositionX() > 380　&& unitArray01[array01i].deth == false){
         unitArray01[array01i].setPositionX(380);
         emargency = unitArray01[array01i].getPositionY();

         enemyDM++;
           if(enemyDM > 10){
             if(change == false){
               //エフェクト
               audioEngine.playEffect(res.se05_mp3);
           }

             enemyCS--;
             enemyDM = 0;
             ENBpos++;
             var size = ENbar.getContentSize();
             ENbar.setScaleX(enemyCS / 100);
             ENbar.setContentSize(cc.size(ENbar.width, size.height));
             //ENbar.ignoreAnchorPointForPosition(false);
             //console.log(ENbar.getPositionX());
             //コンテンツサイズで画像更新
             //アンカーポイント0,0でやる
             //イグノリアフォアアンカーポジション 常にtrue アンカーポイントを無効化 falseで治るかも

             switch (unitArray01[array01i].getPositionY()) {
               case 230:
                 Particle01.setPosition(unitArray01[array01i].getPositionX(),otomo01y );
                 break;
               case 190:
                 Particle02.setPosition(unitArray01[array01i].getPositionX(),otomo02y );
                 break;
               case 150:
                 Particle03.setPosition(unitArray01[array01i].getPositionX(),otomo03y );
                 break;
               case 110:
                 Particle04.setPosition(unitArray01[array01i].getPositionX(),otomo04y );
                 break;
               case 70:
                 Particle05.setPosition(unitArray01[array01i].getPositionX(),otomo05y );
                 break;
             }

             if(enemyCS < 99){
               E_efect01.setPosition(this.winsize.width * 0.9,this.winsize.height * 0.5 );
             }
             if(enemyCS < 70){
               E_efect02.setPosition(this.winsize.width * 0.95,this.winsize.height * 0.6 );
             }
             if(enemyCS < 50){
               E_efect03.setPosition(this.winsize.width * 0.95,this.winsize.height * 0.45 );
             }

             if(enemyCS < 20){
               switch (stage) {
                 case 1:
                   stage_S02 = true;
                   break;
                 case 2:
                   stage_S03 = true;
                   break;

               }
               scene_Un = true;
               var a = cc.TransitionFade.create(2.0, new ResultScene());
               change = true;
               cc.director.runScene(a);
             }
           }
       }else{
       }
     }
     array01i --;
   }
 }

 },
});
