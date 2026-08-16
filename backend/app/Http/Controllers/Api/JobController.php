<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Http\Resources\JobResource;
use App\Services\JobService;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function __construct(
        protected JobService $jobService
    ) {}

    public function index(Request $request)
    {
        $filters = $request->only(['location', 'job_type', 'search']);
        $jobs = $this->jobService->listJobs($filters);

        return JobResource::collection($jobs);
    }

    public function show(int $id)
    {
        $job = $this->jobService->getJob($id);
        return new JobResource($job);
    }

    public function store(StoreJobRequest $request)
    {
        $job = $this->jobService->createJob($request->validated());
        return new JobResource($job);
    }

    public function update(UpdateJobRequest $request, int $id)
    {
        $job = $this->jobService->updateJob($id, $request->validated());
        return new JobResource($job);
    }

    public function destroy(int $id)
    {
        $this->jobService->deleteJob($id);
        return response()->json(['message' => 'Job deleted successfully.']);
    }
}