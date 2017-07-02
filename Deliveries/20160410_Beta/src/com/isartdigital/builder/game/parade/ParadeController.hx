package com.isartdigital.builder.game.parade;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import eventemitter3.EventEmitter;
import pixi.core.display.Container;
import pixi.core.math.Point;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ParadeController extends EventEmitter
{
	private var parade:Parade;
	
	public function new(parade:Parade) 
	{
		super();
		
		this.parade = parade;
	}
	
	public function start () : Void {
		subsribeClickAndTapEvent();
	}
	
	public function stop () : Void {
		unsubscribeClickAndTapEvent();
	}
	
	private function subsribeClickAndTapEvent () : Void {
		Main.getInstance().on(GameManager.EVENT_INTERACTION, onClickOrTap);
	}
	
	private function unsubscribeClickAndTapEvent () : Void {
		Main.getInstance().removeListener(GameManager.EVENT_INTERACTION, onClickOrTap);
	}
	
	private function onClickOrTap (position:Point) {
		if (Camera.getInstance().hasMoved) return;
		
		position = IsoManager.isoToModelView(position);
		parade.paradeProcession.changeDestination(position);
	}
	
	public function clean () : Void {
		unsubscribeClickAndTapEvent();
	}
	
}