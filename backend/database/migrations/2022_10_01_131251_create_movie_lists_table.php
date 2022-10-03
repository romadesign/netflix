<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMovieListsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('movie_lists', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('film_id');
			$table->unsignedBigInteger('account_id');
			$table->timestamps();

			$table->foreign('film_id')->references('id')->on('films')->onDelete('cascade');
			$table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('movie_lists');
	}
}
