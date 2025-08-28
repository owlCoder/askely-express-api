export class QuestionDto {
  public constructor(
    public id: number = 0,
    public pitanje: string = "",
    public tezina: number = 1
  ) {}
}
