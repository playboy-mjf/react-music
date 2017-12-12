import React from 'react'
import './header.less'
import { Row, Col } from 'antd'
class Header extends React.Component {
  
  render() {
    return(
          <Row className="components-header">
            <Col span={1}>
              <img src="/static/img/logo.png" />
            </Col>
            <Col span={23}>
              <h1 className="caption">React MUsic Player</h1>
            </Col>
          </Row>

      )
    
  }
}


export default Header;