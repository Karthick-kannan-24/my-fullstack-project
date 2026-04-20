<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6|confirmed'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'The email field is required',
            'email.exists' => 'Invalid email address',
            'password.required' => 'The password field is required',
            'password.min' => 'The password must be at least 6 characters',
            'password.confirmed' => 'The password confirmation does not match'
        ];
    }
}
