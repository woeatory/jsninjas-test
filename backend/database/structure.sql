CREATE TABLE
  "Hero" (
    "heroId" bigint generated always as identity,
    "nickname" varchar NOT NULL,
    "originDescription" varchar NOT NULL,
    "superPowers" varchar NOT NULL,
    "catchPhrase" varchar NOT NULL
  );

ALTER TABLE "Hero" ADD CONSTRAINT "pkHero" PRIMARY KEY ("heroId");

CREATE TABLE
  "HeroImage" (
    "imageId" bigint generated always as identity,
    "heroId" bigint NOT NULL,
    "image" bytea NOT NULL
  );

ALTER TABLE "HeroImage" ADD CONSTRAINT "pkImage" PRIMARY KEY ("imageId");

ALTER TABLE "HeroImage" ADD CONSTRAINT "fkHeroImageHero" FOREIGN KEY ("heroId") REFERENCES "Hero" ("heroId");
