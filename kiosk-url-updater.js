/********************************************************
Copyright (c) 2022 Cisco and/or its affiliates.
This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at
               https://developer.cisco.com/docs/licenses
All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.
*********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 1-0-0
 * Released: 07/21/22
 * 
 * This is a simple macro which automatically adds a Webex Devices 
 * deviceId as a URL parameter to the Kiosk URL. If it contains a 
 * configurable keyword. In the example below, the keyword is
 * $(deviceId) and when the marco starts or when the Kiosk URL
 * is changed via SSH, Web Interface or Control Hub. The macro will
 * inspect the URL for the keyword and insert the deviceId.
 * 
 * Example:
 * Kiosk URL set to: https://www.example.com?deviceId=$(deviceId)
 * Macro modifies it to: https://www.example.com?deviceId=123456789abcdefg
 ********************************************************/

import xapi from 'xapi';

// The value to search for in the Kiosk URL
const keyword = '$(deviceId)';

// This is used to store the devices ID in momory
let deviceId = '';

function main() {

  // Get and store the Developer ID
  xapi.Status.Webex.DeveloperId.get()
  .then(id => {
    console.log('Device Id : ' + id);
    deviceId = id;
    // Initially check the URL
    checkUrl();
    // The monitor for changes
    xapi.Config.UserInterface.Kiosk.URL.on(checkUrl);
  })
  .catch(err => {
    console.log(err);
    console.log('Unabled to get deviceId');
  })
}

main();

function checkUrl(){
  
  // Get the current Kiosk URL
  xapi.Config.UserInterface.Kiosk.URL.get()
  .then(kioskUrl => {
    console.log('Check Kiosk URL is: ' + kioskUrl);
    // Only update the Kiosk URL if the deviceId isn't present and the keyword is
    if(!kioskUrl.includes(deviceId) && kioskUrl.includes(keyword)){
      const newUrl = kioskUrl.replace(keyword, deviceId);
      console.log('Updating Kiosk URL to: ' + newUrl)
      xapi.Config.UserInterface.Kiosk.URL.set(newUrl);
    } else {
      console.log('Kiosk URL unmodified');
    }
  })
  .catch(err => {
    console.log(err);
    console.log('Unabled to get Kiosk URL');
  })
}
