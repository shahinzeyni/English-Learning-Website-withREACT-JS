import React from 'react'

import './FooterItem.css'

export default function FooterItem({ title, children }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
    <div className="footer-widgets__item">
      <span className="footer-widgets__title">
        {title}
      </span>

      {children}
    </div>
  </div>
  )
}
