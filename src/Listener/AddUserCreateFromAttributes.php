<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/4
 * Time: 下午2:34
 */

namespace Pingxx\Account\Listener;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Core\User;
use Flarum\Event\ConfigureModelDates;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserCreateFromAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function addAttributes(PrepareApiAttributes $event)
    {
        if ($event->serializer instanceof UserSerializer) {
            $event->attributes['create_from'] = $event->model->create_from;
        }
    }
}
