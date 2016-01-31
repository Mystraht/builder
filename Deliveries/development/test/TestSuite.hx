import massive.munit.TestSuite;

import ApiTest;
import BuildingBuilderTest;
import BuildingMoverTest;
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
		add(BuildingMoverTest);
		add(BuildingTest);
		add(MapManagerTest);
	}
}
