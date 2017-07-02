package com.isartdigital.utils.ui;

import com.isartdigital.builder.Main;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.events.TouchEventType;
import com.isartdigital.utils.game.GameObject;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.ui.UIPositionable;
import pixi.core.display.DisplayObject;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import pixi.interaction.EventTarget;

/**
 * Base de tous les conteneurs d'interface
 * @author Mathieu ANTHOINE
 */
class UIComponent extends GameObject
{
	private var positionables:Array<UIPositionable> = [];
	
	private var isOpened:Bool;
	
	private var modalZone:Sprite;
	
	private var _modal:Bool = true;
	
	// TODO: pouvoir le varier dynamiquement
	public var modalImage:String="assets/alpha_bg.png";
	
	public function new()
	{
		super();
		
		interactive = true;
		
		on(MouseEventType.MOUSE_OVER, _mouseOver);
		on(MouseEventType.MOUSE_OUT, _mouseOut);
		on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
	}
	
	private function _mouseOver (pEvent:EventTarget): Void {
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OVER_UI);
	}
	
	private function _mouseOut (pEvent:EventTarget): Void {
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OUT_UI);
	}
	
	private function subscribeButtonsClickAndTap (callBack:EventTarget->Void, list:Array<Button>) : Void {
		for (button in list) {
			button.tap = button.click = callBack;
		}
	}
	
	private function setVisibilityInList (visibility:Bool, list:Array<DisplayObject>) : Void {
		for (object in list) {
			object.visible = visibility;
		}
	}
	
	private function unsubscribeButtonsClickAndTap (list:Array<Button>) : Void {
		for (button in list) {
			button.tap = button.click = null;
		}
	}
	
	private function setListFromChild (childName:String, list:Array<Dynamic>) : Void {
		for (child in children) {
			if (child.name == childName) list.push(cast(child));
		}
	}

	/**
	 * permet de construire l'UIComponent à partir de l'UIBuilder
	 */
	public function build () : Void {
		var lClassName = Type.getClassName(Type.getClass(this));
		lClassName = lClassName.substring(lClassName.lastIndexOf(".") + 1);

		var lItems:Array<UIPositionable> = UIBuilder.build(lClassName);
		//trace("number items :" + lItems.length + " class name : " + lClassName);

		addChildItems(lItems);
	}
	
	private function addChildItems (pItems:Array<UIPositionable>) : Void
	{
		for (lItem in pItems) {
			addChild(lItem.item);
			if (lItem.align != "") positionables.push(lItem);
		}
	}
	
	public function open (): Void {
		if (isOpened) return;
		isOpened = true;
		modal = _modal;
		GameStage.getInstance().on(EventType.RESIZE, onResize);
		onResize();
	}
	
	//TODO: verifier si y a besoin d'une variable privée ou si on peut utiliser modal direct
	
	public var modal (get, set):Bool;
	
	private function get_modal ():Bool {
		return _modal;
	}
	
	private function set_modal (pModal:Bool):Bool {
		_modal = pModal;
		
		if (_modal) {
			if (modalZone == null) {
				modalZone = new Sprite(Texture.fromImage(Config.url(modalImage)));
				modalZone.interactive = true;
				modalZone.on(MouseEventType.CLICK, stopPropagation);
				modalZone.on(TouchEventType.TAP, stopPropagation);
				positionables.unshift({ item:modalZone, align:UIPosition.FIT_SCREEN, offsetX:0, offsetY:0});
			}
			if (parent != null) parent.addChildAt(modalZone, parent.getChildIndex(this));
		} else {	
			if (modalZone != null) {
				if (modalZone.parent != null) modalZone.parent.removeChild(modalZone);
				modalZone.off(MouseEventType.CLICK, stopPropagation);
				modalZone.off(TouchEventType.TAP, stopPropagation);
				modalZone = null;
				if (positionables[0].item == modalZone) positionables.shift();
			}
		}
		
		return _modal;
	}
	
	private function stopPropagation (pEvent:EventTarget): Void {}
	
	public function close ():Void {
		if (!isOpened) return;
		isOpened = false;
		modal = false;
		destroy();
	}
	
	/**
	 * déclenche le positionnement des objets
	 * @param pEvent
	 */
	private function onResize (pEvent:EventTarget = null): Void {
		for (positionable in positionables) {
			if (positionable.update) {
				if (positionable.align==UIPosition.TOP || positionable.align==UIPosition.TOP_LEFT || positionable.align==UIPosition.TOP_RIGHT) {
					positionable.offsetY = parent.y + positionable.item.y;
				} else if (positionable.align==UIPosition.BOTTOM || positionable.align==UIPosition.BOTTOM_LEFT || positionable.align==UIPosition.BOTTOM_RIGHT) {
					positionable.offsetY = GameStage.getInstance().safeZone.height - parent.y - positionable.item.y;
				}
				
				if (positionable.align==UIPosition.LEFT || positionable.align==UIPosition.TOP_LEFT || positionable.align==UIPosition.BOTTOM_LEFT) {
					positionable.offsetX = parent.x + positionable.item.x;
				} else if (positionable.align==UIPosition.RIGHT || positionable.align==UIPosition.TOP_RIGHT || positionable.align==UIPosition.BOTTOM_RIGHT) {
					positionable.offsetX = GameStage.getInstance().safeZone.width - parent.x - positionable.item.x;
				}
				
				positionable.update = false;
			}

			UIPosition.setPosition(positionable.item, positionable.align, positionable.offsetX, positionable.offsetY);
		}
	}

	/**
	 * nettoie l'instance
	 */
	override public function destroy():Void {
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OUT_UI);
		
		off(MouseEventType.MOUSE_OVER, _mouseOver);
		off(MouseEventType.MOUSE_OUT, _mouseOut);
		off(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);

		close();
		GameStage.getInstance().off(EventType.RESIZE, onResize);
		
		super.destroy();
	}
	
}