<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\CookieController;
use Illuminate\Support\Facades\Auth;

abstract class ApiController extends CookieController
{
    protected $user;
    protected $model;

    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth');
        $this->user = Auth::user();
    }


    public abstract function cast_to_model($input);

    public function create() {
        $obj = $this->cast_to_model(["a" => 321321321]);
        return $obj;
    }
    public function read() {

    }
    public function update() {

    }
    public function delete() {

    }

    public function getByPage($page) {
        // var_dump($user);
        return response()->json($this->model::getByPage($page, 1));
    }


    // public abstract function before_create();
    // public abstract function before_update();
    // public abstract function after_create();
    // public abstract function after_update();
}
