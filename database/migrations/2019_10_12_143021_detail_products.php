<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DetailProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('detail_products', function (Blueprint $table) {
            $table->bigIncrements('product_id')->nullable();
            $table->longText('src')->nullable();
            $table->longText('decription')->nullable();
            $table->longText('detail')->nullable();
            $table->timestamps();

            // $table->foreign('category_id')->references('category_id')->on('products');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
         Schema::dropIfExists('detail_products');
    }
}
