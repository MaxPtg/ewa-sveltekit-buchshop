<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
	<div class="container-fluid text-white">
		<a class="navbar-brand" href="/">Books<b>4</b>You</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="/">Katalog</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/shopping-cart">Warenkorb</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/login">Anmelden</a>
				</li>
			</ul>
			<form class="d-flex">
                <input class="form-control me-4" type="search" placeholder="Suchen ..." aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Suchen</button>
            </form>
		</div>
	</div>
</nav>
<slot />
