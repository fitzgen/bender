define(function () {

    function parseEventAndSelector (str) {
        var idx = str.indexOf(' ');
        return {
            event: str.slice(0, idx),
            selector: str.slice(idx+1)
        };
    }

    function addListeners (element, fsm, events) {
        return Object.keys(events).map(function (key) {
            var parsed = parseEventAndSelector(key);
            function listener (event) {
                var message = events[key](event);
                if ( message ) {
                    fsm.send(message);
                }
            }
            // TODO: better event handling (focus needs to use capture)
            element.addEventListener(parsed.event, listener, false);
            return {
                event: parsed.event,
                fn: listener,
                useCapture: false
            };
        });
    }

    function removeListener (elem, l) {
        elem.removeEventListener(l.event, l.fn, l.useCapture);
    }

    function removeListeners (elem, listeners) {
        listeners.forEach(removeListener.bind(null, elem));
    }

    return function (opts) {
        var listeners = addListeners(opts.element, opts.fsm, opts.events);
        return {
            fsm: opts.fsm,
            element: opts.element,
            destroy: removeListeners.bind(null, opts.element, listeners)
        };
    };

});