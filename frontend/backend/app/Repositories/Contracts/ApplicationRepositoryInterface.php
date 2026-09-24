<?php

namespace App\Repositories\Contracts;

use App\Models\Application;
use Illuminate\Database\Eloquent\Collection;

interface ApplicationRepositoryInterface
{
    public function create(array $data): Application;
    public function find(int $id): ?Application;
    public function findByJobAndCandidate(int $jobId, int $candidateId): ?Application;
    public function candidateApplications(int $candidateId): Collection;
    public function jobApplications(int $jobId): Collection;
    public function updateStatus(Application $application, string $status): Application;
}
