import massive.munit.TestSuite;

import ApiTest;
import BuildingBuilderTest;
import BuildingConstructerTest;
import BuildingDefinitionTest;
import BuildingTest;
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

		add(ApiTest);
		add(BuildingBuilderTest);
		add(BuildingConstructerTest);
		add(BuildingDefinitionTest);
		add(BuildingTest);
		add(MapManagerTest);
	}
}
