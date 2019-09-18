jQuery(document).ready(function() {
 if (BESTDEALS_GLOBALS['template_font'] == '') BESTDEALS_GLOBALS['template_font'] = 'PT Serif';
    BESTDEALS_GLOBALS['template_skin_color'] = '#343434';
    BESTDEALS_GLOBALS['template_skin_bg_color'] = '#f9f9f9';

    BESTDEALS_GLOBALS["strings"] = {
        bookmark_add: "Add the bookmark",
        bookmark_added: "Current page has been successfully added to the bookmarks. You can see it in the right panel on the tab &#039;Bookmarks&#039;",
        bookmark_del: "Delete this bookmark",
        bookmark_title: "Enter bookmark title",
        bookmark_exists: "Current page already exists in the bookmarks list",
        search_error: "Error occurs in AJAX search! Please, type your query and press search icon for the traditional search way.",
        email_confirm: "On the e-mail address <b>%s</b> we sent a confirmation email.Please, open it and click on the link.",
        reviews_vote: "Thanks for your vote! New average rating is:",
        reviews_error: "Error saving your vote! Please, try again later.",
        error_like: "Error saving your like! Please, try again later.",
        error_global: "Global error text",
        name_empty: "The name can&#039;t be empty",
        name_long: "Too long name",
        email_empty: "Too short (or empty) email address",
        email_long: "Too long email address",
        email_not_valid: "Invalid email address",
        subject_empty: "The subject can&#039;t be empty",
        subject_long: "Too long subject",
        text_empty: "The message text can&#039;t be empty",
        text_long: "Too long message text",
        send_complete: "Send message complete!",
        send_error: "Transmit failed!",
        login_empty: "The Login field can&#039;t be empty",
        login_long: "Too long login field",
        login_success: "Login success! The page will be reloaded in 3 sec.",
        login_failed: "Login failed!",
        password_empty: "The password can&#039;t be empty and shorter then 4 characters",
        password_long: "Too long password",
        password_not_equal: "The passwords in both fields are not equal",
        registration_success: "Registration success! Please log in!",
        registration_failed: "Registration failed!",
        geocode_error: "Geocode was not successful for the following reason:",
        googlemap_not_avail: "Google map API not available!",
        editor_save_success: "Post content saved!",
        editor_save_error: "Error saving post data!",
        editor_delete_post: "You really want to delete the current post?",
        editor_delete_post_header: "Delete post",
        editor_delete_success: "Post deleted!",
        editor_delete_error: "Error deleting post!",
        editor_caption_cancel: "Cancel",
        editor_caption_close: "Close"
    };

   BESTDEALS_GLOBALS['ajax_url'] = '#';
        BESTDEALS_GLOBALS['ajax_nonce'] = 'b527c448fe';
        BESTDEALS_GLOBALS['ajax_nonce_editor'] = '1d93edd987';
        BESTDEALS_GLOBALS['site_url'] = 'http://bestdeals-html.axiomthemes.com';
        BESTDEALS_GLOBALS['template_font'] = 'PT Serif';
        BESTDEALS_GLOBALS['template_skin'] = 'bestdeals';
        BESTDEALS_GLOBALS['template_skin_color'] = '#343434';
        BESTDEALS_GLOBALS['template_skin_bg_color'] = '#f9f9f9';
        BESTDEALS_GLOBALS['slider_height'] = 100;
        BESTDEALS_GLOBALS['system_message'] = {
            message: '',
            status: '',
            header: ''
        };
        BESTDEALS_GLOBALS['user_logged_in'] = false;
        BESTDEALS_GLOBALS['toc_menu'] = 'float';
        BESTDEALS_GLOBALS['toc_menu_home'] = true;
        BESTDEALS_GLOBALS['toc_menu_top'] = true;
        BESTDEALS_GLOBALS['menu_fixed'] = true;
        BESTDEALS_GLOBALS['menu_relayout'] = 960;
        BESTDEALS_GLOBALS['menu_responsive'] = 640;
        BESTDEALS_GLOBALS['menu_slider'] = true;
        BESTDEALS_GLOBALS['demo_time'] = 0;
        BESTDEALS_GLOBALS['media_elements_enabled'] = true;
        BESTDEALS_GLOBALS['ajax_search_enabled'] = true;
        BESTDEALS_GLOBALS['ajax_search_min_length'] = 3;
        BESTDEALS_GLOBALS['ajax_search_delay'] = 200;
        BESTDEALS_GLOBALS['css_animation'] = true;
        BESTDEALS_GLOBALS['menu_animation_in'] = 'bounceIn';
        BESTDEALS_GLOBALS['menu_animation_out'] = 'fadeOutDown';
        BESTDEALS_GLOBALS['popup_engine'] = 'magnific';
        BESTDEALS_GLOBALS['email_mask'] = '^([a-zA-Z0-9_\-]+\.)*[a-zA-Z0-9_\-]+@[a-z0-9_\-]+(\.[a-z0-9_\-]+)*\.[a-z]{2,6}$';
        BESTDEALS_GLOBALS['contacts_maxlength'] = 1000;
        BESTDEALS_GLOBALS['comments_maxlength'] = 1000;
        BESTDEALS_GLOBALS['remember_visitors_settings'] = false;
        BESTDEALS_GLOBALS['admin_mode'] = false;
        BESTDEALS_GLOBALS['isotope_resize_delta'] = 0.3;
        BESTDEALS_GLOBALS['error_message_box'] = null;
        BESTDEALS_GLOBALS['viewmore_busy'] = false;
        BESTDEALS_GLOBALS['video_resize_inited'] = false;
        BESTDEALS_GLOBALS['top_panel_height'] = 0;

});

