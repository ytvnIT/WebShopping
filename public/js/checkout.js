function html(element, rem, close, price){
	return `
		<tr class="`+ rem + ` selected_item">
			<td class="invert-closeb">
				<div class="rem">
					<div class="close  ` + close + ` "> </div>
				</div>
			</td>
			<td class="invert-image"><a href="single/`+ element.id +`"><img src=` + element.src + ` alt=` + element.title + ` class="img-responsive" /></a></td>
			<td class="invert">
				 <div class="quantity">
					<div class="quantity-select">
						<div class="entry value-minus">&nbsp;</div>
						<div class="entry value"><span> ` + element.quantity + `</span></div>
						<div class="entry value-plus active">&nbsp;</div>
					</div>
				</div>
			</td>
			<td class="invert"> ` + element.title + `</td>
			<td class="invert">` + price +` &#8363;</td>
		</tr>
		`
	}

	function value_minus(){
		$(".value-minus").on('click', function(){
			var value=Number($(this).next().text());
			if(value>1){
				value-=1;
				$(this).next().text(value);
				var contain_id = $(this).parents("td").prev().children("a").attr("href");
				var id=contain_id.charAt(contain_id.length-1);
				update_quantity(id, 0);
			}
		});
	}

	function value_plus(){
		$(".value-plus").on('click', function(){
			var value=Number($(this).prev().text());
			value +=1;
			$(this).prev().text(value);
			var contain_id = $(this).parents("td").prev().children("a").attr("href");
			var id=contain_id.charAt(contain_id.length-1);
			update_quantity(id, 1);
		});
	}
	

	function remove_item(){
		$(".close").on('click', function(c){
			var rem= "."+$(this).parent().parent().parent().attr("class");
			rem=rem.slice(0, rem.length-14);
			index = rem.slice(4, rem.length);
			remove_cart(Number(index)-1);
			$(rem).fadeOut('slow', function(c){
				$(rem).remove();
			});
		});
	}

	function check(element, item_price){
		return `<li class="item_checkout">` + element.title +` <i>-</i> <span>`+item_price+` x`+element.quantity+`</span></li>`	
	}
	function count_total(){
		var items=JSON.parse(localStorage.getItem("cart"));  
		if(items==null)
			return ;
		var total=0;
		items.forEach(function(element){
			total+=Number(element.price)*Number(element.quantity);
			item_price=format_price(String(element.price));
			$(".total").prev().append(check(element, item_price));
		});
		total=format_price(String(total));
		$("#total").text(total + " đ");
		
	}
	

	function update_quantity(id, signal){
		arr=JSON.parse(localStorage.getItem("cart"));          
		for(var i=0;i<arr.length;i++){
			if(arr[i]['id']==id && signal==1){				
				arr[i]['quantity']+=1;
				break;       
			}
			else if(arr[i]['id']==id && signal==0){				
				arr[i]['quantity']-=1;
				break;       
			}	
		}                   
		localStorage.setItem("cart", JSON.stringify(arr));    
		$("li").remove(".item_checkout"); 
		count_total(); 
		display_total();
	}

	function empty_cart(){
		$(".empty_cart").click(function(){
			localStorage.removeItem("cart");
			$("li").remove(".item_checkout"); 
			$("tr").remove(".selected_item");
			$("#total").text("");
		});
	}
	function remove_cart(index){
		arr=JSON.parse(localStorage.getItem("cart"));
		arr = arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
		localStorage.setItem("cart", JSON.stringify(arr));   
		$("li").remove(".item_checkout"); 
		count_total();
	}

	function init(){
		var items=JSON.parse(localStorage.getItem("cart"));  
		if(items!=null){
			for(var i=0; i<items.length; i++){
				var rem="rem"+Number(i+1);
				var close="close"+Number(i+1);
				price=format_price(String(items[i].price));
				$("table").append(html(items[i], rem, close, price ));				
			}
		}
		
	}
	$(document).ready(function(){
		
		init();
		value_minus();
		value_plus();
		remove_item();
		count_total();
		empty_cart();
		

	});