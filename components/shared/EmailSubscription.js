import React from 'react';
import FadeInWrapper from './FadeInWrapper';
import Mailchimp from 'react-mailchimp-form';

const EmailSubscription = () => {
  return (
    <FadeInWrapper>
      <div className='w-full flex flex-col justify-center items-center px-6 md:px-0 max-w-7xl mx-auto'>
        <div className='flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center bg-mint w-full h-full mx-auto py-4 px-6 md:py-9 md:px-16'>
          <div className='w-full md:w-2/5'>
            <div className='text-2xl text-center md:text-left md:text-4xl font-canela text-gray-700'>
              Send me the latest on Schoolgirl Style!
            </div>
          </div>
          <div className='w-full md:w-3/5'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <div className='w-full'>
                <Mailchimp
                  action='https://schoolgirlstyle.us20.list-manage.com/subscribe/post?u=1940c0390c966af8373f977ec&amp;id=30b68bcf07&amp;f_id=00c076e1f0'
                  fields={[
                    {
                      name: 'EMAIL',
                      placeholder: 'Email',
                      type: 'email',
                      required: true,
                    },
                  ]}
                  className='mc-form w-full flex flex-col lg:flex-row gap-2'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
};

export default EmailSubscription;

// <!-- Begin Mailchimp Signup Form -->
// <link href="//cdn-images.mailchimp.com/embedcode/classic-071822.css" rel="stylesheet" type="text/css">
// <style type="text/css">
// 	#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif;  width:600px;}
// 	/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
// 	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
// </style>
// <div id="mc_embed_signup">
//     <form action="https://schoolgirlstyle.us20.list-manage.com/subscribe/post?u=1940c0390c966af8373f977ec&amp;id=30b68bcf07&amp;f_id=00c076e1f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
//         <div id="mc_embed_signup_scroll">
//         <h2>Subscribe</h2>
//         <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
// <div class="mc-field-group">
// 	<label for="mce-EMAIL">Email Address  <span class="asterisk">*</span>
// </label>
// 	<input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" required>
// 	<span id="mce-EMAIL-HELPERTEXT" class="helper_text">you@you.com</span>
// </div>
// 	<div id="mce-responses" class="clear">
// 		<div class="response" id="mce-error-response" style="display:none"></div>
// 		<div class="response" id="mce-success-response" style="display:none"></div>
// 	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
//     <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1940c0390c966af8373f977ec_30b68bcf07" tabindex="-1" value=""></div>
//     <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
//     </div>
// </form>
// </div>
// <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
// <!--End mc_embed_signup--></link>
