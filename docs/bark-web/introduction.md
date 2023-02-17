# WeBark
<p align="left">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg"></a>
</p>
[Home Page](https://bark-web.plantree.me)

A web client for [Bark](https://github.com/Finb/Bark), which is a perfect app that allows you to push customed notifications to your iPhone.

#### 0. Background

Bark has a very simple push interface: just send a HTTP request.

As we all know, the easiest way to do this is by the Web.

#### 1. API

Reference: https://github.com/Finb/bark-server/blob/master/docs/API_V2.md

| Field                        | Type    | Description                                                  |
| ---------------------------- | ------- | ------------------------------------------------------------ |
| title (required)             | string  | Notification title (font size would be larger than the body) |
| body (required)              | string  | Notification content                                         |
| category                     | string  | Reserved field, no use yet                                   |
| device_key                   | string  | The key for each device                                      |
| level (optional)             | string  | `'active'`, `'timeSensitive'`, or `'passive'`                |
| badge (optional)             | integer | The number displayed next to App icon ([Apple Developer](https://developer.apple.com/documentation/usernotifications/unnotificationcontent/1649864-badge)) |
| automaticallyCopy (optional) | string  | Must be `1`                                                  |
| copy (optional)              | string  | The value to be copied                                       |
| sound (optional)             | string  | Value from [here](https://github.com/Finb/Bark/tree/master/Sounds) |
| icon (optional)              | string  | An url to the icon, available only on iOS 15 or later        |
| group (optional)             | string  | The group of the notification                                |
| isArchive (optional)         | string  | Value must be `1`. Whether or not should be archived by the app |
| url (optional)               | string  | Url that will jump when click notification                   |

Example:

```bash
$ curl -X "POST" "http://127.0.0.1:8080/push" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "body": "Test Bark Server",
  "device_key": "ynJ5Ft4atkMkWeo2PAvFhF",
  "title": "bleem",
  "badge": 1,
  "category": "myNotificationCategory",
  "sound": "minuet.caf",
  "icon": "https://day.app/assets/images/avatar.jpg",
  "group": "test",
  "url": "https://mritd.com"
}'
```

#### 2. Technology Stack

- FrontEnd
  - vue 3
  - vite
  - Tailwind CSS
  - axios
  - formKit
- BackEnd
  - Vercel

#### 3. Acknowledgements

1. Developer of [Bark](https://github.com/Finb/Bark), which provide service of notifications.
2. Developer of [GreenWall](https://green-wall.vercel.app/), which provide a elegant style.

#### Changelogs

##### 2022.02.10(v0.9.1)

###### Feature

1. reconstruct because of commercial license
2. features are the same as last version

##### 2022.02.08 (v0.9.0)

###### Feature

1. Support writing and sending notifications on the Web easily
2. Support sending at a schedule time
3. Support local cache to avoid data lost

#### Reference

1. https://github.com/Finb/Bark
2. https://github.com/Finb/bark-server
3. https://github.com/Finb/bark-server/blob/master/docs/API_V2.md
4. https://green-wall.vercel.app/
5. https://formkit.com/
