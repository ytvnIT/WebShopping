<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends BaseModel
{
    public function __construct () {
        parent::__construct();

        $this->table = "categorys";
        $this->fillable = array_merge($this->fillable, array(
            'category_id',
            "category_name"
        ));
    }
    public static function getSingle($category_id) {
        return [
            'category' => Category::where('category_id', $category_id)
            ->get(),
        ];
    }
}

