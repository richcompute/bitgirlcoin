import React from 'react';

export default class AdComponent extends React.Component {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
      <div className='ad'>
        <ins className='adsbygoogle'
		  google_ad_client='ca-pub-9159845052269180'
          enable_page_level_ads='true'/>
      </div>
    );
  }
}