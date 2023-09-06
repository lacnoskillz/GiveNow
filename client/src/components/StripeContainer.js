import React from "react";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY = "pk_test_51NkBSxGYCFpESPA0P4JxTwGu8VjHQvDPNEy0eyZaDGf4uJ4LFtYiP4E6k5WnA92FxKPPO98ip5TyD9NClvgSF1al00rLVkFdIW"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    // console.log(props.amount,"stripecontainer")
    // console.log(props.itemName,"stripecontainer")
    // console.log(props,"KAIIAIAIAIIA")
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm amount={props.amount} itemName={props.itemName} description={props.description} OrgID = {props.OrgID}/>
        </Elements>
    )
}