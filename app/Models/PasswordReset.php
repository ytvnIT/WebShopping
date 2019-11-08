<?php
namespace App\Models;
require_once( __DIR__ ."/../libs/jwt.php");
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends BaseModel
{
    private $options = [
        'cost' => 10
    ];

    public function __construct(){
        parent::__construct();
        $this->table="password_resets";
        $this->fillable = array_merge($this->fillable, array(
           "email",
           "token",
           "created_at"
        ));
    }

    public function before_create(BaseModel &$doc) {
        $doc->password = password_hash($doc->password, PASSWORD_BCRYPT, $this->options);
    }

    public function before_update(BaseModel &$new_doc, BaseModel &$old_doc) {
        
    }
    public static function setToken($email, $token){
        $self = new static;
        $token = password_hash($token, PASSWORD_BCRYPT, $self->options);
        PasswordReset::insert([
            ['email' => $email, 'token' => $token, 'created_at'=> now()]
        ]);
    }

    
}
