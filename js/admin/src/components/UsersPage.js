/**
 * Created by wyvern on 16/7/1.
 */
import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import CreateUserModal from 'pingxx-account/components/CreateUserModal';
import EditUserModal from 'pingxx-account/components/EditUserModal';
import UserSearch from 'pingxx-account/components/UserSearch';
import humanTime from 'flarum/utils/humanTime';
import icon from 'flarum/helpers/icon';
import listItems from 'flarum/helpers/listItems';
import ItemList from 'flarum/utils/ItemList';

export default class UsersPage extends Page {
    init() {
        super.init();
        this.loading = true;

        this.page=1;
        this.limit=10;
        this.query="";

        this.canprev = false;
        this.cannext = false;
        this.search = new UserSearch();
        this.listusers = [];

        this.refresh();
    }

    refresh() {
        return this.loadResults().then(
            results => {
                this.listusers = [];
                this.parseUsers(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults() {
        return app.store.find('users',{
            filter: {q: this.query},
            page: {
                limit: this.limit,
                offset: this.limit*(this.page-1)
            }
        });
    }

    parseUsers(results) {
        [].push.apply(this.listusers, results);

        this.loading = false;

        this.canprev = !!results.payload.links.prev;
        this.cannext = !!results.payload.links.next;

        m.lazyRedraw();

        return results;
    }

    loadNext() {
        this.loading = true;
        this.page =this.page+1;
        this.loadResults().then(
            results => {
                this.listusers = [];
                this.parseUsers(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadPrev() {
        this.loading = true;
        this.page =this.page-1;
        this.loadResults().then(
            results => {
                this.listusers = [];
                this.parseUsers(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    view() {

        return (
            <div className="UsersPage">
                <div className="UserPage-options">
                    <div className="container">
                        <p>
                                {app.translator.trans('pingxx-account.admin.users.about_users_text')}
                        </p>
                        {Button.component({
                            className: 'Button',
                            icon: 'plus',
                            children: app.translator.trans('pingxx-account.admin.users.new_user_button'),
                            onclick: () => app.modal.show(new CreateUserModal())
                        })}
                        <ul className="Header-controls">
                                {listItems(this.items().toArray())}
                        </ul>
                    </div>
                </div>
                <div className="UserPage-users">
                    <div className="container">
                        <table className="UserGrid UserTableWidth">
                        <thead>
                        <th></th>
                        <th>用户名</th>
                        <th>邮箱</th>
                        <th>是否激活</th>
                        <th>加入时间</th>
                        <th>来自</th>
                        <th>编辑</th>
                        </thead>
                        <tbody>
                            {this.listusers.map(user => {
                                return (
                                    <tr>
                                    <td>
                                    <span className={(user.isOnline() ? 'online' : '')}>
                                {user.isOnline()
                                    ? [icon('circle'), ' ', '在线']
                                    : [icon('clock-o'), ' ', '不在线']}
                                </span>
                                    </td>
                                    <td>
                                    {user.username()}
                                    </td>
                                    <td>{user.email()}</td>
                                    <td id="activeted" onclick={this.ActiveUser.bind(this,user)}>{!user.isActivated() ?
                                    <a type="button"><i class="fa fa-toggle-off" aria-hidden="true"></i></a>:
                                <a type="button"><i class="fa fa-toggle-on" aria-hidden="true"></i></a>}</td>
                                    <td>{moment(user.joinTime()).format('MMMM YYYY')}</td>
                                    <td>{user.create_from()}</td>
                                    <td>
                                        <a type="button"  onclick={()=>app.modal.show(new EditUserModal({user}))}>
                                <i class="fa fa-pencil-square-o" aria-hidden="true" ></i>
                                        </a>
                                    </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        </table>

                    <nav>
                    {this.canprev || this.cannext ?
                        <ul class="pager">
                            {this.canprev ? <li><a onclick={()=>{this.loadPrev()}}>上一页</a></li>:
                        <li className="disabled"><a>上一页</a></li>}

                            {this.cannext ? <li><a onclick={()=>{this.loadNext()}}>下一页</a></li>:
                            <li className="disabled"><a>下一页</a></li>}
                        </ul>:''
                    }

                    </nav>
                    </div>
                </div>
            </div>
        );
    }

    ActiveUser(listuser) {
        const data = {
            isActivated: !listuser.isActivated()
        };
        console.log(listuser.isActivated());
        this.loading = true;
        app.request({
            url: app.forum.attribute('apiUrl') + '/user/'+ listuser.id(),
            method: 'PATCH',
            data: data
        }).then(() => {
            window.location.reload();
        });
    }

    items() {
        const items = new ItemList();


        items.add('search', this.search.render());

        return items;
    }

    config(isInitialized) {
        if (isInitialized) return;
        this.search.$('.Search-input input')
            .on('keydown', e => {
                switch (e.which) {
                    case 40: case 38: // Down/Up
                        this.search.setIndex(this.search.getCurrentNumericIndex() + (e.which === 40 ? 1 : -1), true);
                        e.preventDefault();
                        break;
                    case 13: // Return
                        e.preventDefault();
                        if (this.search.value()) {
                            this.page=1;
                            this.query=this.search.value();
                            this.refresh();
                        } else {
                            this.search.clear();
                        }
                        this.search.$('input').blur();
                        break;
                    case 27: // Escape
                        this.search.clear();
                        break;
                    default:
                    // no default
                }
            })
    }
}