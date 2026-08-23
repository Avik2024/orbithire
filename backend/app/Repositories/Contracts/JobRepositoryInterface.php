<?php

namespace App\Repositories\Contracts;

use App\Models\JobPosting;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface JobRepositoryInterface
{
    public function all(array $filters = []): LengthAwarePaginator;
    public function find(int $id): ?JobPosting;
    public function create(array $data): JobPosting;
    public function update(JobPosting $job, array $data): JobPosting;
    public function delete(JobPosting $job): bool;
}
