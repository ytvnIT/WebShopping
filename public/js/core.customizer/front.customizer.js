/* Add custom sidebar */


var custom_options  = '	<div class="custom_options_shadow"></div>';
custom_options  +='	<div id="custom_options" class="custom_options co_light">';
custom_options  +='<a href="#" id="co_toggle" class="icon-params-light"></a>';
custom_options  +='	<div class="co_header">';
custom_options  +='  <div class="co_title">';
custom_options  +='	   <span>Style switcher</span>';
custom_options  +='		 <a href="#" id="co_template_reset" class="co_reset icon-retweet" title="Reset to defaults">RESET</a>';
custom_options  +='  </div>';
custom_options  +='	</div>';	
custom_options  +='	<div id="sc_custom_scroll" class="co_options sc_scroll sc_scroll_vertical">	';
custom_options  +='	 <div class="sc_scroll_wrapper swiper-wrapper">';	
custom_options  +='   <div class="sc_scroll_slide swiper-slide">';
custom_options  +='   	<input type="hidden" id="co_site_url" name="co_site_url" value="index.html" />';
custom_options  +='       <div class="co_section">';
custom_options  +='			<div class="co_label">Color scheme</div>';
custom_options  +='			<div id="co_scheme_list" class="co_image_check" data-options="body_scheme">';
custom_options  +='				<a href="#" id="scheme_orange" class="co_scheme_wrapper active" data-value="orange">';
custom_options  +=' 				<span>Orange</span>';
custom_options  +='				</a>';
custom_options  +='				<a href="#" id="scheme_blue" class="co_scheme_wrapper" data-value="blue">';
custom_options  +='					<span>Blue</span>';
custom_options  +='				</a>';
custom_options  +='				<a href="#" id="scheme_green" class="co_scheme_wrapper" data-value="green">';
custom_options  +='					<span>Green</span>';
custom_options  +='				</a>';
custom_options  +='				<a href="#" id="scheme_bronze" class="co_scheme_wrapper" data-value="bronze">';
custom_options  +='					<span>Bronze</span>';
custom_options  +='				</a>';
custom_options  +='			</div>';
custom_options  +='		</div>';
custom_options  +='	  </div>';
custom_options  +='  </div>';
custom_options  +='  <div id="sc_custom_scroll_bar" class="sc_scroll_bar sc_scroll_bar_vertical sc_custom_scroll_bar"></div>';
custom_options  +='	</div>';
custom_options  +='</div>';

jQuery('body').append(custom_options);

// Customization panel

