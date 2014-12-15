angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function ($scope, Books) {
    //    $scope.onload = function (){
    $scope.books = [];
    var callback = function (tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            $scope.books.push(results.rows.item(i));
        }
        $scope.$apply();
    };
    Books.viewallbooks(callback);
})


.controller('ViewBook', function ($scope, $stateParams, Books) {
    $scope.book = Books.viewbook($stateParams.BookId);
})

.controller('ViewBets', function ($scope, $stateParams, Books) {
    $scope.book = Books.viewbook($stateParams.BookId);
    $scope.DeleteBet = function (book, betid) {

        Books.deletebet(book, betid);
        //$scope.book = Books.viewbook($stateParams.BookId);
    }
})

.controller('CreateBook', function ($location, $scope, $stateParams, Books) {
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
            Books.createbook(book, date, horses, false);
            $location.path("/tab/dash/");
        }
    };
})
    .controller('DeleteBook', function ($location, $scope, $stateParams, Books) {
        $scope.book = Books.viewbook($stateParams.BookId);
        $scope.ConfirmDeleteBook = function (book) {

            Books.deletebook(book);
            $location.path("/tab/dash/");
        }
        $scope.CancelDeleteBook = function () {

            $location.path("/tab/dash/");
        }


    })
    .controller('CreateBet', function ($location, $scope, $stateParams, Books) {
        $scope.book = Books.viewbook($stateParams.BookId);
        $scope.favoritesel = $stateParams.HorseId;
        $scope.backlaysel = -1;
        $scope.oddssel = 1.0;
        $scope.stakesel = 1000;
        $scope.CreateBetSubmit = function (book, favoritesel, backlaysel, oddssel, stakesel) {
            Books.createbet(book, favoritesel, backlaysel, oddssel, stakesel, false);
            $location.path("/tab/viewbook/" + book);
        }

    });