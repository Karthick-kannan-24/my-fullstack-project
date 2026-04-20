<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserCrudController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    return User::latest()->paginate(5);
}

public function store(StoreUserRequest $request)
{
    $data = $request->validated();

    // hash password before saving
    $data['password'] = Hash::make($data['password']);

    $user = User::create($data);

    return response()->json([
        'status' => true,
        'message' => 'User created successfully',
        'data' => $user
    ]);
}

public function update(UpdateUserRequest $request, $id)
{
    $user = User::findOrFail($id);

    $data = $request->validated();

    $user->update($data);

    return $user;
}

public function destroy($id)
{
    User::destroy($id);
    return ['message' => 'Deleted'];
}
}
