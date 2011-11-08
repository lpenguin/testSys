var Class = Backbone.Model.extend({
	initialize: function(options){
		//if( !this.isNew() ){
		//	this.tests = new App.Collections.Tests({classId:this.id});
		//}
	},
	url : function() {
      var base = 'classes';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    },
    defaults: function() {
      return {
        tests:  [],
        name: "",
        description: ""
      };
    }
    
});
