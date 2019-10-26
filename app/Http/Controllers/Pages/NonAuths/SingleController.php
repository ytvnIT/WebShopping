<?php

namespace App\Http\Controllers\Pages\NonAuths;

use App\Http\Controllers\Pages\NonAuthController;
use Illuminate\Http\Request;
use App\Models\DetailProduct;
use App\Models\Product;
class SingleController extends NonAuthController
{
    public function __construct() {
        parent::__construct();
    }
    //
    public function index ($id) {
        $detail_product=DetailProduct::where('product_id',$id)->get();
        $product=Product::where('product_id', $id)->get();

        $src=explode('@',$detail_product[0]['src']);
        $detail=explode('@',$detail_product[0]['detail']);
        $decription=$detail_product[0]['decription'];
        $price_old=$product[0]['priceold'];
        $price_special=$product[0]['pricespecial'];
       
        // return [
        //     'details'=>$detail,
        //     "srcs"=>$src,
        //     "decriptions"=>$decription,
        //     'price_old'=>$price_old,
        //     'price_special'=>$price_special
        // ];
        return $this->view("single",[
            'details'=>$detail,
            "srcs"=>$src,
            "decriptions"=>$decription,
            'price_old'=>$price_old,
            'price_special'=>$price_special
        ]);
    }
}
