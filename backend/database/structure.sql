CREATE TABLE
  "Hero" (
    "id" bigint generated always as identity,
    "realName" varchar NOT NULL,
    "nickname" varchar NOT NULL,
    "originDescription" varchar NOT NULL,
    "superpowers" varchar NOT NULL,
    "catchPhrase" varchar NOT NULL
  );

ALTER TABLE "Hero" ADD CONSTRAINT "pkHero" PRIMARY KEY ("id");

CREATE TABLE
  "HeroImage" (
    "id" bigint generated always as identity,
    "heroId" bigint NOT NULL,
    "image" bytea NOT NULL
  );

ALTER TABLE "HeroImage" ADD CONSTRAINT "pkImage" PRIMARY KEY ("id");

ALTER TABLE "HeroImage" ADD CONSTRAINT "fkHeroImageHero" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE CASCADE;