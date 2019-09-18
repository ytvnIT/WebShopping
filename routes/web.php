<?php



Route::get('/', 'Pages\\NonAuths\\HomeController@index');
Route::get('/features', 'Pages\\NonAuths\\FeaturesController@index');
Route::get('/about-us', 'Pages\\NonAuths\\AboutUsController@index');
Route::get('/listing', 'Pages\\NonAuths\\ListingController@index');
Route::get('/galllery', 'Pages\\NonAuths\\GalleryController@index');
Route::get('/blog', 'Pages\\NonAuths\\BlogController@index');
Route::get('/contact-us', 'Pages\\NonAuths\\ContactUsController@index');

Auth::routes();
Route::get('/home', 'Pages\\Auths\\HomeController@index');