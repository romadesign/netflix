<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Categorie::all();
		return response()->json(['status' => 'ok', 'data' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $categorie = Categorie::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json([
			'Message' => 'ok',
			'Categorie' => $categorie
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
        $categorie = Categorie::find($id);
		if (!$categorie) {
			return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra una pelicula con ese código.'])], 404);
		}

		return response()->json(['status' => 'ok', 'data' => $categorie], 200);
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
        $categorie = Categorie::find($id);
		$categorie->title = $request->input('title');
		$categorie->description = $request->input('description');
        $categorie->save();
		return response()->json(['message' => 'categorie update succesfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categorie = Categorie::find($id);
		$categorie->delete();
		return response()->json(['message' => 'categorie delete succesfully']);
    }
}