jQuery(document).ready(function() {
	"use strict";

	// Open/close panel
	if (jQuery('#custom_options').length > 0) {

		jQuery('#co_toggle').click(function(e) {
			"use strict";
			var co = jQuery('#custom_options').eq(0);
			if (co.hasClass('opened')) {
				co.removeClass('opened');
				jQuery('body').removeClass('custom_options_opened');
				jQuery('.custom_options_shadow').fadeOut(500);
			} else {
				co.addClass('opened');
				jQuery('body').addClass('custom_options_opened');
				jQuery('.custom_options_shadow').fadeIn(500);
			}
			e.preventDefault();
			return false;
		});
		jQuery('.custom_options_shadow').click(function(e) {
			"use strict";
			jQuery('#co_toggle').trigger('click');
			e.preventDefault();
			return false;
		});

		// First open custom panel
		if (BESTDEALS_GLOBALS['demo_time'] > 0) {
			if (bestdeals_get_cookie('bestdeals_custom_options_demo') != 1 ){
				setTimeout(function() { jQuery("#co_toggle").trigger('click'); }, BESTDEALS_GLOBALS['demo_time']);
				bestdeals_set_cookie('bestdeals_custom_options_demo', '1', 1);
			}
		}

		bestdeals_custom_options_reset(!BESTDEALS_GLOBALS['remember_visitors_settings']);

		jQuery('#custom_options #co_template_reset').click(function (e) {
			"use strict";
			jQuery('#custom_options .co_section').each(function () {
				"use strict";
				jQuery(this).find('div[data-options]').each(function() {
					var opt = jQuery(this).data('options');
					if (BESTDEALS_GLOBALS['remember_visitors_settings']) 
						bestdeals_del_cookie(opt);
					else
						bestdeals_custom_options_remove_option_from_url(opt);
				});
			});
			bestdeals_custom_options_show_loader();
			//window.location.reload();
			window.location.href = jQuery('#co_site_url').val();
			e.preventDefault();
			return false;
		});

		// Switcher
		var swither = jQuery("#custom_options .co_switch_box:not(.inited)" )
		if (swither.length > 0) {
			swither.each(function() {
				jQuery(this).addClass('inited');
				bestdeals_custom_options_switcher(jQuery(this));
			});
			jQuery("#custom_options .co_switch_box a" ).click(function(e) {
				"use strict";
				var value = jQuery(this).data('value');
				var wrap = jQuery(this).parent('.co_switch_box');
				var options = wrap.data('options');
				wrap.find('.switcher').data('value', value);
				if (BESTDEALS_GLOBALS['remember_visitors_settings']) bestdeals_set_cookie(options, value, 1);
				bestdeals_custom_options_reset(true);
				bestdeals_custom_options_switcher(wrap);
				bestdeals_custom_options_apply_settings(options, value);
				e.preventDefault();
				return false;
			});
		}

		// ColorPicker
		bestdeals_color_picker();
		jQuery('#custom_options .iColorPicker').each(function() {
			"use strict";
			jQuery(this).css('backgroundColor', jQuery(this).data('value'));
		});

		jQuery('#custom_options .iColorPicker').click(function (e) {
			"use strict";
			bestdeals_color_picker_show(null, jQuery(this), function(fld, clr) {
				"use strict";
				var val = fld.data('value');
				var options = fld.data('options');
				fld.css('backgroundColor', clr);
				if (BESTDEALS_GLOBALS['remember_visitors_settings']) bestdeals_set_cookie(options, clr, 1);
				if (options == 'bg_color') {
					if (BESTDEALS_GLOBALS['remember_visitors_settings'])  {
						bestdeals_del_cookie('bg_image');
						bestdeals_del_cookie('bg_pattern');
					}
				}
				bestdeals_custom_options_reset(true);
				bestdeals_custom_options_apply_settings(options, clr);
			});
		});
		
		// Color scheme
		jQuery('#custom_options #co_scheme_list a').click(function(e) {
			"use strict";
			jQuery('#custom_options #co_scheme_list .co_scheme_wrapper').removeClass('active');
			var obj = jQuery(this).addClass('active');
			var val = obj.data('value');
			if (BESTDEALS_GLOBALS['remember_visitors_settings'])  {
				bestdeals_set_cookie('body_scheme', val, 1);
			}
			bestdeals_custom_options_reset(true);
			bestdeals_custom_options_apply_settings('body_scheme', val);
			e.preventDefault();
			return false;
		});
		
		// Background patterns
		jQuery('#custom_options #co_bg_pattern_list a').click(function(e) {
			"use strict";
			jQuery('#custom_options #co_bg_pattern_list .co_pattern_wrapper,#custom_options #co_bg_images_list .co_image_wrapper').removeClass('active');
			var obj = jQuery(this).addClass('active');
			var val = obj.attr('id').substr(-1);
			if (BESTDEALS_GLOBALS['remember_visitors_settings'])  {
				bestdeals_del_cookie('bg_color');
				bestdeals_del_cookie('bg_image');
				bestdeals_set_cookie('bg_pattern', val, 1);
			}
			bestdeals_custom_options_reset(true);
			bestdeals_custom_options_apply_settings('bg_pattern', val);
			if (jQuery("#custom_options .co_switch_box .switcher").data('value') != 'boxed') {
				BESTDEALS_GLOBALS['co_add_params'] = {'bg_pattern': val};
				jQuery("#custom_options .co_switch_box a[data-value='boxed']").trigger('click');
			}
			e.preventDefault();
			return false;
		});

		// Background images
		jQuery('#custom_options #co_bg_images_list a').click(function(e) {
			"use strict";
			jQuery('#custom_options #co_bg_images_list .co_image_wrapper, #custom_options #co_bg_pattern_list .co_pattern_wrapper').removeClass('active');
			var obj = jQuery(this).addClass('active');
			var val = obj.attr('id').substr(-1);
			if (BESTDEALS_GLOBALS['remember_visitors_settings'])  {
				bestdeals_del_cookie('bg_color');
				bestdeals_del_cookie('bg_pattern');
				bestdeals_set_cookie('bg_image', val, 1);
			}
			bestdeals_custom_options_reset(true);
			bestdeals_custom_options_apply_settings('bg_image', val);
			if (jQuery("#custom_options .co_switch_box .switcher").data('value') != 'boxed') {
				BESTDEALS_GLOBALS['co_add_params'] = {'bg_image': val};
				jQuery("#custom_options .co_switch_box a[data-value='boxed']").trigger('click');
			}
			e.preventDefault();
			return false;
		});

		jQuery('#custom_options #co_bg_pattern_list a, #custom_options #co_bg_images_list a, .iColorPicker').hover(
			function() {
				"use strict";
				jQuery(this).addClass('current');
			},
			function() {
				"use strict";
				jQuery(this).removeClass('current');
			}
		);
	}
});

