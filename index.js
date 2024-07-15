const express = require("express")

const path = require('path');

const axios = require('axios');

const bodyparser = require("body-parser")

const cors = require('cors')

const stripe = require("./stripe")

const session = require("express-session")

const cookieparser = require("cookie-parser")

const memorystore = require("memorystore")(session)

require('dotenv').config();

const app = express()

// CORS configuration
/*const corsOptions = {
    origin: 'http://127.0.0.1:8080', 
    optionsSuccessStatus: 200,
    credentials: true,
};

// Enable CORS with the above options
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options('*', cors(corsOptions));*/

app.use(cors({
    // origin: 'instaraisingwebapp.azurewebsites.net/'
    origin: ['https://127.0.0.1:8080','http://127.0.0.1:5000']
}));
app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
const PORT = process.env.PORT || 5000;

// console.log(PORT);
  
app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
  
app.use(express.static(path.join(__dirname)));

const products = {
    nokorg50: "price_1OEWdDLwticYeZxyxlHT6bmI",
    nokorg150: "price_1OEWeGLwticYeZxyoI6gIwY5",
    nokorg300: "price_1O2BfoLwticYeZxylW6z48EH",
    nokorg400: "price_1OEWhJLwticYeZxyCo0ye2Vt",
    nokorg500: "price_1OEWi4LwticYeZxyx3LhyKwG",
    nokorg1000: "price_1OEWimLwticYeZxyz7dJNlFA",

    sekorg50: "price_1OEWkILwticYeZxyD7S3Wl4n",
    sekorg150: "price_1OEWl5LwticYeZxyd64LsKNa",
    sekorg300: "price_1OAtmkLwticYeZxyW2sDoTz8",
    sekorg400: "price_1OEWnWLwticYeZxyYhDJfJU2",
    sekorg500: "price_1OEWoFLwticYeZxyaPmdfhqm",
    sekorg1000: "price_1OEWpJLwticYeZxyqehGG59E",

    dkkorg50: "price_1OFzUSLwticYeZxyepTacDdv",
    dkkorg150: "price_1OFzbJLwticYeZxy2d2X7iRA",
    dkkorg300: "price_1OAuyALwticYeZxyTArZfBJ1",
    dkkorg400: "price_1OFzcALwticYeZxyVN0Qmt5v",
    dkkorg500: "price_1OFzctLwticYeZxy7ZtNt1Pb",
    dkkorg1000: "price_1OFzdfLwticYeZxyAQCA501w",

    iskorg640: "price_1OFzlfLwticYeZxyLlYuG86D",
    iskorg2000: "price_1OFzn3LwticYeZxypmgUmwT3",
    iskorg3800: "price_1OAv0aLwticYeZxyGenY1tA8",
    iskorg5000: "price_1OFzo4LwticYeZxy2Y8CwfGT",
    iskorg6400: "price_1OFzozLwticYeZxyOfmXt3Ff",
    iskorg12800: "price_1OFzqLLwticYeZxySDAjkcYp",

    finorg5: "price_1OFzexLwticYeZxyxRodrqgu",
    finorg15: "price_1OFzgtLwticYeZxyFBGVps5L",
    finorg25: "price_1OAuzGLwticYeZxyJlYoJl3Y",
    finorg35: "price_1OFzhhLwticYeZxyD604hE7r",
    finorg45: "price_1OFzidLwticYeZxyZzdPAEQ9",
    finorg85: "price_1OFzjPLwticYeZxysqo0ThJ4",

    nordicorg25: "price_1OAv1wLwticYeZxyMfIMigge",
    nordicorg5: "price_1OEWrALwticYeZxy3ESmtKVX",
    nordicorg15: "price_1OEWsBLwticYeZxyLYMnpkau",
    nordicorg35: "price_1OEWtILwticYeZxyRixwUayL",
    nordicorg45: "price_1OEWuULwticYeZxyF3ftt0VS",
    nordicorg85: "price_1OEWw2LwticYeZxyaIXmqECi",
};

app.use(bodyparser.json())

app.use(cookieparser());

