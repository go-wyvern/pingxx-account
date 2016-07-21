/**
 * Created by wyvern on 16/7/17.
 */
import Page from 'flarum/components/Page';

export default class TopsPage extends Page {
    init() {
        super.init();
        this.loading = true;
        this.attr = "问题提问总量";
        this.sort = 'askActive';
        this.topIndex = 0;
        this.users = [];

        this.refresh();
    }

    refresh() {
        return this.loadResults().then(
            results => {
                this.users = [];
                this.topIndex = 0;
                this.parseTopUsers(results);
            },
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }

    loadResults() {
        return app.store.find('users', {
            sort: this.sortMap()[this.sort],
            page: {
                limit: 20
            }
        });
    }


    sortMap() {
        const map = {};
        map.commentsActive = '-commentsCount';
        map.discussActive = '-discussionsCount';
        map.askActive = '-askCount';
        map.answerActive = '-answerCount';
        map.praise_count = '-praise_count';
        map.agree_count = '-agree_count';
        map.same_question_count = '-same_question_count';
        map.newest = '-joinTime';
        map.oldest = 'joinTime';

        return map;
    }

    parseTopUsers(results) {
        [].push.apply(this.users, results);

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
                            {app.translator.trans('pingxx-account.admin.tops.tops_text')}
                        </p>
                    </div>
                </div>
                <div className="UserPage-users">
                    <div className="container">
                        <ul class="nav nav-tabs userData">
                            <li role="presentation" class="default"><a>问题提问总量</a></li>
                            <li role="presentation"><a>问题回答总量</a></li>
                            <li role="presentation"><a>文章发表总量</a></li>
                            <li role="presentation"><a>文章评论总量</a></li>
                            <li role="presentation"><a>被点赞总量</a></li>
                            <li role="presentation"><a>我也有这个问题</a></li>
                            <li role="presentation"><a>被选为最佳答案总量</a></li>
                        </ul>

                        <div>
                            <table className="UserGrid UserGridWidth">
                                <thead>
                                <tr>
                                    <td></td>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>{this.attr}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.users.map(user => {
                                    this.topIndex = this.topIndex + 1;
                                    return (
                                        <tr>
                                            <td className="ranking">{this.topIndex}</td>
                                            <td>
                                                {user.username()}
                                            </td>
                                            <td>{user.email()}</td>

                                            <td>
                                                {
                                                    this.attr=='文章发表总量' ? user.discussionsCount():
                                                        this.attr=='文章评论总量'? user.commentsCount():
                                                        this.attr=='问题提问总量'? user.ask_count():
                                                        this.attr=='问题回答总量'? user.answer_count():
                                                        this.attr=='被点赞总量' ? user.praise_count():
                                                        this.attr=='我也有这个问题' ? user.agree_count():
                                                        this.attr=='被选为最佳答案总量' ? user.same_question_count():''
                                                }

                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    config(isInitialized) {
        if (isInitialized) return;


        const dashboard = this;

        this.$(".userData .default").attr("class", "active");

        this.$(".userData li").click(function (e) {
            console.log("click");
            $(".userData li").attr("class", "");
            $(this).attr("class", "active");

            dashboard.attr = $(this).find("a").text();
            if(dashboard.attr=='问题提问总量'){
                dashboard.sort='askActive';
            }else if (dashboard.attr=='文章发表总量'){
                dashboard.sort='discussActive';
            }else if (dashboard.attr=='问题回答总量'){
                dashboard.sort='answerActive'
            }else if (dashboard.attr=='文章评论总量') {
                dashboard.sort='commentsActive';
            }else if (dashboard.attr=='被点赞总量') {
                dashboard.sort='praise_count';
            }else if (dashboard.attr=='我也有这个问题') {
                dashboard.sort='same_question_count';
            }else if (dashboard.attr=='被选为最佳答案总量') {
                dashboard.sort='agree_count';
            }
            dashboard.refresh();
        })

    }
}