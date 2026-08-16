<?php

namespace App\Providers;

use App\Repositories\Contracts\JobRepositoryInterface;
use App\Repositories\JobRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(JobRepositoryInterface::class, JobRepository::class);
    }

    public function boot(): void
    {
        //
    }
}