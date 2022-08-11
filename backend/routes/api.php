<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\CategorieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Public routes films
Route::get('/films', [FilmController::class, 'index']);
Route::get('/film/{id}', [FilmController::class, 'show']);
Route::get('/films/search/title={title}/desc={description}/provider={provider}', [FilmController::class, 'search']);
Route::post('/film', [FilmController::class, 'store']); //create film
Route::post('/film/{id}/edit', [FilmController::class, 'update']);
Route::post('/film/{id}/delete', [FilmController::class, 'destroy']);

// Public routes categories
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categorie/{id}', [CategorieController::class, 'show']);
Route::post('/categorie', [CategorieController::class, 'store']); //create categorie
Route::put('/categorie/{id}/edit', [CategorieController::class, 'update']);
Route::post('/categories/{id}/delete', [CategorieController::class, 'destroy']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



