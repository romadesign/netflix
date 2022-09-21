<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
	public function index(Request $request){
		$pageSize = $request->page_size ?? 6;
			$films = Film::query()
			->orderBy('id', 'DESC')
			->where('provider_id', 5)
			->paginate($pageSize); 

			return response()->json(
				['status' => 'ok','data' => $films], 200
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
		 public function getFilmsCategory(Request $request, $categorie_id){   
			$pageSize = $request->page_size ?? 5;
			$films = Film::query()
							->orderBy('id', 'DESC')
							->where('categorie_id', $categorie_id)
							->paginate($pageSize); 
			return response()->json(
					['status' => 'ok','data' => $films], 200
			);
	}
}
