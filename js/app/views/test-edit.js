App.Views.TestEdit = Backbone.View.extend({
    initialize: function() {
      this.template = $('#test-edit-template').template();
    },  
    events: {
		"submit form": "save"
    },
    render: function(){
        $(this.el).empty();
        $(app).empty();
        $.tmpl( this.template, {model:this.model} ).appendTo( $(this.el) );
        $(this.el).appendTo( $(app) );
    }  ,
    save: function() {
        var self = this;
        var msg = this.model.isNew() ? 'Successfully created!' : "Saved!";
        this.model.save({ name: this.$('[name=name]').val(), description: this.$('[name=description]').val() }, {
            success: function(model, resp) {
				App.router.navigate("#classes/"+model.get("classId"), true);
                new App.Views.Notice({ message: msg });
            },
            error: function() {
                new App.Views.Error();
				//alert('error');
            }
        });
        
        return false;
    },
});
