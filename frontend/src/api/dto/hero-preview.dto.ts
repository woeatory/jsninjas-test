export interface HeroListDto {
  id: number;
  nickname: string;
  image?: any;
}
export interface HeroListResultDto {
  heroes: HeroListDto[];
  totalCount: number;
}
