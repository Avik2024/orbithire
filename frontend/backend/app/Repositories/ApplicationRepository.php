<?php

namespace App\Repositories;

use App\Models\Application;
use App\Repositories\Contracts\ApplicationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ApplicationRepository implements ApplicationRepositoryInterface
{
    public function create(array $data): Application
    {
        $application = Application::create($data);
        return $application->fresh();
    }

    public function find(int $id): ?Application
    {
        return Application::find($id);
    }

    public function findByJobAndCandidate(int $jobId, int $candidateId): ?Application
    {
        return Application::where('job_posting_id', $jobId)
            ->where('candidate_id', $candidateId)
            ->first();
    }

    public function candidateApplications(int $candidateId): Collection
    {
        return Application::with('jobPosting')
            ->where('candidate_id', $candidateId)
            ->latest()
            ->get();
    }

    public function jobApplications(int $jobId): Collection
    {
        return Application::with('candidate')
            ->where('job_posting_id', $jobId)
            ->latest()
            ->get();
    }

    public function updateStatus(Application $application, string $status): Application
    {
        $application->update(['status' => $status]);
        return $application->fresh();
    }
}
