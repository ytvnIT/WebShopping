<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Product extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('product_id');
            $table->string('title')->nullable();
            $table->bigInteger('priceold')->nullable();
            $table->bigInteger('pricespecial')->nullable();
            $table->tinyInteger('discountpercent')->nullable();
            $table->string('src')->nullable();
            $table->bigInteger('category_id')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->timestamps();

            //$table->foreign('category_id')->references('category_id')->on('categorys');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
