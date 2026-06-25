/**
 * @name Hotel Room Booking System
 * @author Vishweswaran N
 * @description Hotel Room Booking and Management System Software ~ Developed By Vishweswaran N
 * @copyright ©2023 ― Vishweswaran N. All rights reserved.
 * @version v0.0.1
 *
 */

import { notification } from 'antd';

const notificationWithIcon = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg
  });
};

export default notificationWithIcon;

