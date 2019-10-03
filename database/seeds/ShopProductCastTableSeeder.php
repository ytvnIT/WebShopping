<?php

use Illuminate\Database\Seeder;
use App\Models\shopProduct;

class ShopProductCastTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $json=File::get('D:\Xampp\htdocs\Shopping\Shopping_Card\database\seeds\data_shopping.json');
        $data=json_decode($json);
        foreach($data as $obj){
            // shopProduct::create(array(
                DB::table('shop_product')->insert(array(
                "title" => $obj->title,
                "priceold" => $obj->priceold,
                "pricespecial" => $obj->pricespecial,
                "discountpercent" => $obj->discountpercent,
                "src" => $obj->src,
                "category_id" => $obj->category_id
            ));
        }

    }
}
