'use strict';

System.register('pingxx-account/addUsersPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'pingxx-account/components/UsersPage'], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, UsersPage;

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

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_pingxxAccountComponentsUsersPage) {
            UsersPage = _pingxxAccountComponentsUsersPage.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('pingxx-account/components/CreateUserModal', ['flarum/components/Modal', 'flarum/components/LogInModal', 'flarum/helpers/avatar', 'flarum/components/Button', 'flarum/components/LogInButtons', 'flarum/utils/extractText'], function (_export, _context) {
    "use strict";

    var Modal, LogInModal, avatar, Button, LogInButtons, extractText, EditUserModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsLogInModal) {
            LogInModal = _flarumComponentsLogInModal.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsLogInButtons) {
            LogInButtons = _flarumComponentsLogInButtons.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }],
        execute: function () {
            EditUserModal = function (_Modal) {
                babelHelpers.inherits(EditUserModal, _Modal);

                function EditUserModal() {
                    babelHelpers.classCallCheck(this, EditUserModal);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EditUserModal).apply(this, arguments));
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
            }(Modal);

            _export('default', EditUserModal);
        }
    };
});;
'use strict';

System.register('pingxx-account/components/EditUserModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/components/Badge', 'flarum/models/User'], function (_export, _context) {
    "use strict";

    var Modal, Button, Badge, User, EditUserModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumComponentsBadge) {
            Badge = _flarumComponentsBadge.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }],
        execute: function () {
            EditUserModal = function (_Modal) {
                babelHelpers.inherits(EditUserModal, _Modal);

                function EditUserModal() {
                    babelHelpers.classCallCheck(this, EditUserModal);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EditUserModal).apply(this, arguments));
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
                        var _this2 = this;

                        e.preventDefault();

                        this.loading = true;
                        var data = {
                            suspendUntil: this.suspend_until()
                        };
                        if (this.password() != "") {
                            data.password = this.password();
                        }

                        this.user.save(data, { errorHandler: this.onerror.bind(this) }).then(this.hide.bind(this)).catch(function () {
                            _this2.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'deleteUser',
                    value: function deleteUser() {
                        var _this3 = this;

                        if (confirm(app.translator.trans('pingxx-account.admin.edit_user.delete_confirmation'))) {
                            this.user.delete().then(function () {
                                m.redraw();
                                _this3.hide();
                                window.location.reload();
                            });
                        }
                    }
                }]);
                return EditUserModal;
            }(Modal);

            _export('default', EditUserModal);
        }
    };
});;
'use strict';

System.register('pingxx-account/components/UserSearch', ['flarum/Component', 'flarum/components/LoadingIndicator', 'flarum/utils/ItemList', 'flarum/utils/classList', 'flarum/utils/extractText', 'flarum/helpers/icon', 'pingxx-account/components/UserSearchSource'], function (_export, _context) {
    "use strict";

    var Component, LoadingIndicator, ItemList, classList, extractText, icon, UsersSearchSource, UserSearch;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }, function (_flarumUtilsClassList) {
            classList = _flarumUtilsClassList.default;
        }, function (_flarumUtilsExtractText) {
            extractText = _flarumUtilsExtractText.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_pingxxAccountComponentsUserSearchSource) {
            UsersSearchSource = _pingxxAccountComponentsUserSearchSource.default;
        }],
        execute: function () {
            UserSearch = function (_Component) {
                babelHelpers.inherits(UserSearch, _Component);

                function UserSearch() {
                    babelHelpers.classCallCheck(this, UserSearch);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(UserSearch).apply(this, arguments));
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
                        var _this2 = this;

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
                                    onfocus: function onfocus() {
                                        return _this2.hasFocus = true;
                                    },
                                    onblur: function onblur() {
                                        return _this2.hasFocus = false;
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
                                    return source.view(_this2.value());
                                }) : ''
                            )
                        );
                    }
                }, {
                    key: 'config',
                    value: function config(isInitialized) {
                        var _this3 = this;

                        // Highlight the item that is currently selected.
                        this.setIndex(this.getCurrentNumericIndex());

                        if (isInitialized) return;

                        var search = this;

                        this.$('.Search-results').on('mousedown', function (e) {
                            return e.preventDefault();
                        }).on('click', function () {
                            return _this3.$('input').blur();
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
                }, {
                    key: 'getCurrentSearch',
                    value: function getCurrentSearch() {
                        return app.current && typeof app.current.searching === 'function' && app.current.searching();
                    }
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
                }, {
                    key: 'sourceItems',
                    value: function sourceItems() {
                        var items = new ItemList();

                        items.add('users', new UsersSearchSource());

                        return items;
                    }
                }, {
                    key: 'selectableItems',
                    value: function selectableItems() {
                        return this.$('.Search-results > li:not(.Dropdown-header)');
                    }
                }, {
                    key: 'getCurrentNumericIndex',
                    value: function getCurrentNumericIndex() {
                        return this.selectableItems().index(this.getItem(this.index));
                    }
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

                            var scrollTop = void 0;
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
            }(Component);

            _export('default', UserSearch);
        }
    };
});;
'use strict';

