(() => {
    if (window.location.pathname == "/") {
        // Home JS
    }
    if (/single\/([\d]+)/.test(window.location.pathname)) {
        // Product detail JS
    }


    function html(element) {
        return `
        <div class="col-md-3 product-men">
            <div class="men-pro-item simpleCart_shelfItem">
                <div class="men-thumb-item">
                    <img src="` + element.src + `" alt="" class="pro-image-front">
                    <img src="` + element.src + `" alt="" class="pro-image-back">
                        <div class="men-cart-pro">
                            <div class="inner-men-cart-pro">
                                <a href="/single/` + element.id + `" class="link-product-add-cart">Quick View</a>
                            </div>
                        </div>
                        ` + (element.isTop ? '<span class="product-new-top">New</span>' : "") + `
                </div>
                <div class="item-info-product ">
                    <h4><a href="/single` + element.id + `">Wedges</a></h4>
                    <div class="info-product-price">
                        <span class="item_price">` + element.pricespecial + `</span>
                        <del>` + element.priceold + `</del>
                    </div>
                    <a href="/single/` + element.id + `" class="item_add single-item hvr-outline-out button2">Add to cart</a>
                </div>
            </div>
        </div>
        `
    }
    $.ajax({
        url: "http://localhost:8000/api/main-product/1",
        method: "GET",
        success: function (obj) {
            console.log(obj);
            obj.products.forEach(element => {
                $(".tab-1").append(html(element));
            });
        },
        error: console.log
    })

})();
