import { BASE_URL } from "../global/Base_URL";

const ConfirmPaymentIntent = async (paymentIntentId, paymentMethodId) => {
  try {
    const PaymentIntentReponse = await fetch(
      `${BASE_URL}/v3/api/user/shop/confirm/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_intentId: paymentIntentId,
          paymentMethodId: paymentMethodId,
        }),
        credentials: "include",
      }
    );
    return PaymentIntentReponse;
  } catch (error) {
    console.error(error);
  }
};

export default ConfirmPaymentIntent;
