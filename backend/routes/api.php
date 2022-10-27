<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmProviderController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\MovieListController;

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

//FILMS PROVIDER
Route::get('/films', [FilmProviderController::class, 'index']);
Route::get('/genres', [FilmProviderController::class, 'getGenres']);
Route::get('/film/{id}', [FilmProviderController::class, 'show']);
Route::get('/films/search/title={title}/desc={description}/provider={provider}', [FilmProviderController::class, 'search']);
Route::post('/film', [FilmProviderController::class, 'store']); //create film
Route::post('/film/{id}/edit', [FilmProviderController::class, 'update']);
Route::post('/film/{id}/delete', [FilmProviderController::class, 'destroy']);
Route::post('/film/{id}/deleteall', [FilmProviderController::class, 'deleteAll']);
Route::get('/country/{country}', [FilmProviderController::class, 'getCountryFilms']);
Route::get('/filmsprovider/{provider_id}', [FilmProviderController::class, 'getProviderFilms']);

//CATEGORIES
Route::get('/categories', [CategorieController::class, 'index']);
Route::get('/categorie/{id}', [CategorieController::class, 'show']);
Route::post('/categorie', [CategorieController::class, 'store']); //create categorie
Route::post('/categorie/{id}/edit', [CategorieController::class, 'update']);
Route::post('/categories/{id}/delete', [CategorieController::class, 'destroy']);


//FILMS CATEGORIES
Route::get('/filmscategory/{categorie_id}/filmsgenre/{genre_id}', [FilmController::class, 'getFilmsCategory']);
Route::get('/filmsgenre/{genre_id}', [FilmController::class, 'getFilmsGenre']);


//ACCOUNTS
Route::get('/accounts', [AccountController::class, 'index']);
Route::post('/account', [AccountController::class, 'store']); //create account
Route::get('/accounts/user/{user_id}', [AccountController::class, 'getAccountsUser']);
Route::get('/account/{id}', [AccountController::class, 'show']);
Route::get('/movieramdon', [AccountController::class, 'getMovieRamdon']);

//MOVIE LIST ACCOUNT
Route::get('/lists/explore', [MovieListController::class, 'listExplore']);
Route::get('/list', [MovieListController::class, 'index']);
Route::get('/account/{id}/list', [MovieListController::class, 'getAccountFilms']);
Route::post('/list', [MovieListController::class, 'store']); //create
Route::get('/lists/explore/country/{country}', [MovieListController::class, 'getCountryExplore']);
Route::get('/filmId/{film_id}/accountId/{account_id}', [MovieListController::class, 'checkAddedMovie']);
Route::post('/filmId/{film_id}/accountId/{account_id}/delete', [MovieListController::class, 'deleteMovieIdList']);


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
