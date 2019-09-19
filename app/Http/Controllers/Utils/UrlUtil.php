<?php
namespace App\Utils;

class Urltil {
    public static function home() {
        return "/";
    }
    public static function checkout() {
        return "/checkout";
    }
    public static function codes() {
        return "/codes";
    }
    public static function contact() {
        return "/contact";
    }
    public static function electronics() {
        return "/electronics";
    }
    public static function mens() {
        return "/mens";
    }
    public static function single() {
        return "/single";
    }
    public static function womens() {
        return "/womens";
    }

    public function getHome() {return UrlUtil :: home(); }
    public function getCheckOut() {return UrlUtil :: checkout(); }
    public function getCodes() {return UrlUtil :: codes(); }
    public function getContact() {return UrlUtil :: contact(); }
    public function getElectronics() {return UrlUtil :: electronics(); }
    public function getSingle() {return UrlUtil :: single(); }
    public function getWomens() {return UrlUtil :: womens(); }

}