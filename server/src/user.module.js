module.exports = function(app, pool) {

    app.post('/user/get-user-details', (request, response) => {
        var data = request.body;

        var sqlquery = "";

        if (data.type == 'Student') {
            sqlquery = "SELECT * FROM Student JOIN User on User.id = Student.id WHERE User.id = " + data.id;
        } else if (data.type == 'Teacher') {
            sqlquery = "SELECT * FROM Teacher JOIN User on User.id = Teacher.id WHERE User.id = " + data.id;
        }

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {

                        if (result.length == 0) {
                            sqlquery = "SELECT * FROM User WHERE id = " + data.id;
                            connection.query(sqlquery, (error, result) => {
                                connection.release();
                                if (error) {
                                    response.end('Failure');
                                    throw error;
                                } else {
                                    response.json({
                                        profileUpdate: false,
                                        details: result
                                    });
                                    response.end();
                                }
                            });
                        } else {
                            connection.release();
                            response.json({
                                profileUpdate: true,
                                details: result
                            });
                            response.end();
                        }
                    }
                });
            }
        });
    });

    app.post('/user/update-user-details', (request, response) => {
        var data = request.body;

        var sqlquery = "";

        if (data.type == 'Student') {

            sqlquery = "INSERT INTO Student VALUES (" +
                data.id + ",'" + data.roll_no + "','" + data.reg_no + "', '" + data.degree + "','" + data.gender + "'" +
                ") ON DUPLICATE KEY " +
                "UPDATE " +
                "roll_no = '" + data.roll_no + "', " +
                "reg_no = '" + data.reg_no + "', " +
                "degree = '" + data.degree + "', " +
                "gender = '" + data.gender + "'";

        } else if (data.type == 'Teacher') {

            sqlquery = "INSERT INTO Teacher VALUES (" +
                data.id + ",'" + data.gender + "','" + data.designation + "', '" + data.about + "'" +
                ") ON DUPLICATE KEY " +
                "UPDATE " +
                "gender = '" + data.gender + "', " +
                "designation = '" + data.designation + "', " +
                "about = '" + data.about + "'";
        }

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    if (error) {
                        connection.release();
                        response.end('Failure');
                        throw error;
                    } else {

                        sqlquery = "UPDATE User SET " +
                            "firstname = '" + data.firstname + "'," +
                            "lastname = '" + data.lastname + "', " +
                            "house = '" + data.house + "', " +
                            "city = '" + data.city + "', " +
                            "phone_no = '" + data.phone_no + "', " +
                            "email = '" + data.email + "', " +
                            "pincode = '" + data.pincode + "' " +
                            "WHERE id = " + data.id;

                        connection.query(sqlquery, (error, result) => {
                            connection.release();
                            if (error) {
                                response.end('Failure');
                                throw error;
                            } else {
                                response.send('Success');
                                response.end();
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/user/create-classroom', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Classroom VALUES (" +
            "0," +
            "'" + data.courseName + "'," +
            "'" + data.courseCode + "'," +
            data.adminId + "," +
            "'" + data.startDate + "'," +
            "'" + data.endDate + "'," +
            "'" + data.description + "'" +
            ")";
        console.log(sqlquery);
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
                        response.end('Success');
                    }
                });
            }
        });
    });

    app.post('/user/search-course-code', (request, response) => {
        var data = request.body;

        var sqlquery = "SELECT C.*, U.firstname, U.lastname FROM Classroom C JOIN User U ON C.admin_id = U.id WHERE C.course_code LIKE '%" + data.courseCode + "%' AND end_date >= CURDATE();";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send(result);
                        response.end();
                    }
                });
            }
        })
    });

    app.post('/user/join-classroom', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Student_Classroom VALUES (" + data.userId + "," + data.classroomId + ");";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        if (error.code == 'ER_DUP_ENTRY') {
                            response.end('Joined');
                        } else {
                            response.end('Failure');
                            throw error;
                        }
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/join-classroom-teacher', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Teacher_Classroom VALUES (" + data.userId + "," + data.classroomId + ");";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        if (error.code == 'ER_DUP_ENTRY') {
                            response.end('Joined');
                        } else {
                            response.end('Failure');
                            throw error;
                        }
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/get-classrooms', (request, response) => {
        var data = request.body;

        var sqlquery = "";
        if (data.type == 'Student') {
            sqlquery = "SELECT * FROM Student_Classroom SC JOIN Classroom C ON SC.c_id = C.id WHERE SC.s_id = " + data.id;
        } else if (data.type == 'Teacher') {
            sqlquery = "SELECT * FROM Teacher_Classroom TC JOIN Classroom C ON TC.c_id = C.id WHERE TC.t_id = " + data.id;
        }

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send(result);
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/get-classroom-info', (request, response) => {
        var data = request.body;

        var responseData = {
            teachers: [],
            students: []
        }

        var sqlquery = "SELECT TC.*,U.id,U.username,U.firstname, U.lastname,U.email,U.profilepic FROM Teacher_Classroom TC JOIN User U ON TC.t_id = U.id WHERE c_id = " + data.c_id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    if (error) {
                        connection.release();
                        response.end('Failure');
                        throw error;
                    } else {
                        responseData.teachers = result;
                        sqlquery = "SELECT SC.*,U.id,U.username,U.firstname, U.lastname,U.email,U.profilepic FROM Student_Classroom SC JOIN User U ON SC.s_id = U.id WHERE c_id = " + data.c_id;
                        connection.query(sqlquery, (error, result) => {
                            connection.release();
                            if (error) {
                                response.end('Failure');
                                throw error;
                            } else {
                                responseData.students = result;
                                response.send(responseData);
                                response.end();
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/user/get-posts', (request, response) => {
        var data = request.body;

        var sqlquery = "SELECT P.*, U.username, U.firstname, U.lastname, U.profilepic FROM Post P JOIN User U on U.id = P.u_id WHERE c_id = " + data.c_id + " ORDER BY time DESC";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send(result);
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/get-threads', (request, response) => {
        var data = request.body;

        var sqlquery = "SELECT T.*, U.username, U.firstname, U.lastname, U.profilepic FROM Thread T JOIN Post P ON T.p_id = P.id JOIN User U on U.id = T.u_id WHERE P.c_id = " + data.c_id + " ORDER BY T.time";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send(result);
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/get-resources', (request, response) => {
        var data = request.body;

        var sqlquery = "SELECT R.*, U.username, U.firstname, U.lastname FROM Resource R JOIN User U ON U.id = R.u_id WHERE R.c_id = " + data.c_id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send(result);
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/create-post', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Post VALUES (0," +
            "'" + data.title + "'," +
            "'" + data.content + "'," +
            "CURRENT_TIMESTAMP," +
            data.c_id + "," +
            data.u_id + ");";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/create-thread', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Thread VALUES (0," +
            data.p_id + "," +
            "'" + data.content + "'," +
            "CURRENT_TIMESTAMP," +
            data.u_id + ")";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/delete-post', (request, response) => {
        var data = request.body;

        var sqlquery = "DELETE FROM Post WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/delete-thread', (request, response) => {
        var data = request.body;

        var sqlquery = "DELETE FROM Thread WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/add-resource', (request, response) => {
        var data = request.body;

        var sqlquery = "INSERT INTO Resource VALUES (0," +
            "'" + data.name + "'," +
            "'" + data.url + "'," +
            data.c_id + "," +
            data.u_id + "," +
            "CURRENT_TIMESTAMP);";

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/delete-resource', (request, response) => {
        var data = request.body;

        var sqlquery = "Delete FROM Resource WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/leave-classroom', (request, response) => {
        var data = request.body;
        var sqlquery = "";
        if (data.type == 'Student') {
            sqlquery = "DELETE FROM Student_Classroom WHERE s_id = " + data.u_id + " AND c_id = " + data.c_id;
        } else if (data.type == 'Teacher') {
            sqlquery = "DELETE FROM Teacher_Classroom WHERE t_id = " + data.u_id + " AND c_id = " + data.c_id;
        }

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/change-profile-pic', (request, response) => {
        var data = request.body;

        var sqlquery = "UPDATE User SET profilepic = '" + data.profilepic + "' WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/change-password', (request, response) => {
        var data = request.body;

        var sqlquery = "UPDATE User SET password = '" + data.new_password + "' WHERE password = '" + data.old_password + "' AND id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        if (result.affectedRows == 1) {
                            response.send('Success');
                            response.end();
                        } else {
                            response.send('Invalid');
                            response.end();
                        }
                    }
                });
            }
        });
    });

    app.post('/user/update-post', (request, response) => {
        var data = request.body;

        var sqlquery = "UPDATE Post SET title = '" + data.title + "', content = '" + data.content + "' WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/update-thread', (request, response) => {
        var data = request.body;

        var sqlquery = "UPDATE Thread SET content = '" + data.content + "' WHERE id = " + data.id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });

    app.post('/user/admin-leave-classroom', (request, response) => {
        var data = request.body;

        var sqlquery = "DELETE FROM Teacher_Classroom WHERE t_id = " + data.t_id + " AND c_id = " + data.c_id;

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        sqlquery = "SELECT * FROM Teacher_Classroom WHERE c_id = " + data.c_id;
                        connection.query(sqlquery, (error, result) => {
                            if (error) {
                                response.end('Failure');
                                throw error;
                            } else {
                                if (result.length > 0) {
                                    sqlquery = "UPDATE Classroom SET admin_id = " + result[0].t_id + " WHERE id = " + data.c_id;
                                    connection.query(sqlquery, (error, result) => {
                                        connection.release();
                                        if (error) {
                                            response.end('Failure');
                                            throw error;
                                        } else {
                                            response.end('Success');
                                        }
                                    });
                                } else {
                                    sqlquery = "DELETE FROM Classroom WHERE id = " + data.c_id;
                                    connection.query(sqlquery, (error, result) => {
                                        connection.release();
                                        if (error) {
                                            response.end('Failure');
                                            throw error;
                                        } else {
                                            response.end('Success');
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/user/update-classroom', (request, response) => {
        var data = request.body;

        var sqlquery = "UPDATE Classroom SET " +
            "course_code = '" + data.course_code + "'," +
            "course_name = '" + data.course_name + "'," +
            "description = '" + data.description + "'," +
            "start_date = '" + data.start_date + "'," +
            "end_date = '" + data.end_date + "' " +
            "WHERE id = " + data.c_id;

        console.log(sqlquery);

        pool.getConnection((error, connection) => {
            if (error) {
                response.end('Failure');
                throw error;
            } else {
                connection.query(sqlquery, (error, result) => {
                    connection.release();
                    if (error) {
                        response.end('Failure');
                        throw error;
                    } else {
                        response.send('Success');
                        response.end();
                    }
                });
            }
        });
    });


    // Image Uploading Part
    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads');
        },
        filename: function(req, file, cb) {
            cb(null, file.originalname)
        }
    });

    var upload = multer({ storage: storage });

    app.post('/user/upload-image', upload.array("uploads[]", 12), (request, response) => {

        var fileUrl = 'http://localhost:3000/' + request.files[0].filename;
        const responseData = {
            status: 'Success',
            url: fileUrl
        }
        response.send(responseData);
        response.end();
    });

}