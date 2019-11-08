<!-- login -->
<div class="modal fade" id="myModalfg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content modal-info">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						</div>
						<div class="modal-body modal-spa">
							<div class="login-grids">
								<div class="login">
									<div class="login-bottom">
										<h3>Forgot password</h3>
										<form method="POST" action="{{route('reset')}}">
											<div class="sign-up" >
                                                <h4>Please enter your email address below and we will send you information to change your password.</h4>
                                                <br>
												<h4>Email :</h4>
												<input type="text" name="email" value="Type here" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Type here';}" required="">
											</div>
											
											<div class="sign-up">
												<input type="submit" value="RESET" >
											</div>

										</form>
									</div>
									<div class="login-right">
										<h3>Enter a new password</h3>
										<form method="POST" action="{{ route('changepassword') }}">
											
											<div class="sign-in">
												<h4>New password :</h4>
												<input type="password" name="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required="">
												
											</div>
                                            <div class="sign-in">
												<h4>Re-type password :</h4>
												<input type="password" name="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required="">
												
											</div>
                                            <div class="sign-in">
												<h4>OTP :</h4>
												<input type="text" name="token" value="Type here" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Type here';}" required="">
											</div>
											
											<div class="sign-in">
												<input type="submit" value="CHANGE PASSWORD" >
											</div>
										</form>
									</div>
									<div class="clearfix"></div>
								</div>
								<p>By logging in you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
<!-- //login -->
<script src="{{asset('js/jquery.flexslider.js')}}"></script>
<script>
	$(() => {
		
		if (window.location.hash === "#open-forgotpassword-modal") {
			console.log("fsdfds");
			$("#myModal4").modal("hide");
			$("#myModalfg").modal("show");
		}
		$('.flexslider').flexslider({
			animation: "slide",
			controlNav: "thumbnails"
		});
	});
</script>