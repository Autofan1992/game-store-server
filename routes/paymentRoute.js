import Stripe from 'stripe'
import express from 'express'

const YOUR_DOMAIN = 'https://game-store-8.netlify.app'

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_API_KEY)

router.post('/create-checkout-session',  async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: req.body.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity
            })),
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        })

        res.status(200).json(session)
    } catch (e) {
        res.status(e.statusCode || 500).json(e.message)
    }
})

export default router