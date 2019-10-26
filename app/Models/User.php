<?php
namespace App\Models;
require_once( __DIR__ ."/../libs/jwt.php");
use Illuminate\Database\Eloquent\Model;

class User extends BaseModel
{
    private $options = [
        'cost' => 10
    ];

    public function __construct(){
        parent::__construct();
        $this->table="users";
        $this->fillable = array_merge($this->fillable, array(
           "name",
           "email",
           "password"
        ));
    }

    public function before_create(BaseModel &$doc) {
        $doc->password = password_hash($doc->password, PASSWORD_BCRYPT, $this->options);
    }

    public function before_update(BaseModel &$new_doc, BaseModel &$old_doc) {
        
    }

    public function login($name, $password){
        
        $data=User::where('name',$name)->get();//sau khi select du lieu nay dang [{}] 
        $user=$this->castToModel($data, $this);//cast thanh user model

        if (!is_null($user)) {
            if (password_verify($password, $user->password)) {
                return generateJWT(array(
                    "username" => $user->name,
                    "id" => $user->id,
            
                ));
            }
        }
        // return response()->json($user);
        return "falreewsd";
    }
    public static function getuser() {
        return [
            'detail' => User::find(1)
        ];
    }
    
}
