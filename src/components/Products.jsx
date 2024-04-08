import React, { useState} from "react";
import { Button} from "react-bootstrap";
import { BiSolidPencil, BiCheck } from "react-icons/bi";
import EditableField from "./EditableField";

const Product = (props) => {
  const [isEditing, setIsEditing] = useState(props.isEditing);
  const [updatedProduct, setUpdatedProduct] = useState({productId: props.productId, productName: props.productName, productPrice: props.productPrice, productDescription: props.productDescription});

  const handleEditClick = () => {

  if(isEditing) {
    console.log("here")
    props.onProductUpdate(updatedProduct);
  }

    setIsEditing(!isEditing);
    console.log("isEditing", isEditing);
  }

  return (
    <tr>
      <td >{props.productId}</td>
      <td >{isEditing ? <EditableField
        onItemizedItemEdit={(evt) =>
          setUpdatedProduct({...updatedProduct, [evt.target.name]: evt.target.value})
        }
        cellData={{
          type: "text",
          name: "productName",
          placeholder: "Product name",
          value: updatedProduct.productName,
          id: props.productId,
        }}
      />: updatedProduct.productName}</td>

      <td >{isEditing ? <EditableField
        onItemizedItemEdit={(evt) =>
          setUpdatedProduct({...updatedProduct, [evt.target.name]: evt.target.value})
        }
        cellData={{
          type: "text",
          name: "productDescription",
          placeholder: "Product Description",
          value: updatedProduct.productDescription,
          id: props.productId,
        }}
        />: updatedProduct.productDescription}
        </td>
      <td>{isEditing ? <EditableField
        onItemizedItemEdit={(evt) =>
          setUpdatedProduct({...updatedProduct, [evt.target.name]: evt.target.value})
        }
        cellData={{
          leading: props.currency,
          type: "number",
          name: "productPrice",
          min: 1,
          step: "0.01",
          presicion: 2,
          placeholder: "Product Price",
          value: updatedProduct.productPrice,
          id: props.productId,
          textAlign: "center"
        }}
      /> : <div className="d-flex flex-nowrap px-2">
        <span
          className="fw-bold border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
          style={{ width: "20px", height: "20px", marginRight: "10px"}}>
      {props.currency}</span> { updatedProduct.productPrice} 
      </div>
    }</td>
      <td className="text-center">
      { !isEditing ? <Button variant="light" className="mx-2" onClick={handleEditClick}><BiSolidPencil /></Button>
        : <Button variant="success" className="mx-2" onClick={ handleEditClick}>< BiCheck/></Button>
  }
        </td>
    </tr>
  )
}

export default Product;