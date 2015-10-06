<?php

use App\Score;
use Illuminate\Http\Request;
//use DB;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('game');
});

Route::get('bestScore', function () {

//    $score = Score::all();
//    $score = json_encode($score);
    $score = Score::orderBy('score', 'DESC')->get(); //->take(8)

    return $score;
});

Route::post('bestScore', function (Request $request) {

    $model = new Score;
    $model->name = $request->input('name');
    $model->score = $request->input('score');
    $model->save();

    return json_encode($model);
});