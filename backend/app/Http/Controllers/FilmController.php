<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FilmController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $user = $request->bearerToken();
        $pageSize = $request->page_size ?? 6;
        $films = Film::query()->paginate($pageSize);
        return response()->json(
            [
                'status' => 'ok',
                'data' => $films,
                'user' => $user
            ],
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

        $provider = 1;
        $film = Film::create([
            'title' => $request->title,
            'description' => $request->description,
            'provider_id' => $provider,
            'categorie_id' => $request->categorie_id,
            'backdrop_path' => $request->backdrop_path,
            'poster_path' => $request->poster_path,
            'movieStatus' => $request->movieStatus,
            'duration' => $request->duration,
            'studio' => $request->studio,
            'protagonists' => $request->protagonists,
            'country' => $request->country,
            'premiere' => $request->premiere,
            'genre' => $request->genre,
            'rating' => $request->rating,
            'director' => $request->director,
            'producer' => $request->producer,
            'award' => $request->award,
        ]);

        return response()->json([
            'Message' => 'ok',
            'Films' => $film
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $film = Film::find($id);
        if (!$film) {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 404.
            // En code podríamos indicar un código de error personalizado de nuestra aplicación si lo deseamos.
            return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra una pelicula con ese código.'])], 404);
        }

        return response()->json(['status' => 'ok', 'data' => $film], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $provider = 1;
        $film = Film::find($id);
        $film->title = $request->input('title');
        $film->description = $request->input('description');
        // $film->provider_id = $request->input('provider_id');
        $film->provider_id = $provider;
        $film->categorie_id = $request->input('categorie_id');
        $film->backdrop_path = $request->input('backdrop_path');
        $film->poster_path = $request->input('poster_path');
        $film->movieStatus = $request->input('movieStatus');
        $film->duration = $request->input('duration');
        $film->studio = $request->input('studio');
        $film->protagonists = $request->input('protagonists');
        $film->country = $request->input('country');
        $film->premiere = $request->input('premiere');
        $film->genre = $request->input('genre');
        $film->rating = $request->input('rating');
        $film->director = $request->input('director');
        $film->producer = $request->input('producer');
        $film->award = $request->input('award');
        $film->save();
        return response()->json(['message' => 'Film update succesfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $film = Film::find($id);
        $film->delete();
        return response()->json(['message' => 'Film delete succesfully']);
    }


    /**
     * search for a title
     *
     * @return \Illuminate\Http\Response
     */
    public function search($title, $description)

    {
        $provider = 2;
        return Film::where('title', 'like', '%' . $title . '%')
            ->orWhere('description', 'like', '%' . $description . '%')
            ->orWhere('provider_id', 'like', '%' . $provider . '%')
            ->get();
    }
}
