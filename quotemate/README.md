/---------------------------------------------------------------------------------------------------------------/  
CREATE Script for QuotationInfo Table FOR Quotation History Page:

-- Table: public.QuotationInfo

-- DROP TABLE IF EXISTS public."QuotationInfo";

CREATE TABLE IF NOT EXISTS public."QuotationInfo"
(
"qID" integer NOT NULL,
"qName" character varying COLLATE pg_catalog."default" NOT NULL,
"qDate" date NOT NULL,
"qImgLink" character varying COLLATE pg_catalog."default",
CONSTRAINT "QuotationInfo_pkey" PRIMARY KEY ("qID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."QuotationInfo"
OWNER to postgres;
/---------------------------------------------------------------------------------------------------------------/

/---------------------------------------------------------------------------------------------------------------/  
CREATE Script for Users Table FOR User Signup Page:
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
email character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 100,
full_name character varying COLLATE pg_catalog."default" DEFAULT 100,
phone_number character varying COLLATE pg_catalog."default",
access_token character varying COLLATE pg_catalog."default" NOT NULL,
CONSTRAINT users_pkey PRIMARY KEY (access_token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
OWNER to postgres;
/---------------------------------------------------------------------------------------------------------------/
