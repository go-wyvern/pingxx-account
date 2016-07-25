/**
 * Created by wyvern on 16/7/23.
 */
import Page from 'flarum/components/Page';
import TopsItems from 'pingxx-account/components/TopsItems';

export default class PostTops extends Page {
    init() {
        super.init();

        this.topobj = [
            {
                id: 1,
                topName: "单个问题被赞同总量排行",
                sortName: 'askActive'
            },
            {
                id: 2,
                topName: "单个回答被点赞总量",
                sortName: 'answerActive'
            },
            {
                id: 3,
                topName: "单个文章被点赞总量",
                sortName: 'discussActive'
            },
            {
                id: 4,
                topName: "单个文章被评论总量",
                sortName: 'commentsActive'
            }
        ];
    }

    view() {
        return (
            <div className="Dashboard">
                <div className="Dashboard-options">
                    <div className="container">
                        <p>
                            {app.translator.trans('pingxx-account.admin.post_tops.tops_text')}
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