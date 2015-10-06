<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Score extends Model {

    // �������� ��������� � ���������� ���������
    // ��� ��� ���������� ��� ������ Eloquent �������� �� ��������� ����������.
    protected $fillable = ['name', 'score'];
    protected $hidden = ['created_at', 'updated_at'];

    public static $unguarded = true; // laravel �� �������� ��� �� �������� ��������� ������.

}
