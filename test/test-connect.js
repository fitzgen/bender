define(['bender'], function (bender) {

    module('test-connect');

    var inputFSM = bender.defineFSM({
        initialize: function (opts) {
            this.pattern = opts.pattern;
            this.successCallback = opts.successCallback;

            this.divElement = opts.element;
            this.inputElement = this.divElement.querySelector('input[type=text]');
            this.submitElement = this.divElement.querySelector('input[type=submit]');

            if ( this.pattern.test(this.inputElement.value) ) {
                this.submitElement.removeAttribute('disabled');
                return 'valid';
            } else {
                this.submitElement.disabled = true;
                return 'invalid';
            }
        },
        valid: function (msg) {
            if ( msg === 'submit' ) {
                this.successCallback(this.inputElement.value);
                this.inputElement.value = '';
                if ( ! this.pattern.test(this.inputElement.value) ) {
                    this.submitElement.disabled = true;
                    return 'invalid';
                }
            } else if ( msg === 'valueChange' ) {
                if ( ! this.pattern.test(this.inputElement.value) ) {
                    this.submitElement.disabled = true;
                    return 'invalid';
                }
            }
        },
        invalid: function (msg) {
            if ( msg === 'valueChange' ) {
                if ( this.pattern.test(this.inputElement.value) ) {
                    this.submitElement.removeAttribute('disabled');
                    return 'valid';
                }
            }
        }
    });

    function makeWidget (fn) {
        var widget = document.createElement('div');
        widget.innerHTML = '<input type="text" /><input type="submit" />';

        bender.connect({
            element: widget,
            fsm: new inputFSM({
                element: widget,
                pattern: /^\d+$/,
                successCallback: fn
            }),
            events: {
                'keyup input[type=text]': function (e) {
                    switch ( e.keyCode ) {
                    case 13:
                        e.preventDefault();
                        return 'submit';
                    default:
                        return 'valueChange';
                    }
                },
                'click input[type=submit]': function (e) {
                    e.preventDefault();
                    return 'submit';
                }
            }
        });

        return widget;
    }

    test('foo', function () {
        var widget = makeWidget(function (val) {
            alert('Success: ' + val);
        });
        document.body.appendChild(widget);
    });

});