package com.isartdigital.utils.ui;
import motion.Actuate;
import motion.easing.Cubic;
import motion.easing.Elastic;

/**
 * Classe de base des PopIn
 * Toutes les popin d'interface héritent de cette classe
 * @author Mathieu ANTHOINE
 */
class Popin extends UIComponent
{

	public function new() 
	{
		super();
		set_modal(true);
		juicyOpen();
		
		interactive = true;		
	}
	
	private function juicyOpen() : Void {
		scale.set(0.3, 0.3);
		Actuate.tween(this.scale, 0.7, { x: 1, y : 1 } ).ease(Elastic.easeOut);
	}	
}