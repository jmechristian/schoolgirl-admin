import React from 'react';

const Sandbox = () => {
  return (
    <>
      <script> var wk_type_url = '/';</script>
      <div class='rte'>
        <div class='mp_sp_page' data-cust='{{ customer.id }}'></div>
        <div class='wk_cstm_email' data-cust='{{ customer.email }}'></div>
        <div class='wk_cstm_name' data-cust='{{ customer.name }}'></div>
      </div>
      <div class='mp-loader'>
        <div class='mp-spinner'></div>
        <div class='title-text'>Please Wait...</div>
      </div>
      <script
        type='text/javascript'
        src='https://sp-seller.webkul.com/js/vc_seller_profile.min.js'
      ></script>
    </>
  );
};

export default Sandbox;
