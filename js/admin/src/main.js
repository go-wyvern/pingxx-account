import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import addUsersPane from 'pingxx-account/addUsersPane';

import addTopsPane from 'pingxx-account/addTopsPane';
import addTagTop from 'pingxx-account/addTagTop';
import Tag from 'flarum/tags/models/Tag';


app.initializers.add('pingxx-account', () => {
    app.store.models.users.prototype.create_from = Model.attribute('create_from');
    app.store.models.users.prototype.suspend_until = Model.attribute('suspendUntil');
    app.store.models.users.prototype.ask_count = Model.attribute('ask_count');
    app.store.models.users.prototype.answer_count = Model.attribute('answer_count');
    app.store.models.users.prototype.praise_count = Model.attribute('praise_count');
    app.store.models.users.prototype.agree_count = Model.attribute('agree_count');

    app.store.models.discussions.prototype.agree_count = Model.attribute('is_article');

    app.store.models.tags = Tag;

    addUsersPane();
    addTopsPane();
    addTagTop();

});
