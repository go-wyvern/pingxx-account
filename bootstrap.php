<?php

use Illuminate\Contracts\Events\Dispatcher;
use Pingxx\Account\Listener;
use Flarum\Event\ConfigureLocales;

// Return a function that registers the extension with Flarum. This is
// the place to listen to events, register bindings with the container
// and execute code when the application boots.
//
// Any typehinted argument of this function is automatically resolved
// by the IoC container.
return function (Dispatcher $events) {
    $events->listen(ConfigureLocales::class, function (ConfigureLocales $event) {
        $event->loadLanguagePackFrom(__DIR__);
    });

    $events->subscribe(Listener\PingxxPrepareApiAttributes::class);
    $events->subscribe(Listener\AddClientAssets::class);
    $events->subscribe(Listener\PingxxLogin::class);
    $events->subscribe(Listener\PingxxUser::class);

    $events->subscribe(Listener\Statistics::class);

};
