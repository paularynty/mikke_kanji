const { Pool } = require('pg');

const pool = new Pool ({
	user: 'postgres', //the username I created the postgresql database with
	host: 'localhost',
	database: 'kanjidb',
	password: 'pass123',
	port: 5432,
});

module.exports = pool;