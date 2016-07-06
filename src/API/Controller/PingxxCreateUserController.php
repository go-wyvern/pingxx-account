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

use Flarum\Api\Client;
use Flarum\Core\Repository\UserRepository;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\EmptyResponse;
use Zend\Diactoros\Response\JsonResponse;

class PingxxCreateUserController implements ControllerInterface
{
    protected $apiClient;

    public function __construct(UserRepository $users, Client $apiClient, SessionAuthenticator $authenticator, Rememberer $rememberer)
    {
        $this->apiClient = $apiClient;
    }

    /**
     * @param Request $request
     * @return JsonResponse|EmptyResponse
     */
    public function handle(Request $request)
    {
        $actor = $request->getAttribute('actor');
        $params = array_only($request->getParsedBody(), ['email','username', 'password']);

        $response = $this->apiClient->send(PingxxCreateUserHandler::class, $actor, [], $params);

        return $response;
    }
}
