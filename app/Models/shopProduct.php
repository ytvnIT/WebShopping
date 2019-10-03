<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class shopProduct extends Model
{
    protected $fillable=[
        "title",
        "priceold",
        "pricespecial",
        "discountpercent",
        "src",
        "category_id"
    ];
}
