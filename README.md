# React-Native Boilarplate by Homee

- Animated DropDown Picker
- Custom BottomTab with 2 Demo Screens.
- Navigations (ReactNavigations V6).
- Preloaded Dependencies ( Redux, Redux-thunk, Redux-logger, Redux-Persist).
- Custom Components.
- Axios Api Manager.
- Multiple type of Onboarding Screens
- Login Screen with Validation Toast.
- Mobile Login Screen.
- .env file with Demo API.
- OTP Screen.
- Optimised Keyboard Avoiding View.
- Footer Content.
- i18n with 4 demo languages.
- Multiple Language Support.
- Custom Picker.
- Animated Check Box, Toggle Button, Radio Button.

## Installation

Install with npx or yarn

since there is an error with latest React-Native versions, we will stick to 0.68.2

Replace your package name with MyDemoApp.

I have added few fonts in ready made template.

```bash
 npx react-native init MyDemoApp --version 0.68.2 --template rn-homee
```

Download Popping Font from link below, and Copy pest Regular, Medium, Bold into src/assets/Fonts

```bash
 https://fonts.google.com/specimen/Poppins
```

Link assets with

```bash
 npx react-native link
```

## Screenshots

![App Screenshot](https://i.paste.pics/f765c986b0d5bd45d82516185b94f777.png)

![App Screenshot](https://i.paste.pics/951a9cc4a95476e4dbcc3d9d5328cdf9.png)

## Animated Components

Check box, Radio Button, Switch.

```bash
import { AppCheckBox, AppRadioButton, AppSwitch } from '../../components/Custom';

<AppCheckBox
	top={AppMargin._20}
	value={isChecked}
	onValueChange={() => {
	this.setState({ isChecked: !isChecked });
    }}
  />
```

## Authors

- I welcome all contributors
- [@homeejadav](https://www.github.com/homeejadav)
