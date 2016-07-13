import Modal from 'flarum/components/Modal';
import LogInModal from 'flarum/components/LogInModal';
import avatar from 'flarum/helpers/avatar';
import Button from 'flarum/components/Button';
import LogInButtons from 'flarum/components/LogInButtons';
import extractText from 'flarum/utils/extractText';

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
export default class EditUserModal extends Modal {
    init() {
        super.init();

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

    className() {
        return 'Modal--small EditUserModal';
    }

    title() {
        return app.translator.trans('pingxx-account.admin.users.title');
    }

    content() {
        return [
            <div className="Modal-body">
            {this.body()}
            </div>
        ];
    }

    body() {
        return [
    <div className="Form Form--centered">
            <div className="Form-group">
                <input className="FormControl" name="username" type="text" placeholder={extractText(app.translator.trans('pingxx-account.admin.users.username_placeholder'))}
                    value={this.username()}
                    onchange={m.withAttr('value', this.username)}
                disabled={this.loading} />
            </div>

            <div className="Form-group">
                <input className="FormControl" name="email" type="email" placeholder={extractText(app.translator.trans('pingxx-account.admin.users.email_placeholder'))}
                    value={this.email()}
                    onchange={m.withAttr('value', this.email)}
                    disabled={this.loading} />
            </div>


            <div className="Form-group">
                <input className="FormControl" name="password" type="password" placeholder={extractText(app.translator.trans('pingxx-account.admin.users.password_placeholder'))}
                    value={this.password()}
                    onchange={m.withAttr('value', this.password)}
                    disabled={this.loading} />
            </div>
    
            <div className="Form-group">
                <Button
                    className="Button Button--primary Button--block"
                    type="submit"
                    loading={this.loading}>
                    {app.translator.trans('pingxx-account.admin.users.submit_button')}
                </Button>
            </div>
        </div>
    ];
    }

    onready() {
        if (this.props.username && !this.props.email) {
            this.$('[name=email]').select();
        } else {
            this.$('[name=username]').select();
        }
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        const data = this.submitData();

        app.request({
            url: app.forum.attribute('baseUrl') + '/api/user',
            method: 'POST',
            data,
            errorHandler: this.onerror.bind(this)
        }).then(
            () => window.location.reload(),
            this.loaded.bind(this)
        );
    }

    /**
     * Get the data that should be submitted in the sign-up request.
     *
     * @return {Object}
     * @public
     */
    submitData() {
        const data = {
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
}
