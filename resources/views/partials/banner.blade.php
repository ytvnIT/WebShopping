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


										<a href="{{$url->getMens()}}{{$url->getClothings()."/1"}}"><img src="{{asset('images/woo1.jpg')}}" alt=" "/></a>

									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getMens()}}{{$url->getClothings()."/1"}}">Clothing</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getShoes()."/1"}}">Shoes</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getWatches()."/1"}}">Watches</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getBelts()."/1"}}">Belts</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getBags()."/1"}}">Bags</a></li>
											<li><a href="{{$url->getMens()}}{{$url->getAccessories()."/1"}}">Accessories</a></li>
										</ul>
									</div>
									<!-- <div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="#">Belts</a></li>
											<li><a href="#">Sunglasses</a></li>
											<li><a href="#">Perfumes</a></li>
											<li><a href="#">Beauty</a></li>
											<li><a href="#">Shirts</a></li>
											<li><a href="#">Sunglasses</a></li>
											<li><a href="#">Swimwear</a></li>
										</ul>
									</div> -->
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
											<li><a href="{{$url->getWomens()}}{{$url->getClothings()}}">Clothing</a></li>
											<li><a href="{{$url->getWomens()}}">Wallets</a></li>
											<li><a href="{{$url->getWomens()}}{{$url->getShoes()}}">Footwear</a></li>
											<li><a href="{{$url->getWomens()}}{{$url->getWatches()}}">Watches</a></li>
											<li><a href="{{$url->getWomens()}}{{$url->getBags()}}">Accessories</a></li>
											<li><a href="{{$url->getWomens()}}">Bags</a></li>
											<li><a href="{{$url->getWomens()}}">Caps & Hats</a></li>
										</ul>
									</div>
									<div class="col-sm-3 multi-gd-img">
										<ul class="multi-column-dropdown">
											<li><a href="{{$url->getWomens()}}{{$url->getBelts()}}">Belts</a></li>
											<li><a href="{{$url->getWomens()}}">Sunglasses</a></li>
											<li><a href="{{$url->getWomens()}}">Perfumes</a></li>
											<li><a href="{{$url->getWomens()}}">Beauty</a></li>
											<li><a href="{{$url->getWomens()}}">Shirts</a></li>
											<li><a href="{{$url->getWomens()}}{{$url->getAccessories()}}">Sunglasses</a></li>
											<li><a href="{{$url->getWomens()}}">Swimwear</a></li>
										</ul>
									</div>
									<div class="col-sm-6 multi-gd-img multi-gd-text ">
										<a href="{{$url->getMens()}}"><img src="{{asset('images/woo.jpg')}}" alt=" "/></a>
									</div>
									<div class="clearfix"></div>
								</div>
							</ul>
					</li>
					<!-- <li class=" menu__item"><a class="menu__link" href="{{$url->getElectronic()}}">Electronics</a></li>
					<li class=" menu__item"><a class="menu__link" href="{{$url->getCodes()}}">Short Codes</a></li> -->
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
								<span class="simpleCartTotal"></span> (<span id="simpleCartQuantity" class="simpleCartQuantity"></span>)</div>

							</h3>
						</a>
						<p><a href="javascript:;" class="simpleCart_empty empty_cart">Empty Cart</a></p>

			</div>
		</div>
		<div class="clearfix"></div>
	</div>
</div>
<!-- //banner-top -->
<!-- banner -->

<script>
	function display_total(){
		var items=JSON.parse(localStorage.getItem("cart")); 
		if(items==null){
			$(".simpleCartTotal").text("0.00 đ");
			$(".simpleCartQuantity").text("0 items");	
			return ;
		}
		var total=0;
		var quantity=0;
		items.forEach(function(element){
			total+=Number(element.price)*Number(element.quantity);
			quantity += Number(element.quantity);
		});
		$(".simpleCartTotal").text(format_price(String(total)) + " đ");
		$(".simpleCartQuantity").text(quantity + " items");
		
	}

	function format_price(price){
			u=0;
			n=price.length;
			for(var i=price.length-1; u<n; i--){
				u++;
				if(u%3==0){
					if(i==0)
						break ;
				price=price.slice(0, i).concat("."+price.slice(i, price.length));				
				}
			}
			return price;
	}

	function deformat_price(price){
		var result = price.split(".");
		var re="";
		result.forEach(function(element){
			re+=element;
		});
		return re;
	}
	$(document).ready(function(){	
		$(".empty_cart").click(function(){
			localStorage.removeItem("cart");
			$(".simpleCartTotal").text("0.00 đ");
			$(".simpleCartQuantity").text("0 items");	
		});
		display_total();
		
	});
</script>

<!-- //banner -->
