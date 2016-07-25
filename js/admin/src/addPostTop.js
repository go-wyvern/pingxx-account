/**
 * Created by wyvern on 16/7/23.
 */
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import PostTops from 'pingxx-account/components/PostTops';

export default function() {
    app.routes.post_tops = {path: '/post_tops', component: PostTops.component()};

    app.extensionSettings['pingxx-account'] = () => m.route(app.route('post_tops'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('post_tops', AdminLinkButton.component({
            href: app.route('post_tops'),
            icon: 'list-ol',
            children: app.translator.trans('pingxx-account.admin.nav.post_tops_button'),
            description: app.translator.trans('pingxx-account.admin.nav.post_tops_text')
        }));
    });
}