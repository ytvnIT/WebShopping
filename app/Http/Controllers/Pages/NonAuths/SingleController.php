<?php

namespace App\Http\Controllers\Pages\NonAuths;

use App\Http\Controllers\Pages\NonAuthController;
use Illuminate\Http\Request;
use App\Models\MainProduct;
class SingleController extends NonAuthController
{
    public function __construct() {
        parent::__construct();
    }
    //
    public function index ($id) {
        return $this->view("single",[
            'detail'=>MainProduct::where('id',$id)->get()
        ]);
    }
}
