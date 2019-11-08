<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
namespace App\Http\Controllers\Apis\Authentication;

use App\Http\Controllers\Apis\ApiController;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use App\Models\PasswordReset;
session_start();
class ResetPasswordController extends ApiController
{
    
    public function __construct() {
        $this->model = "App\Models\User";
    }
    private $email;
    public function changePassword(){ 
        $password="";
        $token="";
        $email=$_SESSION["email"];
       
        // session_destroy();
        if(array_key_exists("password",$_POST))
            $password=$_POST['password'];
        if(array_key_exists("token",$_POST))
            $token=$_POST['token'];
        
        $result=$this->model::setPassword($email, $password, $token);

        return $result;
        if($result==1)
            return 'success';
        return 'fail';

        
    }
    public function sendToken(){  
        if(array_key_exists("email",$_POST))
            $this->email=$_POST['email'];
        $email = $this->model::isExistEmail($this->email);
        
        if($email!=null){
          $this->sendMail($this->email);
          $_SESSION["email"] = $this->email;
        }
         else
            return "Email haven't been register";
    }

    public function sendMail($mailTo){   
        $mailTo="uitappteam@gmail.com";
        $mail = new PHPMailer(true);           
        try {
            //Server settings
            $mail->SMTPDebug = 3;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'uitappteam@gmail.com';     
            $mail->Password='Eocomatkhau123';                // SMTP username
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
            $mail->SMTPSecure = "tls";        // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
            //Recipients
            $mail->setFrom('uitappteam@gmail.com', 'UIT');
            $mail->addAddress($mailTo);               // Name is optional
            // Content
            $token=rand(1000,9999);
            //set token to database
            PasswordReset::setToken($this->email,$token);
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'UIT APP TEAM - Reset password';
            $mail->Body    = '<h2>UIT APP TEAM</h2> <br>Chúng tôi đang hỗ trợ bạn reset mật khẩu.<br>Đây là OTP của bạn: ' . $token . '<br> Trân trọng!<br> Cảm ơn';
            $mail->AltBody =  '<h2>UIT APP TEAM</h2> <br>Chúng tôi đang hỗ trợ bạn reset mật khẩu.<br>Đây là OTP của bạn: ' . $token . '<br> Trân trọng!<br> Cảm ơn';

            $mail->send();
            // echo 'Message has been sent';
        } catch (Exception $e) {
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    
    function cast_to_model($input) {
        $obj = new $this->model($input);
        return $obj;
    }

}