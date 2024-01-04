import { stripe } from '../stripe';
import { env } from '$env/dynamic/private'
import type { CartItem } from '$lib/api.types';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const cartItems: CartItem[] = data.items;
    const lineItems = cartItems.map((CartItem) => {
        return {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: CartItem.book_attributes.title,
                    images: [],
                },
                unit_amount: CartItem.book_attributes.price * 100,//in cent benötigt
            },
            quantity: CartItem.quantity,
        };
    });


    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        shipping_address_collection: {
            allowed_countries: ['DE', 'AT', 'CH'],
        },
        mode: 'payment',
        success_url: `http://localhost:5173/checkout/success`,
        cancel_url: `http://localhost:5173/checkout/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}