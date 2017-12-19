import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CONFIG from "../../config/app";
import http from "../../services/http";
import helpers from "../../helpers/index";
import { INFO } from "../../actions/_constants";
import EH from "../../libs/errors-handler/index";
import {
  productIdsLoaded,
  productIdsError,
  paginateProducts,
  sortProducts
} from "../../actions/action-creators/product-actions";
import ProductList from "./ProductList/ProductList";
import ProductSortBanner from "./ProductSortBanner/ProductSortBanner";
import ProductPaginationBanner
  from "./ProductPaginationBanner/ProductPaginationBanner";
import Spinner from "../Spinner/Spinner";
//import SideBar from "../../components/SideBar";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      _STATE: INFO.LOADED
    };
    this.handlePagination = this.handlePagination.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  fetchProducts() {
    return new Promise((resolve, reject) => {
      return http
        .get("products")
        .then(response =>
          response.json().then(products => ({ products, response })))
        .then(({ products, response }) => {
          if (!response.ok) {
            reject(products);
          } else {
            resolve(products);
          }
        });
    });
  }

  loadProductIds() {
    const self = this;
    this.setState({
      _STATE: INFO.FETCHING
    });
    const _productResponsePromise = this.fetchProducts();
    return _productResponsePromise
      .timeout(CONFIG.TIMEOUT_DURATION)
      .then(products => {
        if (_.isArray(products)) {
          const sortedProducts = helpers.sortProductsByPrice(
            products,
            this.props.sortValue
          );
          const ids = _.chunk(
            _.map(sortedProducts, "_id"),
            CONFIG.PAGINATION_LIMIT_NUMBER
          );
          self.props.dispatch(productIdsLoaded(ids));
          return { sortedProducts, ids };
        }
      })
      .then(({ sortedProducts, ids }) => {
        const productsByPage = _.filter(sortedProducts, product => {
          return _.includes(ids[this.props.page - 1], product._id);
        });
        self.setState({
          products: productsByPage,
          _STATE: INFO.LOADED
        });
        return null;
      })
      .catch(err => {
        if (err instanceof Promise.TimeoutError) {
          return helpers.checkOnline().then(res => {
            if (!res) {
              throw new EH.InternetConnError();
            } else {
              self.props.dispatch(productIdsError(err));
              console.log(err);
            }
          });
        }
        console.log(err);
        return null;
      })
      .finally(() => {
        self.setState({
          _STATE: INFO.LOADED
        });
        console.log("handling products done!");
      });
  }

  componentDidMount() {
    this.loadProductIds();
  }

  getProductsSize(productIds) {
    return _.reduce(productIds, (sum, el) => sum + _.size(el), 0);
  }

  stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handlePagination(e, pageNumber) {
    this.stopEvent(e);
    if (typeof pageNumber === "number") {
      this.props.dispatch(paginateProducts(pageNumber));
      return;
    }
    switch (pageNumber) {
      case "next":
        this.props.dispatch(paginateProducts(this.props.page + 1));
        break;
      case "prev":
        this.props.dispatch(paginateProducts(this.props.page - 1));
        break;
      default:
        return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.page !== nextProps.page ||
      nextProps.sortValue !== this.props.sortValue
    ) {
      this._promise = this.loadProductIds();
    }
  }

  componentWillUnmount() {
    this._promise && this._promise.cancel();
  }

  handleSelectChange(evt) {
    this.props.dispatch(sortProducts(evt.target.value));
  }

  render() {
    const { products, _STATE } = this.state;
    const { user, productIds, page, sortValue, isLoggedIn } = this.props;
    const productsSize = this.getProductsSize(productIds);
    return (
      <main id="mainContainer" role="main">
        <div>
          {/* product sort section */}
          <ProductSortBanner onSelectChange={this.handleSelectChange} sortValue={sortValue} />

          {/* product pagination banner */}
          <ProductPaginationBanner
            page={page}
            productsSize={productsSize}
            onPaginate={this.handlePagination}
          />

          {/* product list */}
          {_STATE === INFO.FETCHING
            ? <Spinner />
            : <ProductList userData={user} products={products} />}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.account.isLoggedIn,
  user: state.account.user,
  productIds: state.product.productIds,
  page: state.product.page,
  sortValue: state.product.sortValue
});

export default withRouter(connect(mapStateToProps)(MainContainer));
