<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/4
 * Time: 下午8:58
 */
namespace Pingxx\Account\Api\Controller;

use Flarum\Http\Controller\ControllerInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\EmptyResponse;
use Zend\Diactoros\Response\JsonResponse;
use Flarum\Core\Repository\UserRepository;

class PingxxActiveUserController implements ControllerInterface
{
    protected $users;

    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * @param Request $request
     * @return JsonResponse|EmptyResponse
     */
    public function handle(Request $request)
    {
        $id = array_get($request->getQueryParams(), 'id');

        $actor = $request->getAttribute('actor');
        $isActivated = array_get($request->getParsedBody(), 'isActivated');
        $user = $this->users->findOrFail($id, $actor);

        if ($actor->isAdmin()) {
            $user->is_activated = $isActivated;
        }

        $user->save();

        return new JsonResponse([
            'userId' => $user->id,
            'isActivated' => $user->is_activated
        ]);
    }
}