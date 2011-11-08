App.Views.Classes = Backbone.View.extend({
    initialize: function() {
      this.template = $('#class-list-template').template();
      //this.el = "#app";
      this.render();
    },
    events: {
        "click .delete": "deleteClass"
    },
    render: function(){
        $(app).empty();
        $(this.el).empty();               
        $.tmpl( this.template, {classes: this.collection.toJSON()} ).appendTo( $(this.el) );
        $(this.el).appendTo(app);
    },
    deleteClass: function(e){
        var id = $(e.target).attr("data");
        var that = this;
        this.collection.each(function(model){
        	if( model.id == id){
        		model.destroy({success: function(model, resp) {
						that.render();
		                new App.Views.Notice({ message: "Successfully deleted!" });
		            },
		            error: function() {
		                new App.Views.Error();
						//alert('error');
		            }
		        });
        		return;
        	}
        });
    }
});
