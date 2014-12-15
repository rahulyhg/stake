angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Books', function () {
        // Might use a resource here that returns a JSON array
        // Some fake testing data



        var db = openDatabase('books', '1.0', 'Books Database', 2 * 1024 * 1024);

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id, name,date)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS HORSES (id, name,book)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS BETS (id, book,favorite,backlay,stake,odds,timestamp)');
        });



        var books = [
      ];



        return {
            getdb: function () {
                return db;
            },
            createbook: function (bookname, date, horses, id) {
                var newbookid = 0;
                if (id) {
                    newbookid = parseInt(id);
                } else {
                    if (books.length > 0)
                        newbookid = books[books.length - 1].id + 1;
                }


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

                books.push({
                    id: newbookid,
                    date: date,
                    name: bookname,
                    horses: newhorses,
                    bets: []
                });
                console.log(newhorses);
                console.log(newbookid);
                if (!id) {
                    console.log("Database Insertion");
                    db.transaction(function (tx) {
                        tx.executeSql('INSERT INTO BOOKS (id,name,date) VALUES ("' + newbookid + '","' + bookname + '","' + date + '")');
                        //                    console.log(tx.executeSql('SELECT last_insert_rowid()'));
                        for (var i = 0; i < newhorses.length; i++) {
                            tx.executeSql('INSERT INTO HORSES (id, name,book) VALUES ("' + newhorses[i].id + '","' + newhorses[i].name + '","' + newbookid + '")');
                        }
                    });
                }


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
            viewallbooks: function (callback) {

                db.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM BOOKS', [], callback);

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
                viewbook: function (BookId) {
                    for (var i = 0; i < books.length; i++) {
                        if (BookId == books[i].id) {
                            return books[i];
                        }
                    }

                },
                createbet: function (book, favorite, backlay, odds, stake, id) {
                    favorite = parseInt(favorite);
                    backlay = parseInt(backlay);
                    odds = parseFloat(odds);
                    stake = parseFloat(stake);
                    var betnewid = 0;
                    if (id) {
                        betnewid = parseInt(id);
                    } {
                        if (books[book].bets.length > 0)
                            var betnewid = books[book].bets[books[book].bets.length - 1].id + 1;
                    }
                    var horses = books[book].horses;
                    var currentdate = new Date();
                    var currenttimestamp = currentdate.getTime();
                    books[book].bets.push({
                        id: betnewid,
                        favorite: favorite,
                        stake: stake,
                        backlay: backlay,
                        odds: odds,
                        timestamp: currenttimestamp
                    });
                    var favstake = odds * stake * backlay;
                    var otherstake = stake * backlay * -1;
                    for (var i = 0; i < horses.length; i++) {
                        if (favorite == horses[i].id) {
                            horses[i].total += favstake;
                        } else {
                            horses[i].total += otherstake;
                        }
                    }
                    if (!id)
                        db.transaction(function (tx) {
                            tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds,timestamp) VALUES ("' + betnewid + '","' + book + '","' + favorite + '","' + backlay + '","' + stake + '","' + odds + '","' + currenttimestamp + '")');
                        });
                    return "Bet Added";
                },
                deletebet: function (book, betid) {
                    var bets = books[book].bets;
                    var horses = books[book].horses;
                    var favorite = 0;
                    var backlay = 0;
                    var odds = 0;
                    var stake = 0;
                    for (var i = 0; i < bets.length; i++) {
                        if (betid == bets[i].id) {
                            favorite = bets[i].favorite;
                            backlay = bets[i].backlay;
                            odds = bets[i].odds;
                            stake = bets[i].stake;
                            books[book].bets.splice(i, 1);
                        }
                    }
                    var favstake = odds * stake * backlay;
                    var otherstake = stake * backlay * -1;
                    for (var i = 0; i < horses.length; i++) {
                        if (favorite == horses[i].id) {
                            horses[i].total -= favstake;
                        } else {
                            horses[i].total -= otherstake;
                        }
                    }

                    db.transaction(function (tx) {
                        tx.executeSql('DELETE FROM BETS WHERE id="' + betid + '" AND book="' + book + '"');
                    });

                }
            }
        });