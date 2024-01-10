# Kiosk PWA URL Modifier

This example macro shows how you can automatically add a Webex Devices Device Id as a URL parameter to either the Kiosk or PWA URL.

This is useful if you wish to identify which device loaded your Web App. This approach makes it convenient to use a single URL template for multiple devices and let the macro do the hard work of customising the URL.

## Overview

The Macro checks the Kiosk and PWA URL configured upon startup and continues to monitor where ever they are changed.

If the macro finds the keyword ``$(deviceId)`` in any of the URLs, it will then replace that keyboard with the devices actual Device Id.

Example:

1. Kiosk URL set to: 
```
https://www.example.com?deviceId=$(deviceId)
```
2. Macro will then modify it to:
```
https://www.example.com?deviceId=123456789abcdefg
```

## Setup

### Prerequisites & Dependencies: 

- Webex Device with RoomOS 11.x or above
- Web admin access to the device to upload the macro


### Installation Steps:

1. Download the ``kiosk-url-updater.js`` file and upload it to your Webex Devices Macro editor via the web interface.
2. Enable the Macro on the editor.


## Validation

Validated Hardware:

* Board 55
* Desk Pro

This macro should work on other Webex Devices but has not been validated at this time.

## Demo

*For more demos & PoCs like this, check out our [Webex Labs site](https://collabtoolbox.cisco.com/webex-labs).


## License

All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer
 
Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex use cases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=kiosk-pwa-url-modifier) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
