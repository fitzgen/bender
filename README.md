# Bender

Bender is a JavaScript library for creating robust user interfaces with finite
state machines.

## Define finite state machines

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

## Connect your FSMs to the dom and translate events

    function makeInputWidget (pattern) {
        var widget = document.createElement('div');
        widget.innerHTML = '<input type="text" /><input type="submit" />';

        return bender.connect({
            element: widget,
            fsm: new inputFSM({
                element: widget,
                pattern: pattern,
                successCallback: function (value) {
                    alert('Success: ' + value);
                }
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
    }

    var integerField = makeInputWidget(/^\d+$/);
    var emailField = makeInputWidget(/^\w+@\w+\.com$/);
    // etc...



--------------------------------------------------------------------------------

Bender is named after a lovable, alcoholic robot.

                                                    =MMI
                                                   M ,, M
                                                   $ :, M
                                                    OMMD
                                                    ~7~M
                                                    ~?~D
                                                    ~$=+"
                                                    8:=~O
                                                    M~=~M
                                                   ,N~=~D?
                                                  D=:ID$  $D  ,
                                                 $ ,,,,,: +D,=ZM,
                                              =M7~ZM8O8NN=,:::::~M=
                                            =M:~::::::::::::::::::=M
                                           O::::::::::::::::::::::::7Z
                                          M:~::::::::::::::::::::::::I7
                                         D~~::::::::::::::::::::::::::M
                                        =$::::::::::::::::::::::::::::~,
                                       :O::::::::::::::::::::::::::::::N
                                       +7::::::::::::::::::::::::::::::M
                                       $+~::::::::,,====~~::::~=+7ONMO+  8$
                                       $=::::::::7+,..............,,,,,,,, :M+
                                       $=~::::::M ,,,,,,,,,,,,,,,,,,::::,,,:: M
                                       I?:::::,M ,,,,, IN7NMMMMMMMMMMMMMI?MMMM+ M
                                       +7:::::,?,,,,,$7 ,,., ZZMMMMMMMI,,,..MMMM N:
                                       ~$:::::=~,,,,++, ,,,,,, ZZDMM:,,,,..,.MMMM M
                                       ,O:::::?:,,,,N ..$Z?...,,,+,+,,,,,,,..OMMM?+O
                                        D,::::+=,,,,M , NM7,..,,,, Z OM8.,,,.DMMMI,D
                                        M,::::,D,,,,I+, +?:,,,,,,,,I,$D$,,,.~MMMM:~I
                                        M,::::::N ,,,=N  ,,,,,,,, M ,,,,,,.7MMMM,,O
                                        M,::::::,M :,,,,7DNNNDNNNMDDDDNMMMNO$?  77
                                        N,::::::::+M8$I+~,,...........,:~+?I$OD?
                                        8::::::::::::~:~~::::::::::::::O,
                                        Z::::::::::::::::::::::::::::::O:
                                        $~~:::::::::~::~~~~~~::~:::::~~O
                                        ?+::::::~8NMI+~  D:~=+?M77$NM88+
                                        =I:::~:M7  N,,   O ,   D,,,:=
                                        ,7::::N  ,7MNMMMMMMNMMMMMMMM:
                                         Z::::M    N  ,, $, ,, D, ,=,
                                         8:::~8D+, N,  , $, ,, D,  I
                                         D::::,M  ?MDMMNNNDDNMMMMD88M7
                                         M,:::~~ $DM,    7,    8,=?N,:D
                                       ,NN :::::::~,,:=?II7II+=:,,:~::M
                                     ~M= :N=,:::::::::::::::::::::::::MO$
                                   I+,,: ,,, ~$D8?, ,::::~:::,  =$DN$,,,, N+
                                 IN ,,,,,,,,,,,,, ,~+I$OOOO$7?=:  ,,,,,,,,: N+
                               =M,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,::Z
                             OM ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, N,
                             7,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, M
                            7N:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,O77:
                            $~:,8MI,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.ZM~~~=MN
                           $MMM8?::,$MN$~,..,,,,,,,,,,,,,,,,,,,,,,,...:OM7,:~:::++,M
                         MZ,::::,ZM:::~:,:?DNMDZI=:,.......,:~+7DMMD?,,~:::::::~$::,N
                       N+::::::::::~+~:::::::::::~~::,:,,:~~~~~:~:::~::::::::::~8::~7
                      8~::~,:::~::::M:::::::::::::::::::::::::::::::::::::::::::N,::=D
                      8,~DMNNM?:::::~D,::::::::::::::::::::::::::::::::~~,,,::::N,::~:M,
                      M$~+=====N::::,N,::::,,,,:~~~~~~:::::~~:~:, ,=7DM$+,, M::,M:::7==+D
                     N~========M~::::8~~:~+O7IZDMNNMMNDD888DDNN8?=:,,:::::::8~:,N,::M===8M
                    M=========~M,::::M~~::N~::~~~~:~::::::::::~~::::::::::::8~:,D:::8=I7=+D
                  $$=========7N:::::$$~:::N:::::::::::::::::::::::::::::::::8~:,8:,MN=====~M
                 Z8NMD:======I~:::~=7:::::8:::::::::::::::::::::::::::::::::N::,N?M~=======+
                $I+===+M===$M:~::=MI~::::~7,:::::::::::::::::::::::::::::::,N:::M ~M~=====~~O
               N========~NMIIDM8~:~::::::~~::::::::::::::::::::::::::::::::,M,:~O   M======M+I
               $========~M~   77~:::::::::,=:::::::::::::::::::::::::::::::,M,:~$   ,~=+8D~=~N
              M===~====~N:    :O::::::::::,$::::::::::::::::::::::::::::::: M,:~7    M~~======7
             8I=======~M       M,:::::::::~M:::::::::::::::::::::::::::::::,N,~$+    +I=======8,
            ,M8ODNZ+=+M,       Z::::::::::~N,::::::::::::::::::::::::::::::,D,~$~     M~======~O
            M=======N8+        ,$~:::::::::8:::::::::::::::::::::::::::, ::,D,~7:     $===~=+:NM
           +?=~=====~M          M,:::::::::++:::::::::::::::::::::::::O ,=D,8:~Z:      MO8ND=~=7~
           M~=====~=7I          D:::::::::::7::::::::::::::::::::::::,M~~:N,8,~O,      8,======~$
          ,O=======~M           =I:::::::::,D::::::::::::::::::::::::::DDN::D:~8,      +~======:N
          D========?Z            M,:::::::::N::::::::::::::::::::::::::~:::~8::8,      ,8=======N
          M=ZMNNMM$D=            N,::::::::~O~::::::::::::::::::::::::::::~~Z::D        M~=====~M
          M=======~M             =I~:::::::~=I::::::::::::::::::::::::::::~=$::N        M7~~~IM7Z,
          M~======~N              M,::::::::,M::::::::::::::::::::::::::::~7+::N        N:======?=
          M~=======O:             M,:::::::::M,::::::::::::::::::::::::::::O~~,M        D~======+?
          N========7I             I=::::::::~$=:::::::::::::::::::::::::::,N::,M        Z~=======7
          +$=====~~:M             ,D::::::::::D:::::::::::::::::::::::::::,M,:,M        I=======~$
           M~==MNO$8N7             M~::::::::,M,::::::::::::::::::::::::::,M,:~8        +7~~~~~7M$
           DZM=+=====D             8::::::::::M:::::::::::::::::::::::::::,M,:?7        =$+7$I+~~Z
            M~~======~O            ~,::::::::~$=::::::::::::::::::::::::::,M,:8~        =I+======Z
            ,8========OI            =~::::::::+7~:::::::::::::::::::::::~~M:::N,        +I======+$
             N+=======~8I           O:::::::::,M:::::::::::::::::::::~,?MI:::~M         7?======?7
