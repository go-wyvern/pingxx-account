/**
 * Created by wyvern on 16/7/17.
 */
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import TopsPage from 'pingxx-account/components/TopsPage';
import Tops from 'pingxx-account/components/Tops';
import Dashboard from 'pingxx-account/components/Dashboard';

export default function() {
    app.routes.dashboard = {path: '/', component: Dashboard.component()};
    app.routes.tops = {path: '/tops', component: Tops.component()};

    app.extensionSettings['pingxx-account'] = () => m.route(app.route('tops'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('tops', AdminLinkButton.component({
            href: app.route('tops'),
            icon: 'sort-amount-desc',
            children: app.translator.trans('pingxx-account.admin.nav.tops_button'),
            description: app.translator.trans('pingxx-account.admin.nav.tops_text')
        }));
    });
}