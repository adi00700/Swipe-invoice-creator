import React, {useState} from "react";
import { Button, Row, Table } from "react-bootstrap";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { useProductListData } from "../redux/hooks";
import { addProduct, updateProduct} from "../redux/productsSlice";

const ProductList = ({currency}) => {

  const dispatch = useDispatch();
  const { productList, productListSize } = useProductListData();

  const handleAddProduct = (productId, updatedProduct) => {
    dispatch(addProduct(updatedProduct));
    setNewProduct(null)
  }

  const handleUpdateProduct = (productId, updatedProduct) => {
    dispatch(updateProduct({ id: productId, updatedProduct: updatedProduct }));
  }
  const [newProduct, setNewProduct] = useState(null);

  return (
    <div className="my-4" >
      <Row className="mb-4">
        <Table >
          <thead>
            <tr>
              <th style={{minWidth: "50px"}}>ID</th>
              <th style={{width: "40%"}}>Product</th>
              <th style={{width: "60%"}}>Description</th>
              <th style={{minWidth: "150px"}}>Price/Rate</th>
              <th style={{width: "200px"}}className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList && productList.length ? productList.map((product) => (
                <Product 
                  key={product.productId}
                  currency={currency}
                  productId={product.productId}
                  productName={product.productName}
                  productDescription={product.productDescription}
                  productPrice={product.productPrice}
                  isEditing={false}
                  onProductUpdate={(updatedProduct) => handleUpdateProduct(product.productId, updatedProduct)}
                />
            )) : "" }
            {newProduct !== null ?
              <Product
                key={newProduct.productId}
                currency={currency}
                productId={newProduct.productId}
                productName={newProduct.productName}
                productDescription={newProduct.productDescription}
                productPrice={newProduct.productPrice}
                isEditing={true}
                onProductUpdate={(updatedProduct) => handleAddProduct(newProduct.productId, updatedProduct)}
              /> 
              : ""}
          </tbody>
        </Table>
      </Row>
      <Button className="fw-bold" onClick={() => setNewProduct({productId: productListSize+1, productName:"", productPrice: 1, productDescription:""})}>Add Product</Button>
    </div>
  );
}

export default ProductList;