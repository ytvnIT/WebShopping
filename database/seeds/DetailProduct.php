<?php

use Illuminate\Database\Seeder;

class DetailProduct extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json=File::get('E:\Web\Crawl_Code\detail_shopping_edit_format2.json');

        $data=json_decode($json);
        $arr=[];
        foreach($data as $obj){
            array_push($arr, array(
                "src" => $obj->src,
                "decription" => $obj->decription,
                "detail" => $obj->detail,

            ));
        }
        DB::table('detail_products')->insert($arr);
    }
}

