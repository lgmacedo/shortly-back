--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Homebrew)
-- Dumped by pg_dump version 14.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL,
    CONSTRAINT users_email_check CHECK ((email ~~ '%_@__%.__%'::text))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '05d00ab9-e25d-48dd-9c79-09f84eee4f07', '2023-05-17');
INSERT INTO public.sessions VALUES (2, 2, '0d573c98-7c86-493f-9e73-f8662b2b934a', '2023-05-17');
INSERT INTO public.sessions VALUES (3, 3, '367daef0-8d00-41dc-bd30-16c77465e408', '2023-05-17');
INSERT INTO public.sessions VALUES (4, 4, 'c1107c4a-303f-44f2-ba62-63df7179210f', '2023-05-18');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (4, 'https://www.youtube.com/watch?v=czTksCF6X8Y', '11GzKO_q', 2, 0, '2023-05-17');
INSERT INTO public.urls VALUES (5, 'https://www.youtube.com/watch?v=czTksCF6X8Y', 'GEFGZ3Kd', 2, 0, '2023-05-17');
INSERT INTO public.urls VALUES (6, 'https://www.youtube.com/watch?v=ARVKSdd8bxo', 'RNFwYZqc', 2, 0, '2023-05-17');
INSERT INTO public.urls VALUES (7, 'https://www.youtube.com/watch?v=XTIOq_cFYns', 'xD1CdOnF', 3, 0, '2023-05-17');
INSERT INTO public.urls VALUES (1, 'https://www.youtube.com/watch?v=Q4rEJr3sUO8', 'ZgMIol1s', 1, 4, '2023-05-17');
INSERT INTO public.urls VALUES (3, 'https://www.youtube.com/watch?v=k7H2C5L8X7I', 'fmadclnD', 1, 1, '2023-05-17');
INSERT INTO public.urls VALUES (8, 'https://www.youtube.com/watch?v=QH2-TGUlwu4', 'vXtDwwId', 4, 0, '2023-05-18');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Lalo Salamanca', 'lalo@gmail.com', '$2b$10$dXdoXqlFviOVDbaMCnelg.ZYXVGVi8C9gXIstL3JvEqSDsqhcOAf6', '2023-05-17');
INSERT INTO public.users VALUES (2, 'Lucas Macedo', 'lucas@gmail.com', '$2b$10$pcjf4M6mpvEczVtkpPkQzu8kWnTYLhPDBWDA4EKDMZnz9CLdcUGim', '2023-05-17');
INSERT INTO public.users VALUES (3, 'Yasmin Haddad', 'yasmin@gmail.com', '$2b$10$FTX4p82PJh/VzMSWuSQX3uxgu5t3b2WnA4qrI/IK60jzjkCa4AMdm', '2023-05-17');
INSERT INTO public.users VALUES (4, 'Toninho Rodrigues', 'trodrigues@gmail.com', '$2b$10$CvRNzGs783J4PHhTNVmEse6UquPMQ9Fudw1E1njcPep8Lx0w34xV2', '2023-05-18');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 4, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

