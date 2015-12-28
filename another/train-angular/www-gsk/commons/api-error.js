'use strict';
angular.module('site').factory('Error', function(CONSTANTS) {
  return {
    CO001: function() {
      return {
        code: 'CO-001',
        message: 'Something is wrong. Please try again later'
      };
    },
    CO002: function() {
      return {
        code: 'CO-002',
        message: 'Request without HTTPS does not supported'
      };
    },
    CO003: function() {
      return {
        code: 'CO-003',
        message: 'Post request has error(s). Please try again'
      };
    },
    CO004: function() {
      return {
        code: 'CO-004',
        message: 'Get request has error(s). Please try again'
      };
    },
    CO005: function() {
      return {
        code: 'CO-005',
        message: 'Post request does not supported'
      };
    },
    CO006: function() {
      return {
        code: 'CO-006',
        message: 'Get request does not supported'
      };
    },
    CO007: function() {
      return {
        code: 'CO-007',
        message: 'Call DMP is error.'
      };
    },
    CO008: function() {
      return {
        code: 'CO-008',
        message: 'JSON format is not correct'
      };
    },
    CO009: function() {
      return {
        code: 'CO-009',
        message: 'Call GIGYA is error.'
      };
    },
    SI001: function() {
      return {
        code: 'SI-001',
        message: 'User does not existed'
      };
    },
    SI002: function() {
      return {
        code: 'SI-002',
        message: 'Password does not valid'
      };
    },
    SU001: function() {
      return {
        code: 'SU-001',
        message: 'Email is existed'
      };
    },
    SU002: function() {
      return {
        code: 'SU-002',
        message: 'Sign up successfully'
      };
    },
    AS001: function() {
      return {
        code: 'AS-001',
        message: 'Account updated successfully'
      };
    },
    FP001: function() {
      return {
        code: 'FP-001',
        message: 'Please check your email to get temporary password'
      };
    },
    BI001: function() {
      return {
        code: 'BI-001',
        message: 'Badge is not found'
      };
    },
    FB001: function() {
      return {
        code: 'FB-001',
        message: 'Feedback sent successfully'
      };
    },
    JT001: function() {
      return {
        code: 'JT-001',
        message: 'User had team'
      };
    },
    LT001: function() {
      return {
        code: 'LT-001',
        message: 'User hadn\'t team'
      };
    },
    CC001: function() {
      return {
        code: 'CC-001',
        message: 'Create coupon successfully, please check your mail'
      };
    },
    VT001: function() {
      return {
        code: 'VT-001',
        message: 'Can\'t find your team'
      };
    },
    SL001: function() {
      return {
        code: 'SL-001',
        message: 'Add slip successfully'
      };
    },
    GA001: function() {
      return {
        code: 'GA-001',
        message: 'Add action gigya is success.'
      };
    },
    AU001: function() {
      return {
        code: 'AU-001',
        message: 'Send activity to user success'
      };
    },
    AU002: function() {
      return {
        code: 'AU-002',
        message: 'Send activity to user fail'
      };
    },
    AT001: function() {
      return {
        code: 'AT-001',
        message: 'Send activity to team success'
      };
    },
    AT002: function() {
      return {
        code: 'AT002',
        message: 'Send activity to team fail'
      };
    }
  };
});

//# sourceMappingURL=api-error.js.map
