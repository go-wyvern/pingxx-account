<?php
/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Pingxx\Account\Listener;

use Flarum\Event\ConfigureApiRoutes;
use Pingxx\Account\Api\Controller;
use Illuminate\Contracts\Events\Dispatcher;

class PingxxUser
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'addPingxxUserRoutes']);
    }

    public function addPingxxUserRoutes(ConfigureApiRoutes $event)
    {
        $event->post('/user', 'create.user', Controller\PingxxCreateUserController::class);
        $event->patch('/user/{id}', 'active.user', Controller\PingxxActiveUserController::class);
    }
}