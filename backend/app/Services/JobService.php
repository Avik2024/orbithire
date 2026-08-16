<?php

namespace App\Services;

use App\Models\JobPosting;
use App\Repositories\Contracts\JobRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class JobService
{
    public function __construct(
        protected JobRepositoryInterface $jobRepository
    ) {}

    public function listJobs(array $filters = []): Collection
    {
        return $this->jobRepository->all($filters);
    }

    public function getJob(int $id): JobPosting
    {
        $job = $this->jobRepository->find($id);

        if (!$job) {
            throw ValidationException::withMessages(['job' => 'Job not found.']);
        }

        return $job;
    }

    public function createJob(array $data): JobPosting
    {
        $data['employer_id'] = Auth::id();
        return $this->jobRepository->create($data);
    }

    public function updateJob(int $id, array $data): JobPosting
    {
        $job = $this->getJob($id);

        if ($job->employer_id !== Auth::id()) {
            throw ValidationException::withMessages(['job' => 'You are not authorized to update this job.']);
        }

        return $this->jobRepository->update($job, $data);
    }

    public function deleteJob(int $id): bool
    {
        $job = $this->getJob($id);

        if ($job->employer_id !== Auth::id()) {
            throw ValidationException::withMessages(['job' => 'You are not authorized to delete this job.']);
        }

        return $this->jobRepository->delete($job);
    }
}