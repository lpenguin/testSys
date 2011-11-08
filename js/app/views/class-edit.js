App.Views.ClassEdit = Backbone.View.extend({
    initialize: function() {
		this.template = $('#class-edit-template').template();
		//this.render();
    },  
    events: {
		"submit form": "save",
        "click .delete": "deleteTest"
    },
    render: function(){
        $(app).empty();
        $(this.el).empty();
        $.tmpl( this.template, {model:this.model} ).appendTo( $(this.el) );
        $(this.el).appendTo(app);
    },
    
    save: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        
        this.model.save({ name: this.$('[name=name]').val(), description: this.$('[name=description]').val() }, {
            success: function(model, resp) {
				App.router.navigate("", true);
                new App.Views.Notice({ message: msg });
            },
            error: function() {
                new App.Views.Error();
				//alert('error');
            }
        });
        
        return false;
    },
    deleteTest: function(e){
        var id = $(e.target).attr("data");
        var that = this;
        var tests = this.model.get("tests");

        for(var i in tests){
        	var test = tests[i];
        	if( test.id == id){
        		var testModel = new Test({classId:this.model.id, id:id});
        		testModel.destroy({success: function(model, resp) {
						App.router.navigate("#classes/"+that.model.id, true);
		                new App.Views.Notice({ message: "Successfully deleted!" });
		            },
		            error: function() {
		                new App.Views.Error();
						//alert('error');
		            }
		        });       		
        	}	
        	
        }
        return false;
        /*this.collection.each(function(model){
        	if( model.id == id){
 
        		return;
        	}
        });*/
    }
});
