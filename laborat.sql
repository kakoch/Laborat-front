CREATE TABLE `usuario` (
  `id` integer PRIMARY KEY,
  `codCadastro` integer UNIQUE,
  `nome` varchar(255),
  `criadorPor` varchar(255),
  `criadoEm` timestamp,
  `editadoPor` varchar(255),
  `editadoEm` timestamp
);

CREATE TABLE `clientes` (
  `id` integer PRIMARY KEY,
  `nome` varchar(255),
  `criadorPor` integer,
  `criadoEm` timestamp,
  `editadoPor` integer,
  `editadoEm` timestamp
);

CREATE TABLE `opsProducao` (
  `id` integer PRIMARY KEY,
  `cliente` integer,
  `descricao` varchar(255),
  `codCliente` integer,
  `verniz` varchar(120),
  `id_cartao` integer,
  `status` char(1),
  `criadorPor` varchar(255),
  `criadoEm` timestamp,
  `editadoPor` varchar(255),
  `editadoEm` timestamp
);

CREATE TABLE `inpecaoOps` (
  `id` integer PRIMARY KEY,
  `id_prod` integer,
  `gramatura1` decimal(5,2),
  `gramatura2` decimal(5,2),
  `gramatura3` decimal(5,2),
  `gramatura4` decimal(5,2),
  `gramatura5` decimal(5,2),
  `gramatura6` decimal(5,2),
  `gramatura7` decimal(5,2),
  `gramatura8` decimal(5,2),
  `gramatura9` decimal(5,2),
  `gramatura10` decimal(5,2),
  `gramatura11` decimal(5,2),
  `gramatura12` decimal(5,2),
  `gramatura13` decimal(5,2),
  `status` char(1),
  `ciclos` integer(5),
  `dataCard` timestamp,
  `criadorPor` integer,
  `criadoEm` timestamp,
  `editadoPor` integer,
  `editadoEm` timestamp
);

CREATE TABLE `fornecedor` (
  `id` integer PRIMARY KEY,
  `nome` varchar(255),
  `criadorPor` integer,
  `criadoEm` timestamp,
  `editadoPor` integer,
  `editadoEm` timestamp
);

CREATE TABLE `lotesCartao` (
  `id` integer PRIMARY KEY,
  `id_forncedor` integer,
  `lote` char(10),
  `bobina` varchar(255),
  `nome` varchar(255),
  `gramatura` decimal(5,2),
  `of` varchar(25),
  `formato` char(10),
  `criadorPor` varchar(255),
  `criadoEm` timestamp,
  `editadoPor` varchar(255),
  `editadoEm` timestamp
);

CREATE TABLE `inpecaoLote` (
  `id` integer PRIMARY KEY,
  `id_lote` integer,
  `gramatura1` decimal(5,2),
  `gramatura2` decimal(5,2),
  `gramatura3` decimal(5,2),
  `gramatura4` decimal(5,2),
  `gramatura5` decimal(5,2),
  `gramatura6` decimal(5,2),
  `gramatura7` decimal(5,2),
  `gramatura8` decimal(5,2),
  `gramatura9` decimal(5,2),
  `gramatura10` decimal(5,2),
  `gramatura11` decimal(5,2),
  `gramatura12` decimal(5,2),
  `gramatura13` decimal(5,2),
  `status` char(1),
  `dataCard` timestamp,
  `espessura` integer,
  `criadorPor` integer,
  `criadoEm` timestamp,
  `editadoPor` integer,
  `editadoEm` timestamp
);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `usuario` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `usuario` (`editadoPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `clientes` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `clientes` (`editadoPor`);

ALTER TABLE `lotesCartao` ADD FOREIGN KEY (`id`) REFERENCES `opsProducao` (`id_cartao`);

ALTER TABLE `clientes` ADD FOREIGN KEY (`id`) REFERENCES `opsProducao` (`cliente`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `opsProducao` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `opsProducao` (`editadoPor`);

ALTER TABLE `opsProducao` ADD FOREIGN KEY (`id`) REFERENCES `inpecaoOps` (`id_prod`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `inpecaoOps` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `inpecaoOps` (`editadoPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `fornecedor` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `fornecedor` (`editadoPor`);

ALTER TABLE `fornecedor` ADD FOREIGN KEY (`id`) REFERENCES `lotesCartao` (`id_forncedor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `lotesCartao` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `lotesCartao` (`editadoPor`);

ALTER TABLE `lotesCartao` ADD FOREIGN KEY (`id`) REFERENCES `inpecaoLote` (`id_lote`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `inpecaoLote` (`criadorPor`);

ALTER TABLE `usuario` ADD FOREIGN KEY (`codCadastro`) REFERENCES `inpecaoLote` (`editadoPor`);