app.use(session({
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
        name: 'customer-session-cookie', // Specify a name for the session cookie
    },
    store: new memorystore({
        checkPeriod: 86400000
    }),
    resave: false,
    secret: "irsec"
}));

app.use(bodyparser.urlencoded({extended:false}))

app.use(express.static("public"))

// Serve static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

var setlanguage = '';
var setorgname = '';
app.post("/login", async (req,res) => {
    console.log('enter the login action')
    try{
        // add customer with the email
        // stripe api
        console.log(req.body);
        const {email, firstName, lastName} = req.body;

        const name = `${firstName} ${lastName}`;

        const stripeCustomer = await stripe.addNewCustomer(email, name);
        // Here, we ensure that the returned object has an 'id' property.
        if (!stripeCustomer || !stripeCustomer.id) {
            console.error("Failed to create a Stripe customer.");
            return res.status(500).send("An internal server error occurred.");
        }

        req.session.customerID = stripeCustomer.id;
        console.log(req.cookies);

        const mobileNumber = req.body.mobileNumber;
        const address = req.body.address;
        const postalCode = req.body.postalCode; 
        const postPlace = req.body.postPlace;
        const orgNamePay = req.body.orgNamePay;  
        const language = req.body.language;   
        const amountDonated = req.body.amountDonated;   
        const productmethod = req.body.product;   
        const currency = req.body.currency; 

        setlanguage = language;
        setorgname = orgNamePay;
            
        // Make an HTTP request to your API endpoint with the data
        //const apiEndpoint = 'https://user-crud-create-api.azurewebsites.net/api/user-crud-create-api?code=gLKHNWWF1JOZiJLNGVQIkLjcpRjjk2_TepABDLVc-Da2AzFuk-0R5g=='; // replace with your API endpoint
        const apiEndpoint = process.env.CREATE_USER_API; // replace with your API endpoint
        const apiData = {
            name: name,
            language: language,
            phoneNumber: mobileNumber,
            email: email,
            address: address,
            postNumber: postalCode,
            postOffice: postPlace,
            paymentMethod: productmethod,
            organizations: [orgNamePay],
            currency: currency,
            amountDonated: amountDonated,
        };

        // Use axios to make a POST request to the API
        await axios.post(apiEndpoint, apiData);

        let productPriceId = "";
        if (req.body.product === "NOKORG") {

            if(req.body.amountDonated === '50'){
                productPriceId = products.nokorg50;
            }else if(req.body.amountDonated === '150'){
                productPriceId = products.nokorg150; 
            }else if(req.body.amountDonated === '300'){
                productPriceId = products.nokorg300; 
            }else if(req.body.amountDonated === '400'){
                productPriceId = products.nokorg400; 
            }else if(req.body.amountDonated === '500'){
                productPriceId = products.nokorg500; 
            }else if(req.body.amountDonated === '1000'){
                productPriceId = products.nokorg1000; 
            }else{
                productPriceId = products.nokorg300;
            }
            
        }else if (req.body.product === "SEKORG") {
            if(req.body.amountDonated === '50'){
                productPriceId = products.sekorg50;
            }else if(req.body.amountDonated === '150'){
                productPriceId = products.sekorg150; 
            }else if(req.body.amountDonated === '300'){
                productPriceId = products.sekorg300; 
            }else if(req.body.amountDonated === '400'){
                productPriceId = products.sekorg400; 
            }else if(req.body.amountDonated === '500'){
                productPriceId = products.sekorg500; 
            }else if(req.body.amountDonated === '1000'){
                productPriceId = products.sekorg1000; 
            }else{
                productPriceId = products.sekorg300;
            }
            
        }else if (req.body.product === "DKKORG") {
            if(req.body.amountDonated === '50'){
                productPriceId = products.dkkorg50;
            }else if(req.body.amountDonated === '150'){
                productPriceId = products.dkkorg150; 
            }else if(req.body.amountDonated === '300'){
                productPriceId = products.dkkorg300; 
            }else if(req.body.amountDonated === '400'){
                productPriceId = products.dkkorg400; 
            }else if(req.body.amountDonated === '500'){
                productPriceId = products.dkkorg500; 
            }else if(req.body.amountDonated === '1000'){
                productPriceId = products.dkkorg1000; 
            }else{
                productPriceId = products.dkkorg300;
            }
            
        }else if (req.body.product === "ISKORG") {
            
            if(req.body.amountDonated === '640'){
                productPriceId = products.iskorg640;
            }else if(req.body.amountDonated === '2000'){
                productPriceId = products.dkkorg150; 
            }else if(req.body.amountDonated === '3800'){
                productPriceId = products.iskorg3800; 
            }else if(req.body.amountDonated === '5000'){
                productPriceId = products.iskorg5000; 
            }else if(req.body.amountDonated === '6400'){
                productPriceId = products.iskorg6400; 
            }else if(req.body.amountDonated === '12800'){
                productPriceId = products.iskorg12800; 
            }else{
                productPriceId = products.iskorg3800;
            }
            
        }else if (req.body.product === "FINORG") {
            if(req.body.amountDonated === '25'){
                productPriceId = products.finorg25;
            }else if(req.body.amountDonated === '5'){
                productPriceId = products.finorg5; 
            }else if(req.body.amountDonated === '15'){
                productPriceId = products.finorg15; 
            }else if(req.body.amountDonated === '35'){
                productPriceId = products.finorg35; 
            }else if(req.body.amountDonated === '45'){
                productPriceId = products.finorg45; 
            }else if(req.body.amountDonated === '85'){
                productPriceId = products.finorg85; 
            }else{
                productPriceId = products.finorg25;
            }
        }else if (req.body.product === "NORDICORG") {
            if(req.body.amountDonated === '25'){
                productPriceId = products.nordicorg25;
            }else if(req.body.amountDonated === '5'){
                productPriceId = products.nordicorg5; 
            }else if(req.body.amountDonated === '15'){
                productPriceId = products.nordicorg15; 
            }else if(req.body.amountDonated === '35'){
                productPriceId = products.nordicorg35; 
            }else if(req.body.amountDonated === '45'){
                productPriceId = products.nordicorg45; 
            }else if(req.body.amountDonated === '85'){
                productPriceId = products.nordicorg85; 
            }else{
                productPriceId = products.nordicorg25;
            }
            
        }  else {
            productPriceId = None
        }

        req.session.organizationName = orgNamePay;

        const checkoutSession = await stripe.createCheckoutSession(
            stripeCustomer.id, 
            productPriceId
        );
        console.log(session);
        // res.send({sessionId:session.id});

        // Redirect the user to the Stripe Checkout session URL
        res.redirect(checkoutSession.url);
        // res.redirect(`/success/${orgNamePay}`);
        
    }catch(error)  {
        // Handle the error
        console.error("Error during login:", error);
    
        // You can respond with an error message or redirect to an error page
        res.status(500).send("An error occurred during login"); // HTTP 500 for internal server error
    }
    
    
})


