<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;

class DetailProduct extends BaseModel
{
    public function __construct () {
        parent::__construct();

        $this->table = "detail_products";
        $this->fillable = array_merge($this->fillable, array(
            "product_id",
            "src",
            "decription",
            "detail",
        ));
    }

    public static function getSingle($id) {

        return [
            'detail' => DetailProduct::where('product_id', $id)
            ->get(),
        ];
    }
}

