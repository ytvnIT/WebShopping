<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post("signup",'Apis\\Authentication\\RegisterController@create')->name("signup");
Route::post("signin",'Apis\\Authentication\\LoginController@login')->name("signin");//thuc thi xac thuc
// Route::get("/product", "Apis\\ProductController@index")->middleware("myauth");

Route::middleware('myauth:api')->get('/product', "Apis\\ProductController@index");

Route::post("reset",'Apis\\Authentication\\ResetPasswordController@sendToken')->name("reset");
Route::post("changepassword",'Apis\\Authentication\\ResetPasswordController@changePassword')->name("changepassword");

Route::get("getHeader",'Apis\\Authentication\\LoginController@getHeader');


Route::get("/main-product/{page}", "Apis\\MainProductController@getByPage");
Route::get("/detail-product/{id}", "Apis\\DetailController@getDetail");
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

