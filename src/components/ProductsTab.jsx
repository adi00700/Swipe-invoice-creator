import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsForInvoice } from '../slices/productsThunk';
import { updateProduct } from '../slices/productsSlice';
import '../styles/ProductTab.css';

function ProductsTab({ invoiceId }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  // State to track changes to product information
  const [editedProducts, setEditedProducts] = useState({});
  // State to track validation errors
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(fetchProductsForInvoice(invoiceId));
  }, [dispatch, invoiceId]);

  // Function to handle changes to product information
  const handleProductChange = (productId, fieldName, value) => {
    setEditedProducts(prevState => ({
      ...prevState,
      [productId]: { ...prevState[productId], [fieldName]: value }
    }));
  };

  // Function to save changes to product information
  const saveProductChanges = () => {
    // Validate changes before saving
    const errors = validateChanges(editedProducts);
    if (Object.keys(errors).length === 0) {
      // Changes are valid, update Redux store
      Object.entries(editedProducts).forEach(([productId, updatedFields]) => {
        dispatch(updateProduct({ productId, updatedProductInfo: updatedFields }));
      });
      // Clear editedProducts state after saving changes
      setEditedProducts({});
      setValidationErrors({});
    } else {
      // Validation failed, set errors state
      setValidationErrors(errors);
    }
  };

  // Function to validate changes
  const validateChanges = (changes) => {
    const errors = {};
    Object.entries(changes).forEach(([productId, updatedFields]) => {
      if (!updatedFields.name) {
        errors[productId] = 'Product name is required';
      }
      // Add more validation rules as needed
    });
    return errors;
  };

  // Function to group products based on their purpose
  const groupProductsByPurpose = () => {
    const groupedProducts = {};
    if (products) {
      products.forEach(product => {
        const purpose = product.purpose || 'Other'; // Default purpose if not defined
        if (!groupedProducts[purpose]) {
          groupedProducts[purpose] = [];
        }
        groupedProducts[purpose].push(product);
      });
    }
    return groupedProducts;
  };

  return (
    <div className="products-tab">
      <h2 className="section-title">Products</h2>
      {Object.entries(groupProductsByPurpose()).map(([purpose, productList]) => (
        <div key={purpose} className="product-group">
          <h3>{purpose}</h3>
          {productList.map(product => (
            <div key={product.id} className="product-item">
              <input
                type="text"
                value={editedProducts[product.id]?.name || product.name}
                onChange={e => handleProductChange(product.id, 'name', e.target.value)}
                className="product-name-input"
              />
              {validationErrors[product.id] && <div className="validation-error">{validationErrors[product.id]}</div>}
              {/* Other product fields and validation messages */}
            </div>
          ))}
        </div>
      ))}
      <button onClick={saveProductChanges} className="save-changes-btn">Save Changes</button>
    </div>
  );
}

ProductsTab.propTypes = {
  invoiceId: PropTypes.string.isRequired,
};

export default ProductsTab;
