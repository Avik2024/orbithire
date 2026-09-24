<?php

namespace App\Repositories;

use App\Models\CandidateProfile;
use App\Models\EmployerProfile;
use App\Repositories\Contracts\ProfileRepositoryInterface;

class ProfileRepository implements ProfileRepositoryInterface
{
    public function findCandidateProfile(int $userId): ?CandidateProfile
    {
        return CandidateProfile::where('user_id', $userId)->first();
    }

    public function updateOrCreateCandidateProfile(int $userId, array $data): CandidateProfile
    {
        return CandidateProfile::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }

    public function findEmployerProfile(int $userId): ?EmployerProfile
    {
        return EmployerProfile::where('user_id', $userId)->first();
    }

    public function updateOrCreateEmployerProfile(int $userId, array $data): EmployerProfile
    {
        return EmployerProfile::updateOrCreate(
            ['user_id' => $userId],
            $data
        );
    }
}
