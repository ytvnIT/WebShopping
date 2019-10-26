<?php
namespace App\Http\Controllers\Apis\Authentication;
use App\Http\Controllers\Apis\ApiController;
use Illuminate\Http\Request;
require_once( __DIR__ . "/../../../../libs/jwt.php");
class LoginController extends ApiController
{
    public function __construct() {
        $this->model = "App\Models\User";
    }

    public function dangnhap(){
        return view('partials.signin'); 
    }
    public function login(){      
       
        $doc = new $this->model ();
        $name="";
        $password="";
        
        if(array_key_exists("password",$_POST))
            $password=$_POST['password'];
        if(array_key_exists("name",$_POST))
            $name=$_POST['name'];
        
        // return ($doc->login($name, $password));
        echo "Login success";
        
    }

    public function getHeader(){
        $headers = apache_request_headers();
        // echo ($headers['Authorization']);
        list($header, $payload) = explode(" ", $headers['Authorization']);
        if(verifyJWT($payload))
            return "true";
        return "false";
    
        // foreach($headers as $key=>$value){
        //     echo $key . "         -           " . $value . "</br>";
        // }
    }

    function cast_to_model($input) {
        $obj = new $this->model($input);
        return $obj;
    }
}
