import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InvoiceCreation.css'; // Import CSS for styling

const InvoiceCreation = ({ onSaveDraft, onSubmitInvoice }) => {
  const [invoiceData, setInvoiceData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setInvoiceData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSaveDraft = () => {
    // Add validation logic
    if (!invoiceData.customerName || !invoiceData.totalAmount) {
      setErrors({ validationError: 'Customer name and total amount are required' });
      return;
    }

    // Call onSaveDraft callback
    onSaveDraft(invoiceData);
  };

  const handleSubmitInvoice = () => {
    // Add validation logic
    if (!invoiceData.customerName || !invoiceData.totalAmount) {
      setErrors({ validationError: 'Customer name and total amount are required' });
      return;
    }

    // Call onSubmitInvoice callback
    onSubmitInvoice(invoiceData);
  };

  return (
    <div className="invoice-creation">
      <h2 className="section-title">Create Invoice</h2>
      <form className="invoice-form">
        <div className="input-field">
          <label className="input-label">Customer Name</label>
          <input
            type="text"
            value={invoiceData.customerName || ''}
            onChange={e => handleInputChange('customerName', e.target.value)}
          />
        </div>
        <div className="input-field">
          <label className="input-label">Total Amount</label>
          <input
            type="number"
            value={invoiceData.totalAmount || ''}
            onChange={e => handleInputChange('totalAmount', e.target.value)}
          />
        </div>
        {errors.validationError && <div className="validation-error">{errors.validationError}</div>}
        <button onClick={handleSaveDraft} className="save-draft-btn">Save Draft</button>
        <button onClick={handleSubmitInvoice} className="submit-invoice-btn">Submit Invoice</button>
      </form>
    </div>
  );
};

InvoiceCreation.propTypes = {
  onSaveDraft: PropTypes.func.isRequired,
  onSubmitInvoice: PropTypes.func.isRequired,
};

export default InvoiceCreation;
