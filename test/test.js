window.console = window.console || {
    log: function () {},
    profile: function () {},
    profileEnd: function () {}
};

require({
    packages: [{
        name: 'bender',
        main: 'index',
        location: '..'
    }]
}, [
    "qunit.js"
], function () {

    require.ready(function () {
        require(['test-fsm', 'test-connect']);
    });

});
