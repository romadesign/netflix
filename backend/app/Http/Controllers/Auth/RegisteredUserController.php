<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
	/**
	 * Handle an incoming registration request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 *
	 * @throws \Illuminate\Validation\ValidationException
	 */
	public function store(Request $request)
	{
		$request->validate([
			'name' => ['required', 'string', 'max:255'],
			'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
			'password' => ['required', 'confirmed', Rules\Password::defaults()],
		]);

		if ($request->role == 'provider') {
			$user = User::create([
				'name' => $request->name,
				'email' => $request->email,
				'role' => 'provider',
				'password' => Hash::make($request->password),
			]);
            $token = $user->createToken('auth_token')->plainTextToken;

		} else {
			$role = 'client';
			$user = User::create([
				'name' => $request->name,
				'email' => $request->email,
				'role' => $role,
				'password' => Hash::make($request->password),
			]);
            $token = $user->createToken('auth_token')->plainTextToken;
		}


		event(new Registered($user, $token));

		Auth::login($user);
		// return response()->noContent();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearrer'
        ], 200);


        // event(new Registered($user));
        // Auth::login($user);
        // return response()->noContent();
	}
}
