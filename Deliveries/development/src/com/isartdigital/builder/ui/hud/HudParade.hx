package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.ui.items.ResourcesView;
import com.isartdigital.builder.ui.items.TimerParade;
import com.isartdigital.utils.ui.Screen;

/**
 * ...
 * @author Flavien
 */
class HudParade extends Screen
{
	public static inline var UPDATE_REQUEST_TIMER:String = "UPDATE_REQUEST_TIMER";
	public static inline var UPDATE_REQUEST_PESOS_VIEW:String = "UPDATE_REQUEST_PESOS_VIEW";
	public static inline var UPDATE_REQUEST_PIMIENTOS_VIEW:String = "UPDATE_REQUEST_PIMIENTOS_VIEW";
	public static inline var UPDATE_REQUEST_OFFERING_VIEW:String = "UPDATE_REQUEST_OFFERING_VIEW";
	
	public static var instance:HudParade;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): HudParade {
		if (instance == null) instance = new HudParade();
		return instance;
	}	

	private var resourcesView:ResourcesView;
	private var timerParade:TimerParade;
	
	public function new() 
	{
		super();
		_modal = false;
		build();
	
		setVariableFromChild();
	}
	
	public function getRessourceView () : ResourcesView {
		return resourcesView;
	}
	
	override public function open():Void 
	{
		super.open();
		subscribeEvent();
	}
	
	override public function close():Void 
	{
		super.close();
		unsubscribeEvent();
	}
	
	private function subscribeEvent () : Void {
		on(UPDATE_REQUEST_TIMER, onUpdateRequestTimer);
		on(UPDATE_REQUEST_PESOS_VIEW, onUpdateRequestPesosView);
		on(UPDATE_REQUEST_OFFERING_VIEW, onUpdateRequestOfferingView);
		on(UPDATE_REQUEST_PIMIENTOS_VIEW, onUpdateRequestPimientosView);
	}
	
	private function unsubscribeEvent () : Void {
		removeListener(UPDATE_REQUEST_TIMER, onUpdateRequestTimer);
		removeListener(UPDATE_REQUEST_PESOS_VIEW, onUpdateRequestPesosView);
		removeListener(UPDATE_REQUEST_PIMIENTOS_VIEW, onUpdateRequestPimientosView);
		removeListener(UPDATE_REQUEST_OFFERING_VIEW, onUpdateRequestOfferingView);
	}
	
	private function onUpdateRequestTimer (pValueTimer:Int) : Void {
		timerParade.updateTimerText(pValueTimer);
	}
	
	private function onUpdateRequestPesosView (pPesosValue:Int) : Void {
		resourcesView.updatePesosText(pPesosValue);
	}
	
	private function onUpdateRequestPimientosView (pPimientosValue:Int) : Void {
		resourcesView.updatePimientosText(pPimientosValue);
	}
	
	private function onUpdateRequestOfferingView (pOfferingValue:Int) : Void {
		resourcesView.updateOfferingText(pOfferingValue);
	}
	
	private function setVariableFromChild () : Void {
		resourcesView = cast(getChildByName("ResourcesView"), ResourcesView);
		timerParade = cast(getChildByName("TimerParade"), TimerParade);
	}
	
	override public function destroy():Void 
	{
		instance = null;
		resourcesView.destroy();
		timerParade.destroy();
		super.destroy();
	}
	
}