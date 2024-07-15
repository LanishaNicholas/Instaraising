const stripe = require("stripe")

//const STRIPE_SECRET_KEY = "sk_test_51NkSCQLwticYeZxyJyyy8OLlXxKIg9dZWi2UCMfGQPLeL5WFrHleIym6w5ASVlRFmCvY8Z4qr0pj9yu1iqPg9dDQ00eGSnOMlC";

const Stripe = stripe(STRIPE_SECRET_KEY)

// add new customer

const addNewCustomer = async (email,name) => {
    const customer = await Stripe.customers.create({
        email,
        name,
        description: "New Stripe Test Customer"
    })

    return customer
}

const createCheckoutSession = async(customerId, priceID) => {
    const session = await Stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customerId,
        line_items: [
            {
                price: priceID,
                quantity:1
            }
        ],
        success_url:"http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5000/failed"

    })
    return session
}

module.exports = {
    addNewCustomer,
    createCheckoutSession
}
