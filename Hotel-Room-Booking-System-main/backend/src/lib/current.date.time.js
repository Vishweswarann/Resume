/**
 * @name Hotel Room Booking System
 * @author Vishweswaran N
 * @description Hotel Room Booking and Management System Software ~ Developed By Vishweswaran N
 * @copyright ©2023 ― Vishweswaran N. All rights reserved.
 * @version v0.0.1
 *
 */

/**
 * function to generate current data and time
 * @returns current data and time
 */
const currentDateTime = () => {
  const date = new Date();
  const currentDataTime = date.toLocaleString([], { hour12: true });

  return currentDataTime;
};

module.exports = currentDateTime;

