<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Http\Resources\ApplicationResource;
use App\Services\ApplicationService;

class ApplicationController extends Controller
{
    public function __construct(
        protected ApplicationService $applicationService
    ) {}

    public function apply(StoreApplicationRequest $request, int $jobId)
    {
        $application = $this->applicationService->applyToJob($jobId, $request->validated());
        return new ApplicationResource($application);
    }

    public function myApplications()
    {
        $applications = $this->applicationService->myApplications();
        return ApplicationResource::collection($applications);
    }

    public function jobApplicants(int $jobId)
    {
        $applications = $this->applicationService->jobApplicants($jobId);
        return ApplicationResource::collection($applications);
    }

    public function updateStatus(UpdateApplicationStatusRequest $request, int $applicationId)
    {
        $application = $this->applicationService->updateStatus($applicationId, $request->validated()['status']);
        return new ApplicationResource($application);
    }
}
