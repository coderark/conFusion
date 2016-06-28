'use strict';
angular.module('confusionApp').controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.dishes = menuFactory.getDishes();

  $scope.select = function(setTab) {
    $scope.tab = setTab;

    if (setTab === 2) {
      $scope.filtText = "appetizer";
    }
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };

  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };
  $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
};
}])
.controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
        }])
.controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
                        console.log($scope.feedback);
                        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                            $scope.invalidChannelSelection = true;
                            console.log('incorrect');
                        }
                        else {
                            $scope.invalidChannelSelection = false;
                            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                               agree:false, email:"" };
                            $scope.feedback.mychannel="";

                            $scope.feedbackForm.$setPristine();
                            console.log($scope.feedback);
                        }
                    };
        }])
        .controller('DishDetailController',  ['$scope', 'menuFactory', '$stateParams', function($scope, menuFactory, $stateParams) {

            $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));

        }])
        .controller('DishCommentController', ['$scope', function($scope) {
            $scope.defaultRadioChosen = 5;
            var score = [
    			{value: "1", label: "1"},
    			{value: "2", label: "2"},
    			{value: "3", label: "3"},
    			{value: "4", label: "4"},
    			{value: "5", label: "5"}
    		];
    		$scope.scores = score;
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.comment={rating:5, comment:"", author:"", date:""};
            $scope.submitComment = function () {

                //Step 2: This is how you record the date
                //"The date property of your JavaScript object holding the comment" = new Date().toISOString();
                $scope.comment.date=new Date().toISOString();
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.comment);

                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment={rating:5, comment:"", author:""};
            };
        }])
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory){
            $scope.featDish=menuFactory.getDish(Math.floor(Math.random() *4));
            $scope.promotion=menuFactory.getPromotion(0);
            $scope.chef=corporateFactory.getLeader(3);
        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
            $scope.leaders=corporateFactory.getLeaders();
        }])
        ;
