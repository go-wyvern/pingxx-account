<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/17
 * Time: 下午3:43
 */
namespace Pingxx\Account\Listener;

use Pingxx\Account\Api\Controller;
use Illuminate\Contracts\Events\Dispatcher;

use Flarum\Core\Discussion;
use Flarum\Core\Post;
use Flarum\Core\User;
use Flarum\Event\DiscussionWasDeleted;
use Flarum\Event\DiscussionWasStarted;
use Flarum\Event\PostWasDeleted;
use Flarum\Event\PostWasHidden;
use Flarum\Event\PostWasPosted;
use Flarum\Event\PostWasRestored;
use Flarum\Likes\Event\PostWasLiked;
use Flarum\Likes\Event\PostWasUnliked;
use Flarum\Tags\best\Event\PostWasBest;
use Flarum\Tags\best\Event\PostWasUnbest;


class Statistics
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasPosted::class, [$this, 'whenPostWasPosted']);
        $events->listen(PostWasDeleted::class, [$this, 'whenPostWasDeleted']);
        $events->listen(PostWasHidden::class, [$this, 'whenPostWasHidden']);
        $events->listen(PostWasRestored::class, [$this, 'whenPostWasRestored']);
        $events->listen(DiscussionWasStarted::class, [$this, 'whenDiscussionWasStarted']);
        $events->listen(DiscussionWasDeleted::class, [$this, 'whenDiscussionWasDeleted']);
        $events->listen(PostWasLiked::class, [$this, 'whenPostWasLiked']);
        $events->listen(PostWasUnLiked::class, [$this, 'whenPostWasUnLiked']);
        $events->listen(PostWasBest::class, [$this, 'whenPostWasBest']);
        $events->listen(PostWasUnbest::class, [$this, 'whenPostWasUnbest']);
    }
    //采纳答案
    public function whenPostWasBest(PostWasBest $event)
    {
            $this->updateAgreeCount($event->user, 1);
    }
    //取消采纳答案
    public function whenPostWasUnbest(PostWasUnbest $event)
    {
        $this->updateAgreeCount($event->user, -1);
    }
    //赞
    public function whenPostWasLiked(PostWasLiked $event)
    {
        if ($event->post->is_start) {
            $this->updateSameQuestionCount($event->user, 1);
        } else {
            $this->updatePraiseCount($event->user, 1);
        }
    }
    //取消赞
    public function whenPostWasUnLiked(PostWasUnLiked $event)
    {
        if ($event->post->is_start) {
            $this->updateSameQuestionCount($event->user, -1);
        } else {
            $this->updatePraiseCount($event->user, -1);
        }
    }

    /**
     * @param PostWasPosted $event
     */
    public function whenPostWasPosted(PostWasPosted $event)
    {
        if ($event->post->is_start) {
//            if ($event->post->discussion->is_article) {
//                $this->updateDiscussionsCount($event->post->user, 1);
//            } else {
//                $this->updateAskCount($event->post->user, 1);
//            }
        } else {
            if ($event->post->discussion->is_article) {
                $this->updateCommentsCount($event->post->user, 1);
            } else {
                $this->updateAnswerCount($event->post->user, 1);
            }
        }
    }

    /**
     * @param \Flarum\Event\PostWasDeleted $event
     */
    public function whenPostWasDeleted(PostWasDeleted $event)
    {
        if ($event->post->is_start) {
//            if ($event->post->discussion->is_article) {
//                $this->updateDiscussionsCount($event->post->user, -1);
//            } else {
//                $this->updateAskCount($event->post->user, -1);
//            }
        } else {
            if ($event->post->discussion->is_article) {
                $this->updateCommentsCount($event->post->user, -1);
            } else {
                $this->updateAnswerCount($event->post->user, -1);
            }
        }
    }

    /**
     * @param PostWasHidden $event
     */
    public function whenPostWasHidden(PostWasHidden $event)
    {
        if ($event->post->is_start) {
//            if ($event->post->discussion->is_article) {
//                $this->updateDiscussionsCount($event->post->user, -1);
//            } else {
//                $this->updateAskCount($event->post->user, -1);
//            }
        } else {
            if ($event->post->discussion->is_article) {
                $this->updateCommentsCount($event->post->user, -1);
            } else {
                $this->updateAnswerCount($event->post->user, -1);
            }
        }
    }

    /**
     * @param \Flarum\Event\PostWasRestored $event
     */
    public function whenPostWasRestored(PostWasRestored $event)
    {
        if ($event->post->is_start) {
//            if ($event->post->discussion->is_article) {
//                $this->updateDiscussionsCount($event->post->user, 1);
//            } else {
//                $this->updateAskCount($event->post->user, 1);
//            }
        } else {
            if ($event->post->discussion->is_article) {
                $this->updateCommentsCount($event->post->user, 1);
            } else {
                $this->updateAnswerCount($event->post->user, 1);
            }
        }
    }

    public function whenDiscussionWasStarted(DiscussionWasStarted $event)
    {
        if ($event->discussion->is_article) {
            $this->updateDiscussionsCount($event->discussion->startUser, 1);
        } else {
            $this->updateAskCount($event->discussion->startUser, 1);
        }
    }


    /**
     * @param \Flarum\Event\DiscussionWasDeleted $event
     */
    public function whenDiscussionWasDeleted(DiscussionWasDeleted $event)
    {
        if ($event->discussion->is_article) {
            $this->updateDiscussionsCount($event->discussion->startUser, -1);
        } else {
            $this->updateAskCount($event->discussion->startUser, -1);
        }
    }

    /**
     * @param Post $post
     * @param int $amount
     */
    protected function updateAnswerCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->answer_count += $amount;
            $user->save();
        }
    }

    protected function updateAskCount(User $user, $amount)
    {

        if ($user && $user->exists) {
            $user->ask_count += $amount;
            $user->save();
        }
    }

    protected function updatePraiseCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->praise_count += $amount;
            $user->save();
        }
    }

    protected function updateSameQuestionCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->same_question_count += $amount;
            $user->save();
        }
    }

    protected function updateAgreeCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->agree_count += $amount;
            $user->save();
        }
    }

    protected function updateCommentsCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->comments_count += $amount;
            $user->save();
        }
    }

    protected function updateDiscussionsCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->discussions_count += $amount;
            $user->save();
        }
    }
}