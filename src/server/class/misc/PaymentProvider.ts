import { ProductOrderDto } from "@common";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";

export type PaymentProvider = {

    /**
     * NOTE Should return the url to reroute the customer to, where they
     *      can make the payment.
     * 
     * @example
     *  let provider = PaymentProvider();
     *  let receivePaymentR = 
     *      await provider.receivePayment([{
     *          product: {
     *              name: "Shoe",
     *              price: 40.00,
     *              stock: 5
     *          },
     *          amount: 50
     *      }]);
     *  let urlO = receivePaymentR.unwrap();
     *  let url = urlO.unwrap();
     */
    receivePayment(orders: ReadonlyArray<Readonly<ProductOrderDto>>):
        Promise<
            | Ok<Some<string>>
            | Ok<None>
            | Err<[unknown]>
        >;
};