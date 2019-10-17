<?php
namespace App\Utils;

class UrlUtil {
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
    public static function electronic() {
        return "/electronic";
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
    public static function clothings() {
        return "/clothings";
    }
    public static function shoes() {
        return "/shoes";
    }
    public static function watches() {
        return "/watches";
    }
    public static function bags() {
        return "/bags";
    }
    public static function accessories() {
        return "/accessories";
    }
    public static function belts() {
        return "/belt";
    }
    public function getHome() {return UrlUtil :: home(); }
    public function getCheckOut() {return UrlUtil :: checkout(); }
    public function getCodes() {return UrlUtil :: codes(); }
    public function getContact() {return UrlUtil :: contact(); }
    public function getElectronic() {return UrlUtil :: electronic(); }
    public function getSingle() {return UrlUtil :: single(); }
    public function getWomens() {return UrlUtil :: womens(); }

    public function getMens() {return UrlUtil :: mens(); }
    public function getClothings() {return UrlUtil :: clothings(); }
    public function getShoes() {return UrlUtil :: shoes(); }
    public function getWatches() {return UrlUtil :: watches(); }
    public function getBags() {return UrlUtil :: bags(); }
    public function getAccessories() {return UrlUtil :: accessories(); }
    public function getBelts() {return UrlUtil :: belts(); }


}
