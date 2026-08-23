<?php

namespace Database\Seeders;

use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class JobPostingSeeder extends Seeder
{
    public function run(): void
    {
        $employer = User::firstOrCreate(
            ['email' => 'seed.employer@orbithire.com'],
            [
                'name' => 'Seed Employer',
                'password' => Hash::make('password123'),
                'role' => 'employer',
            ]
        );

        $jobs = [
            [
                'title' => 'Senior Backend Engineer (Remote)',
                'description' => 'We are looking for an experienced backend engineer to join our remote team, working across US timezones.',
                'skills_required' => ['Laravel', 'PostgreSQL', 'REST APIs'],
                'location' => 'Remote',
                'job_type' => 'full_time',
                'salary_min' => 90000,
                'salary_max' => 130000,
            ],
            [
                'title' => 'Frontend Developer - React/Next.js',
                'description' => 'Join our product team building a modern SaaS dashboard used by thousands of customers.',
                'skills_required' => ['React', 'Next.js', 'TypeScript'],
                'location' => 'Remote',
                'job_type' => 'full_time',
                'salary_min' => 80000,
                'salary_max' => 120000,
            ],
            [
                'title' => 'DevOps Engineer (Contract)',
                'description' => 'Short-term contract to help migrate our infrastructure to AWS with full CI/CD pipelines.',
                'skills_required' => ['AWS', 'Docker', 'CI/CD'],
                'location' => 'Remote',
                'job_type' => 'contract',
                'salary_min' => 50,
                'salary_max' => 80,
            ],
            [
                'title' => 'Junior Full Stack Developer',
                'description' => 'Great entry-level opportunity for someone early in their career, with mentorship provided.',
                'skills_required' => ['PHP', 'JavaScript', 'MySQL'],
                'location' => 'Bangalore, India',
                'job_type' => 'full_time',
                'salary_min' => 400000,
                'salary_max' => 600000,
            ],
            [
                'title' => 'Product Design Intern',
                'description' => 'Summer internship for a design student interested in SaaS product design.',
                'skills_required' => ['Figma', 'UI/UX'],
                'location' => 'Remote',
                'job_type' => 'internship',
                'salary_min' => null,
                'salary_max' => null,
            ],
        ];

        foreach ($jobs as $job) {
            JobPosting::create(array_merge($job, [
                'employer_id' => $employer->id,
                'status' => 'active',
            ]));
        }
    }
}