System.register('pingxx-account/components/UserSearchSource', ['flarum/helpers/highlight', 'flarum/helpers/avatar', 'flarum/helpers/username', 'pingxx-account/components/EditUserModal'], function (_export, _context) {
    "use strict";

    var highlight, avatar, username, EditUserModal, UsersSearchResults;
    return {
        setters: [function (_flarumHelpersHighlight) {
            highlight = _flarumHelpersHighlight.default;
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar.default;
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername.default;
        }, function (_pingxxAccountComponentsEditUserModal) {
            EditUserModal = _pingxxAccountComponentsEditUserModal.default;
        }],
        execute: function () {
            UsersSearchResults = function () {
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
                                    { onclick: function onclick() {
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
            }();

            _export('default', UsersSearchResults);
        }
    };
});;
'use strict';

System.register('pingxx-account/components/UsersPage', ['flarum/components/Page', 'flarum/components/Button', 'pingxx-account/components/CreateUserModal', 'pingxx-account/components/EditUserModal', 'pingxx-account/components/UserSearch', 'flarum/utils/humanTime', 'flarum/helpers/icon', 'flarum/helpers/listItems', 'flarum/utils/ItemList'], function (_export, _context) {
    "use strict";

    var Page, Button, CreateUserModal, EditUserModal, UserSearch, humanTime, icon, listItems, ItemList, UsersPage;
    return {
        setters: [function (_flarumComponentsPage) {
            Page = _flarumComponentsPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_pingxxAccountComponentsCreateUserModal) {
            CreateUserModal = _pingxxAccountComponentsCreateUserModal.default;
        }, function (_pingxxAccountComponentsEditUserModal) {
            EditUserModal = _pingxxAccountComponentsEditUserModal.default;
        }, function (_pingxxAccountComponentsUserSearch) {
            UserSearch = _pingxxAccountComponentsUserSearch.default;
        }, function (_flarumUtilsHumanTime) {
            humanTime = _flarumUtilsHumanTime.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems.default;
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList.default;
        }],
        execute: function () {
            UsersPage = function (_Page) {
                babelHelpers.inherits(UsersPage, _Page);

                function UsersPage() {
                    babelHelpers.classCallCheck(this, UsersPage);
                    return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(UsersPage).apply(this, arguments));
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
                        var _this2 = this;

                        return this.loadResults().then(function (results) {
                            _this2.listusers = [];
                            _this2.parseUsers(results);
                        }, function () {
                            _this2.loading = false;
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
                        var _this3 = this;

                        this.loading = true;
                        this.page = this.page + 1;
                        this.loadResults().then(function (results) {
                            _this3.listusers = [];
                            _this3.parseUsers(results);
                        }, function () {
                            _this3.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'loadPrev',
                    value: function loadPrev() {
                        var _this4 = this;

                        this.loading = true;
                        this.page = this.page - 1;
                        this.loadResults().then(function (results) {
                            _this4.listusers = [];
                            _this4.parseUsers(results);
                        }, function () {
                            _this4.loading = false;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        var _this5 = this;

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
                                        { className: 'UserGrid' },
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
                                                        { id: 'activeted', onclick: _this5.ActiveUser.bind(_this5, user) },
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
                                                            { type: 'button', onclick: function onclick() {
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
                                                    { onclick: function onclick() {
                                                            _this5.loadPrev();
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
                                                    { onclick: function onclick() {
                                                            _this5.loadNext();
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
                        var _this6 = this;

                        if (isInitialized) return;
                        this.search.$('.Search-input input').on('keydown', function (e) {
                            switch (e.which) {
                                case 40:case 38:
                                    // Down/Up
                                    _this6.search.setIndex(_this6.search.getCurrentNumericIndex() + (e.which === 40 ? 1 : -1), true);
                                    e.preventDefault();
                                    break;
                                case 13:
                                    // Return
                                    e.preventDefault();
                                    console.log("===");
                                    if (_this6.search.value()) {
                                        _this6.page = 1;
                                        _this6.query = _this6.search.value();
                                        _this6.refresh();
                                    } else {
                                        _this6.search.clear();
                                    }
                                    _this6.search.$('input').blur();
                                    break;
                                case 27:
                                    // Escape
                                    _this6.search.clear();
                                    break;
                                default:
                                // no default
                            }
                        });
                    }
                }]);
                return UsersPage;
            }(Page);

            _export('default', UsersPage);
        }
    };
});;
'use strict';

System.register('pingxx-account/main', ['flarum/extend', 'flarum/app', 'flarum/Model', 'pingxx-account/addUsersPane'], function (_export, _context) {
    "use strict";

    var extend, app, Model, addUsersPane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_pingxxAccountAddUsersPane) {
            addUsersPane = _pingxxAccountAddUsersPane.default;
        }],
        execute: function () {

            app.initializers.add('pingxx-account', function () {
                app.store.models.users.prototype.create_from = Model.attribute('create_from');
                app.store.models.users.prototype.suspend_until = Model.attribute('suspendUntil');

                addUsersPane();
            });
        }
    };
});