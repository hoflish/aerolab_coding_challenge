import React, { Component } from "react";
import { object} from "prop-types";
import _ from 'lodash';
import Spinner from "../../../Spinner/Spinner";
import classNames from "classnames";
import "./ProductItem.css";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      itemId: undefined
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onRedeem = this.onRedeem.bind(this);
  }

  onMouseEnter(_id) {
    this.setState({ hover: true, itemId: _id });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onRedeem(evt, productId) {
    this.stopEvent(evt);
    const { onAction } = this.props;
    if (evt.isTrusted && !evt.repeat) {
      onAction && onAction(productId);
    }
  }

  render() {
    const { product, userData, redeemRequested, /*redeemedItem, redeemError*/ } = this.props;
    const { hover, itemId } = this.state;
    const isRedeemed = !_.isEmpty(userData) && !!(userData.redeemHistory.find((p) => p.productId === product._id));
    const classes = classNames({
      productItem: true,
      productItem__hovered: hover && itemId === product._id,
      "redeemed-hint": isRedeemed,
      "cannot-redeem-hint": userData.points - product.cost < 0
    });
    return (
      <div
        className={classes}
        onMouseEnter={() => this.onMouseEnter(product._id)}
        onMouseLeave={this.onMouseLeave}
      >
        <div className="productItem__top">
          <div className={"productItem--img"}>
            <img src={product.img.url} alt="" />
            <span className={"productItem--redeem-act"}>
              {isRedeemed ?
                "Check this product in your redeem history"
                : (userData.points - product.cost >= 0 ? (
                <button
                  disabled={!!redeemRequested}
                  onClick={evt => this.onRedeem(evt, product._id)}
                  className="btn primaryBtn redeemBtn"
                >
               {redeemRequested ? <Spinner size={"small"}/> : "Redeem now"}
                </button>
              ) : (
                `you need ${product.cost - userData.points} more points to redeem this product`
              ))}
            </span>
          </div>
        </div>

        <div className="productItem__bottom">
          <div className="flex-between">
            <span className="productItem--category">{product.category}</span>
            <div className="productItem--cost">
              <h1 className="productItem--price">
                {product.cost}
                <span className={"productItem--pts"}>Pts</span>
              </h1>
            </div>
          </div>
          <span className="productItem--title ellipsis" title={product.name}>
            {product.name}
          </span>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: object.isRequired,
  userData: object,
};

export default ProductItem;
