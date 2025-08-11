import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { FormEvent, useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
type ArticleParamsFormType = {
	articleState: ArticleStateType;
	onSubmit: (newArticleStyles: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	articleState,
	onSubmit,
	onReset,
}: ArticleParamsFormType) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [formState, setFormState] = useState(articleState);

	const asideClassName = clsx(styles.container, {
		[styles.container_open]: isMenuOpen,
	});
	const asideRef = useRef<HTMLDivElement>(null);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
	};

	const handleFormReset = (e: FormEvent) => {
		e.preventDefault();
		onReset();
		setFormState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: asideRef,
		onClose: () => setFormState(articleState),
		onChange: setIsMenuOpen,
	});
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside ref={asideRef} className={asideClassName}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						key={formState.fontSizeOption.value}
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
