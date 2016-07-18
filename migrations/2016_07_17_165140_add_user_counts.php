<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/17
 * Time: 下午4:50
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->integer('praise_count')->unsigned()->default(0);
            $table->integer('agree_count')->unsigned()->default(0);
        });

    },

    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('praise_count');
            $table->dropColumn('agree_count');
        });
    }
];