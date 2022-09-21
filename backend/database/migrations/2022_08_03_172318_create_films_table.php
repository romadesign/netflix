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
            $table->string('title');
            $table->longText('description');
            $table->unsignedBigInteger('provider_id');
            $table->unsignedBigInteger('categorie_id');
            $table->string('backdrop_path');
            $table->longText('poster_path');
            $table->boolean('movieStatus');
            $table->string('duration');
            $table->string('studio');
            $table->json('protagonists');
            $table->string('country');
            $table->string('premiere');
            $table->json('genre');
            $table->integer('rating');
            $table->text('director');
            $table->text('producer');
            $table->text('award');
            $table->timestamps();

            $table->foreign('provider_id')->references('id')->on('users');
            $table->foreign('categorie_id')->references('id')->on('categories');

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
