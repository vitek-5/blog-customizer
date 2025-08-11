import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../../components/article';
import { ArticleParamsForm } from '../../components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleSubmit = (newArticleStyles: ArticleStateType) => {
		setArticleState(newArticleStyles);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleSubmit}
				articleState={articleState}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
