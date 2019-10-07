<?php

namespace App\Http\Controllers\Pages\NonAuths;

use App\Http\Controllers\Pages\NonAuthController;
use Illuminate\Http\Request;
use App\Models\MainProduct;
class MensController extends NonAuthController
{
    public function __construct() {
        parent::__construct();
    }
    public function clothing () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '1')->take(11)->get(),
        ]);
    }
    public function shoe () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '2')
        ->take(11)
        ->get(),
        ]);
    }
    public function watch () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '3')
        ->take(11)
        ->get(),
        ]);
    }
    public function bag () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '4')
        ->take(11)
        ->get(),
        ]);
    }
    public function belt () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '5')
        ->take(11)
        ->get(),
        ]);
    }
    public function sunglasse () {
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '6')
        ->take(11)
        ->get(),
        ]);
    }
    
}
