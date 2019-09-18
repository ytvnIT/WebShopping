<?php

namespace App\Models;

class Product extends BaseModel
{
    public function __construct () {
        parent::__construct();

        $this->table = "products";
        $this->fillable = array_merge($this->fillable, array(
            "title",
            "author"
        ));
    }
}
