angular.module('Topic', []).controller('TopicController', function($scope, $http, $q) {
    // Values
    $scope.title = 'Topics'
    $scope.tagline = 'Explore your heart out';
    $scope.close = false;
    $scope.test = true;
    
    // Topic Structures
    $scope.newTopic = {
        title: '',
        category: ''
    };
    $scope.currentUser = {
        _id: '',
        username: '',
    }
    // Comment Structures
    $scope.userComment = {
        topicId: '',
        message: '',
    };
    $scope.updateComment = {
        topicId: '',
        message: ''
    }
    
    // User CRUD Section
    $scope.getUser = function() {
        $http.get('/api/currentuser').then(function(result) {
            $scope.currentUser._id = result.data._id;
            $scope.currentUser.username = result.data.username;
        });
    }
    
    $scope.getUser();
    
    // Topic CRUD Section
    
    $scope.getTopics = function(){
        $http.get('/api/topics').then(function(res){
            $scope.topics = res.data;
        });
    }
    $scope.getTopics();
    
    $scope.hideTopicBoxes = true;
    
    $scope.createTopic = function(){
        $scope.hideTopicBoxes = false;
    }
    
    $scope.cancelTopicCreate = function(){
        $scope.hideTopicBoxes = true;
        $scope.newTopic = {
            title: '',
            category: ''
        };
    }
    
    $scope.submitTopic = function() {
        $http.post('api/topics', $scope.newTopic).then(function(res) {
            $scope.cancelTopicCreate();
            $scope.getTopics();
        });
    }
    
    // Comment CRUD Section
    $scope.getComments = function(topic) {
        $http.get('api/comments/' + topic._id).then(function(res){
            $scope.title = topic.title;
            $scope.tagline = 'Comments'
            $scope.comments = res.data;
            $scope.currentTitle = topic._id;
            $scope.userComment.topicId = topic._id;
            $scope.close = true;
            $scope.test = false;
        });
    }
    
    $scope.updateComments = function() {
        $http.get('api/comments/' + $scope.currentTitle).then(function(res){
            $scope.comments = res.data
        });
    }
    $scope.currentEdit = '';
    $scope.editorEnabled = true;
    $scope.editorDisabled = false;
    $scope.editComment = function(comment) {
        $scope.editorDisabled = true;
        $scope.editorEnabled = false;
        $scope.currentEdit = comment._id;
        $scope.updateComment.message = comment.message;
    }
    
    $scope.cancelEdit = function() {
        $scope.editorEnabled = true;
        $scope.editorDisabled = false;
    }
    
    $scope.goBack = function() {
        $scope.title = 'Topics';
        $scope.tagline = 'Explore your heart out';
        $scope.close = false;
        $scope.test = true;
    }
    
    
    
    
    $scope.comment = function(comment) {
            $http.post('api/comments', $scope.userComment).then(function(res){
                //console.log(res);
                $scope.comments.push(res.data.data);
                $scope.userComment.message = '';
                /*
                if(!$scope.$$phase){
                    $scope.$apply();
                }
                */
            });
    }
    
    $scope.putComment = function(comment) {
        $scope.updateComment.topicId = $scope.currentTitle;
        $http.put('api/comments/' + $scope.currentEdit, $scope.updateComment).then(function(res){
            $scope.editorEnabled = true;
            $scope.editorDisabled = false;
        });
        $scope.updateComments();
        
        
    }
    
    $scope.deleteComment = function(comment) {
        $http.delete('api/comments/' + comment._id, $scope.deleteComment).then(function(res){
            $scope.rezzy = res;
        });
        $scope.updateComments();
    }
    

    
    
    

});