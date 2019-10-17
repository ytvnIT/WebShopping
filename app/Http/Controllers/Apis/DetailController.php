<?php

namespace App\Http\Controllers\Apis;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use \App\Models\DetailProduct;

class DetailController extends ApiController
{
    public function __construct() {
        $this->model = "App\Models\DetailProduct";
    }


    function cast_to_model($input) {
        $obj = new $this->model();
        return $obj;
    }
    public function getDetail($id) {
        return response()->json($this->model::getSingle($id));


    }


}
