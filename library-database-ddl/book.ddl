-- Table: public.Books

-- DROP TABLE IF EXISTS public."Books";

CREATE TABLE IF NOT EXISTS public."Books"
(
    id integer NOT NULL DEFAULT nextval('"Books_id_seq"'::regclass),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    status "Books_status_enum" NOT NULL DEFAULT 'AVAILABLE'::"Books_status_enum",
    score numeric NOT NULL DEFAULT '-1'::numeric,
    CONSTRAINT "PK_45fc00b09d337eadf83e9240157" PRIMARY KEY (id),
    CONSTRAINT "UQ_ff1510bbefc04390680bb3a6c3e" UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Books"
    OWNER to postgres;