<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/18
 * Time: 下午8:32
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->integer('praise_count')->unsigned()->default(0);
        });

        $schema->table('posts', function (Blueprint $table) {
            $table->integer('agree_count')->unsigned()->default(0);
        });

    },

    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropColumn('praise_count');
        });

        $schema->table('posts', function (Blueprint $table) {
            $table->dropColumn('agree_count');
        });
    }
];