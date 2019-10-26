<?php

namespace App\Http\Middleware;

use Closure;

class MyAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = apache_request_headers();
        if(array_key_exists("Authorization",$headers)){
            list($header, $payload) = explode(" ", $headers['Authorization']);
            if(verifyJWT($payload))
                return $next($request);
        }
        return redirect()->route('dangnhap');          
    }
}
