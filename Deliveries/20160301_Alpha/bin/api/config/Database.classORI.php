<?php

class Database
{
	private $db;

	public function __construct()
	{
		$this->db = [
		    'development' => [
		        'host' => 'localhost',
		        'database' => 'builder2_2017',
		        'username' => 'root',
		        'password' => 'mysql'
		    ],
		    'production' => [
		        'host' => 'localhost',
		        'database' => 'builder2_2017',
		        'username' => 'builder2_2017',
		        'password' => '8Jy$N*m2'
		    ]
		];
	}

	public function register($app) {
		$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
			'db.options' => array(
				'driver' => 'pdo_mysql',
				'dbname' => $this->db[ENV]['database'],
				'host' => $this->db[ENV]['host'],
				'user' => $this->db[ENV]['username'],
				'password' => $this->db[ENV]['password']
			),
		));
	}
}
