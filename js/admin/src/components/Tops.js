/**
 * Created by wyvern on 16/7/23.
 */
import Page from 'flarum/components/Page';
import TopsItems from 'pingxx-account/components/TopsItems';

export default class Tops extends Page {
    init() {
        super.init();

        this.topobj = [
            {
                id: 1,
                topName: "问题提问总量排行",
                sortName: 'askActive',
                is_pingxx: false
            },
            {
                id: 2,
                topName: "问题回答总量排行",
                sortName: 'answerActive',
                is_pingxx: false
            },
            {
                id: 3,
                topName: "文章发表总量排行",
                sortName: 'discussActive',
                is_pingxx: false
            },
            {
                id: 4,
                topName: "文章评论总量排行",
                sortName: 'commentsActive',
                is_pingxx: false
            },
            {
                id: 5,
                topName: "被点赞总量排行",
                sortName: 'praise_count',
                is_pingxx: false
            },
            {
                id: 6,
                topName: "我也有这个问题",
                sortName: 'same_question_count',
                is_pingxx: false
            },
            {
                id: 7,
                topName: "被选为最佳答案总量排行",
                sortName: 'agree_count',
                is_pingxx: false
            }
        ];
    }

    view() {
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
                        {this.topobj.map(top=> {
                            return (
                                <div>
                                    {TopsItems.component({top})}
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        );

    }

    config(isInitialized) {
        if (isInitialized) return;

        var tops = this;

        // this.$(".top .ignore-pingxx input").change(function (e) {
        //     if ($(this).prop('checked')) {
        //         tops.topobj[$(this).attr("item_id") - 1].is_pingxx =  true;
        //         console.log(tops.topobj[$(this).attr("item_id") - 1].is_pingxx);
        //         m.lazyRedraw();
        //     } else {
        //         tops.topobj[$(this).attr("item_id") - 1].is_pingxx =  false;
        //     }
        // })
    }
}