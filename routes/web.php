<?php

use App\Utils\UrlUtil;
use App\Models\MainProduct;

Route::get("android/", function(){
    return response()->json("DAI HOC CONG NGHE THONG TIN");
});
Route::get("android/array", function(){
    $a=['HO', 'CHI', 'MINH'];
    return response()->json($a);
});
Route::get("user", function(){
    $arr=[];
    $a=["username"=>"tran van nhu y", "password"=>"123"];
    $b=["username"=>"tran van nhu y dep trai", "password"=>"333"];
    array_push($arr,$a);
    array_push($arr,$b);
    return response()->json($arr);
});

Route::get("checkout", 'Pages\\NonAuths\\checkout@index');
Route::get(UrlUtil::home(), 'Pages\\NonAuths\\HomeController@index');
Route::get(UrlUtil::codes(), 'Pages\\NonAuths\CodesController@index');
// Route::get(UrlUtil::checkout(), 'Pages\\NonAuths\\CheckOutController@index');
Route::get(UrlUtil::electronic(), 'Pages\\NonAuths\\ElectronicController@index');
Route::get(UrlUtil::mens(), 'Pages\\NonAuths\\MensController@clothing');
Route::get('/single/{id}', 'Pages\\NonAuths\\SingleController@index');
Route::get(UrlUtil::womens(), 'Pages\\NonAuths\\WomensController@index');
Route::get(UrlUtil::contact(), 'Pages\\NonAuths\\ContactController@index')->name("contact");

Route::group(['prefix'=>UrlUtil::mens()], function(){
    Route::get(UrlUtil::clothings().'/{page}', 'Pages\\NonAuths\\MensController@clothing')->where('page', '[0-9]+');
    Route::get(UrlUtil::shoes().'/{page}', 'Pages\\NonAuths\\MensController@shoe')->where('page', '[0-9]+');
    Route::get(UrlUtil::watches().'/{page}', 'Pages\\NonAuths\\MensController@watch');
    Route::get(UrlUtil::bags().'/{page}', 'Pages\\NonAuths\\MensController@bag');
    Route::get(UrlUtil::accessories().'/{page}', 'Pages\\NonAuths\\MensController@accessories');
    Route::get(UrlUtil::belts().'/{page}', 'Pages\\NonAuths\\MensController@belt');

});
    Route::group(['prefix'=>UrlUtil::womens()], function(){
    Route::get(UrlUtil::clothings().'/{page}', 'Pages\\NonAuths\\MensController@clothing')->where('p', '[0-9]+');
    Route::get(UrlUtil::shoes().'/{page}', 'Pages\\NonAuths\\MensController@shoe');
    Route::get(UrlUtil::watches().'/{page}', 'Pages\\NonAuths\\MensController@watch');
    Route::get(UrlUtil::bags().'/{page}', 'Pages\\NonAuths\\MensController@bag');
    Route::get(UrlUtil::accessories().'/{page}', 'Pages\\NonAuths\\MensController@accessories');
    Route::get(UrlUtil::belts().'/{page}', 'Pages\\NonAuths\\MensController@belt');
});

Auth::routes();// câu lệnh sau dòng này cần phải login
Route::get('/home', 'Pages\\Auths\\HomeController@index');
