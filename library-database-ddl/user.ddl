-- Table: public.Users 

-- DROP TABLE IF EXISTS public."Users ";

CREATE TABLE IF NOT EXISTS public."Users "
(
    id integer NOT NULL DEFAULT nextval('"Users _id_seq"'::regclass),
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_fae10cd75e4a1b421c218a11d20" PRIMARY KEY (id),
    CONSTRAINT "UQ_cfc7fbe52e447523ca8d6e0d630" UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users "
    OWNER to postgres;