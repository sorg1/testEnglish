import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {
	Palette,
	PaletteColor,
	PaletteColorOptions
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
	interface Palette {
		success: PaletteColor;
		info: PaletteColor;
	}
	interface PaletteOptions {
		success: PaletteColorOptions;
	}
}

declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {
		orderStatus: {
			open: PaletteColor;
			inProgress: PaletteColor;
			finished: PaletteColor;
			declined: PaletteColor;
		};
	}
	interface ThemeOptions {
		orderStatus: object;
	}
}
