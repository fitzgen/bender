define(['bender'], function (bender) {

    module('test-fsm');

    // FSM that matches the input string 'ab*c'.
    var ABStarC = bender.defineFSM({

        initialize: function () {
            return 'expectingA';
        },

        expectingA: function (msg) {
            if ( msg === 'a' ) {
                return 'expectingBOrC';
            } else {
                return 'error';
            }
        },

        expectingBOrC: function (msg) {
            if ( msg === 'b' ) {
                return 'expectingBOrC';
            } else if ( msg === 'c' ) {
                return 'success';
            } else {
                return 'error';
            }
        },

        success: function (msg) {
            return 'error';
        },

        error: function (msg) {
            return 'error';
        }

    });

    test('Initial state is correct', function () {
        var fsm = new ABStarC();
        equal(fsm.currentState(), 'expectingA');
    });

    test('Move to successful state', function () {
        var fsm = new ABStarC();
        equal(fsm.currentState(), 'expectingA');

        fsm.send('a');
        equal(fsm.currentState(), 'expectingBOrC');

        for ( var i = 0; i < 10; i++ ) {
            fsm.send('b')
            equal(fsm.currentState(), 'expectingBOrC');
        }

        fsm.send('c');
        equal(fsm.currentState(), 'success');
    });

    test('Simple error', function () {
        var fsm = new ABStarC();
        equal(fsm.currentState(), 'expectingA');

        fsm.send('b');
        equal(fsm.currentState(), 'error');
    });

    test('Moving past the success state is an error', function () {
        var fsm = new ABStarC();
        equal(fsm.currentState(), 'expectingA');

        fsm.send('a');
        equal(fsm.currentState(), 'expectingBOrC');

        fsm.send('c');
        equal(fsm.currentState(), 'success');

        fsm.send('c');
        equal(fsm.currentState(), 'error');
    });

});