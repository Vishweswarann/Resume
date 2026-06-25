/**
 * @name Hotel Room Booking System
 * @author Vishweswaran N
 * @description Hotel Room Booking and Management System Software ~ Developed By Vishweswaran N
 * @copyright ©2023 ― Vishweswaran N. All rights reserved.
 * @version v0.0.1
 *
 */

import { Layout, Spin } from 'antd';
import React from 'react';

const { Content } = Layout;

function PageLoader() {
  return (
    <Content className='page-loader'>
      <Spin
        size='large'
        tip='Loading...'
      />
    </Content>
  );
}

export default PageLoader;

