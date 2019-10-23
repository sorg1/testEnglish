export interface QuestionState {
	hint: string;
	text: string;
	optionA: string;
	optionB: string;
	optionC: string;
	optionD: string;
}

export interface ModalQuestionState {
    isOpen: boolean;
    content: QuestionState;
}
