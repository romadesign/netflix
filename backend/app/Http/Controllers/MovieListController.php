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
        }else{
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
	public function getAccountFilms($account_id)
	{
		// $filmsAcount = DB::select("SELECT * FROM films F
        //                           JOIN movie_lists ML
        //                           ON F.id = ML.film_id
        //                           WHERE  ML.account_id = $account_id");

        // $filmsAcount =  DB::table("films")
		// ->join('movie_lists', 'movie_lists.film_id', '=','films.id')
        // ->where('movie_lists.account_id', $account_id)->get();

        $filmsAcount = Film::with('genres')
        ->join('movie_lists', 'movie_lists.film_id', '=','films.id')
        ->where('movie_lists.account_id', $account_id)->get();

        return response()->json(
        ['status' => 'ok', 'data' => $filmsAcount],
        200
        );

	}

    public function listExplore(Request $request)
    {
        $pageSize = $request->page_size ?? 18;
        $films = Film::with('genres')->orderBy('id', 'DESC')->paginate($pageSize);
		return response()->json(
			['status' => 'ok', 'data' => $films],
			200
		);
    }

    public function getCountryExplore(Request $request, $country)
	{
        $pageSize = $request->page_size ?? 1;
		// $filmCountry = DB::select("SELECT * FROM films WHERE country = '$country' ORDER BY id DESC");
        $filmCountry = Film::with('genres')
        ->orderBy('id', 'DESC')
        ->where('country', $country)
        ->paginate($pageSize);
		return response()->json($filmCountry);
	}
}
