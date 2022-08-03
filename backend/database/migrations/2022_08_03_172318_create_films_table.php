<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilmsTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('films', function (Blueprint $table) {
			$table->id();
			$table->foreignId('provider_id');
			$table->string('title');
			$table->longText('description');
			$table->boolean('movieStatus');
			$table->string('duration');
			$table->string('studio');
			$table->json('protagonists');
			$table->string('country');
			$table->string('premiere');
			$table->json('category');
			$table->json('genre');
			$table->integer('rating');
			$table->text('director');
			$table->text('producer');
			$table->text('award');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('films');
	}
}