jQuery(window).resize(function () {
	jQuery('#custom_options .sc_scroll').css('height',jQuery('#custom_options').height()-46);
})


// SwitchBox
function bestdeals_custom_options_switcher(wrap) {
	"use strict";
	var drag = wrap.find('.switcher').eq(0);
	var value = drag.data('value');
	var pos = wrap.find('a[data-value="'+value+'"]').position();
	if (pos != undefined) {
		drag.css({
			left: pos.left,
			top: pos.top
		});
	}
}

// Show Reset button
function bestdeals_custom_options_reset() {
	"use strict";

	var cooks = arguments[0] ? true : false;
	
	if (!cooks) {
		jQuery('#custom_options .co_section').each(function () {
			if (cooks) return;
	
			jQuery(this).find('div[data-options]').each(function() {
				var cook = bestdeals_get_cookie(jQuery(this).data('options'))
				if (cook != null && cook != undefined)
					cooks = true;			
			});
		});
	}
	if (cooks)
		jQuery('#custom_options').addClass('co_show_reset');			
	else
		jQuery('#custom_options').removeClass('co_show_reset');
}

// Remove specified option from URL
function bestdeals_custom_options_remove_option_from_url(option) {
	var pos = -1, pos2 = -1, pos3 = -1;
	var loc = jQuery('#co_site_url').val();
	if (loc && (pos = loc.indexOf('?')) > 0) {
		if ((pos2 = loc.indexOf(option, pos)) > 0) {
			if ((pos3 = loc.indexOf('&', pos2)) > 0)
				loc = loc.substr(0, pos2) + loc.substr(pos3);
			else
				loc = loc.substr(0, pos2);
		}
		if (loc.substr(-1)=='?') loc = loc.substr(0, loc.length-1);
		jQuery('#co_site_url').val(loc);
	}
}

// Show Loader
function bestdeals_custom_options_show_loader() {
	jQuery('.custom_options_shadow').addClass('loading');
}

// Apply settings
function bestdeals_custom_options_apply_settings(option, val) {
	//if (window.bestdeals_skin_customizer)
		bestdeals_skin_customizer(option, val);
	//else {
		//bestdeals_custom_options_show_loader();
		//location.reload();
	//}
}

