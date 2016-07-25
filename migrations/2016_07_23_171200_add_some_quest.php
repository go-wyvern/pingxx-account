<?php
/**
 * Created by PhpStorm.
 * User: wyvern
 * Date: 16/7/23
 * Time: 下午5:12
 */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('posts', function (Blueprint $table) {
            $table->integer('same_question_count')->unsigned()->default(0);
        });

    },

    'down' => function (Builder $schema) {
        $schema->table('posts', function (Blueprint $table) {
            $table->dropColumn('same_question_count');
        });
    }
];