<!-- banner -->
<div class="ban-top">
	<div class="container">
		<div class="top_nav_left">
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
				  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				  </button>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse menu--shylock" id="bs-example-navbar-collapse-1">
				  <ul class="nav navbar-nav menu__list">
					<li class="active menu__item menu__item--current"><a class="menu__link" href="{{$url->getHome()}}">Home <span class="sr-only">(current)</span></a></li>
					<li class="dropdown menu__item">
						<a href="#" class="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">men's wear <span class="caret"></span></a>
							<ul class="dropdown-menu multi-column columns-3">
								<div class="row">
									<div class="col-sm-6 multi-gd-img1 multi-gd-text ">
										<a href="{{$url->getMens()}}"><im	alt=" "/></a>
									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}">Clothing</a></li>
											<li><a href="{{$url->getMens()}}">Wallets</a></li>
											<li><a href="{{$url->getMens()}}">Footwear</a></li>
											<li><a href="{{$url->getMens()}}">Watches</a></li>
											<li><a href="{{$url->getMens()}}">Accessories</a></li>
											<li><a href="{{$url->getMens()}}">Bags</a></li>
											<li><a href="{{$url->getMens()}}">Caps & Hats</a></li>
										</ul>
									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}">Jewellery</a></li>
											<li><a href="{{$url->getMens()}}">Sunglasses</a></li>
											<li><a href="{{$url->getMens()}}">Perfumes</a></li>
											<li><a href="{{$url->getMens()}}">Beauty</a></li>
											<li><a href="{{$url->getMens()}}">Shirts</a></li>
											<li><a href="{{$url->getMens()}}">Sunglasses</a></li>
											<li><a href="{{$url->getMens()}}">Swimwear</a></li>
										</ul>
									</div>
									<div class="clearfix"></div>
								</div>
							</ul>
					</li>
					<li class="dropdown menu__item">
						<a href="#" class="dropdown-toggle menu__link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">women's wear <span class="caret"></span></a>
							<ul class="dropdown-menu multi-column columns-3">
								<div class="row">
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}">Clothing</a></li>
											<li><a href="{{$url->getMens()}}">Wallets</a></li>
											<li><a href="{{$url->getMens()}}">Footwear</a></li>
											<li><a href="{{$url->getMens()}}">Watches</a></li>
											<li><a href="{{$url->getMens()}}">Accessories</a></li>
											<li><a href="{{$url->getMens()}}">Bags</a></li>
											<li><a href="{{$url->getMens()}}">Caps & Hats</a></li>
										</ul>
									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}">Jewellery</a></li>
											<li><a href="{{$url->getMens()}}">Sunglasses</a></li>
											<li><a href="{{$url->getMens()}}">Perfumes</a></li>
											<li><a href="{{$url->getMens()}}">Beauty</a></li>
											<li><a href="{{$url->getMens()}}">Shirts</a></li>
											<li><a href="{{$url->getMens()}}">Sunglasses</a></li>
											<li><a href="{{$url->getMens()}}">Swimwear</a></li>
										</ul>
									</div>
									<div class="col-sm-6 multi-gd-img multi-gd-text ">
										<a href="{{$url->getMens()}}"><img src="images/woo.jpg" alt=" "/></a>
									</div>
									<div class="clearfix"></div>
								</div>
							</ul>
					</li>
					<li class=" menu__item"><a class="menu__link" href="{{$url->getElectronic()}}">Electronics</a></li>
					<li class=" menu__item"><a class="menu__link" href="{{$url->getCodes()}}">Short Codes</a></li>
					<li class=" menu__item"><a class="menu__link" href="{{$url->getContact()}}">contact</a></li>
				  </ul>
				</div>
			  </div>
			</nav>	
		</div>
		<div class="top_nav_right">
			<div class="cart box_1">
						<a href="{{$url->getCheckOut()}}">
							<h3> <div class="total">
								<i class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></i>
								<span class="simpleCart_total"></span> (<span id="simpleCart_quantity" class="simpleCart_quantity"></span> items)</div>
								
							</h3>
						</a>
						<p><a href="javascript:;" class="simpleCart_empty">Empty Cart</a></p>
						
			</div>	
		</div>
		<div class="clearfix"></div>
	</div>
</div>
<!-- //banner-top -->
<!-- banner -->

<div class="banner-grid">
	<div id="visual">
			<div class="slide-visual">
				<!-- Slide Image Area (1000 x 424) -->
				<ul class="slide-group">
					<li><img class="img-responsive" src="images/ba1.jpg" alt="Dummy Image" /></li>
					<li><img class="img-responsive" src="images/ba2.jpg" alt="Dummy Image" /></li>
					<li><img class="img-responsive" src="images/ba3.jpg" alt="Dummy Image" /></li>
				</ul>

				<!-- Slide Description Image Area (316 x 328) -->
				<div class="script-wrap">
					<ul class="script-group">
						<li><div class="inner-script"><img class="img-responsive" src="images/baa1.jpg" alt="Dummy Image" /></div></li>
						<li><div class="inner-script"><img class="img-responsive" src="images/baa2.jpg" alt="Dummy Image" /></div></li>
						<li><div class="inner-script"><img class="img-responsive" src="images/baa3.jpg" alt="Dummy Image" /></div></li>
					</ul>
					<div class="slide-controller">
						<a href="#" class="btn-prev"><img src="images/btn_prev.png" alt="Prev Slide" /></a>
						<a href="#" class="btn-play"><img src="images/btn_play.png" alt="Start Slide" /></a>
						<a href="#" class="btn-pause"><img src="images/btn_pause.png" alt="Pause Slide" /></a>
						<a href="#" class="btn-next"><img src="images/btn_next.png" alt="Next Slide" /></a>
					</div>
				</div>
				<div class="clearfix"></div>
			</div>
			<div class="clearfix"></div>
		</div>
	<script type="text/javascript" src="js/pignose.layerslider.js"></script>
	<script type="text/javascript">
	//<![CDATA[
		$(window).load(function() {
			$('#visual').pignoseLayerSlider({
				play    : '.btn-play',
				pause   : '.btn-pause',
				next    : '.btn-next',
				prev    : '.btn-prev'
			});
		});
	//]]>
	</script>

</div>
<!-- //banner -->