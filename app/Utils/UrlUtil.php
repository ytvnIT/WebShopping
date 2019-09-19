<?php

namespace App\Utils;

class UrlUtil {
    public static function home() {
        return "/";
    }
    public static function contactUs() {
        return "/contact-us";
    }
    public static function about() {
        return "/about";
    }
    public static function services() {
        return "/services";
    }
    public static function news() {
        return "/news";
    }
    public static function error404() {
        return "/error-404";
    }
    

    public function getHome() { return UrlUtil::home(); }
    public function getContactUs() { return UrlUtil::contactUs(); }
    public function getAbout() { return UrlUtil::about(); }
    public function getServices() { return UrlUtil::services(); }
    public function getNews() { return UrlUtil::news(); }
}
