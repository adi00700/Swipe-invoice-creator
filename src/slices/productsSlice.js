export const updateProduct = (productId, updatedProductInfo) => {
    return (dispatch, getState) => {
      // Update product information in the products slice
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: {
          productId,
          updatedProductInfo,
        },
      });
  
      // Get reference to invoices where the product is used
      const invoices = getState().invoices;
      const affectedInvoices = invoices.filter(invoice =>
        invoice.products.includes(productId)
      );
  
      // Update product information in affected invoices
      affectedInvoices.forEach(invoice => {
        dispatch(updateProductInInvoice(invoice.id, productId, updatedProductInfo));
      });
    };
  };
  
  export const setProducts = (products) => {
    // Implementation for setProducts
  };

  export const updateProductInInvoice = (invoiceId, productId, updatedProductInfo) => {
    // Logic to update product information in the specified invoice
  };
