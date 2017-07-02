package com.isartdigital.builder.ui.popin;

import com.isartdigital.utils.sounds.SoundNames;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.builder.game.animation.paper.PaperPattern;
import haxe.Timer;
import js.Browser;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.def.metadatas.GiftsDef;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.def.GiftDef;
import com.isartdigital.builder.game.animation.paper.AnimationPaperBuilder;
import com.isartdigital.utils.game.GameStage;
import motion.easing.Bounce;
import motion.easing.Elastic;
import motion.easing.Expo;
import motion.easing.Quad;
import pixi.core.display.Container;
import pixi.core.math.Point;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
import pixi.core.display.DisplayObject;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class Pinata extends Popin
{
	private var pinata:DisplayObject;

	private static inline var BAT_CURSOR_EFFECT_HIT_DURATION:Int = 100;
	private static inline var BASE_RADIUS_FOR_PAPER:Float = 650;
	private static inline var GROWN_ANIMATION_DURATION:Float = 1;
	private static inline var GROWN_AMOUNT_ON_HIT:Float = 0.075;
	private static inline var PINATA_SCALE_TO_EXPLODE:Float = 1.5;
	private static inline var SHRINK_SPEED:Float = 0.01;
	private static inline var FLOWER_SCALE_COEF:Float = 2;

	private static inline var NUMBER_OF_SHAKE_PER_CLICK:Float = 4;
	private static inline var MIN_DISTANCE_TO_SHAKE:Float = 5;
	private static inline var MAX_DISTANCE_TO_SHAKE:Float = 40;

	private var pinataScale:Float = 1;

	private var rewards:Array<String>;
	private var goldGain:Int = 0;
	private var offeringGain:Int = 0;
	private var spiceGain:Int = 0;
	
	private var panAsset:DisplayObject;
	private var headAsset:DisplayObject;
	private var legAsset:DisplayObject;
	private var legBisAsset:DisplayObject;
	private var assAsset:DisplayObject;
	
	private var numberOfShake:Float = -1;
	private var toggleShake:Bool = false;
	
	
	private var flowers:Array<DisplayObject> = new Array<DisplayObject> ();

	public function new(rewards:Array<String>) {
		super();
		build();
		this.rewards = rewards;

		UIManager.getInstance().closeHud();
		
		panAsset = getChildByName("panAsset");
		headAsset = getChildByName("headAsset");
		legAsset = getChildByName("legAsset");
		legBisAsset = getChildByName("legBisAsset");
		assAsset = getChildByName("assAsset");
		
		flowers.push(getChildByName("fleurs_0000"));
		flowers.push(getChildByName("fleurs_0001"));
		flowers.push(getChildByName("fleurs_0002"));
		flowers.push(getChildByName("fleurs_0003"));
		flowers.push(getChildByName("fleurs_0004"));
		flowers.push(getChildByName("fleurs_0005"));
		flowers.push(getChildByName("fleurs_0006"));
		
		pinata = getChildByName("pinataAsset");
		pinata.interactive = true;

		pinata.click = pinata.tap = onPinataClick;
		Browser.document.body.style.cursor = 'url(bat.png), auto';

		Main.getInstance().on(EventType.GAME_LOOP, cast shrink);
		saveRewards();
		
		hideRewardsAsset();
	}
	
	private function hideRewardsAsset () : Void {
		panAsset.visible = false;
		headAsset.visible = false;
		legAsset.visible = false;
		legBisAsset.visible = false;
		assAsset.visible = false;
	}

	private function saveRewards():Void {
		var gifts:Array<GiftsDef> = Metadatas.gifts;

		for (reward in rewards) {
			var gift:GiftsDef = Reflect.getProperty(gifts, reward);
			if (gift.resource_name == RessourceManager.GOLD) goldGain += gift.resource_amount;
			if (gift.resource_name == RessourceManager.OFFERING) offeringGain += gift.resource_amount;
			if (gift.resource_name == RessourceManager.SPICE) spiceGain += gift.resource_amount;
		}
	}

	private function shrink():Void {
		if (pinataScale < 1) return;
		
		pinataScale -= SHRINK_SPEED;
		pinata.scale = new Point(pinataScale, pinataScale);
		
		for (flower in flowers) {
			var flowerScale:Float = lerp(1,  FLOWER_SCALE_COEF * PINATA_SCALE_TO_EXPLODE, (pinataScale - 1) / (PINATA_SCALE_TO_EXPLODE - 1));
			flower.scale = new Point(flowerScale, flowerScale);
		}
		
	}

	private function onPinataClick (event:EventTarget) : Void {
		if (pinataScale > PINATA_SCALE_TO_EXPLODE) {
			explodePinata();
			return;
		}

		SoundManager.playRandomSfx([
			SoundNames.PUNCH1,
			SoundNames.PUNCH2,
			SoundNames.PUNCH4,
			SoundNames.PUNCH5,
			SoundNames.PUNCH6
		]);

		pinataScale += GROWN_AMOUNT_ON_HIT;

		Browser.document.body.style.cursor = 'url(bathit.png), auto';
		Timer.delay(function () {
			Browser.document.body.style.cursor = 'url(bat.png), auto';
		}, BAT_CURSOR_EFFECT_HIT_DURATION);

		if (numberOfShake < 0) {
			numberOfShake = NUMBER_OF_SHAKE_PER_CLICK;
			shakeScreen(lerp(MIN_DISTANCE_TO_SHAKE, MAX_DISTANCE_TO_SHAKE, (pinataScale - 1) * 2));
		}
		
		var basePosition:Point = pinata.position.clone();
		
		var delta:Float = 25;
		var vectorX:Float = Math.random() > 0.5 ? 1 : -1;
		var vectorY:Float = Math.random() > 0.5 ? 1 : -1;
		
		pinata.x -= delta * vectorX;
		pinata.y -= delta * vectorY;
		
		Actuate.tween(pinata, 0.1, { x : basePosition.x, y : basePosition.y } ).ease(Bounce.easeOut);
		
		new AnimationPaperBuilder()
								.withContainer(GameStage.getInstance().getPopinsContainer())
								.withPosition(pinata.position)
								.withRadius(BASE_RADIUS_FOR_PAPER * pinataScale)
								.withSpeedRatio(pinataScale)
								.withPattern(PaperPattern.CIRCLE)
								.build();
	}

	private function lerp( x : Float, y : Float, v : Float ) : Float {
		return x * (1 - v) + y * v;
	}
	
	private function updatePinataScale():Void {
		pinata.scale = new Point(pinataScale, pinataScale);
	}

	override function juicyOpen():Void {
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut).onComplete(function (){
			Ftue.event.emit(FtueEvents.PINATA_APPEAR);
		});
	}

	private function createLinesOfPapers () : Void {
		new AnimationPaperBuilder()
				.withContainer(this)
				.withPosition(new Point(-width / 2, - height / 2))
				.withRadius(BASE_RADIUS_FOR_PAPER * pinataScale)
				.withSpeedRatio(pinataScale)
				.withPattern(PaperPattern.LINE)
				.build();
	}
	
	private function shakeScreen (distanceToShake:Float) : Void {
		var containerToShake:Container = GameStage.getInstance().getPopinsContainer();
		if (numberOfShake-- < 0) {
			containerToShake.position.set(2048 / 2, 1366 / 2);
			return;
		}

		var vectorX:Float = Math.random() > 0.5 ? 1 : -1;
		var vectorY:Float = Math.random() > 0.5 ? 1 : -1;


		var newPosition:Point = new Point();
		
		if (toggleShake) {
			newPosition.x = containerToShake.x + distanceToShake * vectorX;
			newPosition.y = containerToShake.y + distanceToShake * vectorY;
		} else {
			newPosition.set(2048 / 2, 1366 / 2);
		}
		
		Actuate.tween(
			containerToShake, 
			0.05,
			{ 	x : newPosition.x, 
				y : newPosition.y
			} ).ease(Expo.easeOut).onComplete(shakeScreen, [distanceToShake]);
			
		toggleShake = !toggleShake;
	}
	
	private function explodePinata():Void {
		
		SoundManager.playSFX(SoundNames.PINATA_FINAL);
		
		pinata.interactive = false;
		pinata.visible = false;
		panAsset.visible = true;
		panAsset.alpha = 0;
		
		headAsset.visible = legAsset.visible = legBisAsset.visible = assAsset.visible = true;
		
		var decalagePartie:Float = 250;
		
		Actuate.tween(headAsset.position, 0.3, { x : headAsset.position.x + decalagePartie } ).ease(Quad.easeOut);
		Actuate.tween(headAsset.position, 0.3, { y : headAsset.position.y - decalagePartie } ).ease(Quad.easeOut);
		
		Actuate.tween(legAsset.position, 0.3, { x : legAsset.position.x + decalagePartie } ).ease(Quad.easeOut);
		Actuate.tween(legAsset.position, 0.3, { y : legAsset.position.y + decalagePartie } ).ease(Quad.easeOut);
		
		Actuate.tween(legBisAsset.position, 0.3, { x : legBisAsset.position.x - decalagePartie } ).ease(Quad.easeOut);
		Actuate.tween(legBisAsset.position, 0.3, { y : legBisAsset.position.y + decalagePartie } ).ease(Quad.easeOut);
		
		Actuate.tween(assAsset.position, 0.3, { x : assAsset.position.x - decalagePartie } ).ease(Quad.easeOut);
		Actuate.tween(assAsset.position, 0.3, { y : assAsset.position.y - decalagePartie } ).ease(Quad.easeOut);
		
		Timer.delay(addPanAsset, 50);
		Timer.delay(finish, 1200);
	}
	
	private function addPanAsset () : Void {
		Actuate.tween(panAsset, 0.3, { alpha : 0.8 } ).ease(Expo.easeOut);
		
		panAsset.scale.set(0.5, 0.5);
		Actuate.tween(panAsset.scale, 0.9 , { x : 2, y : 2 } ).ease(Elastic.easeOut);
	}
	
	private function finish () : Void {
		Browser.document.body.style.cursor = 'url(cursor.png), auto';
		Timer.delay(function () {
			Browser.document.body.style.cursor = 'url(cursor.png), auto';
		}, BAT_CURSOR_EFFECT_HIT_DURATION * 2 + 200);
		Ftue.event.emit(FtueEvents.PINATA_EXPLODE);
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADEREWARD, [offeringGain, goldGain, spiceGain]);
		UIManager.getInstance().openHud();
	}

	override public function destroy():Void {
		super.destroy();
		Main.getInstance().off(EventType.GAME_LOOP, cast shrink);
	}

}