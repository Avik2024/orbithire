<?php

namespace App\Repositories\Contracts;

use App\Models\JobPosting;
use Illuminate\Database\Eloquent\Collection;

interface JobRepositoryInterface
{
    public function all(array $filters = []): Collection;
    public function find(int $id): ?JobPosting;
    public function create(array $data): JobPosting;
    public function update(JobPosting $job, array $data): JobPosting;
    public function delete(JobPosting $job): bool;
}