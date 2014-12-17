angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function ($location, $state, $scope, Books, $urlRouter) {

    //    $location.reload(true);
    //    $scope.onload = function (){
    $urlRouter.sync();


    console.log("A BCD");
    $scope.books = [];
    $scope.check = true;
    var callback = function (tx, results) {
        console.log("view all book data");
        console.log(results.rows);
        for (var i = 0; i < results.rows.length; i++) {
            $scope.books.push(results.rows.item(i));
        }
        $scope.$apply();
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    Books.viewallbooks(0, callback);

    //    start reload function

    $scope.getcheck = function () {
        return $scope.check;
    }

    var lastlength = 0;
    $scope.loadMore = function () {
        var totallength = $scope.books.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            console.log(totallength);
            Books.viewallbooks(totallength, callback);
            //            MyServices.notificationbrandid($stateParams.id, $scope.ucity, lat, long, totallength).success(pushnotificationbrand);

        } else {

            $scope.check = false;

        }


    };

    //    end  reload function

})


.controller('ViewBook', function ($scope, $stateParams, Books) {

    // Get all horses 
    $scope.horse = [];
    $scope.check = true;
    console.log($stateParams.BookId);
    var callback1 = function (tx, results) {
        console.log(results);
        for (var i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i));
            $scope.horse.push(results.rows.item(i));
        }
        console.log($scope.horse);
        $scope.$apply();
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    Books.viewbook(0, $stateParams.BookId, callback1);

    //    start reload function

    $scope.getcheck = function () {
        return $scope.check;
    }

    var lastlength = 0;
    $scope.loadMore = function () {
        var totallength = $scope.horse.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            console.log(totallength);
            Books.viewbook(totallength, $stateParams.BookId, callback1);

        } else {
            $scope.check = false;
        }

    };

    //    end  reload function

})

.controller('ViewBets', function ($scope, $stateParams, Books) {
    //    $scope.book = Books.viewbook($stateParams.BookId);
    $scope.bets = [];
    $scope.check = true;

    var callback = function (tx, results) {
        console.log(results);
        for (var i = 0; i < results.rows.length; i++) {
            console.log(results.rows.item(i));
            $scope.bets.push(results.rows.item(i));
        }
        console.log($scope.bets);
        $scope.$apply();
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    Books.viewbets(0, $stateParams.BookId, callback);

    $scope.DeleteBet = function (book, betid) {

        Books.deletebet(book, betid);
        Books.viewbets(0, $stateParams.BookId, callback);
        //$scope.book = Books.viewbook($stateParams.BookId);
    }



    //    start reload function

    $scope.getcheck = function () {
        return $scope.check;
    }

    var lastlength = 0;
    $scope.loadMore = function () {
        var totallength = $scope.bets.length;
        if (lastlength != totallength) {
            lastlength = totallength;
            console.log(totallength);
            Books.viewbets(totallength, $stateParams.BookId, callback);

        } else {
            $scope.check = false;
        }

    };

    //    end  reload function


})

.controller('CreateBook', function ($location, $scope, $stateParams, Books, $state) {
    //    $urlRouter.sync();
    $scope.namesel = "";
    $scope.horses = [{
        id: 0,
        name: "",
        placeholder: ""
    }, {
        id: 1,
        name: "",
        placeholder: ""
    }, {
        id: 2,
        name: "",
        placeholder: ""
    }];
    $scope.AddHorse = function () {
        var newhorseid = $scope.horses.length;
        $scope.horses.push({
            id: newhorseid,
            name: ""
        });
    };
    $scope.CreateBookSubmit = function (book, date, horses) {
        if (book == "" || book == " ") {
            $scope.nameplaceholder = "Please enter book name";
        } else if (horses[0].name == "") {
            $scope.horses[0].placeholder = "Give a name to Horse 1";

        } else if (horses[1].name == "") {
            $scope.horses[0].placeholder = "Give a name to Horse 2";
        } else {
            console.log("createbook ...................................");
            Books.createbook(book, date, horses, false);
            //            $scope.$apply();
            //$state.reload();

            $location.url("/tab/dash/");


        }
    };
})
    .controller('DeleteBook', function ($location, $scope, $stateParams, Books) {
        //        $scope.book = Books.viewbook($stateParams.BookId);
        $scope.book = [];

        var callback = function (tx, results) {
            console.log("my booook");
            console.log(results.rows.item(0));
            $scope.book = results.rows.item(0);
            $scope.$apply();
        };
        Books.getonebook($stateParams.BookId, callback)

        $scope.ConfirmDeleteBook = function (book) {

            Books.deletebook(book);
            $location.url("/tab/dash/");
        }
        $scope.CancelDeleteBook = function () {

            $location.url("/tab/dash/");
        }


    })
    .controller('CreateBet', function ($location, $scope, $stateParams, Books) {

        $scope.horse = [];
        var callback = function (tx, results) {
            console.log(results);
            for (var i = 0; i < results.rows.length; i++) {
                console.log(results.rows.item(i));
                $scope.horse.push(results.rows.item(i));
            }
            console.log($scope.horse);
            $scope.$apply();
        };
        Books.viewbook(0, $stateParams.BookId, callback);
        $scope.favoritesel = $stateParams.HorseId;
        $scope.backlaysel = -1;
        $scope.oddssel = 1.0;
        $scope.stakesel = 1000;
        $scope.CreateBetSubmit = function (book, favoritesel, backlaysel, oddssel, stakesel) {
            Books.createbet(book, favoritesel, backlaysel, oddssel, stakesel, false);
            $location.url("/tab/viewbook/" + book);
        }

    });