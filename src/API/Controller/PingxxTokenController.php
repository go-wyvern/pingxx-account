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

use Flarum\Http\AccessToken;
use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\JsonResponse;
use Pingxx\Account\Utils;

class PingxxTokenController implements ControllerInterface
{
    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $body = $request->getParsedBody();

        $identification = array_get($body, 'identification');
        $password = array_get($body, 'password');
        $lifetime = array_get($body, 'lifetime', 3600);

        $data = array(
            'emails' => $identification,
            'password' => $password
        );

        $pingxx_request = new Utils\Request();
        $pingxx_request->post('https://dashboard.pingxx.com/auto/user/login', $data);

        echo $pingxx_request;

        $token = AccessToken::generate(1, $lifetime);
        $token->save();

        return new JsonResponse([
            'token' => $token->id,
            'userId' => 1,
            "message" => "test"
        ]);
    }
}
