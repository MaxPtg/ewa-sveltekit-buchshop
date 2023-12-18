<script>
	let books = [
		{
			id: 0,
			attributes: {
				title: 'The Great Gatsby',
				author: 'F. Scott Fitzgerald',
				abstract:
					'The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
				price: 12.99,
				quantity: 10,
				isbn: '978-3-16-148410-0',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		},
		// Add more book objects here
		{
			id: 1,
			attributes: {
				title: 'To Kill a Mockingbird',
				author: 'Harper Lee',
				abstract: 'A story of racial injustice and the loss of innocence in the Deep South.',
				price: 9.99,
				quantity: 5,
				isbn: '978-0-06-112008-4',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		},
		// Add more book objects here
		// ...
        {
			id: 16,
			attributes: {
				title: 'Pride and Prejudice',
				author: 'Jane Austen',
				abstract:
					'A classic novel about love, marriage, and societal expectations in 19th-century England.',
				price: 8.99,
				quantity: 8,
				isbn: '978-0-14-143951-8',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		},
        {
			id: 17,
			attributes: {
				title: 'Pride and Prejudice',
				author: 'Jane Austen',
				abstract:
					'A classic novel about love, marriage, and societal expectations in 19th-century England.',
				price: 8.99,
				quantity: 8,
				isbn: '978-0-14-143951-8',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		},
        {
			id: 18,
			attributes: {
				title: 'Pride and Prejudice',
				author: 'Jane Austen',
				abstract:
					'A classic novel about love, marriage, and societal expectations in 19th-century England.',
				price: 8.99,
				quantity: 8,
				isbn: '978-0-14-143951-8',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		},
		{
			id: 19,
			attributes: {
				title: 'Pride and Prejudice',
				author: 'Jane Austen',
				abstract:
					'A classic novel about love, marriage, and societal expectations in 19th-century England.',
				price: 8.99,
				quantity: 8,
				isbn: '978-0-14-143951-8',
                cover_url: 'https://images-na.ssl-images-amazon.com/images/I/51UWmvXmZCL._SX331_BO1,204,203,200_.jpg'
			}
		}
	];
</script>

<main class="container">
	<div class="row">
		{#each books as book}
			<div class="col-md-3 p-2">
				<div class="card book-card">
					<img src={book.attributes.cover_url} class="card-img-top" alt={book.attributes.title} />
					<div class="card-body">
						<h5 class="card-title">{book.attributes.title}</h5>
						<p class="card-text">Author: {book.attributes.author}</p>
						<div>
                            <button class="btn btn-primary">Add to Cart</button>
                            <button class="btn btn-primary">Details</button>
                        </div> 
					</div>
				</div>
			</div>
		{/each}
	</div>
</main>