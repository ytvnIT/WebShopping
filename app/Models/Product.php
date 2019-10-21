<?php

namespace App\Models;
class Product extends BaseModel
{
    public function __construct () {
        parent::__construct();

        $this->table = "products";
            $this->fillable = array_merge($this->fillable, array(
                "title",
                "priceold",
                "pricespecial",
                "discountpercent",
                "src",
                "category_id"
            ));
    }

    public static function getByPage($page, $category_id) {
        $count_product= Product::where('category_id', $category_id)->count();
        $page_num = ceil($count_product / 11);
        if($page > $page_num){
            $page = $page_num;
        }
        return [
            'products' => Product::where('category_id', $category_id)
            ->offset(($page-1) * 11)
            ->limit(11)
            ->get(),
            'max_page'=>$page_num,
            'page'=>$page
        ];
    }
}

