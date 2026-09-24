<?php

namespace App\Repositories\Contracts;

use App\Models\CandidateProfile;
use App\Models\EmployerProfile;

interface ProfileRepositoryInterface
{
    public function findCandidateProfile(int $userId): ?CandidateProfile;
    public function updateOrCreateCandidateProfile(int $userId, array $data): CandidateProfile;
    public function findEmployerProfile(int $userId): ?EmployerProfile;
    public function updateOrCreateEmployerProfile(int $userId, array $data): EmployerProfile;
}
