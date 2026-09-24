<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCandidateProfileRequest;
use App\Http\Requests\UpdateEmployerProfileRequest;
use App\Http\Resources\CandidateProfileResource;
use App\Http\Resources\EmployerProfileResource;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    public function __construct(
        protected ProfileService $profileService
    ) {}

    public function showCandidateProfile()
    {
        $profile = $this->profileService->getMyCandidateProfile();
        return $profile ? new CandidateProfileResource($profile) : response()->json(['data' => null]);
    }

    public function updateCandidateProfile(UpdateCandidateProfileRequest $request)
    {
        $profile = $this->profileService->updateMyCandidateProfile($request->validated());
        return new CandidateProfileResource($profile);
    }

    public function showEmployerProfile()
    {
        $profile = $this->profileService->getMyEmployerProfile();
        return $profile ? new EmployerProfileResource($profile) : response()->json(['data' => null]);
    }

    public function updateEmployerProfile(UpdateEmployerProfileRequest $request)
    {
        $profile = $this->profileService->updateMyEmployerProfile($request->validated());
        return new EmployerProfileResource($profile);
    }
}
