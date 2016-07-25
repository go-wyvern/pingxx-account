import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import addUsersPane from 'pingxx-account/addUsersPane';
import AdminNav from 'flarum/components/AdminNav';

import addTopsPane from 'pingxx-account/addTopsPane';
import addTagTop from 'pingxx-account/addTagTop';
import addPostTop from 'pingxx-account/addPostTop';
import Tag from 'flarum/tags/models/Tag';


app.initializers.add('pingxx-account', () => {
    app.store.models.users.prototype.create_from = Model.attribute('create_from');
    app.store.models.users.prototype.suspend_until = Model.attribute('suspendUntil');
    app.store.models.users.prototype.ask_count = Model.attribute('ask_count');
    app.store.models.users.prototype.answer_count = Model.attribute('answer_count');
    app.store.models.users.prototype.praise_count = Model.attribute('praise_count');
    app.store.models.users.prototype.agree_count = Model.attribute('agree_count');
    app.store.models.users.prototype.same_question_count = Model.attribute('same_question_count');

    app.store.models.posts.prototype.same_question_count = Model.attribute('same_question_count');

    app.store.models.discussions.prototype.is_article = Model.attribute('is_article');
    app.store.models.discussions.prototype.praise_count = Model.attribute('praise_count');

    app.store.models.tags = Tag;
    app.store.models.tags.prototype.is_article = Model.attribute('is_article');
    app.store.models.tags.prototype.questions_count = Model.attribute('questions_count');

    // extend(AdminNav.prototype, 'items', items => {
    //     items.remove('extensions');
    // });

    addUsersPane();
    addTopsPane();
    addTagTop();
    addPostTop();

});
