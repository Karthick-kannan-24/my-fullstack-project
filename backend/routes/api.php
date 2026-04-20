<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserCrudController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']); // PUBLIC
Route::post('/login', [AuthController::class, 'login']);       // PUBLIC
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserCrudController::class);   // PROTECTED
});
