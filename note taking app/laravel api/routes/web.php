<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/notes', [NoteController::class, 'index']);
Route::post('/notes/add', [NoteController::class, 'store']);
Route::delete('/notes/{id}', [NoteController::class, 'delete']);
Route::put('/notes/{id}', [NoteController::class, 'update']);
