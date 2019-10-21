<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends BaseModel
{
    public function __construct(){
        parent::__construct();
        $this->table="users";
        $this->fillable = array_merge($this->fillable, array(
           "name",
           "email",
           "password"
        ));
    }

    public static function getuser() {
        return [
            'detail' => User::find(1)
        ];
    }
    
}
