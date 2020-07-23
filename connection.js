const {Pool} = require('pg');

const pool =  new Pool ({
    user:'postgres',
    password:'markarik1',
    database:'todo_database',
    host:'localhost',
    port:5432
});

module.exports = pool;