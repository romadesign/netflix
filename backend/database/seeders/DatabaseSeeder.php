<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //remove table
        DB::table('users')->truncate();
        DB::table('films')->truncate();
        //Create data
        User::factory(5)->create();
        Film::factory(5)->create();
    }
}
