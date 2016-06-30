import { override } from 'flarum/extend';
import app from 'flarum/app';
import Session from 'flarum/Session';

app.initializers.add('pingxx-account', () => {
    override(Session.prototype, 'login', function(original,identification, password, options = {}){
        return app.request(Object.assign({
            method: 'POST',
            url: app.forum.attribute('baseUrl') + '/api/pingxx/login',
            data: {identification, password}
        }, options));
    });
});
