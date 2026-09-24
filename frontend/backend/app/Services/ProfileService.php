<?php

namespace App\Services;

use App\Models\CandidateProfile;
use App\Models\EmployerProfile;
use App\Repositories\Contracts\ProfileRepositoryInterface;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ProfileService
{
    public function __construct(
        protected ProfileRepositoryInterface $profileRepository
    ) {}

    public function getMyCandidateProfile(): ?CandidateProfile
    {
        $this->assertRole('candidate');
        return $this->profileRepository->findCandidateProfile(Auth::id());
    }

    public function updateMyCandidateProfile(array $data): CandidateProfile
    {
        $this->assertRole('candidate');
        return $this->profileRepository->updateOrCreateCandidateProfile(Auth::id(), $data);
    }

    public function getMyEmployerProfile(): ?EmployerProfile
    {
        $this->assertRole('employer');
        return $this->profileRepository->findEmployerProfile(Auth::id());
    }

    public function updateMyEmployerProfile(array $data): EmployerProfile
    {
        $this->assertRole('employer');
        return $this->profileRepository->updateOrCreateEmployerProfile(Auth::id(), $data);
    }

    protected function assertRole(string $role): void
    {
        if (Auth::user()->role !== $role) {
            throw ValidationException::withMessages(['role' => "Only {$role}s can access this resource."]);
        }
    }
}
