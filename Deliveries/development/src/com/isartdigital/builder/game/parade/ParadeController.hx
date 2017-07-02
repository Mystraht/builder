package com.isartdigital.builder.game.parade;
import com.isartdigital.utils.sounds.SoundNames;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.iso.IsoManager;
import eventemitter3.EventEmitter;
import pixi.core.math.Point;

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
		Ftue.event.emit(FtueEvents.PARADE_MOVED);
	}
	
	public function clean () : Void {
		unsubscribeClickAndTapEvent();
	}
	
}