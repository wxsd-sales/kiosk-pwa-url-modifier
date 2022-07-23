# Kiosk PWA URL Modifier
These are two simple macros which automatically add a Webex Devices deviceId as a URL parameter to either the Kiosk or PWA URL. This is useful if you wish to identify which device loaded your web app. This approach makes it convient to use a singla URL template for multiple devices and let the macro do the hard work of customising the URL for you.

## Example

With the Macro running and the keywork set to ``$(deviceId)``, the following will occur:
1. Kiosk URL set to: https://www.example.com?deviceId=$(deviceId)
2. Macro modifies it to: https://www.example.com?deviceId=123456789abcdefg

## Requirements

### Kiosk:

1. RoomOS 10.14.x ( with RoomOS 11 Enabled ) or above Webex Desk and Board Series Device.
   * Kiosk mode is not supported on Desk Hub, DX70, or DX80.
2. Web admin access to the device to uplaod the macro.

### PWA:

1. A Webex Room navigator paired with a Webex Device
2. Web admin access to the device to uplaod the macro.

## Setup

1. Download either the  ``kiosk-url-updater.js`` or ``pwa-url-updater.js`` file and upload it to your Webex Room devices Macro editor via the web interface.
2. Configure ``keyword`` with the string you with to replace in the URL template.
3. Enable the Macro on the editor.

## Support

Please reach out to the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=kiosk-pwa-modifier)
