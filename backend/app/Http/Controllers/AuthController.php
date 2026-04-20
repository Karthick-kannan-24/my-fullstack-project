<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'data' => $user
        ]);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }

     // STEP 1: Verify Email
    public function verifyEmail(VerifyEmailRequest $request)
    {
        $request->validated();

        return response()->json([
            'status' => true,
            'message' => 'Email verified successfully'
        ]);
    }

    // STEP 2: Reset Password
    public function resetPassword(ResetPasswordRequest $request)
    {
        $validatedData = $request->validated();

        $user = User::where('email', $validatedData['email'])->first();

        $user->update([
            'password' => Hash::make($validatedData['password'])
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Password reset successfully'
        ]);
    }
}
