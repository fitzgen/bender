define(function () {

    return function (states) {

        if ( typeof states.initialize !== 'function' ) {
            throw new Error('Must have an initialize method');
        }

        function FiniteStateMachine (options) {
            var state = states.initialize.call(this, options);
            if ( ! state ) {
                throw new Error('initialize did not set an initial state');
            }

            this.send = function (event) {
                state = states[state].call(this, event) || state;
            };

            this.currentState = function () {
                return state;
            };
        }

        return FiniteStateMachine;
    };

});