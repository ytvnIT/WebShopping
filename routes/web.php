<?php

use App\Utils\UrlUtil;
use App\Models\MainProduct;

Route::get(UrlUtil::home(), 'Pages\\NonAuths\\HomeController@index');
Route::get(UrlUtil::codes(), 'Pages\\NonAuths\CodesController@index');
Route::get(UrlUtil::checkout(), 'Pages\\NonAuths\\CheckOutController@index');
Route::get(UrlUtil::electronic(), 'Pages\\NonAuths\\ElectronicController@index');
Route::get(UrlUtil::mens(), 'Pages\\NonAuths\\MensController@clothing');
Route::get('/single/{id}', 'Pages\\NonAuths\\SingleController@index');
Route::get(UrlUtil::womens(), 'Pages\\NonAuths\\WomensController@index');
Route::get(UrlUtil::contact(), 'Pages\\NonAuths\\ContactController@index')->name("contact");

Route::group(['prefix'=>UrlUtil::mens()], function(){
    Route::get(UrlUtil::clothings().'/{p}', 'Pages\\NonAuths\\MensController@clothing')->where('p', '[0-9]+');
    Route::get(UrlUtil::shoes().'/{p}', 'Pages\\NonAuths\\MensController@shoe')->where('p', '[0-9]+');
    Route::get(UrlUtil::watches(), 'Pages\\NonAuths\\MensController@watch');
    Route::get(UrlUtil::bags(), 'Pages\\NonAuths\\MensController@bag');
    Route::get(UrlUtil::sunglasses(), 'Pages\\NonAuths\\MensController@sunglasse');
    Route::get(UrlUtil::belts(), 'Pages\\NonAuths\\MensController@belt');

});
    Route::group(['prefix'=>UrlUtil::womens()], function(){
    Route::get(UrlUtil::clothings(), 'Pages\\NonAuths\\MensController@clothing')->where('p', '[0-9]+');
    Route::get(UrlUtil::shoes(), 'Pages\\NonAuths\\MensController@shoe');
    Route::get(UrlUtil::watches(), 'Pages\\NonAuths\\MensController@watch');
    Route::get(UrlUtil::bags(), 'Pages\\NonAuths\\MensController@bag');
    Route::get(UrlUtil::sunglasses(), 'Pages\\NonAuths\\MensController@sunglasse');
    Route::get(UrlUtil::belts(), 'Pages\\NonAuths\\MensController@belt');
});

Auth::routes();// câu lệnh sau dòng này cần phải login
Route::get('/home', 'Pages\\Auths\\HomeController@index');
