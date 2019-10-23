import * as React from 'react';

interface HighlightProps {
	highlight: string;
	children: string;
}

export default class Highlight extends React.Component<HighlightProps> {
	render() {
		return separate(this.props.children, this.props.highlight).map((o, i) => {
			if (o.type === 'regular') {
				return <span key={i}>{o.text}</span>;
			} else {
				return <b key={i}>{o.text}</b>;
			}
		});
	}
}

interface SeparateResult {
	type: string;
	text: string;
}

function separate(text: string, highlight: string): SeparateResult[] {
	if (highlight && text) {
		const results = text.match(RegExp(highlight, 'i'));
		if (!results) {
			return [{ type: 'regular', text }];
		} else if (results.index === 0) {
			return [{ type: 'highlight', text: results[0] }].concat(
				separate(text.substring(highlight.length), highlight)
			);
		} else {
			return [
				{ type: 'regular', text: text.substring(0, results.index) },
				{ type: 'highlight', text: results[0] }
			].concat(
				separate(text.substring(results.index + highlight.length), highlight)
			);
		}
	}
	return [{ type: 'regular', text }];
}
