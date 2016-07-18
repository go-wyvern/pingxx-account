System.register('pingxx-account/addTagTop', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'pingxx-account/components/TagTopsPage'], function (_export) {
    /**
     * Created by wyvern on 16/7/17.
     */
    'use strict';

    var extend, AdminNav, AdminLinkButton, TagTopsPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav['default'];
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
        }, function (_pingxxAccountComponentsTagTopsPage) {
            TagTopsPage = _pingxxAccountComponentsTagTopsPage['default'];
        }],
        execute: function () {
            _export('default', function () {
                app.routes.tag_tops = { path: '/tag_tops', component: TagTopsPage.component() };

                app.extensionSettings['pingxx-account'] = function () {
                    return m.route(app.route('tag_tops'));
                };

                extend(AdminNav.prototype, 'items', function (items) {
                    items.add('tag_tops', AdminLinkButton.component({
                        href: app.route('tag_tops'),
                        icon: 'sort-numeric-asc',
                        children: app.translator.trans('pingxx-account.admin.nav.tag-tops_button'),
                        description: app.translator.trans('pingxx-account.admin.nav.tag-tops_text')
                    }));
                });
            });
        }
    };
});;
System.register('pingxx-account/addTopsPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'pingxx-account/components/TopsPage', 'pingxx-account/components/Dashboard'], function (_export) {
    /**
     * Created by wyvern on 16/7/17.
     */
    'use strict';

    var extend, AdminNav, AdminLinkButton, TopsPage, Dashboard;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav['default'];
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
        }, function (_pingxxAccountComponentsTopsPage) {
            TopsPage = _pingxxAccountComponentsTopsPage['default'];
        }, function (_pingxxAccountComponentsDashboard) {
            Dashboard = _pingxxAccountComponentsDashboard['default'];
        }],
        execute: function () {
            _export('default', function () {
                app.routes.dashboard = { path: '/', component: Dashboard.component() };
                app.routes.tops = { path: '/tops', component: TopsPage.component() };

                app.extensionSettings['pingxx-account'] = function () {
                    return m.route(app.route('tops'));
                };

                extend(AdminNav.prototype, 'items', function (items) {
                    items.add('tops', AdminLinkButton.component({
                        href: app.route('tops'),
                        icon: 'sort-amount-desc',
                        children: app.translator.trans('pingxx-account.admin.nav.tops_button'),
                        description: app.translator.trans('pingxx-account.admin.nav.tops_text')
                    }));
                });
            });
        }
    };
});;
System.register('pingxx-account/addUsersPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'pingxx-account/components/UsersPage'], function (_export) {
    /**
     * Created by wyvern on 16/7/1.
     */
    'use strict';

    var extend, AdminNav, AdminLinkButton, UsersPage;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav['default'];
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
        }, function (_pingxxAccountComponentsUsersPage) {
            UsersPage = _pingxxAccountComponentsUsersPage['default'];
        }],
        execute: function () {
            _export('default', function () {
                app.routes.users = { path: '/users', component: UsersPage.component() };

                app.extensionSettings['pingxx-account'] = function () {
                    return m.route(app.route('users'));
                };

                extend(AdminNav.prototype, 'items', function (items) {
                    items.add('users', AdminLinkButton.component({
                        href: app.route('users'),
                        icon: 'users',
                        children: app.translator.trans('pingxx-account.admin.nav.users_button'),
                        description: app.translator.trans('pingxx-account.admin.nav.users_text')
                    }));
                });
            });
        }
    };
});;
System.register('pingxx-account/components/CreateUserModal', ['flarum/components/Modal', 'flarum/components/LogInModal', 'flarum/helpers/avatar', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export) {

    /**
     * The `SignUpModal` component displays a modal dialog with a singup form.
     *
     * ### Props
     *
     * - `username`
     * - `email`
     * - `password`
     * - `token` An email token to sign up with.
     */
    'use strict';

    var Modal, LogInModal, avatar, Button, LogInButtons, extractText, EditUserModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal['default'];
        }, function (_flarumComponentsLogInModal) {
            LogInModal = _flarumComponentsLogInModal['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumComponentsLogInButtons) {
            LogInButtons = _flarumComponentsLogInButtons['default'];
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText['default'];
        }],
        execute: function () {
            EditUserModal = (function (_Modal) {
                babelHelpers.inherits(EditUserModal, _Modal);

                function EditUserModal() {
                    babelHelpers.classCallCheck(this, EditUserModal);
                    babelHelpers.get(Object.getPrototypeOf(EditUserModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(EditUserModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(Object.getPrototypeOf(EditUserModal.prototype), 'init', this).call(this);

                        /**
                         * The value of the username input.
                         *
                         * @type {Function}
                         */
                        this.username = m.prop(this.props.username || '');

                        /**
                         * The value of the email input.
                         *
                         * @type {Function}
                         */
                        this.email = m.prop(this.props.email || '');

                        /**
                         * The value of the password input.
                         *
                         * @type {Function}
                         */
                        this.password = m.prop(this.props.password || '');
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'Modal--small EditUserModal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('pingxx-account.admin.users.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return [m(
                            'div',
                            { className: 'Modal-body' },
                            this.body()
                        )];
                    }
                }, {
                    key: 'body',
                    value: function body() {
                        return [m(
                            'div',
                            { className: 'Form Form--centered' },
                            m(
                                'div',
                                { className: 'Form-group' },
                                m('input', { className: 'FormControl', name: 'username', type: 'text', placeholder: extractText(app.translator.trans('pingxx-account.admin.users.username_placeholder')),
                                    value: this.username(),
                                    onchange: m.withAttr('value', this.username),
                                    disabled: this.loading })
                            ),
                            m(
                                'div',
                                { className: 'Form-group' },
                                m('input', { className: 'FormControl', name: 'email', type: 'email', placeholder: extractText(app.translator.trans('pingxx-account.admin.users.email_placeholder')),
                                    value: this.email(),
                                    onchange: m.withAttr('value', this.email),
                                    disabled: this.loading })
                            ),
                            m(
                                'div',
                                { className: 'Form-group' },
                                m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('pingxx-account.admin.users.password_placeholder')),
                                    value: this.password(),
                                    onchange: m.withAttr('value', this.password),
                                    disabled: this.loading })
                            ),
                            m(
                                'div',
                                { className: 'Form-group' },
                                m(
                                    Button,
                                    {
                                        className: 'Button Button--primary Button--block',
                                        type: 'submit',
                                        loading: this.loading },
                                    app.translator.trans('pingxx-account.admin.users.submit_button')
                                )
                            )
                        )];
                    }
                }, {
                    key: 'onready',
                    value: function onready() {
                        if (this.props.username && !this.props.email) {
                            this.$('[name=email]').select();
                        } else {
                            this.$('[name=username]').select();
                        }
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        e.preventDefault();

                        this.loading = true;

                        var data = this.submitData();

                        app.request({
                            url: app.forum.attribute('baseUrl') + '/api/user',
                            method: 'POST',
                            data: data,
                            errorHandler: this.onerror.bind(this)
                        }).then(function () {
                            return window.location.reload();
                        }, this.loaded.bind(this));
                    }

                    /**
                     * Get the data that should be submitted in the sign-up request.
                     *
                     * @return {Object}
                     * @public
                     */
                }, {
                    key: 'submitData',
                    value: function submitData() {
                        var data = {
                            username: this.username(),
                            email: this.email()
                        };

                        if (this.props.token) {
                            data.token = this.props.token;
                        } else {
                            data.password = this.password();
                        }

                        if (this.props.avatarUrl) {
                            data.avatarUrl = this.props.avatarUrl;
                        }

                        return data;
                    }
                }]);
                return EditUserModal;
            })(Modal);

            _export('default', EditUserModal);
        }
    };
});;
System.register('pingxx-account/components/Dashboard', ['flarum/components/Page'], function (_export) {
    /**
     * Created by wyvern on 16/7/1.
     */
    'use strict';

    var Page, Dashboard;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage['default'];
        }],
        execute: function () {
            Dashboard = (function (_Page) {
                babelHelpers.inherits(Dashboard, _Page);

                function Dashboard() {
                    babelHelpers.classCallCheck(this, Dashboard);
                    babelHelpers.get(Object.getPrototypeOf(Dashboard.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(Dashboard, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(Object.getPrototypeOf(Dashboard.prototype), 'init', this).call(this);
                        this.loading = true;
                        this.flarum = {};
                        this.flarum.users = [];
                        this.flarum.discussions = [];
                        this.flarum.totay_users = [];
                        this.flarum.totay_discussions = [];

                        this.flarum.totalUsers = 0;
                        this.flarum.totaytotalUsers = 0;

                        this.flarum.totalDiscussions = 0;
                        this.flarum.totaytotalDiscussions = 0;

                        this.flarum.totalQuestions = 0;
                        this.flarum.totaytotalQuestions = 0;

                        this.refreshUser();
                        this.refreshDiscussion();
                    }
                }, {
                    key: 'refreshUser',
                    value: function refreshUser() {
                        var _this = this;

                        return this.loadUsers().then(function (results) {
                            _this.flarum.users = [];
                            _this.parseUsers(results);
                        }, function () {
                            _this.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'refreshDiscussion',
                    value: function refreshDiscussion() {
                        var _this2 = this;

                        return this.loadDiscussions().then(function (results) {
                            _this2.flarum.discussions = [];
                            _this2.parseDiscussions(results);
                        }, function () {
                            _this2.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadUsers',
                    value: function loadUsers() {
                        return app.store.find('users');
                    }
                }, {
                    key: 'loadDiscussions',
                    value: function loadDiscussions() {
                        return app.store.find('discussions');
                    }
                }, {
                    key: 'parseUsers',
                    value: function parseUsers(results) {
                        var _this3 = this;

                        [].push.apply(this.flarum.users, results);
                        this.flarum.totalUsers = results.length;
                        var minute = 1000 * 60;
                        var hour = minute * 60;
                        var day = hour * 24;
                        results.map(function (user) {
                            if ((new Date().getTime() - user.joinTime()) / day < 1) {
                                _this3.flarum.totay_users.push(user);
                            }
                        });
                        this.flarum.totaytotalUsers = this.flarum.totay_users.length;
                        this.loading = false;

                        m.lazyRedraw();
                        return results;
                    }
                }, {
                    key: 'parseDiscussions',
                    value: function parseDiscussions(results) {
                        var _this4 = this;

                        [].push.apply(this.flarum.discussions, results);
                        this.flarum.totalDiscussions = results.length;
                        this.loading = false;
                        var minute = 1000 * 60;
                        var hour = minute * 60;
                        var day = hour * 24;
                        var month = day * 10;
                        results.map(function (discussion) {
                            if ((new Date().getTime() - discussion.startTime()) / month < 1) {
                                _this4.flarum.totay_discussions.push(discussion);
                            }
                        });
                        this.flarum.totaytotalDiscussions = this.flarum.totay_discussions.length;

                        m.lazyRedraw();
                        return results;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        this.topIndex = 0;
                        return m(
                            'div',
                            { className: 'Dashboard' },
                            m(
                                'div',
                                { className: 'Dashboard-options' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'p',
                                        null,
                                        app.translator.trans('pingxx-account.admin.dashboard.about_flarum')
                                    )
                                )
                            ),
                            m(
                                'div',
                                { className: 'UserPage-users' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'table',
                                        { className: 'PermissionGrid UserGridWidth' },
                                        m(
                                            'thead',
                                            null,
                                            m(
                                                'tr',
                                                null,
                                                m('td', null),
                                                m(
                                                    'th',
                                                    null,
                                                    '总体数据'
                                                ),
                                                m(
                                                    'th',
                                                    null,
                                                    '今日数据'
                                                )
                                            )
                                        ),
                                        m(
                                            'tbody',
                                            null,
                                            m(
                                                'tr',
                                                { className: 'PermissionGrid-section' },
                                                m(
                                                    'th',
                                                    null,
                                                    '基础数据'
                                                ),
                                                m('td', null),
                                                m('td', null)
                                            ),
                                            m(
                                                'tr',
                                                { className: 'PermissionGrid-child' },
                                                m(
                                                    'th',
                                                    null,
                                                    m('i', { 'class': 'icon fa fa-fw fa-registered' }),
                                                    '用户注册总量'
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totalUsers
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totaytotalUsers
                                                )
                                            ),
                                            m(
                                                'tr',
                                                { className: 'PermissionGrid-child' },
                                                m(
                                                    'th',
                                                    null,
                                                    m('i', { 'class': 'icon fa fa-fw fa-question-circle' }),
                                                    '问题提问总量'
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totalQuestions
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totaytotalQuestions
                                                )
                                            ),
                                            m(
                                                'tr',
                                                { className: 'PermissionGrid-child' },
                                                m(
                                                    'th',
                                                    null,
                                                    m('i', { 'class': 'icon fa fa-fw fa-file-text-o' }),
                                                    '文章发表总量'
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totalDiscussions
                                                ),
                                                m(
                                                    'td',
                                                    null,
                                                    this.flarum.totaytotalDiscussions
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized) {
                        if (isInitialized) return;
                    }
                }]);
                return Dashboard;
            })(Page);

            _export('default', Dashboard);
        }
    };
});;
System.register('pingxx-account/components/EditUserModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/components/Badge', 'flarum/models/User'], function (_export) {

    /**
     * The `EditGroupModal` component shows a modal dialog which allows the user
     * to create or edit a group.
     */
    'use strict';

    var Modal, Button, Badge, User, EditUserModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge['default'];
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser['default'];
        }],
        execute: function () {
            EditUserModal = (function (_Modal) {
                babelHelpers.inherits(EditUserModal, _Modal);

                function EditUserModal() {
                    babelHelpers.classCallCheck(this, EditUserModal);
                    babelHelpers.get(Object.getPrototypeOf(EditUserModal.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(EditUserModal, [{
                    key: 'init',
                    value: function init() {
                        this.user = this.props.user || app.store.createRecord('users');

                        this.username = m.prop(this.user.username() || '');
                        this.email = m.prop(this.user.email() || '');
                        this.password = m.prop(this.user.password() || '');
                        this.suspend_until = m.prop(this.user.suspend_until() || '');
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'Modal--small EditUserModal';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return [app.translator.trans('pingxx-account.admin.edit_user.title')];
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form' },
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('pingxx-account.admin.edit_user.name_label')
                                    ),
                                    m(
                                        'div',
                                        { className: 'EditUserModal-name-input' },
                                        m('input', { className: 'FormControl', value: this.username(), disabled: 'disabled' })
                                    )
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('pingxx-account.admin.edit_user.email_label')
                                    ),
                                    m('input', { className: 'FormControl', value: this.email(), disabled: 'disabled' })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('pingxx-account.admin.edit_user.password_label')
                                    ),
                                    m('input', { className: 'FormControl', value: this.password(),
                                        type: 'password', oninput: m.withAttr('value', this.password),
                                        placeholder: app.translator.trans('pingxx-account.admin.edit_user.password_placeholder') })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('pingxx-account.admin.edit_user.suspend_until')
                                    ),
                                    m('input', { className: 'FormControl', value: this.suspend_until(), oninput: m.withAttr('value', this.suspend_until),
                                        placeholder: app.translator.trans('pingxx-account.admin.edit_user.suspend_until_placeholder') })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    Button.component({
                                        type: 'submit',
                                        className: 'Button Button--primary EditUserModal-save',
                                        loading: this.loading,
                                        children: app.translator.trans('pingxx-account.admin.edit_user.submit_button')
                                    }),
                                    this.user.exists ? m(
                                        'button',
                                        { type: 'button', className: 'Button EditUserModal-delete', onclick: this.deleteUser.bind(this) },
                                        app.translator.trans('pingxx-account.admin.edit_user.delete_button')
                                    ) : ''
                                )
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this = this;

                        e.preventDefault();

                        this.loading = true;
                        var data = {
                            suspendUntil: this.suspend_until()
                        };
                        if (this.password() != "") {
                            data.password = this.password();
                        }

                        this.user.save(data, { errorHandler: this.onerror.bind(this) }).then(this.hide.bind(this))['catch'](function () {
                            _this.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'deleteUser',
                    value: function deleteUser() {
                        var _this2 = this;

                        if (confirm(app.translator.trans('pingxx-account.admin.edit_user.delete_confirmation'))) {
                            this.user['delete']().then(function () {
                                m.redraw();
                                _this2.hide();
                                window.location.reload();
                            });
                        }
                    }
                }]);
                return EditUserModal;
            })(Modal);

            _export('default', EditUserModal);
        }
    };
});;
System.register("pingxx-account/components/TagTopsPage", ["flarum/components/Page"], function (_export) {
    /**
     * Created by wyvern on 16/7/17.
     */
    "use strict";

    var Page, TagTopsPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage["default"];
        }],
        execute: function () {
            TagTopsPage = (function (_Page) {
                babelHelpers.inherits(TagTopsPage, _Page);

                function TagTopsPage() {
                    babelHelpers.classCallCheck(this, TagTopsPage);
                    babelHelpers.get(Object.getPrototypeOf(TagTopsPage.prototype), "constructor", this).apply(this, arguments);
                }

                babelHelpers.createClass(TagTopsPage, [{
                    key: "view",
                    value: function view() {
                        var _this = this;

                        this.topIndex = 0;
                        return m(
                            "div",
                            { className: "Dashboard" },
                            m(
                                "div",
                                { className: "Dashboard-options" },
                                m(
                                    "div",
                                    { className: "container" },
                                    m(
                                        "p",
                                        null,
                                        app.translator.trans('pingxx-account.admin.tops.tops_text')
                                    )
                                )
                            ),
                            m(
                                "div",
                                { className: "UserPage-users" },
                                m(
                                    "div",
                                    { className: "container" },
                                    m(
                                        "div",
                                        null,
                                        m(
                                            "table",
                                            { className: "UserGrid UserGridWidth" },
                                            m(
                                                "thead",
                                                null,
                                                m(
                                                    "tr",
                                                    null,
                                                    m("th", null),
                                                    m(
                                                        "th",
                                                        null,
                                                        "标签名称"
                                                    ),
                                                    m(
                                                        "th",
                                                        null,
                                                        "文章总量"
                                                    )
                                                )
                                            ),
                                            m(
                                                "tbody",
                                                null,
                                                app.store.all('tags').sort(function (a, b) {
                                                    return b.discussionsCount() - a.discussionsCount();
                                                }).map(function (tag) {
                                                    _this.topIndex = _this.topIndex + 1;
                                                    return m(
                                                        "tr",
                                                        null,
                                                        m(
                                                            "td",
                                                            { className: "ranking" },
                                                            _this.topIndex
                                                        ),
                                                        m(
                                                            "td",
                                                            null,
                                                            tag.name()
                                                        ),
                                                        m(
                                                            "td",
                                                            null,
                                                            tag.discussionsCount()
                                                        )
                                                    );
                                                })
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: "config",
                    value: function config(isInitialized) {
                        if (isInitialized) return;

                        var dashboard = this;

                        this.$(".userData .default").attr("class", "active");

                        this.$(".userData li").click(function (e) {
                            console.log("click");
                            $(".userData li").attr("class", "");
                            $(this).attr("class", "active");

                            dashboard.attr = $(this).find("a").text();
                            if (dashboard.attr == '问题提问总量') {
                                dashboard.sort = 'askActive';
                            } else if (dashboard.attr == '文章发表总量') {
                                dashboard.sort = 'discussActive';
                            } else if (dashboard.attr == '问题回答总量') {
                                dashboard.sort = 'answerActive';
                            } else if (dashboard.attr == '文章评论总量') {
                                dashboard.sort = 'commentsActive';
                            }
                            dashboard.refresh();
                        });
                    }
                }]);
                return TagTopsPage;
            })(Page);

            _export("default", TagTopsPage);
        }
    };
});;
System.register('pingxx-account/components/TopsPage', ['flarum/components/Page'], function (_export) {
    /**
     * Created by wyvern on 16/7/17.
     */
    'use strict';

    var Page, TopsPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage['default'];
        }],
        execute: function () {
            TopsPage = (function (_Page) {
                babelHelpers.inherits(TopsPage, _Page);

                function TopsPage() {
                    babelHelpers.classCallCheck(this, TopsPage);
                    babelHelpers.get(Object.getPrototypeOf(TopsPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(TopsPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(Object.getPrototypeOf(TopsPage.prototype), 'init', this).call(this);
                        this.loading = true;
                        this.attr = "问题提问总量";
                        this.sort = 'discussactive';
                        this.topIndex = 0;
                        this.users = [];

                        this.refresh();
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        var _this = this;

                        return this.loadResults().then(function (results) {
                            _this.users = [];
                            _this.topIndex = 0;
                            _this.parseTopUsers(results);
                        }, function () {
                            _this.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadResults',
                    value: function loadResults() {
                        return app.store.find('users', {
                            sort: this.sortMap()[this.sort],
                            page: {
                                limit: 20
                            }
                        });
                    }
                }, {
                    key: 'sortMap',
                    value: function sortMap() {
                        var map = {};
                        map.commentsActive = '-commentsCount';
                        map.discussActive = '-discussionsCount';
                        map.askActive = '-askCount';
                        map.answerActive = '-answerCount';
                        map.newest = '-joinTime';
                        map.oldest = 'joinTime';

                        return map;
                    }
                }, {
                    key: 'parseTopUsers',
                    value: function parseTopUsers(results) {
                        [].push.apply(this.users, results);

                        this.loading = false;

                        m.lazyRedraw();

                        return results;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this2 = this;

                        this.topIndex = 0;
                        return m(
                            'div',
                            { className: 'Dashboard' },
                            m(
                                'div',
                                { className: 'Dashboard-options' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'p',
                                        null,
                                        app.translator.trans('pingxx-account.admin.tops.tops_text')
                                    )
                                )
                            ),
                            m(
                                'div',
                                { className: 'UserPage-users' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'ul',
                                        { 'class': 'nav nav-tabs userData' },
                                        m(
                                            'li',
                                            { role: 'presentation', 'class': 'default' },
                                            m(
                                                'a',
                                                null,
                                                '问题提问总量'
                                            )
                                        ),
                                        m(
                                            'li',
                                            { role: 'presentation' },
                                            m(
                                                'a',
                                                null,
                                                '问题回答总量'
                                            )
                                        ),
                                        m(
                                            'li',
                                            { role: 'presentation' },
                                            m(
                                                'a',
                                                null,
                                                '文章发表总量'
                                            )
                                        ),
                                        m(
                                            'li',
                                            { role: 'presentation' },
                                            m(
                                                'a',
                                                null,
                                                '文章评论总量'
                                            )
                                        ),
                                        m(
                                            'li',
                                            { role: 'presentation' },
                                            m(
                                                'a',
                                                null,
                                                '被点赞总量'
                                            )
                                        ),
                                        m(
                                            'li',
                                            { role: 'presentation' },
                                            m(
                                                'a',
                                                null,
                                                '被赞同总量'
                                            )
                                        )
                                    ),
                                    m(
                                        'div',
                                        null,
                                        m(
                                            'table',
                                            { className: 'UserGrid UserGridWidth' },
                                            m(
                                                'thead',
                                                null,
                                                m(
                                                    'tr',
                                                    null,
                                                    m('td', null),
                                                    m(
                                                        'th',
                                                        null,
                                                        '用户名'
                                                    ),
                                                    m(
                                                        'th',
                                                        null,
                                                        '邮箱'
                                                    ),
                                                    m(
                                                        'th',
                                                        null,
                                                        this.attr
                                                    )
                                                )
                                            ),
                                            m(
                                                'tbody',
                                                null,
                                                this.users.map(function (user) {
                                                    _this2.topIndex = _this2.topIndex + 1;
                                                    return m(
                                                        'tr',
                                                        null,
                                                        m(
                                                            'td',
                                                            { className: 'ranking' },
                                                            _this2.topIndex
                                                        ),
                                                        m(
                                                            'td',
                                                            null,
                                                            user.username()
                                                        ),
                                                        m(
                                                            'td',
                                                            null,
                                                            user.email()
                                                        ),
                                                        m(
                                                            'td',
                                                            null,
                                                            _this2.attr == '文章发表总量' ? user.discussionsCount() : _this2.attr == '文章评论总量' ? user.commentsCount() : _this2.attr == '问题提问总量' ? user.ask_count() : _this2.attr == '问题回答总量' ? user.answer_count() : _this2.attr == '被点赞总量' ? user.praise_count() : _this2.attr == '被赞同总量' ? user.agree_count() : ''
                                                        )
                                                    );
                                                })
                                            )
                                        )
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized) {
                        if (isInitialized) return;

                        var dashboard = this;

                        this.$(".userData .default").attr("class", "active");

                        this.$(".userData li").click(function (e) {
                            console.log("click");
                            $(".userData li").attr("class", "");
                            $(this).attr("class", "active");

                            dashboard.attr = $(this).find("a").text();
                            if (dashboard.attr == '问题提问总量') {
                                dashboard.sort = 'askActive';
                            } else if (dashboard.attr == '文章发表总量') {
                                dashboard.sort = 'discussActive';
                            } else if (dashboard.attr == '问题回答总量') {
                                dashboard.sort = 'answerActive';
                            } else if (dashboard.attr == '文章评论总量') {
                                dashboard.sort = 'commentsActive';
                            }
                            dashboard.refresh();
                        });
                    }
                }]);
                return TopsPage;
            })(Page);

            _export('default', TopsPage);
        }
    };
});;
System.register('pingxx-account/components/UserSearch', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/utils/ItemList', 'flarum/utils/classList', 'flarum/utils/extractText', 'flarum/helpers/icon', 'pingxx-account/components/UserSearchSource'], function (_export) {
    /**
     * Created by wyvern on 16/7/5.
     */

    /**
     * The `Search` component displays a menu of as-you-type results from a variety
     * of sources.
     *
     * The search box will be 'activated' if the app's current controller implements
     * a `searching` method that returns a truthy value. If this is the case, an 'x'
     * button will be shown next to the search field, and clicking it will call the
     * `clearSearch` method on the controller.
     */
    'use strict';

    var Component, LoadingIndicator, ItemList, classList, extractText, icon, UsersSearchSource, UserSearch;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList['default'];
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_pingxxAccountComponentsUserSearchSource) {
            UsersSearchSource = _pingxxAccountComponentsUserSearchSource['default'];
        }],
        execute: function () {
            UserSearch = (function (_Component) {
                babelHelpers.inherits(UserSearch, _Component);

                function UserSearch() {
                    babelHelpers.classCallCheck(this, UserSearch);
                    babelHelpers.get(Object.getPrototypeOf(UserSearch.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(UserSearch, [{
                    key: 'init',
                    value: function init() {
                        /**
                         * The value of the search input.
                         *
                         * @type {Function}
                         */
                        this.value = m.prop('');

                        /**
                         * Whether or not the search input has focus.
                         *
                         * @type {Boolean}
                         */
                        this.hasFocus = false;

                        /**
                         * An array of SearchSources.
                         *
                         * @type {SearchSource[]}
                         */
                        this.sources = this.sourceItems().toArray();

                        /**
                         * The number of sources that are still loading results.
                         *
                         * @type {Integer}
                         */
                        this.loadingSources = 0;

                        /**
                         * A list of queries that have been searched for.
                         *
                         * @type {Array}
                         */
                        this.searched = [];

                        /**
                         * The index of the currently-selected <li> in the results list. This can be
                         * a unique string (to account for the fact that an item's position may jump
                         * around as new results load), but otherwise it will be numeric (the
                         * sequential position within the list).
                         *
                         * @type {String|Integer}
                         */
                        this.index = 0;
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this = this;

                        var currentSearch = this.getCurrentSearch();

                        // Initialize search input value in the view rather than the constructor so
                        // that we have access to app.current.
                        if (typeof this.value() === 'undefined') {
                            this.value(currentSearch || '');
                        }

                        return m(
                            'div',
                            { className: 'Search ' + classList({
                                    open: this.value() && this.hasFocus,
                                    focused: this.hasFocus,
                                    active: !!currentSearch,
                                    loading: !!this.loadingSources
                                }) },
                            m(
                                'div',
                                { className: 'Search-input' },
                                m('input', { className: 'FormControl',
                                    placeholder: extractText(app.translator.trans('pingxx-account.admin.users.search.search_placeholder')),
                                    value: this.value(),
                                    oninput: m.withAttr('value', this.value),
                                    onfocus: function () {
                                        return _this.hasFocus = true;
                                    },
                                    onblur: function () {
                                        return _this.hasFocus = false;
                                    } }),
                                this.loadingSources ? LoadingIndicator.component({ size: 'tiny', className: 'Button Button--icon Button--link' }) : currentSearch ? m(
                                    'button',
                                    { className: 'Search-clear Button Button--icon Button--link', onclick: this.clear.bind(this) },
                                    icon('times-circle')
                                ) : ''
                            ),
                            m(
                                'ul',
                                { className: 'Dropdown-menu Search-results' },
                                this.value() && this.hasFocus ? this.sources.map(function (source) {
                                    return source.view(_this.value());
                                }) : ''
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized) {
                        var _this2 = this;

                        // Highlight the item that is currently selected.
                        this.setIndex(this.getCurrentNumericIndex());

                        if (isInitialized) return;

                        var search = this;

                        this.$('.Search-results').on('mousedown', function (e) {
                            return e.preventDefault();
                        }).on('click', function () {
                            return _this2.$('input').blur();
                        })

                        // Whenever the mouse is hovered over a search result, highlight it.
                        .on('mouseenter', '> li:not(.Dropdown-header)', function () {
                            search.setIndex(search.selectableItems().index(this));
                        });

                        // Handle navigation key events on the search input.
                        this.$('input')
                        // Handle input key events on the search input, triggering results to
                        // load.
                        .on('input focus', function () {
                            var query = this.value.toLowerCase();

                            if (!query) return;

                            clearTimeout(search.searchTimeout);
                            search.searchTimeout = setTimeout(function () {
                                if (search.searched.indexOf(query) !== -1) return;

                                if (query.length >= 3) {
                                    search.sources.map(function (source) {
                                        if (!source.search) return;

                                        search.loadingSources++;

                                        source.search(query).then(function () {
                                            search.loadingSources--;
                                            m.redraw();
                                        });
                                    });
                                }

                                search.searched.push(query);
                                m.redraw();
                            }, 250);
                        }).on('focus', function () {
                            $(this).one('mouseup', function (e) {
                                return e.preventDefault();
                            }).select();
                        });
                    }

                    /**
                     * Get the active search in the app's current controller.
                     *
                     * @return {String}
                     */
                }, {
                    key: 'getCurrentSearch',
                    value: function getCurrentSearch() {
                        return app.current && typeof app.current.searching === 'function' && app.current.searching();
                    }

                    /**
                     * Clear the search input and the current controller's active search.
                     */
                }, {
                    key: 'clear',
                    value: function clear() {
                        this.value('');

                        if (this.getCurrentSearch()) {
                            app.current.clearSearch();
                        } else {
                            m.redraw();
                        }
                    }

                    /**
                     * Build an item list of SearchSources.
                     *
                     * @return {ItemList}
                     */
                }, {
                    key: 'sourceItems',
                    value: function sourceItems() {
                        var items = new ItemList();

                        items.add('users', new UsersSearchSource());

                        return items;
                    }

                    /**
                     * Get all of the search result items that are selectable.
                     *
                     * @return {jQuery}
                     */
                }, {
                    key: 'selectableItems',
                    value: function selectableItems() {
                        return this.$('.Search-results > li:not(.Dropdown-header)');
                    }

                    /**
                     * Get the position of the currently selected search result item.
                     *
                     * @return {Integer}
                     */
                }, {
                    key: 'getCurrentNumericIndex',
                    value: function getCurrentNumericIndex() {
                        return this.selectableItems().index(this.getItem(this.index));
                    }

                    /**
                     * Get the <li> in the search results with the given index (numeric or named).
                     *
                     * @param {String} index
                     * @return {DOMElement}
                     */
                }, {
                    key: 'getItem',
                    value: function getItem(index) {
                        var $items = this.selectableItems();
                        var $item = $items.filter('[data-index="' + index + '"]');

                        if (!$item.length) {
                            $item = $items.eq(index);
                        }

                        return $item;
                    }

                    /**
                     * Set the currently-selected search result item to the one with the given
                     * index.
                     *
                     * @param {Integer} index
                     * @param {Boolean} scrollToItem Whether or not to scroll the dropdown so that
                     *     the item is in view.
                     */
                }, {
                    key: 'setIndex',
                    value: function setIndex(index, scrollToItem) {
                        var $items = this.selectableItems();
                        var $dropdown = $items.parent();

                        var fixedIndex = index;
                        if (index < 0) {
                            fixedIndex = $items.length - 1;
                        } else if (index >= $items.length) {
                            fixedIndex = 0;
                        }

                        var $item = $items.removeClass('active').eq(fixedIndex).addClass('active');

                        this.index = $item.attr('data-index') || fixedIndex;

                        if (scrollToItem) {
                            var dropdownScroll = $dropdown.scrollTop();
                            var dropdownTop = $dropdown.offset().top;
                            var dropdownBottom = dropdownTop + $dropdown.outerHeight();
                            var itemTop = $item.offset().top;
                            var itemBottom = itemTop + $item.outerHeight();

                            var scrollTop = undefined;
                            if (itemTop < dropdownTop) {
                                scrollTop = dropdownScroll - dropdownTop + itemTop - parseInt($dropdown.css('padding-top'), 10);
                            } else if (itemBottom > dropdownBottom) {
                                scrollTop = dropdownScroll - dropdownBottom + itemBottom + parseInt($dropdown.css('padding-bottom'), 10);
                            }

                            if (typeof scrollTop !== 'undefined') {
                                $dropdown.stop(true).animate({ scrollTop: scrollTop }, 100);
                            }
                        }
                    }
                }]);
                return UserSearch;
            })(Component);

            _export('default', UserSearch);
        }
    };
});;
System.register('pingxx-account/components/UserSearchSource', ['flarum/helpers/highlight', 'flarum/helpers/avatar', 'flarum/helpers/username', 'pingxx-account/components/EditUserModal'], function (_export) {

    /**
     * The `UsersSearchSource` finds and displays user search results in the search
     * dropdown.
     *
     * @implements SearchSource
     */
    'use strict';

    var highlight, avatar, username, EditUserModal, UsersSearchResults;
    return {
        setters: [function (_flarumHelpersHighlight) {
            highlight = _flarumHelpersHighlight['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername['default'];
        }, function (_pingxxAccountComponentsEditUserModal) {
            EditUserModal = _pingxxAccountComponentsEditUserModal['default'];
        }],
        execute: function () {
            UsersSearchResults = (function () {
                function UsersSearchResults() {
                    babelHelpers.classCallCheck(this, UsersSearchResults);
                }

                babelHelpers.createClass(UsersSearchResults, [{
                    key: 'search',
                    value: function search(query) {
                        return app.store.find('users', {
                            filter: { q: query },
                            page: { limit: 5 }
                        });
                    }
                }, {
                    key: 'view',
                    value: function view(query) {
                        var results = app.store.all('users').filter(function (user) {
                            return user.username().toLowerCase().substr(0, query.length) === query;
                        });

                        if (!results.length) return '';

                        return [m(
                            'li',
                            { className: 'Dropdown-header' },
                            app.translator.trans('pingxx-account.admin.users.search.users_heading')
                        ), results.map(function (user) {
                            var name = username(user);
                            name.children[0] = highlight(name.children[0], query);

                            return m(
                                'li',
                                { className: 'UserSearchResult', 'data-index': 'users' + user.id() },
                                m(
                                    'a',
                                    { onclick: function () {
                                            return app.modal.show(new EditUserModal({ user: user }));
                                        } },
                                    avatar(user),
                                    name
                                )
                            );
                        })];
                    }
                }]);
                return UsersSearchResults;
            })();

            _export('default', UsersSearchResults);
        }
    };
});;
System.register('pingxx-account/components/UsersPage', ['flarum/components/Page', 'flarum/components/Button', 'pingxx-account/components/CreateUserModal', 'pingxx-account/components/EditUserModal', 'pingxx-account/components/UserSearch', 'flarum/utils/humanTime', 'flarum/helpers/icon', 'flarum/helpers/listItems', 'flarum/utils/ItemList'], function (_export) {
    /**
     * Created by wyvern on 16/7/1.
     */
    'use strict';

    var Page, Button, CreateUserModal, EditUserModal, UserSearch, humanTime, icon, listItems, ItemList, UsersPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_pingxxAccountComponentsCreateUserModal) {
            CreateUserModal = _pingxxAccountComponentsCreateUserModal['default'];
        }, function (_pingxxAccountComponentsEditUserModal) {
            EditUserModal = _pingxxAccountComponentsEditUserModal['default'];
        }, function (_pingxxAccountComponentsUserSearch) {
            UserSearch = _pingxxAccountComponentsUserSearch['default'];
        }, function (_flarumUtilsHumanTime) {
            humanTime = _flarumUtilsHumanTime['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }],
        execute: function () {
            UsersPage = (function (_Page) {
                babelHelpers.inherits(UsersPage, _Page);

                function UsersPage() {
                    babelHelpers.classCallCheck(this, UsersPage);
                    babelHelpers.get(Object.getPrototypeOf(UsersPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(UsersPage, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(Object.getPrototypeOf(UsersPage.prototype), 'init', this).call(this);
                        this.loading = true;

                        this.page = 1;
                        this.limit = 10;
                        this.query = "";

                        this.canprev = false;
                        this.cannext = false;
                        this.search = new UserSearch();
                        this.listusers = [];

                        this.refresh();
                    }
                }, {
                    key: 'refresh',
                    value: function refresh() {
                        var _this = this;

                        return this.loadResults().then(function (results) {
                            _this.listusers = [];
                            _this.parseUsers(results);
                        }, function () {
                            _this.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadResults',
                    value: function loadResults() {
                        return app.store.find('users', {
                            filter: { q: this.query },
                            page: {
                                limit: this.limit,
                                offset: this.limit * (this.page - 1)
                            }
                        });
                    }
                }, {
                    key: 'parseUsers',
                    value: function parseUsers(results) {
                        [].push.apply(this.listusers, results);

                        this.loading = false;

                        this.canprev = !!results.payload.links.prev;
                        this.cannext = !!results.payload.links.next;

                        m.lazyRedraw();

                        return results;
                    }
                }, {
                    key: 'loadNext',
                    value: function loadNext() {
                        var _this2 = this;

                        this.loading = true;
                        this.page = this.page + 1;
                        this.loadResults().then(function (results) {
                            _this2.listusers = [];
                            _this2.parseUsers(results);
                        }, function () {
                            _this2.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadPrev',
                    value: function loadPrev() {
                        var _this3 = this;

                        this.loading = true;
                        this.page = this.page - 1;
                        this.loadResults().then(function (results) {
                            _this3.listusers = [];
                            _this3.parseUsers(results);
                        }, function () {
                            _this3.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this4 = this;

                        return m(
                            'div',
                            { className: 'UsersPage' },
                            m(
                                'div',
                                { className: 'UserPage-options' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'p',
                                        null,
                                        app.translator.trans('pingxx-account.admin.users.about_users_text')
                                    ),
                                    Button.component({
                                        className: 'Button',
                                        icon: 'plus',
                                        children: app.translator.trans('pingxx-account.admin.users.new_user_button'),
                                        onclick: function onclick() {
                                            return app.modal.show(new CreateUserModal());
                                        }
                                    }),
                                    m(
                                        'ul',
                                        { className: 'Header-controls' },
                                        listItems(this.items().toArray())
                                    )
                                )
                            ),
                            m(
                                'div',
                                { className: 'UserPage-users' },
                                m(
                                    'div',
                                    { className: 'container' },
                                    m(
                                        'table',
                                        { className: 'UserGrid UserTableWidth' },
                                        m(
                                            'thead',
                                            null,
                                            m('th', null),
                                            m(
                                                'th',
                                                null,
                                                '用户名'
                                            ),
                                            m(
                                                'th',
                                                null,
                                                '邮箱'
                                            ),
                                            m(
                                                'th',
                                                null,
                                                '是否激活'
                                            ),
                                            m(
                                                'th',
                                                null,
                                                '加入时间'
                                            ),
                                            m(
                                                'th',
                                                null,
                                                '来自'
                                            ),
                                            m(
                                                'th',
                                                null,
                                                '编辑'
                                            )
                                        ),
                                        m(
                                            'tbody',
                                            null,
                                            this.listusers.map(function (user) {
                                                return m(
                                                    'tr',
                                                    null,
                                                    m(
                                                        'td',
                                                        null,
                                                        m(
                                                            'span',
                                                            { className: user.isOnline() ? 'online' : '' },
                                                            user.isOnline() ? [icon('circle'), ' ', '在线'] : [icon('clock-o'), ' ', humanTime(user.lastSeenTime())]
                                                        )
                                                    ),
                                                    m(
                                                        'td',
                                                        null,
                                                        user.username()
                                                    ),
                                                    m(
                                                        'td',
                                                        null,
                                                        user.email()
                                                    ),
                                                    m(
                                                        'td',
                                                        { id: 'activeted', onclick: _this4.ActiveUser.bind(_this4, user) },
                                                        !user.isActivated() ? m(
                                                            'a',
                                                            { type: 'button' },
                                                            m('i', { 'class': 'fa fa-toggle-off', 'aria-hidden': 'true' })
                                                        ) : m(
                                                            'a',
                                                            { type: 'button' },
                                                            m('i', { 'class': 'fa fa-toggle-on', 'aria-hidden': 'true' })
                                                        )
                                                    ),
                                                    m(
                                                        'td',
                                                        null,
                                                        moment(user.joinTime()).format('MMMM YYYY')
                                                    ),
                                                    m(
                                                        'td',
                                                        null,
                                                        user.create_from()
                                                    ),
                                                    m(
                                                        'td',
                                                        null,
                                                        m(
                                                            'a',
                                                            { type: 'button', onclick: function () {
                                                                    return app.modal.show(new EditUserModal({ user: user }));
                                                                } },
                                                            m('i', { 'class': 'fa fa-pencil-square-o', 'aria-hidden': 'true' })
                                                        )
                                                    )
                                                );
                                            })
                                        )
                                    ),
                                    m(
                                        'nav',
                                        null,
                                        this.canprev || this.cannext ? m(
                                            'ul',
                                            { 'class': 'pager' },
                                            this.canprev ? m(
                                                'li',
                                                null,
                                                m(
                                                    'a',
                                                    { onclick: function () {
                                                            _this4.loadPrev();
                                                        } },
                                                    '上一页'
                                                )
                                            ) : m(
                                                'li',
                                                { className: 'disabled' },
                                                m(
                                                    'a',
                                                    null,
                                                    '上一页'
                                                )
                                            ),
                                            this.cannext ? m(
                                                'li',
                                                null,
                                                m(
                                                    'a',
                                                    { onclick: function () {
                                                            _this4.loadNext();
                                                        } },
                                                    '下一页'
                                                )
                                            ) : m(
                                                'li',
                                                { className: 'disabled' },
                                                m(
                                                    'a',
                                                    null,
                                                    '下一页'
                                                )
                                            )
                                        ) : ''
                                    )
                                )
                            )
                        );
                    }
                }, {
                    key: 'ActiveUser',
                    value: function ActiveUser(listuser) {
                        var data = {
                            isActivated: !listuser.isActivated()
                        };
                        console.log(listuser.isActivated());
                        this.loading = true;
                        app.request({
                            url: app.forum.attribute('apiUrl') + '/user/' + listuser.id(),
                            method: 'PATCH',
                            data: data
                        }).then(function () {
                            window.location.reload();
                        });
                    }
                }, {
                    key: 'items',
                    value: function items() {
                        var items = new ItemList();

                        items.add('search', this.search.render());

                        return items;
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized) {
                        var _this5 = this;

                        if (isInitialized) return;
                        this.search.$('.Search-input input').on('keydown', function (e) {
                            switch (e.which) {
                                case 40:case 38:
                                    // Down/Up
                                    _this5.search.setIndex(_this5.search.getCurrentNumericIndex() + (e.which === 40 ? 1 : -1), true);
                                    e.preventDefault();
                                    break;
                                case 13:
                                    // Return
                                    e.preventDefault();
                                    if (_this5.search.value()) {
                                        _this5.page = 1;
                                        _this5.query = _this5.search.value();
                                        _this5.refresh();
                                    } else {
                                        _this5.search.clear();
                                    }
                                    _this5.search.$('input').blur();
                                    break;
                                case 27:
                                    // Escape
                                    _this5.search.clear();
                                    break;
                                default:
                                // no default
                            }
                        });
                    }
                }]);
                return UsersPage;
            })(Page);

            _export('default', UsersPage);
        }
    };
});;
System.register('pingxx-account/main', ['flarum/extend', 'flarum/app', 'flarum/Model', 'pingxx-account/addUsersPane', 'pingxx-account/addTopsPane', 'pingxx-account/addTagTop', 'flarum/tags/models/Tag'], function (_export) {
    'use strict';

    var extend, app, Model, addUsersPane, addTopsPane, addTagTop, Tag;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumModel) {
            Model = _flarumModel['default'];
        }, function (_pingxxAccountAddUsersPane) {
            addUsersPane = _pingxxAccountAddUsersPane['default'];
        }, function (_pingxxAccountAddTopsPane) {
            addTopsPane = _pingxxAccountAddTopsPane['default'];
        }, function (_pingxxAccountAddTagTop) {
            addTagTop = _pingxxAccountAddTagTop['default'];
        }, function (_flarumTagsModelsTag) {
            Tag = _flarumTagsModelsTag['default'];
        }],
        execute: function () {

            app.initializers.add('pingxx-account', function () {
                app.store.models.users.prototype.create_from = Model.attribute('create_from');
                app.store.models.users.prototype.suspend_until = Model.attribute('suspendUntil');
                app.store.models.users.prototype.ask_count = Model.attribute('ask_count');
                app.store.models.users.prototype.answer_count = Model.attribute('answer_count');
                app.store.models.users.prototype.praise_count = Model.attribute('praise_count');
                app.store.models.users.prototype.agree_count = Model.attribute('agree_count');

                app.store.models.tags = Tag;

                addUsersPane();
                addTopsPane();
                addTagTop();
            });
        }
    };
});