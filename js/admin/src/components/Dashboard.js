/**
 * Created by wyvern on 16/7/1.
 */
import Page from 'flarum/components/Page';

export default class Dashboard extends Page {
    init() {
        super.init();
        this.loading = true;
        this.flarum = {};
        this.flarum.users = [];
        this.flarum.discussions = [];
        this.flarum.questions = [];
        this.flarum.totay_users = [];
        this.flarum.totay_discussions = [];
        this.flarum.totay_questions = [];

        this.flarum.totalUsers = 0;
        this.flarum.totaytotalUsers = 0;

        this.flarum.totalDiscussions = 0;
        this.flarum.totaytotalDiscussions = 0;

        this.flarum.totalQuestions = 0;
        this.flarum.totaytotalQuestions = 0;

        this.refreshUser();
        this.refreshDiscussion();
    }


    refreshUser() {
        return this.loadUsers().then(
            results => {
                this.flarum.users = [];
                this.parseUsers(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    refreshDiscussion() {
        return this.loadDiscussions().then(
            results => {
                this.flarum.discussions = [];
                this.parseDiscussions(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadUsers() {
        return app.store.find('users');
    }

    loadDiscussions() {
        return app.store.find('discussions');
    }

    parseUsers(results) {
        [].push.apply(this.flarum.users, results);
        this.flarum.totalUsers = results.length;
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var nowhour = new Date().getHours();
        results.map(user => {
            if ((new Date().getTime() - user.joinTime()) / (nowhour * minute * 60) < 1) {
                this.flarum.totay_users.push(user);
            }
        });
        this.flarum.totaytotalUsers = this.flarum.totay_users.length;
        this.loading = false;

        m.lazyRedraw();
        return results;
    }

    parseDiscussions(results) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 10;

        var nowhour = new Date().getHours();
        results.map(discussion => {
            console.log(discussion.is_article());
            if (discussion.is_article()) {
                this.flarum.discussions.push(discussion);
                if ((new Date().getTime() - discussion.startTime()) / (nowhour * minute * 60) < 1) {
                    this.flarum.totay_discussions.push(discussion);
                }
            } else {
                this.flarum.questions.push(discussion);
                if ((new Date().getTime() - discussion.startTime()) / (nowhour * minute * 60) < 1) {
                    this.flarum.totay_questions.push(discussion);
                }
            }
        });
        this.flarum.totalDiscussions = this.flarum.discussions.length;
        this.flarum.totaytotalDiscussions = this.flarum.totay_discussions.length;

        this.flarum.totalQuestions = this.flarum.questions.length;
        this.flarum.totaytotalQuestions = this.flarum.totay_questions.length;

        this.loading = false;

        m.lazyRedraw();
        return results;
    }

    view() {
        this.topIndex = 0;
        return (
            <div className="Dashboard">
                <div className="Dashboard-options">
                    <div className="container">
                        <p>
                            {app.translator.trans('pingxx-account.admin.dashboard.about_flarum')}
                        </p>
                    </div>
                </div>
                <div className="UserPage-users">
                    <div className="container">
                        <table className="PermissionGrid UserGridWidth">
                            <thead>
                            <tr>
                                <td></td>
                                <th>总体数据</th>
                                <th>今日数据</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="PermissionGrid-section">
                                <th>基础数据</th>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr className="PermissionGrid-child">
                                <th><i class="icon fa fa-fw fa-registered"></i>用户注册总量</th>
                                <td>{this.flarum.totalUsers}</td>
                                <td>{this.flarum.totaytotalUsers}</td>
                            </tr>
                            <tr className="PermissionGrid-child">
                                <th><i class="icon fa fa-fw fa-question-circle"></i>问题提问总量</th>
                                <td>{this.flarum.totalQuestions}</td>
                                <td>{this.flarum.totaytotalQuestions}</td>
                            </tr>
                            <tr className="PermissionGrid-child">
                                <th><i class="icon fa fa-fw fa-file-text-o"></i>文章发表总量</th>
                                <td>{this.flarum.totalDiscussions}</td>
                                <td>{this.flarum.totaytotalDiscussions}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );

    }

    config(isInitialized) {
        if (isInitialized) return;
    }
}