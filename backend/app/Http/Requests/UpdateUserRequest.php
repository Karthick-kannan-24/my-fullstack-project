<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->route('user'); // important

        return [
            'name' => 'required|min:3',
            'email' => "required|email|unique:users,email,$id"
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required',
            'name.min' => 'The name must be at least 3 characters',
            'email.required' => 'The email field is required',
            'email.email' => 'The email must be a valid email address',
            'email.unique' => 'Email already exists'
        ];
    }
}
