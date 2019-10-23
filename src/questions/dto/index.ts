export class CreateQuestionDto {
    readonly hint: string;
    readonly text: string;
    readonly optionA: string;
    readonly optionB: string;
    readonly optionC: string;
    readonly optionD: string;
}

export class UpdateQuestionDto {
  readonly hint: string;
  readonly text: string;
}
