<?php

namespace App\Services;

use App\Models\Application;
use App\Models\JobPosting;
use App\Repositories\Contracts\ApplicationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApplicationService
{
    public function __construct(
        protected ApplicationRepositoryInterface $applicationRepository
    ) {}

    public function applyToJob(int $jobId, array $data): Application
    {
        $user = Auth::user();

        if ($user->role !== 'candidate') {
            throw ValidationException::withMessages(['role' => 'Only candidates can apply to jobs.']);
        }

        $job = JobPosting::find($jobId);

        if (!$job) {
            throw ValidationException::withMessages(['job' => 'Job not found.']);
        }

        $existing = $this->applicationRepository->findByJobAndCandidate($jobId, $user->id);

        if ($existing) {
            throw ValidationException::withMessages(['application' => 'You have already applied to this job.']);
        }

        $data['job_posting_id'] = $jobId;
        $data['candidate_id'] = $user->id;

        return $this->applicationRepository->create($data);
    }

    public function myApplications(): Collection
    {
        return $this->applicationRepository->candidateApplications(Auth::id());
    }

    public function jobApplicants(int $jobId): Collection
    {
        $job = JobPosting::find($jobId);

        if (!$job) {
            throw ValidationException::withMessages(['job' => 'Job not found.']);
        }

        if ($job->employer_id !== Auth::id()) {
            throw ValidationException::withMessages(['job' => 'You are not authorized to view these applicants.']);
        }

        return $this->applicationRepository->jobApplications($jobId);
    }

    public function updateStatus(int $applicationId, string $status): Application
    {
        $application = $this->applicationRepository->find($applicationId);

        if (!$application) {
            throw ValidationException::withMessages(['application' => 'Application not found.']);
        }

        if ($application->jobPosting->employer_id !== Auth::id()) {
            throw ValidationException::withMessages(['application' => 'You are not authorized to update this application.']);
        }

        return $this->applicationRepository->updateStatus($application, $status);
    }
}
