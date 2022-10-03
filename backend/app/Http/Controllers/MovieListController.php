<?php

namespace App\Http\Controllers;

use App\Models\MovieList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MovieListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = MovieList::all();
        return response()->json(
			['status' => 'ok', 'data' => $list],
			200
		);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MovieList  $movieList
     * @return \Illuminate\Http\Response
     */
    public function show(MovieList $movieList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MovieList  $movieList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MovieList $movieList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MovieList  $movieList
     * @return \Illuminate\Http\Response
     */
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
