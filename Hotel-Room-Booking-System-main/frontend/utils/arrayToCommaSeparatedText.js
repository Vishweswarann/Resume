/**
 * @name Hotel Room Booking System
 * @author Vishweswaran N
 * @description Hotel Room Booking and Management System Software ~ Developed By Vishweswaran N
 * @copyright ©2023 ― Vishweswaran N. All rights reserved.
 * @version v0.0.1
 *
 */

function arrayToCommaSeparatedText(array) {
  return array?.length > 0 ? array
    .map((item) => item)
    .join(', ')
    .toString() : 'N/A';
}

export default arrayToCommaSeparatedText;

