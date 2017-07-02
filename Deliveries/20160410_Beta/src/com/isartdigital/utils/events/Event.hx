package com.isartdigital.utils.events;
import com.isartdigital.builder.game.def.interactionEvent.InteractionEventDef;

class Event {
	public function new() {
	}

	public static function getClientXIn(event:InteractionEventDef) {
		if (event.changedTouches != null) {
			return event.changedTouches[0].clientX;
		}
		return event.clientX;
	}

	public static function getClientYIn(event:InteractionEventDef) {
		if (event.changedTouches != null) {
			return event.changedTouches[0].clientY;
		}
		return event.clientY;
	}
}
