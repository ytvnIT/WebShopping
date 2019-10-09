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

     public function clothing ($p) {

        $count_product= MainProduct::where('category_id', '1')->count();
        //select count(*) from main_product where category_id="1" 243
        $page_num=ceil($count_product/11);
        if($p>$page_num){
            $p=$page_num;
        }
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '1')
            ->offset(($p-1)*11)
            ->limit(11)
            ->get(),
            'max_page'=>$page_num,
            'page'=>$p
        ]);
    }

    public function shoe ($p) {
        $count_product= MainProduct::where('category_id', '2')->count();
        $page_num=ceil($count_product/11);
        if($p>$page_num){
            $p=$page_num;
        }
        return $this->view("mens", [
            'products' => MainProduct::where('category_id', '2')
            ->offset(($p-1)*11)
            ->limit(11)
            ->get(),
            'max_page'=>$page_num,
            'page'=>$p
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
