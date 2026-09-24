<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'skills_required' => ['nullable', 'array'],
            'location' => ['nullable', 'string', 'max:255'],
            'job_type' => ['sometimes', 'in:full_time,part_time,contract,internship'],
            'salary_min' => ['nullable', 'numeric'],
            'salary_max' => ['nullable', 'numeric'],
            'status' => ['sometimes', 'in:active,closed,draft'],
        ];
    }
}