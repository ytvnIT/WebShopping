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
										

										<a href="{{$url->getMens()}}"><img src="{{asset('images/woo1.jpg')}}" alt=" "/></a>

									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}{{$url->getClothings()}}">Clothing</a></li>
											<li><a href="{{$url->getMens()}}">Wallets</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getShoes()}}">Footwear</a></li>
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
										<a href="{{$url->getMens()}}"><img src="{{asset('images/woo.jpg')}}" alt=" "/></a>
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


<!-- //banner -->
