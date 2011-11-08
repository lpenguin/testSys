var App = {
    Views: {},
    Routers: {},
    Collections: {},
    router:null,
    init: function() {
        this.router = new App.Routers.Classes();
        Backbone.history.start();
    }
};
