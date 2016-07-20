<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/20
 * Time: 上午9:16
 */
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->integer('same_question_count')->unsigned()->default(0);
        });

    },

    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropColumn('same_question_count');
        });
    }
];