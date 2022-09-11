<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class FilmController extends Controller
{


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)
    {
        $pageSize = $request->page_size ?? 6;
        $films = Film::query()->paginate($pageSize);
        return response()->json(
            [
                'status' => 'ok',
                'data' => $films,
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
        //capture with exits userid database
        $user = User::find($request->userId);
        //capture role
        $userType = $request->userType;
        $userId = 5;
        if ($user === null) {
            return response()->json(['data' => 'Este usuario no existe'], 400);
        } else {
            if ($user->role ===  "provider") {
                $film = Film::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'provider_id' => $userId,
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
            } else {
                return response()->json(['status' => 'No tienes los privilegios para realizar esta solicitud'], 400);
            }
        }
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
        $film = Film::find($id);
        if (!$film) {
            return response()->json(
                ['errors' =>
                array([
                    'code' => 404,
                    'message' => 'No se encuentra una pelicula con ese código.'
                ])],
                404
            );
        } else {
            if ($film->provider_id == $request->provider_id) {
                if ($request->userType  ===  "provider") {
                    $film->provider_id = $request->provider_id;
                    $film->title = $request->title;
                    $film->description = $request->description;
                    $film->categorie_id = $request->categorie_id;
                    $film->backdrop_path = $request->backdrop_path;
                    $film->poster_path = $request->poster_path;
                    $film->movieStatus = $request->movieStatus;
                    $film->duration = $request->duration;
                    $film->studio = $request->studio;
                    $film->protagonists = $request->protagonists;
                    $film->country = $request->country;
                    $film->premiere = $request->premiere;
                    $film->genre = $request->genre;
                    $film->rating = $request->rating;
                    $film->director = $request->director;
                    $film->producer = $request->producer;
                    $film->award = $request->award;
                    $film->save();
                    return response()->json(['message' => 'Film update succesfully']);
                } else {
                    return response()->json(['message' => 'No tienes los privilegios para realizar esta función']);
                }
            } else {
                return response()->json(
                    ['errors' =>
                    array([
                        'code' => 404,
                        'message' => 'No puedes editar una pelicula que no te pertenece.'
                    ])],
                    404
                );
            }
        }
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

    /**
     * Display the specified resource.
     *
     * @param  int  $country
     * @return \Illuminate\Http\Response
     */
    public function getCountryFilms($country)
    {   
        $filmCountry = Film::where('country' ,'=', $country)->get();
        return response()->json($filmCountry);
    }

}
