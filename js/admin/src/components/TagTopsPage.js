/**
 * Created by wyvern on 16/7/17.
 */
import Page from 'flarum/components/Page';

export default class TagTopsPage extends Page {
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
                        <div>
                            <table className="UserGrid UserGridWidth">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>标签名称</th>
                                    <th>文章总量</th>
                                    <th>问题总量</th>
                                </tr>
                                </thead>
                                <tbody>
                                {app.store.all('tags')
                                    .sort((a, b) => b.discussionsCount()-a.discussionsCount())
                                    .map(tag => {
                                        this.topIndex = this.topIndex + 1;
                                        return (
                                            <tr>
                                                <td className="ranking">{this.topIndex}</td>
                                                <td>{tag.name()}</td>
                                                <td>{tag.discussionsCount()}</td>
                                                <td>{tag.questions_count()}</td>
                                            </tr>
                                        )}
                                    )
                                }
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
            }
            dashboard.refresh();
        })

    }
}