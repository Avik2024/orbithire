<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'skills_required' => $this->skills_required,
            'location' => $this->location,
            'job_type' => $this->job_type,
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'status' => $this->status,
            'employer' => [
                'id' => $this->employer->id,
                'name' => $this->employer->name,
            ],
            'created_at' => $this->created_at,
        ];
    }
}