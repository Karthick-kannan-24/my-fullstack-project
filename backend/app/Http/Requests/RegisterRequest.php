<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required',
            'name.min' => 'The name must be at least 3 characters',
            'email.required' => 'The email field is required',
            'email.email' => 'The email must be a valid email address',
            'email.unique' => 'Email already exists',
            'password.required' => 'The password field is required',
            'password.min' => 'The password must be at least 6 characters',
            'password.confirmed' => 'Password confirmation does not match',
            'password_confirmation' => 'The confirm password field is required',
            'password_confirmation' =>'The confirm password must be at least 6 characters',
        ];
    }
}
