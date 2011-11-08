App.Collections.Tests = Backbone.Collection.extend({
	initialize: function(options){
		this.classId = options.classId; 
		if( !this.classId ){
			throw Error("classId option must be set;")
		}
		
	},
	url : function() {
      return 'classes/'+this.classId+"/tests";      
    },
    model:Test
});
