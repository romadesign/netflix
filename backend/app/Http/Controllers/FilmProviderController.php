<?php

namespace App\Http\Controllers;

use App\Models\Film;
use App\Models\User;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\File;

class FilmProviderController extends Controller
{
	//GET FILMS
	public function index(Request $request)
	{
		$pageSize = $request->page_size ?? 6;
		// $filmCountry = DB::select('SELECT * FROM films ORDER BY id DESC');
		// $films = Film::query()->orderBy('id', 'DESC')->paginate($pageSize);  //Traer todos los datos con paginacion
		// Trae solo los datos de un proveedor
		// $films = Film::query()
		//         ->orderBy('id', 'DESC')
		//         ->where('provider_id', 5)
		//         ->paginate($pageSize);
		$movies = Film::with('genres')->orderBy('id', 'DESC')->paginate($pageSize);
		return response()->json(
			['status' => 'ok', 'data' => $movies],
			200
		);
	}

	//UPDATE FILM
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
				// 1 $path = $request->backdrop_path->store('public/imagests');
				if ($request->hasfile('backdrop_path')) {
					$file = $request->file('backdrop_path');
					$extencion = $file->getClientOriginalExtension();
					$filename = time() . '.' . $extencion;
					$file->move('images', $filename);
				}
				// $filepath = $request->file('backdrop_path')->store('public/images');
				$film = Film::create([
					'title' => $request->title,
					'description' => $request->description,
					'provider_id' => $user->id,
					'categorie_id' => $request->categorie_id,
					'backdrop_path' => $filename,
					'poster_path' => $request->poster_path,
					'movieStatus' => $request->movieStatus,
					'duration' => $request->duration,
					'studio' => $request->studio,
					'protagonists' => json_decode($request->protagonists),
					'country' => $request->country,
					'premiere' => $request->premiere,
					'genre' => json_decode($request->genre),
					'rating' => $request->rating,
					'director' => $request->director,
					'producer' => $request->producer,
					'award' => $request->award

				]);

				//Desde el front se envia como JSON.stringify(isCheckSelectedGenre)
				//Acá se parsea nuevamente para capturar todos los datos
				$film->genres()->attach(json_decode($request->genre_id));

				return response()->json([
					'Message' => 'ok',
					'Films' => $film
				]);
			} else {
				return response()->json(['status' => 'No tienes los privilegios para realizar esta solicitud'], 400);
			}
		}
	}

	//GET DETAILS FILM
	public function show($id)
	{
		$film = Film::with('genres')->find($id);
		if (!$film) {
			// Se devuelve un array errors con los errores encontrados y cabecera HTTP 404.
			// En code podríamos indicar un código de error personalizado de nuestra aplicación si lo deseamos.
			return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra una pelicula con ese código.'])], 404);
		}

		return response()->json(['status' => 'ok', 'data' => $film], 200);
	}

	//UPDATE FILM
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

				//Update image
				// if($request->hasFile('backdrop_path')){
				//     $image_name = time().'.'.$request->backdrop_path->extension();
				//     $request->backdrop_path->move('images',$image_name);
				//     $old_path = 'images/'.$film->backdrop_path;
				//     if(File::exists($old_path)){
				//         File::delete($old_path);
				//     }
				// }else{
				//     $image_name = $film->backdrop_path;
				// }

				if ($request->hasFile('backdrop_path')) {
					$destination = 'images/' . $film->backdrop_path;
					if (File::exists($destination)) {
						File::delete($destination);
					}
					$file = $request->file('backdrop_path');
					$extention = $file->getClientOriginalExtension();
					$filename = time() . '.' . $extention;
					$file->move('images/', $filename);
					$film->backdrop_path = $filename;
				}


				if ($request->userType  ===  "provider") {
					$film->provider_id = $request->provider_id;
					$film->title = $request->title;
					$film->description = $request->description;
					$film->categorie_id = $request->categorie_id;
					$film->backdrop_path = $film->backdrop_path;
					$film->poster_path = $request->poster_path;
					$film->movieStatus = $request->movieStatus;
					$film->duration = $request->duration;
					$film->studio = $request->studio;
					$film->protagonists = json_decode($request->protagonists);
					$film->country = $request->country;
					$film->premiere = $request->premiere;
					$film->genre = json_decode($request->genre);
					$film->rating = $request->rating;
					$film->director = $request->director;
					$film->producer = $request->producer;
					$film->award = $request->award;

					//sync elimina todos los roles y vuelve agregar los seleccionados para no tener duplicados
					$film->genres()->sync(json_decode($request->genre_id));
					// $film->genres()->sync($request->genre_id);


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

	//DELETE FILM
	public function destroy($id)
	{
		$film = Film::find($id);
		$film->delete();
		return response()->json(['message' => 'Film delete succesfully']);
	}

	//Delete multiple FILMS
	public function deleteAll($ids)
	{
		$ids = explode(",", $ids);
		$films =  DB::table("films")->whereIn('id', $ids)->delete();
		return response()->json(['success' => "films Deleted successfully."]);
	}


	public function search($title, $description)
	{
		$provider = 2;
		return Film::where('title', 'like', '%' . $title . '%')
			->orWhere('description', 'like', '%' . $description . '%')
			->orWhere('provider_id', 'like', '%' . $provider . '%')
			->get();
	}

	//GET FILMS COUNTRIES
	public function getCountryFilms($country)
	{
		$filmCountry = DB::select("SELECT * FROM films WHERE country = '$country' ORDER BY id DESC");
		return response()->json($filmCountry);
	}

	//GET PROVIDER FILMS
	public function getProviderFilms(Request $request, $provider_id)
	{
		$pageSize = $request->page_size ?? 8;
		$films = Film::query()
			->orderBy('id', 'DESC')
			->where('provider_id', $provider_id)
			->paginate($pageSize);
		return response()->json(
			['status' => 'ok', 'data' => $films],
			200
		);
	}

	public function getGenres()
	{
		$genres = Genre::all();
		return response()->json(
			['status' => 'ok', 'data' => $genres],
			200
		);
	}
}
