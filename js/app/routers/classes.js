App.Routers.Classes = Backbone.Router.extend({
    routes: {
        "" :            "classes",
        "classes/:id":  "editClass",
        "classes-new":  "newClass",
        "classes/:classId/tests/:id": "editTest",
        "classes/:classId/tests-new": "newTest",
    },
    classes: function(){
        var classes = new App.Collections.Classes();
		classes.fetch({success: function(){
			new App.Views.Classes({ collection: classes }); 
		},
		error: function(){
			alert('err');
		}});
              
    },
    editClass: function( id ){
        var class_;
		class_ = new Class({id:id});
		class_.fetch({ success: function(model, resp){
			var view = new App.Views.ClassEdit( {model : class_ } );
			view.render();	
		},
		error: function(){
			alert('error');
		}});
    },
    newClass: function(){
		var view = new App.Views.ClassEdit( {model : new Class() } );
        view.render();
    },
    editTest: function( classId, id ){
        var test;
		test = new Test({id:id, classId:classId});
		test.fetch({ success: function(){
			var view = new App.Views.TestEdit( {model : test } );
			view.render();
		},
		error: function(){
			alert('error');
		}});
    },
    newTest: function(classId){
		var view = new App.Views.TestEdit( {model : new Test({classId:classId}) } );
        view.render();
    },

});

