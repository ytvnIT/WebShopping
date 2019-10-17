<?php

use Illuminate\Database\Seeder;
use App\Models\Product;

class ShopProductCastTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $json=File::get('C:\Users\Admin\Desktop\Shopping_Card\database\seeds\data_shopping.json');
        $json=File::get('E:\Web\Crawl_Code\data_shopping_with_href2.json');

        $data=json_decode($json);
        $arr=[];
        foreach($data as $obj){
            array_push($arr, array(
                "title" => $obj->title,
                "priceold" => $obj->priceold,
                "pricespecial" => $obj->pricespecial,
                "discountpercent" => $obj->discountpercent,
                "src" => $obj->src,
                "category_id" => $obj->category_id
            ));
        }
        DB::table('products')->insert($arr);
    }
}
