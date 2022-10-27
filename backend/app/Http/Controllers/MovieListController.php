<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\MovieList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovieListController extends Controller
{
    public function index()
    {
        $list = MovieList::all();
        return response()->json(
            ['status' => 'ok', 'data' => $list],
            200
        );
    }

    public function store(Request $request)
    {
        if (MovieList::where('film_id', $request->film_id)->where('account_id', $request->account_id)->exists()) {
            return response()->json([
                'Message' => 'Esta pelicula ya la tienes agregada',
            ]);
        } else {
            $movieList = MovieList::create([
                'account_id' => $request->account_id,
                'film_id' => $request->film_id,
            ]);
            return response()->json([
                'Message' => 'Add film',
                'movieList' => $movieList
            ]);
        }
    }

    public function show(MovieList $movieList)
    {
        //
    }


    public function update(Request $request, MovieList $movieList)
    {
        //
    }


    public function destroy(MovieList $movieList)
    {
        //
    }

    //GET FILMS LIST ACCOUNTS
    public function getAccountFilms(Request $request, $account_id)
    {
        // $filmsAcount = DB::select("SELECT * FROM films F
        //                           JOIN movie_lists ML
        //                           ON F.id = ML.film_id
        //                           WHERE  ML.account_id = $account_id");

        // $filmsAcount =  DB::table("films")
        // ->join('movie_lists', 'movie_lists.film_id', '=','films.id')
        // ->where('movie_lists.account_id', $account_id)->get();

        $pageSize = $request->page_size ?? 6;
        $filmsAcount = Film::with('genres')
            ->join('movie_lists', 'movie_lists.film_id', '=', 'films.id')
            ->where('movie_lists.account_id', $account_id)->paginate($pageSize);

        return response()->json(
            ['status' => 'ok', 'data' => $filmsAcount],
            200
        );
    }

    //DELETE MOVIE LIST ACCOUNT
    public function deleteMovieIdList(Request $request)
    {
        $data = MovieList::where('film_id', $request->film_id)
            ->where('account_id', $request->account_id)
            ->get();
        $film = MovieList::find($data[0]->id);
        $film->delete();
        return response()->json(['message' => 'Movie delete list succesfully']);
    }

    public function listExplore(Request $request)
    {
        $pageSize = $request->page_size ?? 18;
        $films =  Film::select('*', 'id AS film_id')
            ->with('genres')
            ->orderBy('id', 'DESC')
            ->paginate($pageSize);
        return response()->json(
            ['status' => 'ok', 'data' => $films],
            200
        );
    }

    public function getCountryExplore(Request $request, $country)
    {
        $pageSize = $request->page_size ?? 6;
        $filmCountry = Film::select('*', 'id AS film_id')->with('genres')
            ->orderBy('id', 'DESC')
            ->where('country', $country)
            ->paginate($pageSize);
        return response()->json($filmCountry);
    }

    public function checkAddedMovie(Request $request)
    {
        if (MovieList::where('film_id', $request->film_id)->where('account_id', $request->account_id)->exists()) {
            return response()->json([
                'message' => 'Quitar de mi lista',
                'status' => false
            ]);
        } else {
            return response()->json([
                'message' => 'Añadir a mi lista',
                'status' => true,
            ]);
        }
    }
}
