module.exports = function(app, pool) {
    app.post('/register-user', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO User VALUES (0," +
            "'" + data.username + "'," +
            "'" + data.password + "'," +
            "'" + data.firstname + "'," +
            "'" + data.lastname + "'," +
            "'" + data.email + "'," +
            "'" + data.phone + "'," +
            "'" + data.house + "'," +
            "'" + data.pincode + "'," +
            "'" + data.city + "'," +
            "'" + data.type + "'," +
            "'http://localhost:3000/defaultpic.png'" +
            ")";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        if (error.code == 'ER_DUP_ENTRY') {
                            response.send('Duplicate');
                            response.end();
                        } else {
                            response.end('Failure');
                            throw error;
                        }
                    } else {
                        response.end('Success: ' + data.type);
                    }
                });
            }
        });
    });

    app.post('/login-user', (request, response) => {
        var data = request.body;

        var sqlquery = "SELECT * FROM User WHERE username = '" + data.username + "' AND password = '" + data.password + "'";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            }

            connection.query(sqlquery, (error, result) => {
                connection.release();
                if (error) {
                    response.end('Failure');
                    throw error;
                } else {
                    if (result.length != 0) {
                        const data = {
                            Status: 'Success',
                            Type: result[0].type,
                            ID: result[0].id
                        }
                        response.send(data);
                        response.end();
                    } else {
                        response.send('Invalid');
                        response.end();
                    }
                }
            });
        });
    });
}