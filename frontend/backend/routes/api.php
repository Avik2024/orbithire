<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Illuminate\Http\Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Public job routes
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{id}', [JobController::class, 'update']);
    Route::delete('/jobs/{id}', [JobController::class, 'destroy']);

    // Applications
    Route::post('/jobs/{id}/apply', [ApplicationController::class, 'apply']);
    Route::get('/applications', [ApplicationController::class, 'myApplications']);
    Route::get('/jobs/{id}/applications', [ApplicationController::class, 'jobApplicants']);
    Route::patch('/applications/{id}', [ApplicationController::class, 'updateStatus']);

    // Profiles
    Route::get('/candidate/profile', [ProfileController::class, 'showCandidateProfile']);
    Route::put('/candidate/profile', [ProfileController::class, 'updateCandidateProfile']);
    Route::get('/employer/profile', [ProfileController::class, 'showEmployerProfile']);
    Route::put('/employer/profile', [ProfileController::class, 'updateEmployerProfile']);
});
