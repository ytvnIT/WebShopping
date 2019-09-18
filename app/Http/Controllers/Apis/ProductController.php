<?php

namespace App\Http\Controllers\Apis;

use \App\Models\Product;

class ProductController extends ApiController
{

    public function __construct() {
        $this->model = "App\Models\Product";
    }

    //
    function cast_to_model($input) {
        $obj = new $this->model();
        $obj->title = "Hello";
        $obj->author = "Loucias";
        return $obj;
    }

    public function index () {
        

        return Product::get();
    }
    
}
