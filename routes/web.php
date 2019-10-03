<?php

use App\Utils\UrlUtil;


Route::get(UrlUtil::home(), 'Pages\\NonAuths\\HomeController@index');
Route::get(UrlUtil::codes(), 'Pages\\NonAuths\CodesController@index');
Route::get(UrlUtil::checkout(), 'Pages\\NonAuths\\CheckOutController@index');
Route::get(UrlUtil::electronic(), 'Pages\\NonAuths\\ElectronicController@index');
Route::get(UrlUtil::mens(), 'Pages\\NonAuths\\MensController@index');
Route::get(UrlUtil::single(), 'Pages\\NonAuths\\SingleController@index');
Route::get(UrlUtil::womens(), 'Pages\\NonAuths\\WomensController@index');
Route::get(UrlUtil::contact(), 'Pages\\NonAuths\\ContactController@index');

// Route::get('/contact', 'Pages\\NonAuths\\ContactController@index');
// Route::get('/contact', function(){
//     return view('contact');
// });

Auth::routes();// câu lệnh sau dòng này cần phải login
Route::get('/home', 'Pages\\Auths\\HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
