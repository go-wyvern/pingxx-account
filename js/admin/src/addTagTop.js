/**
 * Created by wyvern on 16/7/17.
 */
import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import TagTopsPage from 'pingxx-account/components/TagTopsPage';

export default function() {
    app.routes.tag_tops = {path: '/tag_tops', component: TagTopsPage.component()};

    app.extensionSettings['pingxx-account'] = () => m.route(app.route('tag_tops'));

    extend(AdminNav.prototype, 'items', items => {
        items.add('tag_tops', AdminLinkButton.component({
            href: app.route('tag_tops'),
            icon: 'sort-numeric-asc',
            children: app.translator.trans('pingxx-account.admin.nav.tag-tops_button'),
            description: app.translator.trans('pingxx-account.admin.nav.tag-tops_text')
        }));
    });
}