window._wpemojiSettings = {
    "baseUrl": "#",
    "ext": ".png",
    "source": {
    "concatemoji": ""
    }
}; 
   
! function(a, b, c) {
    function d(a) {
    var c, d, e, f = b.createElement("canvas"),
    g = f.getContext && f.getContext("2d"),
    h = String.fromCharCode;
    if (!g || !g.fillText) return !1;
    switch (g.textBaseline = "top", g.font = "600 32px Arial", a) {
        case "flag":
        return g.fillText(h(55356, 56806, 55356, 56826), 0, 0), f.toDataURL().length > 3e3;
        case "diversity":
        return g.fillText(h(55356, 57221), 0, 0), c = g.getImageData(16, 16, 1, 1).data, d = c[0] + "," + c[1] + "," + c[2] + "," + c[3], g.fillText(h(55356, 57221, 55356, 57343), 0, 0), c = g.getImageData(16, 16, 1, 1).data, e = c[0] + "," + c[1] + "," + c[2] + "," + c[3], d !== e;
        case "simple":
        return g.fillText(h(55357, 56835), 0, 0), 0 !== g.getImageData(16, 16, 1, 1).data[0];
        case "unicode8":
        return g.fillText(h(55356, 57135), 0, 0), 0 !== g.getImageData(16, 16, 1, 1).data[0]
    }
    return !1
}

function e(a) {
    var c = b.createElement("script");
        c.src = a, c.type = "text/javascript", b.getElementsByTagName("head")[0].appendChild(c)
    }
    var f, g, h, i;
        for (i = Array("simple", "flag", "unicode8", "diversity"), c.supports = {
            everything: !0,
            everythingExceptFlag: !0
        }, h = 0; h < i.length; h++) c.supports[i[h]] = d(i[h]), c.supports.everything = c.supports.everything && c.supports[i[h]], "flag" !== i[h] && (c.supports.everythingExceptFlag = c.supports.everythingExceptFlag && c.supports[i[h]]);
    c.supports.everythingExceptFlag = c.supports.everythingExceptFlag && !c.supports.flag, c.DOMReady = !1, c.readyCallback = function() {
    c.DOMReady = !0
    }, c.supports.everything || (g = function() {
        c.readyCallback()
    }, b.addEventListener ? (b.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1)) : (a.attachEvent("onload", g), b.attachEvent("onreadystatechange", function() {
        "complete" === b.readyState && c.readyCallback()
    })), f = c.source || {}, f.concatemoji ? e(f.concatemoji) : f.wpemoji && f.twemoji && (e(f.twemoji), e(f.wpemoji)))
}(window, document, window._wpemojiSettings);

var booked_js_vars = {
    "ajax_url": "#",
    "profilePage": "",
    "publicAppointments": "",
    "i18n_confirm_appt_delete": "Are you sure you want to cancel this appointment?",
    "i18n_please_wait": "Please wait ...",
    "i18n_wrong_username_pass": "Wrong username\/password combination.",
    "i18n_fill_out_required_fields": "Please fill out all required fields.",
    "i18n_guest_appt_required_fields": "Please enter your name to book an appointment.",
    "i18n_appt_required_fields": "Please enter your name, your email address and choose a password to book an appointment."
};

var mejsL10n = {
    "language": "en-US",
    "strings": {
        "Close": "Close",
        "Fullscreen": "Fullscreen",
        "Download File": "Download File",
        "Download Video": "Download Video",
        "Play\/Pause": "Play\/Pause",
        "Mute Toggle": "Mute Toggle",
        "None": "None",
        "Turn off Fullscreen": "Turn off Fullscreen",
        "Go Fullscreen": "Go Fullscreen",
        "Unmute": "Unmute",
        "Mute": "Mute",
        "Captions\/Subtitles": "Captions\/Subtitles"
    }
};

var _wpmejsSettings = {
    "pluginPath": "#"
};

var uiAutocompleteL10n = {
    "noResults": "No search results.",
    "oneResult": "1 result found. Use up and down arrow keys to navigate.",
    "manyResults": "%d results found. Use up and down arrow keys to navigate."
};
