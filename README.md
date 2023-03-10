# React-Native Boilarplate by Homee

New Added.

- Animated Favorite Button
- Animated Drop Down

---

- Custom BottomTab with 2 Demo Screens.
- Navigations (ReactNavigations V6).
- Preloaded Dependencies ( Redux, Redux-thunk, Redux-logger, Redux-Persist).
- Custom Components.
- Axios Api Manager.
- Multiple type of Onboarding Screens
- Login Screen with Validation Toast.
- Mobile Login Screen.
- .Env file with Demo API.
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

![App Screenshot](https://i.paste.pics/a453a86a684106838bb157924cb70021.png)

## Custom Animated Components

Animated Dropdown

```bash
import AppPicker from '../../components/Custom/AppPicker';

<AppPicker
	title={this.state.lang}
	shadow={true}
	options={languageOption}
	itemKey={'label'}
	itemValue={'value'}
	onSelectOption={(name, value) => {
		this.setState({ lang: name })
		this.props.dispatchData(value, reducerType.localize);
		}}
	/>
```

Check box

```bash
import { AppCheckBox } from '../../components/Custom';

<AppCheckBox
	top={AppMargin._20}
	value={isChecked}
	onValueChange={() => {
	this.setState({ isChecked: !isChecked });
    }}
  />
```

Radio Button

```bash
import { AppRadioButton } from '../../components/Custom';

<AppRadioButton
	top={AppMargin._20}
	value={isRadio}
	onValueChange={() => {
	this.setState({ isRadio: !isRadio });
	}}
/>
```

Switch Button

```bash
import { AppSwitch } from '../../components/Custom';

<AppSwitch
	top={AppMargin._20}
	value={isSwitch}
	onValueChange={() => {
	this.setState({ isSwitch: !isSwitch });
	}}
/>
```

Favorite Button

```bash
import { AppFavoriteButton } from '../../components/Custom';

<AppFavoriteButton
	top={AppMargin._20}
	value={isFavorite}
	onValueChange={() => {
	this.setState({ isFavorite: !isFavorite });
	}}
/>
```

## Authors

- I welcome all contributors
- [@homeejadav](https://www.github.com/homeejadav)
