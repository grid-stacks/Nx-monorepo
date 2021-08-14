// import { createTheme } from 'storybook-addon-material-ui';
import { addParameters, addDecorator } from '@storybook/react';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {withConsole} from '@storybook/addon-console';
import { green, purple } from 'color-name';
import { ThemeProvider } from '@material-ui/core';
import {muiTheme} from '../style';

// export const decorators = [
// 	createTheme({
//     palette: {
//       primary: {
//         main: purple[500],
//       },
//       secondary: {
//         main: green[500],
//       },
//     },
//   })
// ];

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
})

addDecorator((storyFn, context) => withConsole()(storyFn)(context))

addDecorator((story) => (
  <ThemeProvider theme={muiTheme}>{story()}</ThemeProvider>
));
