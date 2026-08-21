<?php

namespace App\Providers;

use App\Repositories\Contracts\ApplicationRepositoryInterface;
use App\Repositories\Contracts\JobRepositoryInterface;
use App\Repositories\ApplicationRepository;
use App\Repositories\JobRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(JobRepositoryInterface::class, JobRepository::class);
        $this->app->bind(ApplicationRepositoryInterface::class, ApplicationRepository::class);
    }

    public function boot(): void
    {
        //
    }
}
