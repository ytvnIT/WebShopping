<?php

namespace App\Models;
class MainProduct extends BaseModel
{
    public function __construct () {
        parent::__construct();

        $this->table = "main_products";
        $this->fillable = array_merge($this->fillable, array(
            "title",
            "priceold",
            "pricespecial",
            "discountpercent",
            "src",
            "category_id"
        ));
    }
}

