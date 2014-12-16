angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Books', function () {
    // Might use a resource here that returns a JSON array
    // Some fake testing data



    var db = openDatabase('books', '1.0', 'Books Database', 2 * 1024 * 1024);




    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id INTEGER PRIMARY KEY, name,date)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS HORSES (id INTEGER PRIMARY KEY, name,book,total)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS BETS (id  INTEGER PRIMARY KEY, book,favorite,backlay,stake,odds,timestamp)');
        
         

        
        //        tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds) VALUES (1,1,2,2,0.3,100)');

        //            tx.executeSql('SELECT last_insert_rowid()',callback);
        //            getlast();
        //            tx.executeSql('SELECT last_insert_rowid()', [], function (tx, results) {
        //                console.log(results.rows.item(0));
        //                });
    });



    var books = [
      ];

    var bid = '';

    return {
        getdb: function () {
            return db;
        },
        createbook: function (bookname, date, horses, id) {
            //            var newbookid = 0;
            //            if (id) {
            //                newbookid = parseInt(id);
            //            } else {
            //                if (books.length > 0)
            //                    newbookid = books[books.length - 1].id + 1;
            //            }


            var newhorses = [];
            for (var i = 0; i < horses.length; i++) {
                if (horses[i].name != "") {
                    newhorses.push({
                        id: i,
                        name: horses[i].name,
                        total: 0
                    });
                }
            }

            //            books.push({
            //                id: newbookid,
            //                date: date,
            //                name: bookname,
            //                horses: newhorses,
            //                bets: []
            //            });
            //            console.log(newhorses);
            //            console.log(newbookid);
            if (!id) {
                console.log("Database Insertion");
                db.transaction(function (tx) {
                    tx.executeSql('INSERT INTO BOOKS (name,date) VALUES ("' + bookname + '","' + date + '")');

                    tx.executeSql('SELECT last_insert_rowid() as id', [], function (tx, results) {
                        console.log(results.rows.item(0));
                        bid = results.rows.item(0).id;
                        console.log(bid);
                        for (var i = 0; i < newhorses.length; i++) {
                            tx.executeSql('INSERT INTO HORSES (name,book,total) VALUES ("' + newhorses[i].name + '","' + bid + '",0)');
                        }
                    });

                    //                    console.log(tx.executeSql('SELECT last_insert_rowid()'));

                });
            }


        },
        getonebook: function (book, callback) {

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM BOOKS WHERE id="' + book + '"', [], callback);
            });


        },
        deletebook: function (book) {
            for (var i = 0; i < books.length; i++) {
                if (book == books[i].id) {
                    books.splice(i, 1);
                }
            }
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM BOOKS WHERE id="' + book + '"');
                tx.executeSql('DELETE FROM HORSES WHERE book="' + book + '"');
                tx.executeSql('DELETE FROM BETS WHERE book="' + book + '"');
            });


        },
        viewallbooks: function (start, callback) {

            db.transaction(function (tx) {
                tx.executeSql('SELECT * FROM BOOKS LIMIT ' + start + ',10', [], callback);

                return true;
            });
            //            console.log(books);
            //             db.query('SELECT * FROM BOOKS').then(function(result){
            //            return db.fetchAll(result);
            //        });

        },
        insertonlyhorse: function (book, horsename, horseid) {
            books[book].horses.push({
                id: horseid,
                name: horsename,
                total: 0
            });
        },
        viewbook: function (start, BookId, callback1) {

            db.transaction(function (tx) {
                tx.executeSql('SELECT BOOKS.id as bid,BOOKS.name as bname,BOOKS.date,HORSES.id,HORSES.name,HORSES.total FROM BOOKS LEFT OUTER JOIN HORSES ON HORSES.book = BOOKS.id  WHERE HORSES.book = "' + BookId + '" LIMIT ' + start + ',5', [], callback1);

            });

        },
        viewbets: function (start, BookId, callback1) {
            db.transaction(function (tx) {
                tx.executeSql('SELECT BOOKS.id as bid,BOOKS.name as bname,BOOKS.date,BETS.id,BETS.favorite,BETS.backlay,BETS.stake,BETS.odds,BETS.timestamp FROM BOOKS LEFT OUTER JOIN BETS ON BETS.book = BOOKS.id WHERE BETS.book = "' + BookId + '" LIMIT ' + start + ',5', [], callback1);

            });

        },
        createbet: function (book, favorite, backlay, odds, stake, id) {
            favorite = parseInt(favorite);
            backlay = parseInt(backlay);
            odds = parseFloat(odds);
            stake = parseFloat(stake);
            //            var horses = books[book].horses;
            var currentdate = new Date();
            var currenttimestamp = currentdate.getTime();
            var favstake = odds * stake * backlay;
            var otherstake = stake * backlay * -1;




//            for (var i = 0; i < horses.length; i++) {
//                if (favorite == horses[i].id) {
//                    horses[i].total += favstake;
//                } else {
//                    horses[i].total += otherstake;
//                }
//            }
            if (!id){
                db.transaction(function (tx) {
                    
                    tx.executeSql('SELECT * FROM HORSES WHERE book="1"', [], function (tx, results) {
                        console.log(results.rows.item(0).total);
                        console.log(results.rows.length);
//                        bid = results.rows.item(0).id;
                        for (var i = 0; i < results.rows.length; i++) {
                            if (favorite == results.rows.item(i).id) {
//                                horses[i].total += favstake;
                                tx.executeSql('UPDATE HORSES SET total=total+'+favstake+' WHERE id="'+results.rows.item(i).id+'"');
                            } else {
//                                horses[i].total += otherstake;
                                tx.executeSql('UPDATE HORSES SET total=total+'+otherstake+' WHERE id="'+results.rows.item(i).id+'"');
                            }
                        }

                    });
                    

//                    tx.executeSql('SELECT * FROM HORSES WHERE book="1"', [], function (tx, results) {
//                        console.log(results.rows.item(0));
//                        bid = results.rows.item(0).id;
//
//                        for (var i = 0; i < horses.length; i++) {
//                            if (favorite == horses[i].id) {
//                                horses[i].total += favstake;
//                            } else {
//                                horses[i].total += otherstake;
//                            }
//                        }
//
//                    });


                    tx.executeSql('INSERT INTO BETS (book,favorite,backlay,stake,odds,timestamp) VALUES ("' + book + '","' + favorite + '","' + backlay + '","' + stake + '","' + odds + '","' + currenttimestamp + '")');
                });
            }
            return "Bet Added";
        },
        deletebet: function (book, betid) {
            //            var bets = books[book].bets;
            //            var horses = books[book].horses;
            //            var favorite = 0;
            //            var backlay = 0;
            //            var odds = 0;
            //            var stake = 0;
            //            for (var i = 0; i < bets.length; i++) {
            //                if (betid == bets[i].id) {
            //                    favorite = bets[i].favorite;
            //                    backlay = bets[i].backlay;
            //                    odds = bets[i].odds;
            //                    stake = bets[i].stake;
            //                    books[book].bets.splice(i, 1);
            //                }
            //            }
            //            var favstake = odds * stake * backlay;
            //            var otherstake = stake * backlay * -1;
            //            for (var i = 0; i < horses.length; i++) {
            //                if (favorite == horses[i].id) {
            //                    horses[i].total -= favstake;
            //                } else {
            //                    horses[i].total -= otherstake;
            //                }
            //            }

            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM BETS WHERE id="' + betid + '" AND book="' + book + '"');
            });

        }
    }
});