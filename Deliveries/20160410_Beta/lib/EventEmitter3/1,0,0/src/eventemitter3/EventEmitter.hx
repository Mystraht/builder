package eventemitter3;

@:native("EventEmitter")
extern class EventEmitter {
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 */
	function new();

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 */
	function listeners(event:String,exists:Bool):Array<Dynamic>;

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 */
	function emit(event:String, ?a1:Dynamic, ?a2:Dynamic, ?a3:Dynamic, ?a4:Dynamic, ?a5:Dynamic):Bool;

	/**
	 * Register a MapManagerTest EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 */
	function on(event:String, fn:Dynamic -> Void, ?context:Dynamic):Void;

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 */
	function once(event:String, fn:Dynamic -> Void, ?context:Dynamic):Void;

	/**
	 * Register a MapManagerTest EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 */
	function addListener(event:String, fn:Dynamic -> Void, ?context:Dynamic):Void;

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 */
	function off(event:String, fn:Dynamic -> Void, ?once:Bool):Void;

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 */
	function removeListener(event:String, fn:Dynamic -> Void, ?once:Bool):Void;

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 */
	function removeAllListeners(?event:String):Void;
}