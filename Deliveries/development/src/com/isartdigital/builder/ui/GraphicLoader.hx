package com.isartdigital.builder.ui;

import Math;
import Std;
import pixi.core.text.Text;
import pixi.core.math.Point;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.Screen;
import pixi.core.sprites.Sprite;

/**
 * Preloader Graphique principal
 * @author Mathieu ANTHOINE
 */
class GraphicLoader extends Screen
{

	/**
	 * instance unique de la classe GraphicLoader
	 */
	private static var instance: GraphicLoader;

	private static inline var LOADSCREEN_SPRITE_NAME:String = 'titlecard';
	private static inline var LOADING_TEXT_OFFSET_X:Int = 50;
	private static inline var LOADING_TEXT_OFFSET_Y:Int = 60;
	private var loaderBar:Sprite;
	private var titleCard:StateGraphic;
	private var titleCardText:Text;

	public function new()
	{
		super();
		var titleCardTextStyle:TextStyle = {};
		titleCard = new StateGraphic(LOADSCREEN_SPRITE_NAME);
		titleCard.scale = new Point(1.5, 1.5);

		titleCardTextStyle.font = 'bold 130px Arial';
		titleCardTextStyle.fill = "#FFFFFF";
		titleCardTextStyle.align = 'center';
		titleCardText = new Text(' 0 %', titleCardTextStyle);
		titleCardText.position.set(
			titleCard.width / 2 - titleCardText.width - LOADING_TEXT_OFFSET_X,
			titleCard.height / 2 - titleCardText.height - LOADING_TEXT_OFFSET_Y
		);

		addChild(titleCard);
		addChild(titleCardText);
	}


	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance(): GraphicLoader {
		if (instance == null) instance = new GraphicLoader();
		return instance;
	}
	
	/**
	 * mise à jour de la barre de chargement
	 * @param	pProgress
	 */
	public function update(pProgress:Float): Void {
		pProgress *= 100;
		pProgress = Math.floor(pProgress);
		titleCardText.text = Std.string(pProgress) + ' %';
	}

	public function destroyLoadscreenSprite():Void {
		removeChild(titleCardText);
		removeChild(titleCard);
		titleCard.destroy();
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
		super.destroy();
	}

}