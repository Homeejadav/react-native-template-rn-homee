/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */

import {
    CommonActions,
    createNavigationContainerRef,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export const NAVIGATE = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params)
    }
}

export const BACK = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.goBack(name, params)
    }
}

export const RESET = (routes = [], index = 0) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index,
                routes,
            }),
        )
    }
}

export const SIMPLE_RESET = (name, index = 0) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index,
                routes: [{ name }],
            }),
        )
    }
}