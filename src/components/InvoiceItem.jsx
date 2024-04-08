import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd, productList } = props;
  const searchItem = (itemId) => {
    const itemIndex = items.findIndex((item) => item.productId === itemId);
    if(itemIndex !== -1) return true;
    else return false;
  }
  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
      productList={productList}
      searchItem={searchItem}
    />
  ));

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>GROUP</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={() => onRowAdd(items)}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {

  const [item, setItem] = useState(null);

  const getProductIndex = (productId) => {
    return props.productList.findIndex((product) => product.productId === productId)
  }
  const handleItemEdit = (evt) => {
    const itemIndex = getProductIndex(evt.target.value)

    if(props.searchItem(evt.target.value) === false) {
      props.onItemizedItemEdit(evt, props.item.itemId);
      if(itemIndex !== -1 ) setItem(props.productList[itemIndex]);
      else setItem(null);
    }
    else {
      alert("Item already exists");
    }
  }

  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  useEffect(() => {
    const itemIndex = getProductIndex(props.item.productId);
    if(itemIndex !== -1) setItem(props.productList[itemIndex]);
    else setItem(null);
  }, [props.productList, props.item.productId])
  return (
    <tr>
      <td style={{ width: "60%" }}>
        <Form.Select aria-label="Select Product" name="productId" value={props.item.productId} onChange={(evt) => handleItemEdit(evt)} required>
          <option selected disabled value="">Select Product</option>
          {props.productList && props.productList.length ? props.productList.map((product) => (
            <option value={product.productId}>{product.productName + " - " + product.productDescription}</option>
          )) : ""
          } 
        </Form.Select>
      </td>
      <td style={{ width: "40%" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemGroup",
            placeholder: "Enter Item group",
            value: props.item.itemGroup,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" } } className="d-flex pt-3">
        <span
            className="fw-bold border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
            style={{ width: "20px", height: "20px", marginRight: "10px"}}>
        {props.currency}
        </span> { item !== null ? item.productPrice: ""} 
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;