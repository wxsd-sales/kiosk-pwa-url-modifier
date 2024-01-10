/********************************************************
 * 
 * Macro Author:      	William Mills
 *                    	Technical Solutions Specialist 
 *                    	wimills@cisco.com
 *                    	Cisco Systems
 * 
 * Version: 2-0-0
 * Released: 01/10/24
 * 
 * This is a simple macro which automatically adds a Webex Devices 
 * deviceId as a URL parameter to the Kiosk URL. If it contains a 
 * configurable keyword. In the example below, the keyword is
 * $(deviceId) and when the marco starts or when the Kiosk URL
 * is changed via SSH, Web Interface or Control Hub. The macro will
 * inspect the URL for the keyword and insert the deviceId.
 * 
 * For Example:
 * 
 * If you set the Kiosk URL set to: 
 * https://www.example.com?deviceId=$(deviceId)
 * 
 * The Macro modifies it to:
 * https://www.example.com?deviceId=123456789abcdefg
 * 
 * 
 * Full Readme, source code and license details for this macro are available 
 * on GitHub: https://github.com/wxsd-sales/kiosk-pwa-url-modifier
 * 
 ********************************************************/

import xapi from 'xapi';

// The value to search for in the Kiosk URL
const keyword = '$(deviceId)';

// This is used to store the devices ID in momory
let deviceId = 'asdfas';

setTimeout(checkUrls, 10000);

xapi.Config.UserInterface.Kiosk.URL.on(checkKioskUrl)
xapi.Config.UserInterface.HomeScreen.Peripherals.WebApp.URL.on(checkPWAUrl);
xapi.Config.Standby.Signage.Url.on(checkSignageUrl);
xapi.Event.UserInterface.Extensions.Widget.LayoutUpdated.on(checkWebApps);


async function checkUrls() {
  try {
    deviceId = await xapi.Status.Webex.DeveloperId.get()
  } catch (error) {
    console.log('Unable to get Device Id from xStatus');
  }

  console.log('Checking URLs for Device Id Keyword')
  checkKioskUrl();
  checkPWAUrl();
  checkSignageUrl
  checkWebApps();
}


async function checkKioskUrl() {
  let kioskUrl = '';
  try {
    kioskUrl = await xapi.Config.UserInterface.Kiosk.URL.get()
  } catch (error) {
    console.log('Kiosk Mode not available on device to check URL');
  }

  if (!kioskUrl.includes(keyword)) return
  console.log('Updating PWA URL with Device Id');
  xapi.Config.UserInterface.Kiosk.URL.set(kioskUrl.replace(keyword, deviceId))

}

async function checkPWAUrl() {
  const pwaUrl = await xapi.Config.UserInterface.HomeScreen.Peripherals.WebApp.URL.get()
  if (!pwaUrl.includes(keyword)) return
  console.log('Updating PWA URL with Device Id');
  xapi.Config.UserInterface.HomeScreen.Peripherals.WebApp.URL.set(pwaUrl.replace(keyword, deviceId))
}

async function checkSignageUrl() {
  const signageUrl = await xapi.Config.Standby.Signage.Url.get()
  if (!signageUrl.includes(keyword)) return
  console.log('Updating Signage URL with Device Id');
  xapi.Config.Standby.Signage.Url.set(signageUrl.replace(keyword, deviceId))
}


async function checkWebApps() {
  const extensions = await xapi.Command.UserInterface.Extensions.List({ ActivityType: 'WebApp' });
  if (!extensions.hasOwnProperty('Extensions')) return
  if (!extensions.Extensions.hasOwnProperty('Panel')) return
  const webapps = extensions.Extensions.Panel;
  if (webapps.length == 0) return
  webapps.forEach(webapp => {
    if (!webapp.ActivityData.includes(keyword)) return
    webapp.ActivityData = webapp.ActivityData.replace(keyword, deviceId);
    saveWebApp(webapp)
  })
}


function saveWebApp(webapp) {
  console.log(`Updating WebApp [${webapp.Name}] URL with Device Id`)
  const panel = `<Extensions>
  <Panel>
    <Order>${webapp.Order}</Order>
    <Location>${webapp.Location}</Location>
    <Icon>Custom</Icon>
    <Name>${webapp.Name}</Name>
    <ActivityType>WebApp</ActivityType>
    <ActivityData>${webapp.ActivityData}</ActivityData>
    <CustomIcon>
      <Content/>
      <Id>${webapp.CustomIcon.Id}</Id>
    </CustomIcon>
  </Panel>
  </Extensions>`

  return xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: webapp.PanelId }, panel);
}
