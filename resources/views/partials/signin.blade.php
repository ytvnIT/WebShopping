<h3>Sign in with your account</h3>
<form method="POST" action="{{ route('signin') }}">
	<div class="sign-in">
		<h4>Email :</h4>
		<input type="text" name="name" value="Type here" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Type here';}" required="">
	</div>
	<div class="sign-in">
		<h4>Password :</h4>
		<input type="password" name="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required="">
		<a href="#">Forgot password?</a>
	</div>
	<div class="single-bottom">
		<input type="checkbox"  id="brand" value="">
		<label for="brand"><span></span>Remember Me.</label>
	</div>
	<div class="sign-in">
		<input type="submit" value="SIGNIN" >
	</div>
</form>