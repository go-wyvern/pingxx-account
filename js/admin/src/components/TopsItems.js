/**
 * Created by wyvern on 16/7/23.
 */
/**
 * Created by wyvern on 16/7/23.
 */
import Component from 'flarum/Component';
import Page from 'flarum/components/Page';

export default class TopsItems extends Page {
    init() {
        super.init();
        this.top = this.props.top;
        this.sort = this.props.top.sortName;
        console.log(this.props.top.sortName);
        this.is_pingxx = this.props.top.is_pingxx;
        this.users = [];
        this.topIndex = 0;
        console.log(this.props.top);

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
            filter: {is_pingxx: this.top.is_pingxx},
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
        return (
            <div className="top">
                <div className="top-header">
                    {this.top.topName}
                <span className="ignore-pingxx">
                    <label><input name="is_pingxx" item_id={this.top.id} type="checkbox" value=""/>  忽略Ping++用户 </label>
                </span>
                </div>
                <div className="top-body">
                    <table className="UserGrid UserGridWidth">
                        <tbody>
                        {this.users.map((user, index) => {
                            return (
                                <tr>
                                    <td className="ranking">{index + 1}</td>
                                    <td>
                                        {user.username()}
                                    </td>
                                    <td>{user.email()}</td>

                                    <td>
                                        {
                                            this.sort == 'discussActive' ? user.discussionsCount() :
                                                this.sort == 'commentsActive' ? user.commentsCount() :
                                                    this.sort == 'askActive' ? user.ask_count() :
                                                        this.sort == 'answerActive' ? user.answer_count() :
                                                            this.sort == 'praise_count' ? user.praise_count() :
                                                                this.sort == 'agree_count' ? user.agree_count() :
                                                                    this.sort == 'same_question_count' ? user.same_question_count() : ''
                                        }

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    config(isInitialized) {
        if (isInitialized) return;
        var mytop =this;
        $(".top .ignore-pingxx input").change(function (e) {
            if ($(this).prop('checked')) {
                if(mytop.top.id==$(this).attr('item_id')){
                    mytop.top.is_pingxx=true;
                    console.log(mytop.sort);
                    console.log(mytop.top);
                    mytop.refresh();
                }
            } else {
                if(mytop.top.id==$(this).attr('item_id')){
                    mytop.top.is_pingxx=false
                    console.log(mytop.top);
                    mytop.refresh();
                }
            }
        })
    }
}