// Endpoint to handle the names retrieval
app.get('/get-names', async (req, res) => {
    // Retrieve the language parameter from the query string
    const language = req.query.language;
    
    // Construct the API URL including the language parameter
    // Ensure the API key and base URL are stored in the environment variables
    const orgUrl = `${process.env.GET_NAMES_API}&language=${encodeURIComponent(language)}`;

    try {
        const apiResponse = await fetch(orgUrl, {
            method: 'GET'
            // If the API requires headers, set them here
        });

        // Check if the API response was ok
        if (apiResponse.ok) {
            // Parse the response as JSON and send it back to the client
            const data = await apiResponse.json();
            res.json(data);
        } else {
            // If the response status code was not OK, send an error
            throw new Error(`API responded with status code: ${apiResponse.status}`);
        }
    } catch (error) {
        // Log the error and send a 500 Internal Server Error status code
        console.error('Error fetching names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/random-category', async (req, res) => {
    const language = req.query.language;
    const category = req.query.categories;
    const country = req.query.countries;

    const searchCategoryApi = `${process.env.SEARCH_CATEGORY_API}&language=${encodeURIComponent(language)}&categories=${encodeURIComponent(category)}&countries=${encodeURIComponent(country)}`;

    try {
        const apiResponse = await fetch(searchCategoryApi);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            res.type('json').json(data);
        } else {
            throw new Error(`API responded with status code: ${apiResponse.status}`);
        }
    } catch (error) {
        console.error('Error fetching category search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search-category', async (req, res) => {
    const language = req.query.language;
    const categories = req.query.categories;
    const country = req.query.countries;

    const searchCategoryApi = `${process.env.SEARCH_CATEGORY_API}&language=${encodeURIComponent(language)}&categories=${encodeURIComponent(categories)}&countries=${encodeURIComponent(country)}`;

    try {
        const apiResponse = await fetch(searchCategoryApi);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            res.type('json').json(data);
        } else {
            throw new Error(`API responded with status code: ${apiResponse.status}`);
        }
    } catch (error) {
        console.error('Error fetching category search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search-subcat', async (req, res) => {
    const language = req.query.language;
    const categories = req.query.categories;
    const country = req.query.countries;
    const subcategories = req.query.subcategories;

    const searchCategoryApi = `${process.env.SUBCAT_SEARCH_API}&language=${language}&categories=${categories}&subcategories=${subcategories}&countries=${country}`;

    try {
        const apiResponse = await fetch(searchCategoryApi);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            res.type('json').json(data);
        } else {
            throw new Error(`API responded with status code: ${apiResponse.status}`);
        }
    } catch (error) {
        console.error('Error fetching category search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/name-search', async (req, res) => {
    const language = req.query.language;
    const organizationName = req.query.name;
    
    
    const apiOrgUrl = `${process.env.NAME_SEARCH_API}&language=${encodeURIComponent(language)}&name=${encodeURIComponent(organizationName)}`;

    try {
        const apiResponse = await fetch(apiOrgUrl);
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            res.type('json').json(data);
        } else {
            throw new Error(`API responded with status code: ${apiResponse.status}`);
        }
    } catch (error) {
        console.error('Error fetching category search results:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/subscribe-newsletter', async (req, res) => {
    const { email } = req.body;
    
    try {
        const response = await fetch(process.env.IR_NEWSLETTER_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers required by your newsletter API
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            const responseData = await response.json();
            res.json(responseData);
        } else {
            res.status(response.status).json({ error: 'Error subscribing to newsletter' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/submit-contact', async (req, res) => {
    const { name, phone, email, message } = req.body;

    try {
        const response = await fetch(process.env.CONTACT_US_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers as required by your CONTACT_US_API
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                message: message
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            res.json(responseData);
        } else {
            res.status(response.status).json({ error: 'Error submitting contact form' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// success url
app.get("/success", (req, res) => {

    const orgName = req.session.orgName || 'the organization';
    console.log(orgName);
    
    if(setlanguage === 'no'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'no', 'sucess.html'));
    }else if(setlanguage === 'sv'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'sv', 'sucess.html'));
    }else if(setlanguage === 'dk'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'dk', 'sucess.html'));
    }else if(setlanguage === 'is'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'is', 'sucess.html'));
    }else if(setlanguage === 'fi'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'fi', 'sucess.html'));
    }else if(setlanguage === 'en'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'en', 'sucess.html'));
    }else{
        res.sendFile(path.join(__dirname, 'assets', 'views', 'en', 'sucess.html'));
    }
    
});

app.get("/failed", (req, res) => {
    if(setlanguage === 'no'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'no', 'fail.html'));
    }else if(setlanguage === 'sv'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'sv', 'fail.html'));
    }else if(setlanguage === 'dk'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'dk', 'fail.html'));
    }else if(setlanguage === 'is'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'is', 'fail.html'));
    }else if(setlanguage === 'fi'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'fi', 'fail.html'));
    }else if(setlanguage === 'en'){
        res.sendFile(path.join(__dirname, 'assets', 'views', 'en', 'fail.html'));
    }else{
        res.sendFile(path.join(__dirname, 'assets', 'views', 'en', 'fail.html'));
    }
   
});

// Define a route to render 'no/account.html'
// app.get('/account', (req, res) => {
//     res.sendFile(path.join(__dirname, 'assets', 'views', 'no', 'account.html'));
// });

app.listen(PORT, () => {
    console.log("The server is listening on port ${PORT}")    
})

