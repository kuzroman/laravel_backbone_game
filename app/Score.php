<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model {

    // Указание доступных к заполнению атрибутов
    // так как изначально все модели Eloquent защищены от массового заполнения.
    protected $fillable = ['name', 'score'];
    protected $hidden = ['created_at', 'updated_at'];

    public static $unguarded = true; // laravel не нравится что мы напрямую добавляем данные.

}
