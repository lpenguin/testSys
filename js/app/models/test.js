var Test = Backbone.Model.extend({
	initialize: function(options){
		this.classId = options.classId; 
		if( !this.classId ){
			throw Error("classId option must be set;")
		}
	},
	url : function() {
      var base = 'classes/'+this.classId+"/tests";
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    },
    defaults: function() {
      return {
        scales:  [],
        classId: 0,
        name: "",
        description: ""
      };
    },
});
