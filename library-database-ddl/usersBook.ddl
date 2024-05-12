-- Table: public.UsersBook

-- DROP TABLE IF EXISTS public."UsersBook";

CREATE TABLE IF NOT EXISTS public."UsersBook"
(
    id integer NOT NULL DEFAULT nextval('"UsersBook_id_seq"'::regclass),
    status "UsersBook_status_enum" NOT NULL DEFAULT 'BORROWED'::"UsersBook_status_enum",
    "userScore" integer NOT NULL DEFAULT 0,
    "userId" integer,
    "bookId" integer,
    CONSTRAINT "PK_e6613a606b8a05aee89b90b73eb" PRIMARY KEY (id),
    CONSTRAINT "FK_c55b0a14ebe9c9c19ee9e9eeb49" FOREIGN KEY ("userId")
        REFERENCES public."Users " (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT "FK_d1903e7c01ee53527a3c2cecc83" FOREIGN KEY ("bookId")
        REFERENCES public."Books" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UsersBook"
    OWNER to postgres;