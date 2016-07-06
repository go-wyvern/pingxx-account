import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import Badge from 'flarum/components/Badge';
import User from 'flarum/models/User';

/**
 * The `EditGroupModal` component shows a modal dialog which allows the user
 * to create or edit a group.
 */
export default class EditUserModal extends Modal {
    init() {
        this.user = this.props.user || app.store.createRecord('users');

        this.username = m.prop(this.user.username() || '');
        this.email = m.prop(this.user.email() || '');
        this.password = m.prop(this.user.password() || '');
        this.suspend_until = m.prop(this.user.suspend_until() || '');
    }

    className() {
        return 'Modal--small EditUserModal';
    }

    title() {
        return [
            app.translator.trans('pingxx-account.admin.edit_user.title')
        ];
    }

    content() {
        return (
            <div className="Modal-body">
            <div className="Form">
            <div className="Form-group">
            <label>{app.translator.trans('pingxx-account.admin.edit_user.name_label')}</label>
            <div className="EditUserModal-name-input">
                <input className="FormControl" value={this.username()} disabled="disabled"/>
            </div>
        </div>

        <div className="Form-group">
            <label>{app.translator.trans('pingxx-account.admin.edit_user.email_label')}</label>
            <input className="FormControl" value={this.email()} disabled="disabled"/>
        </div>

            <div className="Form-group">
                <label>{app.translator.trans('pingxx-account.admin.edit_user.password_label')}</label>
                <input className="FormControl" value={this.password()}
                type="password" oninput={m.withAttr('value', this.password)}
                placeholder={app.translator.trans('pingxx-account.admin.edit_user.password_placeholder')}/>
            </div>
            <div className="Form-group">
                <label>{app.translator.trans('pingxx-account.admin.edit_user.suspend_until')}</label>
                <input className="FormControl" value={this.suspend_until()} oninput={m.withAttr('value', this.suspend_until)}
                placeholder={app.translator.trans('pingxx-account.admin.edit_user.suspend_until_placeholder')}/>
            </div>

        <div className="Form-group">
            {Button.component({
                type: 'submit',
                className: 'Button Button--primary EditUserModal-save',
                loading: this.loading,
                children: app.translator.trans('pingxx-account.admin.edit_user.submit_button')
            })}
        {this.user.exists  ? (
        <button type="button" className="Button EditUserModal-delete" onclick={this.deleteUser.bind(this)}>
            {app.translator.trans('pingxx-account.admin.edit_user.delete_button')}
        </button>
        ) : ''}
    </div>
        </div>
        </div>
    );
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;
        var data = {
            suspendUntil: this.suspend_until()
        };
        if (this.password()!="") {
            data.password=this.password()
        }

        this.user.save(data, {errorHandler: this.onerror.bind(this)})
            .then(this.hide.bind(this))
            .catch(() => {
                this.loading = false;
                m.redraw();
            });
    }

    deleteUser() {
        if (confirm(app.translator.trans('pingxx-account.admin.edit_user.delete_confirmation'))) {
            this.user.delete().then(() => {
                m.redraw();
                this.hide();
                window.location.reload();
            });

        }
    }
}
