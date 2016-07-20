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

        $data = 'email=' . $identification . '&password=' . $password;
        $pingxx_request = new Request('https://dashboard.pingxx.com/auto/user/login', $data);
        $body = $pingxx_request->vpost();
        $result = json_decode($body, false);

        if ($result->status) {
            $username = explode("@", $identification)[0];
            $user = User::register($username, $identification, $password);
            $user->activate();
            if (isset($token)) {
                foreach ($token->payload as $k => $v) {
                    $user->$k = $v;
                }
            }
            $user->create_from = '来自Ping++ Dashboard账户中心';
            $user->save();

            if (isset($token)) {
                $token->delete();
            }
            $token = AccessToken::generate($user->id, $lifetime);
            $token->save();

            $response = new JsonResponse([
                'token' => $token->id,
                'userId' => $user->id,
                'status' => $result->status
            ]);


            foreach ($pingxx_request->cookies as $Pcookie) {
                $cookie_info = explode('=', explode(";", $Pcookie)[0]);
                if (count($cookie_info) == 2) {
                    $cookie_key = trim($cookie_info[0]);
                    $cookie_value = trim($cookie_info[1]);

                    $response = FigResponseCookies::set(
                        $response,
                        SetCookie::create($cookie_key)
                            ->withValue($cookie_value)
                            ->withPath('/')
                            ->withDomain('dashboard.pingxx.com')
                    );
                }
            }
            return $response;
        } else {
            throw new PermissionDeniedException($result->data->message);;
        }
    }
}

class Request
{
    private $url;
    private $data;
    public $cookies;

    public function __construct($url, $data)
    {
        $this->url = $url;
        $this->data = $data;
        $this->cookies = new \ArrayObject();
    }

    public function post()
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->url);
        curl_setopt($ch, CURLOPT_POST, 1);
        if ($this->data != '') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, $this->data);
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, false);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    public function vpost()
    {
        $headers = array(
            'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.0) Gecko/20100101 Firefox/47.0',
            'Referer' => 'https://dashboard.pingxx.com/login'
        );
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->url);
        curl_setopt($curl, CURLOPT_HEADER, TRUE);
        curl_setopt($curl, CURLOPT_NOBODY, FALSE);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $this->data);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, FALSE);
        curl_setopt($curl, CURLOPT_REFERER, $headers['Referer']);
        curl_setopt($curl, CURLOPT_TIMEOUT, 120);
        if ($this->data != '') {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $this->data);
        }
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        $resp = curl_exec($curl);


        $headerSize = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
        $header = substr($resp, 0, $headerSize);
        $headers = explode("\r\n", $header);
        foreach ($headers as $h) {
            if (count(explode(":", $h)) == 2) {
                $key = explode(":", $h)[0];
                $value = explode(":", $h)[1];
                if ($key === 'Set-Cookie') {
                    $this->cookies->append($value);
                }
            }
        }
        $body = substr($resp, $headerSize);
        curl_close($curl);
        return $body;
    }
}
