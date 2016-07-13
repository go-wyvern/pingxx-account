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
use Flarum\Core\User;
use Flarum\Core\Exception\PermissionDeniedException;
use Dflydev\FigCookies\FigResponseCookies;
use Dflydev\FigCookies\SetCookie;

class PingxxCreateUserHandler implements ControllerInterface
{
    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $body = $request->getParsedBody();

        $email = array_get($body, 'email');
        $username = array_get($body, 'username');
        $password = array_get($body, 'password');


        $user = User::register($username, $email, $password);
        $user->activate();
        if (isset($token)) {
            foreach ($token->payload as $k => $v) {
                $user->$k = $v;
            }
        }
        $user->create_from = '来自社区账号系统';
        $user->save();

        return new JsonResponse([
            'userId' => $user->id
        ]);
    }
}

