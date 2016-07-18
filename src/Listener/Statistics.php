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
    }

    public function whenPostWasLiked(PostWasLiked $event)
    {
        $this->updatePraiseCount($event->user, 1);
        $this->updateAgreeCount($event->user, 1);
    }

    public function whenPostWasUnLiked(PostWasLiked $event)
    {
        $this->updatePraiseCount($event->user, -1);
        $this->updateAgreeCount($event->user, -1);
    }

    /**
     * @param PostWasPosted $event
     */
    public function whenPostWasPosted(PostWasPosted $event)
    {
        $this->updateAnswerCount($event->post, 1);
    }

    /**
     * @param \Flarum\Event\PostWasDeleted $event
     */
    public function whenPostWasDeleted(PostWasDeleted $event)
    {
        $this->updateAnswerCount($event->post, -1);
    }

    /**
     * @param PostWasHidden $event
     */
    public function whenPostWasHidden(PostWasHidden $event)
    {
        $this->updateAnswerCount($event->post, -1);
    }

    /**
     * @param \Flarum\Event\PostWasRestored $event
     */
    public function whenPostWasRestored(PostWasRestored $event)
    {
        $this->updateAnswerCount($event->post, 1);
    }

    /**
     * @param \Flarum\Events\DiscussionWasStarted $event
     */
    public function whenDiscussionWasStarted(DiscussionWasStarted $event)
    {
        $this->updateAskCount($event->discussion, 1);
    }

    /**
     * @param \Flarum\Event\DiscussionWasDeleted $event
     */
    public function whenDiscussionWasDeleted(DiscussionWasDeleted $event)
    {
        $this->updateAskCount($event->discussion, -1);
    }

    /**
     * @param Post $post
     * @param int $amount
     */
    protected function updateAnswerCount(Post $post, $amount)
    {
        $user = $post->user;

        if ($user && $user->exists) {
            $user->ask_count += $amount;
            $user->save();
        }
    }

    /**
     * @param Discussion $discussion
     * @param int $amount
     */
    protected function updateAskCount(Discussion $discussion, $amount)
    {
        $user = $discussion->startUser;

        if ($user && $user->exists) {
            $user->answer_count += $amount;
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

    protected function updateAgreeCount(User $user, $amount)
    {
        if ($user && $user->exists) {
            $user->agree_count += $amount;
            $user->save();
        }
    }
}