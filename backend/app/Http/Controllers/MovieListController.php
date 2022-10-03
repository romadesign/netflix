<?php

namespace App\Http\Controllers;

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
        if (MovieList::where('account_id', $request->account_id)->exists() && MovieList::where('film_id', $request->film_id)->exists()) {
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
	public function getCountryFilms($account_id)
	{
		$filmsAcount = DB::select("SELECT * FROM films F
                                  JOIN movie_lists ML
                                  ON F.id = ML.film_id
                                  WHERE ML.account_id = $account_id");
		return response()->json($filmsAcount);
	}
}
