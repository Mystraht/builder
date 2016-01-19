package com.isartdigital.builder.ui;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.Camera;
import dat.gui.GUI;

	
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
		if (Config.debug && Config.data.cheat) gui = new GUI();
	}
	
	// exemple de méthode configurant le panneau de cheat suivant le contexte
	public function ingame (): Void {
		// ATTENTION: toujours intégrer cette ligne dans chacune de vos méthodes pour ignorer le reste du code si le CheatPanel doit être désactivé
		if (gui == null) return;
		
		var lCamera:GUI = gui.addFolder("Camera");
		lCamera.open();
		lCamera.add(Camera.getInstance(), "speedLimite", 0, 100).listen();
		lCamera.add(Camera.getInstance(), "inertiaMax", 0, 100).listen();
		lCamera.add(Camera.getInstance(), "inertiaMin", 0, 100).listen();
		
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