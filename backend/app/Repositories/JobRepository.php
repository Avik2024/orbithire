<?php

namespace App\Repositories;

use App\Models\JobPosting;
use App\Repositories\Contracts\JobRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class JobRepository implements JobRepositoryInterface
{
    public function all(array $filters = []): Collection
    {
        $query = JobPosting::query()->where('status', 'active');

        if (!empty($filters['location'])) {
            $query->where('location', 'ilike', '%' . $filters['location'] . '%');
        }

        if (!empty($filters['job_type'])) {
            $query->where('job_type', $filters['job_type']);
        }

        if (!empty($filters['search'])) {
            $query->where('title', 'ilike', '%' . $filters['search'] . '%');
        }

        return $query->latest()->get();
    }

    public function find(int $id): ?JobPosting
    {
        return JobPosting::find($id);
    }

    public function create(array $data): JobPosting
    {
        $job = JobPosting::create($data);
        return $job->fresh();
    }

    public function update(JobPosting $job, array $data): JobPosting
    {
        $job->update($data);
        return $job->fresh();
    }

    public function delete(JobPosting $job): bool
    {
        return $job->delete();
    }
}
