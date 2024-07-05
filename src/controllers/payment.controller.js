import { application } from "express";
import {HOST,PAYPAL_API, PAYPAL_API_CLIENT,PAYPAL_API_SECRET} from '../config.js';
import axios  from "axios";
 
export const createOrder = async(req, res) => {
    const order = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                }
            }
        ],
        application_context: {
            brand_name:"mi tienda",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            return_url: `${HOST}/captured-order`,
            cancel_url: `${HOST}/cancel-order`,
        }
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials'); 

    const {data:{access_token}}= await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params,{
        auth:{
            username: PAYPAL_API_CLIENT,
            password:  PAYPAL_API_SECRET
        }
    })

    const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`,order,{
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }); 
    
    
    return res.json(response.data)

   
};

export const captureOrder = async(req, res) => {
    const {token}=req.query
    const response = await axios.post(`${PAYPAL_API} /v2/cheout/orders/${token}/capture`, null,{
        auth:{
            username: PAYPAL_API_CLIENT,
            password:   PAYPAL_API_SECRET
        }
    });
    console.log(response.data);
    return res.send('payed');
};

export const cancelPayment= (req, res) => (res.redirect('/'));