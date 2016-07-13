/**
 * Created by wyvern on 16/7/1.
 */
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';

import UsersPage from 'pingxx-account/components/UsersPage';

export default function() {
    app.routes.users = {path: '/users', component: UsersPage.component()};

    app.extensionSettings['pingxx-account'] = () => m.route(app.route('users'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('users', AdminLinkButton.component({
            href: app.route('users'),
            icon: 'users',
            children: app.translator.trans('pingxx-account.admin.nav.users_button'),
            description: app.translator.trans('pingxx-account.admin.nav.users_text')
        }));
    });
}