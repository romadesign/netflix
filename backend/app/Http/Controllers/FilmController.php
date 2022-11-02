<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        $pageSize = $request->page_size ?? 6;
        // $films = Film::query()
        // ->orderBy('id', 'DESC')
        // ->where('provider_id', 5)
        // ->paginate($pageSize);

        $films = Film::all();

        return response()->json(
            ['status' => 'ok', 'data' => $films],
            200
        );
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Film $film)
    {
        //
    }

    public function update(Request $request, Film $film)
    {
        //
    }

    public function destroy(Film $film)
    {
        //
    }
    //GET FILMS CATEGORY
    public function getFilmsCategory(Request $request, $categorie_id, $genre_id)
    {
        // add pagination <- other option
        // $pageSize = $request->page_size ?? 6;
        // $status = 0;
        // $films =  Film::with('genres')
        //     // ->orderBy('id', 'DESC')
        //     ->join('genre_film', 'genre_film.film_id', '=', 'films.id')
        //     ->where('genre_film.genre_id', $genre_id)
        //     ->where('categorie_id', $categorie_id)
        //     ->where('movieStatus', $status)
        //     ->paginate($pageSize);
        // return response()->json(
        //     ['status' => 'ok', 'data' => $films],
        //     200
        // );

        $status = 0;
        $films =  Film::with('genres')
            // ->orderBy('id', 'DESC')
            ->join('genre_film', 'genre_film.film_id', '=', 'films.id')
            ->where('genre_film.genre_id', $genre_id)
            ->where('categorie_id', $categorie_id)
            ->where('movieStatus', $status)
            ->get();
        return response()->json(
            ['status' => 'ok', 'data' => $films],
            200
        );
    }

    //GET FILMS GENRE
    public function getFilmsGenre(Request $request, $genre_id)
    {
        // add pagination <- other option
        // $pageSize = $request->page_size ?? 6;
        // $status = 0;
        // $films = Film::with('genres')
        //     ->join('genre_film', 'genre_film.film_id', '=', 'films.id')
        //     ->where('genre_film.genre_id', $genre_id)
        //     ->where('movieStatus', $status)
        //     ->paginate($pageSize);
        // return response()->json(
        //     ['status' => 'ok', 'data' => $films],
        //     200
        // );

        $status = 0;
        $films = Film::with('genres')
            ->join('genre_film', 'genre_film.film_id', '=', 'films.id')
            ->where('genre_film.genre_id', $genre_id)
            ->where('movieStatus', $status)->get();
        return response()->json(
            ['status' => 'ok', 'data' => $films],
            200
        );
    }
}
