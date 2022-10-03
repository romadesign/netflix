<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\User;
use App\Models\Film;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{

    public function index()
    {
        $accounts = Account::all();
        return response()->json([
            'Account' => $accounts
        ]);
    }


    public function store(Request $request)
    {
        $user = User::find($request->userId);
        $userType = $request->userType;
        if ($user === null) {
            return response()->json(['data' => 'Este usuario no existe'], 400);
        } else {
            if ($user->role ===  "client") {
                if ($request->hasfile('image')) {
                    $file = $request->file('image');
                    $extencion = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extencion;
                    $file->move('profiles', $filename);
                }
            }
            $account = Account::create([
                'name' => $request->name,
                'image' => $filename,
                'user_id' => $user->id,
            ]);

            return response()->json([
                'Message' => 'ok',
                'Account' => $account
            ]);
        }
    }


    public function show($id)
    {
        $account = Account::find($id);
        // $account = DB::select("SELECT * FROM accounts WHERE id = '$id'");
        return response()->json($account);
    }


    public function update(Request $request, Account $account)
    {
        //
    }


    public function destroy(Account $account)
    {
        //
    }

    //GET ACCOUNT ID
    public function getMovieRamdon()
    {
        $movie = Film::with('genres')->get()->random(1);
        // $movie = DB::select("SELECT * from films F ORDER BY RAND() LIMIT 1"); SQL
        return response()->json($movie[0]);
    }

    //GET ACCOUNT ID
    public function getAccountId($id)
    {
        $account = DB::select("SELECT * FROM accounts WHERE id = '$id'");
        // $accounts = Film::where('country' ,'=', $country)->get();
        return response()->json($account);
    }


    //GET ACCOUNTS USER
    public function getAccountsUser($user_id)
    {
        $accounts = DB::select("SELECT * FROM accounts WHERE user_id = '$user_id' ORDER BY id DESC");
        // $accounts = Film::where('country' ,'=', $country)->get();
        return response()->json($accounts);
    }
}
