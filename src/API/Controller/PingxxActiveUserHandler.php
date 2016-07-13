<?php
/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Pingxx\Account\Api\Controller;

use Flarum\Core\Command\EditUser;
use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Contracts\Bus\Dispatcher;

class PingxxActiveUserHandler implements ControllerInterface
{
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }
    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $id = array_get($request->getQueryParams(), 'id');
        echo $id;
        $actor = $request->getAttribute('actor');
        $data = array_get($request->getParsedBody(), 'data', []);

        return $this->bus->dispatch(
            new EditUser($id, $actor, $data)
        );

    }
}

