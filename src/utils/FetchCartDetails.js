import FetchProduct from "./FetchProductById";

const FetchCartDetails = async (cartData) => {
  const productPromises = cartData.map((item) => FetchProduct(item.ProductId));
  const productResults = await Promise.all(productPromises);

  const _Product_Details = [];
  const _Product_Varient_Details = [];

  for (let i = 0; i < productResults.length; i++) {
    const { Products, Varients } = productResults[i];
    _Product_Details.push(Products);

    const { ProductvarientId } = cartData[i];
    if (ProductvarientId) {
      const variant = Varients.find(
        (varient) => varient._id === ProductvarientId
      );
      if (variant) {
        _Product_Varient_Details.push({ ...variant });
      }
    }
  }

  return { _Product_Details, _Product_Varient_Details };
};

export default FetchCartDetails;
