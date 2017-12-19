//@flow
import _ from 'lodash';

function ErrorHandler(
  msg: string,
  fn1: ?Function,
  _Error: Error,
  fn2: Function
) {
  function foo(msg) {
    _.isFunction(fn2) && fn2.apply(this, _.tail(arguments));
    _.isFunction(fn1)
      ? (this.message = fn1.apply(this, arguments))
      : arguments.length > 0
      ? (this.message = '' + msg)
      : fn1 ? (this.message = fn1) : (this.message = this.name);

    let error =
      this.message !== this.name ? this.name + ': ' + this.message : this.name;
    let errStack = new Error(error).stack;
    if (!errStack)
      try {
        throw new Error(error);
      } catch (e) {
        errStack = e.stack;
        errStack || (errStack = 'Error: ' + error + '\n    at (unspecified)');
      }
    this.stack = errStack;
  }

  _Error = _Error || Error;
  foo.prototype = Object.create(_Error.prototype);
  foo.prototype.name = msg;
  return foo;
}

function defineAll_(collection, n) {
  return _.reduce(
    collection,
    function(result, value, key) {
      let _key, _value;
      _.isString(key) ? ((_key = key), (_value = value)) : (_key = value);
      result[_key] = ErrorHandler(_key, _value, n);
      return result;
    },
    {}
  );
}

const InternetConnError = ErrorHandler('InternetConnError');
const InternalError = ErrorHandler('InternalError');

export default {
  define: ErrorHandler,
  defineAll: defineAll_,
  InternetConnError: InternetConnError,
  InternalError: InternalError,
};
