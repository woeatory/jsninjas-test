export class Hero {
  constructor(
    public heroId: number,
    public nickname: string,
    public realName: string,
    public originDescription: string,
    public superpowers: string[],
    public catchPhrase: string,
  ) {}
}
