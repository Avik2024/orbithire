<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'headline' => $this->headline,
            'skills' => $this->skills,
            'experience' => $this->experience,
            'resume_url' => $this->resume_url,
            'location' => $this->location,
            'updated_at' => $this->updated_at,
        ];
    }
}
