<script>
	export let data;
	$: book = data.book.book;
</script>

<div class="container">
	<div class="row">
		<div class="col-md-4">
			<img src={book.attributes?.cover_url} alt="Book Cover" class="img-fluid" />
		</div>
		<div class="col-md-8">
			<h2>{book.attributes.title}</h2>
			<p>Author: {book.attributes.author}</p>
			<p>Price: {book.attributes.price}</p>
			<p>Quantity: {book.attributes.quantity}</p>
			<p>ISBN: {book.attributes.isbn}</p>
			<p>{book.attributes.abstract}</p>
		</div>
	</div>
</div>
