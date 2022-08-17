<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = auth()->user();

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken($user->name)->plainTextToken,
                'name' => $user->name,
            ],
            'message' => 'User logged in!'
        ]);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        auth()->user()->tokens()->delete();
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();


        return response()->noContent();
    }
}
