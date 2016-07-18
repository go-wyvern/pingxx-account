<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/17
 * Time: 下午3:51
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->integer('ask_count')->unsigned()->default(0);
            $table->integer('answer_count')->unsigned()->default(0);
        });

    },

    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('ask_count');
            $table->dropColumn('answer_count');
        });
    }
];