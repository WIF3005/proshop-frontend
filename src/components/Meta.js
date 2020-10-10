import React from 'react'
import { Helmet } from 'react-helmet'

function Meta({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to ProShop',
}

export default Meta
