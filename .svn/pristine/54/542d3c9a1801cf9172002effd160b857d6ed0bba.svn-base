package com.isartdigital.builder.game.factory;
import com.isartdigital.builder.game.sprites.Building;
import com.isartdigital.builder.game.sprites.buildings.Motel;
	
/**
 * Class factory des buildings
 * @author Dorian
 */
class BuildingFactory 
{	
	/**
     * Class Constructor
     * @return void
     **/
	private function new() 
	{
		
	}
	
	public static function create (name:String): Building {
		if (name == null) {
			return null;
		}
		
		if (name == "Motel") {
			return cast (new Motel());
		}
		
		
		return null;
	}
}