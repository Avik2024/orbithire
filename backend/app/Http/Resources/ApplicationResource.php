<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'cover_letter' => $this->cover_letter,
            'job' => $this->whenLoaded('jobPosting', function () {
                return [
                    'id' => $this->jobPosting->id,
                    'title' => $this->jobPosting->title,
                    'location' => $this->jobPosting->location,
                ];
            }),
            'candidate' => $this->whenLoaded('candidate', function () {
                return [
                    'id' => $this->candidate->id,
                    'name' => $this->candidate->name,
                    'email' => $this->candidate->email,
                ];
            }),
            'applied_at' => $this->created_at,
        ];
    }
}
