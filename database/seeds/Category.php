<?php

use Illuminate\Database\Seeder;

class Category extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr=['quan_ao_nam', 'giay_dep_nam', 'dong_ho_nam', 'tui_xach_bop_vi_nam', 'that_lung_day_nit_nam', 'phu_kien_nam', 'vay_dam_nu', 'quan_ao_nu', 'dong_ho_nu', 'giay_dep_nu', 'tui_xach_bop_vi_nu', 'tui_xach_bop_vi_nu', 'phu_kien_nu'];
        DB::table('categorys')->insert($arr);
    }
}
