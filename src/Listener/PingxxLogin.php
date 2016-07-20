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

class PingxxLogin
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'addPingxxLoginRoutes']);
    }

    public function addPingxxLoginRoutes(ConfigureApiRoutes $event)
    {
        $event->post('/pingxx/token', 'pingxx.token', Controller\PingxxTokenController::class);
        $event->post('/pingxx/login', 'pingxx.login', Controller\PingxxLoginController::class);
    }
}