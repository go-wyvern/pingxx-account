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
use Flarum\Api\Controller\TokenController;
use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Repository\UserRepository;
use Flarum\Event\UserLoggedIn;
use Flarum\Http\AccessToken;
use Flarum\Http\Controller\ControllerInterface;
use Flarum\Http\Rememberer;
use Flarum\Http\SessionAuthenticator;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\EmptyResponse;
use Zend\Diactoros\Response\JsonResponse;
use Dflydev\FigCookies\SetCookie;
use Dflydev\FigCookies\FigResponseCookies;

class PingxxLoginController implements ControllerInterface
{
    /**
     * @var \Flarum\Core\Repository\UserRepository
     */
    protected $users;

    /**
     * @var Client
     */
    protected $apiClient;

    /**
     * @var SessionAuthenticator
     */
    protected $authenticator;

    /**
     * @var Rememberer
     */
    protected $rememberer;

    /**
     * @param \Flarum\Core\Repository\UserRepository $users
     * @param Client $apiClient
     * @param SessionAuthenticator $authenticator
     * @param Rememberer $rememberer
     */
    public function __construct(UserRepository $users, Client $apiClient, SessionAuthenticator $authenticator, Rememberer $rememberer)
    {
        $this->users = $users;
        $this->apiClient = $apiClient;
        $this->authenticator = $authenticator;
        $this->rememberer = $rememberer;
    }

    /**
     * @param Request $request
     * @return JsonResponse|EmptyResponse
     */
    public function handle(Request $request)
    {
        $actor = $request->getAttribute('actor');
        $Referer = $request->getHeader('Referer');
        $params = array_only($request->getParsedBody(), ['identification', 'password']);

        $response = $this->apiClient->send(TokenController::class, $actor, [], $params);

        if ($response->getStatusCode() === 200) {
            $data = json_decode($response->getBody());

            $session = $request->getAttribute('session');
            $this->authenticator->logIn($session, $data->userId);

            $token = AccessToken::find($data->token);

            event(new UserLoggedIn($this->users->findOrFail($data->userId), $token));
            $response = FigResponseCookies::set(
                $response,
                SetCookie::create("lastLoginName")
                    ->withValue($request->getParsedBody()['identification'])
                    ->withPath('/')
            );

            $response = $this->rememberer->remember($response, $token);
        } elseif ($response->getStatusCode() === 401) {
            $responseNew = $this->apiClient->send(PingxxTokenController::class, $actor, [], $params);

            if ($responseNew->getStatusCode() === 200) {
                $data = json_decode($responseNew->getBody());

                $session = $request->getAttribute('session');
                $this->authenticator->logIn($session, $data->userId);

                $token = AccessToken::find($data->token);

                event(new UserLoggedIn($this->users->findOrFail($data->userId), $token));

                $responseNew = FigResponseCookies::set(
                    $responseNew,
                    SetCookie::create("lastLoginName")
                        ->withValue($request->getParsedBody()['identification'])
                        ->withPath('/')
                        ->withDomain('dashboard.pingxx.com')
                );

                $responseNew = $this->rememberer->remember($responseNew, $token);
                return $responseNew;
            } else{
                return $response;
            }

        }


        return $response;
    }
}
