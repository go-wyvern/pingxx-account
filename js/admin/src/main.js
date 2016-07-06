import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Model from 'flarum/Model';
import addUsersPane from 'pingxx-account/addUsersPane';

app.initializers.add('pingxx-account', () => {
    app.store.models.users.prototype.create_from = Model.attribute('create_from');
    app.store.models.users.prototype.suspend_until = Model.attribute('suspendUntil');
    
    addUsersPane();
});
