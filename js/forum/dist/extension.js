'use strict';

System.register('pingxx-account/main', ['flarum/extend', 'flarum/app', 'flarum/Session'], function (_export, _context) {
    "use strict";

    var override, app, Session;
    return {
        setters: [function (_flarumExtend) {
            override = _flarumExtend.override;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumSession) {
            Session = _flarumSession.default;
        }],
        execute: function () {

            app.initializers.add('pingxx-account', function () {
                override(Session.prototype, 'login', function (original, identification, password) {
                    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

                    return app.request(babelHelpers.extends({
                        method: 'POST',
                        url: app.forum.attribute('baseUrl') + '/api/pingxx/login',
                        data: { identification: identification, password: password }
                    }, options));
                });
            });
        }
    };
});