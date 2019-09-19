<?php



Route::get('/', 'Pages\\NonAuths\\HomeController@index');
Route::get('/codes', 'Pages\\NonAuths\CodesController@index');
Route::get('/checkout', 'Pages\\NonAuths\\CheckOutController@index');
Route::get('/electronic', 'Pages\\NonAuths\\ElectronicController@index');
Route::get('/mens', 'Pages\\NonAuths\\MensController@index');
Route::get('/single', 'Pages\\NonAuths\\SingleController@index');
Route::get('/womens', 'Pages\\NonAuths\\WomensController@index');
Route::get('/contact', 'Pages\\NonAuths\\ContactController@index');

Auth::routes();
Route::get('/home', 'Pages\\Auths\\HomeController@index');