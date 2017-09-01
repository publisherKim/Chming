
export default {
  install: (Vue, options) => {

    let toString = Array.prototype.toString;
    let slice = Array.prototype.slice;
    let forEach = Array.prototype.forEach;

    function type(data) {
      return toString.call(data).slice(8, -1).toLowerCase();
    }
    function isType(data, data_type) {
      validate(data_type, 'string', 'data_type 전달 인자는 문자열이 전달되어야 합니다');
      return type(data) === data_type;
    }
    function validate(data_type, compare_data_type, throw_message) {
      if( type(data_type) === compare_data_type ) {
        return true;
      } else {
        throw throw_message;
      }
    }
    Vue.isNumber = function(data) {
      return isType(data, 'number') && !Number.isNaN(data);
    };
    Vue.isString = function(data) {
      return isType(data, 'string');
    };
    Vue.isFunction = function(data) {
      return isType(data, 'function');
    };
    Vue.isArray = function(data) {
      return isType(data, 'array');
    };
    Vue.isObject = function(data) {
      return isType(data, 'object');
    };
    Vue.makeArray = function(obj) {
      if( !('length' in obj) ) {
        return [];
      }
      return slice.call(obj);
    };
    let forEachFn = function() {
      if(forEach) {
        return function(obj, callback) {
          obj.forEach(callback);
        };
      } else {
        return function(obj, callback) {
          for(let i = 0, l = obj.length; i < l; i++) {
            callback(obj[i], i, obj);
          }
        };
      }
    }();
    Vue.each = function(obj, callback) {
      // 전달된 obj의 유형 파악
      // callback 이 함수 유형인지 검증
      validate(callback, 'function', '두 번째 인자는 함수이어야 합니다.');

      // 1. 배열
      if(!this.isObject(obj) && obj.length) { obj = this.makeArray(obj); }
      this.isArray(obj) && forEachFn(obj, callback);

      // 2. 객체
      if(this.isObject(obj)) {
        for( let prop in obj ) {
          obj.hasOwnProperty(prop) && callback(prop, obj[prop], obj);
        }
      }
    };
    Vue.mixin = function() {
      var args = this.makeArray(arguments);
      for(var i=0, l=args.length; i<l; i++) {
        if(!this.isObject(args[i]) && !this.isFunction(args[i])) {
          throw '전달인자로 객체만 허용합니다.';
        }
      }
      var mixin_obj = args.shift();
      var next = args.shift();
      do {
        for(var prop in next) {
          if(next.hasOwnProperty(prop)) {
            mixin_obj[prop] = next[prop];
          }
        }
        next = args.shift();
      } while ( next );

      return mixin_obj;
    };
    Vue.setFormData = function(obj) {
      let formData = new FormData();

      Vue.each(obj, function(key, value) {
        formData.append(key, obj[key]);
      });

      return formData;
    };
    Vue.isFileValidate = function(file) {
      let isExceed5MB = file.size > 1024 * 1024 * 5;
      let isImage = file.type.split('/')[0] === 'image';
      return !isExceed5MB && isImage;
    };
  },
};
