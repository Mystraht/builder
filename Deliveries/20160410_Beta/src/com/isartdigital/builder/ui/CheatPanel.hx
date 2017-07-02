package com.isartdigital.builder.ui;

import com.isartdigital.utils.Debug;
import pixi.core.graphics.Graphics;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;
import haxe.Json;
import com.isartdigital.builder.api.Api;
import com.isartdigital.utils.Config;
import dat.gui.GUI;
import com.isartdigital.utils.system.DeviceCapabilities;
import js.Browser;

	
/**
 * Classe permettant de manipuler des parametres du projet au runtime
 * Si la propriété Config.debug et à false ou que la propriété Config.data.cheat est à false, aucun code n'est executé.
 * Il n'est pas nécessaire de retirer ou commenter le code du CheatPanel dans la version "release" du jeu
 * @author Mathieu ANTHOINE
 */
class CheatPanel 
{
	/**
	 * instance unique de la classe CheatPanel
	 */
	private static var instance: CheatPanel;
	
	/**
	 * instance de dat.GUI composée par le CheatPanel
	 */
	private var gui:GUI;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): CheatPanel {
		if (instance == null) instance = new CheatPanel();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		init();
	}
	
	private function init():Void {
		if (Config.debug && Config.data.cheat && !DeviceCapabilities.isCocoonJS) gui = new GUI();
	}
	
	// exemple de méthode configurant le panneau de cheat suivant le contexte
	public function ingame (): Void {
		// ATTENTION: toujours intégrer cette ligne dans chacune de vos méthodes pour ignorer le reste du code si le CheatPanel doit être désactivé
		if (gui == null) return;
		
		var debugGUI:GUI = gui.addFolder("Debug");
		debugGUI.add( { destroyAccount:function() {
			Api.user.destroy(function (result:String):Void {
				Browser.location.reload();
			}); 
		}}, 'destroyAccount');

		debugGUI.add(untyped Debug, 'debugPositionOnClick').listen();
		debugGUI.add(untyped Debug, 'debugIlluminateTileAtClick').listen();

		debugGUI.add( { getAllLanternPosition:function() {
			var positions:Array<Point> = [];
			var debugPointToRemove:Graphics;
			for (debugPoint in Debug.debugPointsList) {
				positions.push(IsoManager.isoToModelView(debugPoint.position, true));
			}
			debugPointToRemove = Debug.debugPointsList.pop();
			debugPointToRemove.parent.removeChild(debugPointToRemove);
			positions.pop();
			trace(Json.stringify(positions));
		}}, 'getAllLanternPosition');
	}
	
	/**
	 * vide le CheatPanel
	 */
	public function clear ():Void {
		if (gui == null) return;
		gui.destroy();
		init();
	}	
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}