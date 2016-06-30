<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/6/30
 * Time: 下午1:35
 */
namespace Pingxx\Account\Utils;

class Request
{

    public static function post($url, $post_data = '', $timeout = 5)
    {//curl

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);

        curl_setopt($ch, CURLOPT_POST, 1);

        if ($post_data != '') {

            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

        curl_setopt($ch, CURLOPT_HEADER, false);

        $response = curl_exec($ch);

        curl_close($ch);

        return $response;

    }
}