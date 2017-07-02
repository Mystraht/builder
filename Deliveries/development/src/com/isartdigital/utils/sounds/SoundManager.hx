package com.isartdigital.utils.sounds;

import com.isartdigital.utils.system.DeviceCapabilities;
import howler.Howl;
import js.Browser;

	
/**
 * Manager centralisé de Sons Howler
 * @author Mathieu ANTHOINE
 */
class SoundManager
{
	/**
	 * liste de tous les sons du jeu
	 */
	private static var list (default,null):Map<String,Howl>;
	
	public static var canPlaySound:Bool = false;
	
	private static var canPlaySFX:Bool = true;
	private static var canPlayMusique:Bool = true;
	
	private static var currentMusiquePlaying:Howl = null;
	
	private function new() {
	}
	
	/**
	 * ajoute un son à la liste
	 * @param	pName identifiant du son
	 * @param	pSound son
	 */
	public static function addSound (pName:String,pSound:Howl):Void {
		if (list == null) list = new Map<String,Howl>();
		list[pName] = pSound;
	}
	
	/**
	 * retourne une référence vers le son par l'intermédiaire de son identifiant
	 * @param	pName identifiant du son
	 * @return le son
	 */
	public static function getSound(pName:String): Howl {
		return list[pName];
	}
	
	public static function playSFX (soundNames:String) : Void {
		if (DeviceCapabilities.isIEorEdgeBrowser()) return;
		
		if (canPlaySound && canPlaySFX) getSound(soundNames).play();
	}
	public static function playMusic (soundNames:String) : Void {
		if (DeviceCapabilities.isIEorEdgeBrowser()) return;
		
		if (!canPlaySound || !canPlayMusique) return;
		
		if (currentMusiquePlaying != null) {
			currentMusiquePlaying.stop();
		}
		
		currentMusiquePlaying = getSound(soundNames).play();
		currentMusiquePlaying.loop(true);
	}
	
	public static function playSoundWidthFade (sound:Howl) : Void {
		//if (canPlaySound) sound.fade();
	}
	
	public static function toggleSFX () : Void {
		canPlaySFX = !canPlaySFX;
	}
	
	public static function toggleMusique () : Void {
		canPlayMusique = !canPlayMusique;
		if (!canPlayMusique && toggleMusique != null) currentMusiquePlaying.stop();
		if (canPlayMusique && currentMusiquePlaying != null) currentMusiquePlaying.play().loop(true);
	}

	private static function playRandomSound(sounds:Array<String>, isMusic:Bool):Void {
		var sound:String = sounds[Math.floor(Math.random() * sounds.length)];
		if (isMusic) {
			playMusic(sound);
		} else {
			playSFX(sound);
		}
	}

	public static function playRandomMusic(sounds:Array<String>):Void {
		playRandomSound(sounds, true);
	}

	public static function playRandomSfx(sounds:Array<String>):Void {
		playRandomSound(sounds, false);
	}
}