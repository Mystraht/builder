import massive.munit.TestSuite;

import game.sprites.buildings.BuildingBuilderTest;
import game.sprites.buildings.BuildingConstructorTest;
import game.sprites.buildings.BuildingDefinitionTest;
import game.sprites.buildings.BuildingMoverTest;
import game.sprites.buildings.BuildingTest;
import MapManagerTest;

/**
 * Auto generated Test Suite for MassiveUnit.
 * Refer to munit command line tool for more information (haxelib run munit)
 */

class TestSuite extends massive.munit.TestSuite
{		

	public function new()
	{
		super();

		add(game.sprites.buildings.BuildingBuilderTest);
		add(game.sprites.buildings.BuildingConstructorTest);
		add(game.sprites.buildings.BuildingDefinitionTest);
		add(game.sprites.buildings.BuildingMoverTest);
		add(game.sprites.buildings.BuildingTest);
		add(MapManagerTest);
	}
}
