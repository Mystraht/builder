import massive.munit.TestSuite;

import game.sprites.buildings.BuildingConstructorTest;
import game.sprites.buildings.BuildingDefinitionTest;
import game.sprites.buildings.BuildingDestructorTest;
import game.sprites.buildings.BuildingHarvesterTest;
import game.sprites.buildings.BuildingMoverTest;
import game.sprites.buildings.BuildingTest;
import game.sprites.buildings.BuildingUtilsTest;
import GMapTest;

/**
 * Auto generated Test Suite for MassiveUnit.
 * Refer to munit command line tool for more information (haxelib run munit)
 */

class TestSuite extends massive.munit.TestSuite
{		

	public function new()
	{
		super();

		add(game.sprites.buildings.BuildingConstructorTest);
		add(game.sprites.buildings.BuildingDefinitionTest);
		add(game.sprites.buildings.BuildingDestructorTest);
		add(game.sprites.buildings.BuildingHarvesterTest);
		add(game.sprites.buildings.BuildingMoverTest);
		add(game.sprites.buildings.BuildingTest);
		add(game.sprites.buildings.BuildingUtilsTest);
		add(GMapTest);
	}
}
