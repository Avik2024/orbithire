<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // authorization handled in Service layer
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'skills_required' => ['nullable', 'array'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_type' => ['required', 'in:full_time,part_time,contract,internship'],
            'salary_min' => ['nullable', 'numeric'],
            'salary_max' => ['nullable', 'numeric'],
        ];
    }
}