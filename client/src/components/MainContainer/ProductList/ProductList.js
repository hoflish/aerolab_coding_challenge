import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  redeemProductRequest,
  redeemProductDone,
  redeemProductError
} from "../../../actions/action-creators/product-actions";
import http from "../../../services/http";
import ProductItem from "./ProductItem/ProductItem";
import "./ProductList.css";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO: block ui interaction when processing redeem to more control...
  handleRedeemAction(productId) {
    const self = this;
    this.props.dispatch(redeemProductRequest());
    new Promise((resolve, reject) => {
      return http
        .post("redeem", { productId: productId })
        .then(response =>
          response.json().then(isRedeemed => ({ isRedeemed, response }))
        )
        .then(({ isRedeemed, response }) => {
          if (!response.ok) {
            reject(isRedeemed);
          }
          resolve({isRedeemed, productId});
        });
    })
      .timeout(6e3)
      .then(({isRedeemed, productId}) => {
        self.props.dispatch(redeemProductDone(productId));
      })
      .catch(err => {
        // TODO: handle errors with better way...!
        self.props.dispatch(redeemProductError(err));
        console.log(err)
      })
      .finally(() => {
        console.log("redeem action done!");
      });
  }

  render() {
    const { products, userData } = this.props;
    return (
      <div className="productList paddingTop16">
        {products.map((product, key) => (
          <ProductItem
            userData={userData}
            product={product}
            key={product._id}
            onAction={this.handleRedeemAction.bind(this)}
            redeemRequested={this.props.redeemRequested}
            redeemedItem={this.props.redeemedItem}
            redeemError={this.props.redeemError}
          />
        ))}
      </div>
    );
  }
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  productIds: state.product.productIds,
  redeemedItem: state.product.redeemedItem,
  redeemError: state.product.redeemError,
  redeemRequested: state.product.redeemRequested,
});

export default withRouter(connect(mapStateToProps)(ProductList));
