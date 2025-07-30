/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `admin_permissions`
--

DROP TABLE IF EXISTS `admin_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `action_parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`action_parameters`)),
  `subject` varchar(255) DEFAULT NULL,
  `properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`properties`)),
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions`)),
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_permissions_created_by_id_fk` (`created_by_id`),
  KEY `admin_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_permissions`
--

LOCK TABLES `admin_permissions` WRITE;
/*!40000 ALTER TABLE `admin_permissions` DISABLE KEYS */;
INSERT INTO `admin_permissions` VALUES
(1,'plugin::upload.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.666000','2025-07-24 16:47:21.666000',NULL,NULL),
(2,'plugin::upload.configure-view','{}',NULL,'{}','[]','2025-07-24 16:47:21.674000','2025-07-24 16:47:21.674000',NULL,NULL),
(3,'plugin::upload.assets.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.679000','2025-07-24 16:47:21.679000',NULL,NULL),
(4,'plugin::upload.assets.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.684000','2025-07-24 16:47:21.684000',NULL,NULL),
(5,'plugin::upload.assets.download','{}',NULL,'{}','[]','2025-07-24 16:47:21.687000','2025-07-24 16:47:21.687000',NULL,NULL),
(6,'plugin::upload.assets.copy-link','{}',NULL,'{}','[]','2025-07-24 16:47:21.691000','2025-07-24 16:47:21.691000',NULL,NULL),
(7,'plugin::upload.read','{}',NULL,'{}','[\"admin::is-creator\"]','2025-07-24 16:47:21.704000','2025-07-24 16:47:21.704000',NULL,NULL),
(8,'plugin::upload.configure-view','{}',NULL,'{}','[]','2025-07-24 16:47:21.709000','2025-07-24 16:47:21.709000',NULL,NULL),
(9,'plugin::upload.assets.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.713000','2025-07-24 16:47:21.713000',NULL,NULL),
(10,'plugin::upload.assets.update','{}',NULL,'{}','[\"admin::is-creator\"]','2025-07-24 16:47:21.717000','2025-07-24 16:47:21.717000',NULL,NULL),
(11,'plugin::upload.assets.download','{}',NULL,'{}','[]','2025-07-24 16:47:21.721000','2025-07-24 16:47:21.721000',NULL,NULL),
(12,'plugin::upload.assets.copy-link','{}',NULL,'{}','[]','2025-07-24 16:47:21.725000','2025-07-24 16:47:21.725000',NULL,NULL),
(16,'plugin::content-manager.explorer.delete','{}','plugin::users-permissions.user','{}','[]','2025-07-24 16:47:21.782000','2025-07-24 16:47:21.782000',NULL,NULL),
(17,'plugin::content-manager.single-types.configure-view','{}',NULL,'{}','[]','2025-07-24 16:47:21.785000','2025-07-24 16:47:21.785000',NULL,NULL),
(18,'plugin::content-manager.collection-types.configure-view','{}',NULL,'{}','[]','2025-07-24 16:47:21.793000','2025-07-24 16:47:21.793000',NULL,NULL),
(19,'plugin::content-manager.components.configure-layout','{}',NULL,'{}','[]','2025-07-24 16:47:21.796000','2025-07-24 16:47:21.796000',NULL,NULL),
(20,'plugin::content-type-builder.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.800000','2025-07-24 16:47:21.800000',NULL,NULL),
(21,'plugin::email.settings.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.803000','2025-07-24 16:47:21.803000',NULL,NULL),
(22,'plugin::upload.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.806000','2025-07-24 16:47:21.806000',NULL,NULL),
(23,'plugin::upload.assets.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.810000','2025-07-24 16:47:21.810000',NULL,NULL),
(24,'plugin::upload.assets.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.813000','2025-07-24 16:47:21.813000',NULL,NULL),
(25,'plugin::upload.assets.download','{}',NULL,'{}','[]','2025-07-24 16:47:21.817000','2025-07-24 16:47:21.817000',NULL,NULL),
(26,'plugin::upload.assets.copy-link','{}',NULL,'{}','[]','2025-07-24 16:47:21.820000','2025-07-24 16:47:21.820000',NULL,NULL),
(27,'plugin::upload.configure-view','{}',NULL,'{}','[]','2025-07-24 16:47:21.823000','2025-07-24 16:47:21.823000',NULL,NULL),
(28,'plugin::upload.settings.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.826000','2025-07-24 16:47:21.826000',NULL,NULL),
(29,'plugin::users-permissions.roles.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.830000','2025-07-24 16:47:21.830000',NULL,NULL),
(30,'plugin::users-permissions.roles.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.833000','2025-07-24 16:47:21.833000',NULL,NULL),
(31,'plugin::users-permissions.roles.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.837000','2025-07-24 16:47:21.837000',NULL,NULL),
(32,'plugin::users-permissions.roles.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.843000','2025-07-24 16:47:21.843000',NULL,NULL),
(33,'plugin::users-permissions.providers.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.847000','2025-07-24 16:47:21.847000',NULL,NULL),
(34,'plugin::users-permissions.providers.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.850000','2025-07-24 16:47:21.850000',NULL,NULL),
(35,'plugin::users-permissions.email-templates.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.853000','2025-07-24 16:47:21.853000',NULL,NULL),
(36,'plugin::users-permissions.email-templates.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.857000','2025-07-24 16:47:21.857000',NULL,NULL),
(37,'plugin::users-permissions.advanced-settings.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.860000','2025-07-24 16:47:21.860000',NULL,NULL),
(38,'plugin::users-permissions.advanced-settings.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.864000','2025-07-24 16:47:21.864000',NULL,NULL),
(39,'plugin::i18n.locale.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.867000','2025-07-24 16:47:21.867000',NULL,NULL),
(40,'plugin::i18n.locale.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.871000','2025-07-24 16:47:21.871000',NULL,NULL),
(41,'plugin::i18n.locale.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.874000','2025-07-24 16:47:21.874000',NULL,NULL),
(42,'plugin::i18n.locale.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.878000','2025-07-24 16:47:21.878000',NULL,NULL),
(43,'admin::marketplace.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.882000','2025-07-24 16:47:21.882000',NULL,NULL),
(44,'admin::webhooks.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.886000','2025-07-24 16:47:21.886000',NULL,NULL),
(45,'admin::webhooks.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.889000','2025-07-24 16:47:21.889000',NULL,NULL),
(46,'admin::webhooks.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.892000','2025-07-24 16:47:21.892000',NULL,NULL),
(47,'admin::webhooks.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.895000','2025-07-24 16:47:21.895000',NULL,NULL),
(48,'admin::users.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.899000','2025-07-24 16:47:21.899000',NULL,NULL),
(49,'admin::users.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.902000','2025-07-24 16:47:21.902000',NULL,NULL),
(50,'admin::users.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.906000','2025-07-24 16:47:21.906000',NULL,NULL),
(51,'admin::users.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.910000','2025-07-24 16:47:21.910000',NULL,NULL),
(52,'admin::roles.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.915000','2025-07-24 16:47:21.915000',NULL,NULL),
(53,'admin::roles.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.919000','2025-07-24 16:47:21.919000',NULL,NULL),
(54,'admin::roles.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.922000','2025-07-24 16:47:21.922000',NULL,NULL),
(55,'admin::roles.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.927000','2025-07-24 16:47:21.927000',NULL,NULL),
(56,'admin::api-tokens.access','{}',NULL,'{}','[]','2025-07-24 16:47:21.930000','2025-07-24 16:47:21.930000',NULL,NULL),
(57,'admin::api-tokens.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.933000','2025-07-24 16:47:21.933000',NULL,NULL),
(58,'admin::api-tokens.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.936000','2025-07-24 16:47:21.936000',NULL,NULL),
(59,'admin::api-tokens.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.939000','2025-07-24 16:47:21.939000',NULL,NULL),
(60,'admin::api-tokens.regenerate','{}',NULL,'{}','[]','2025-07-24 16:47:21.943000','2025-07-24 16:47:21.943000',NULL,NULL),
(61,'admin::api-tokens.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.946000','2025-07-24 16:47:21.946000',NULL,NULL),
(62,'admin::project-settings.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.949000','2025-07-24 16:47:21.949000',NULL,NULL),
(63,'admin::project-settings.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.952000','2025-07-24 16:47:21.952000',NULL,NULL),
(64,'admin::transfer.tokens.access','{}',NULL,'{}','[]','2025-07-24 16:47:21.956000','2025-07-24 16:47:21.956000',NULL,NULL),
(65,'admin::transfer.tokens.create','{}',NULL,'{}','[]','2025-07-24 16:47:21.959000','2025-07-24 16:47:21.959000',NULL,NULL),
(66,'admin::transfer.tokens.read','{}',NULL,'{}','[]','2025-07-24 16:47:21.962000','2025-07-24 16:47:21.962000',NULL,NULL),
(67,'admin::transfer.tokens.update','{}',NULL,'{}','[]','2025-07-24 16:47:21.966000','2025-07-24 16:47:21.966000',NULL,NULL),
(68,'admin::transfer.tokens.regenerate','{}',NULL,'{}','[]','2025-07-24 16:47:21.969000','2025-07-24 16:47:21.969000',NULL,NULL),
(69,'admin::transfer.tokens.delete','{}',NULL,'{}','[]','2025-07-24 16:47:21.973000','2025-07-24 16:47:21.973000',NULL,NULL),
(105,'plugin::content-manager.explorer.delete','{}','api::documento.documento','{}','[]','2025-07-24 17:28:56.699000','2025-07-24 17:28:56.699000',NULL,NULL),
(106,'plugin::content-manager.explorer.publish','{}','api::documento.documento','{}','[]','2025-07-24 17:28:56.703000','2025-07-24 17:28:56.703000',NULL,NULL),
(125,'plugin::content-manager.explorer.delete','{}','api::despesa.despesa','{}','[]','2025-07-24 17:49:16.552000','2025-07-24 17:49:16.552000',NULL,NULL),
(126,'plugin::content-manager.explorer.publish','{}','api::despesa.despesa','{}','[]','2025-07-24 17:49:16.556000','2025-07-24 17:49:16.556000',NULL,NULL),
(139,'plugin::content-manager.explorer.create','{}','api::documento.documento','{\"fields\":[\"nome\",\"tipo\",\"arquivo\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:03.418000','2025-07-25 09:34:03.418000',NULL,NULL),
(142,'plugin::content-manager.explorer.read','{}','api::documento.documento','{\"fields\":[\"nome\",\"tipo\",\"arquivo\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:03.428000','2025-07-25 09:34:03.428000',NULL,NULL),
(145,'plugin::content-manager.explorer.update','{}','api::documento.documento','{\"fields\":[\"nome\",\"tipo\",\"arquivo\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:03.437000','2025-07-25 09:34:03.437000',NULL,NULL),
(148,'plugin::content-manager.explorer.create','{}','api::despesa.despesa','{\"fields\":[\"descricao\",\"valor\",\"data_despesa\",\"categoria\",\"status\",\"comprovativo\",\"observacoes\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:43.431000','2025-07-25 09:34:43.431000',NULL,NULL),
(151,'plugin::content-manager.explorer.read','{}','api::despesa.despesa','{\"fields\":[\"descricao\",\"valor\",\"data_despesa\",\"categoria\",\"status\",\"comprovativo\",\"observacoes\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:43.446000','2025-07-25 09:34:43.446000',NULL,NULL),
(154,'plugin::content-manager.explorer.update','{}','api::despesa.despesa','{\"fields\":[\"descricao\",\"valor\",\"data_despesa\",\"categoria\",\"status\",\"comprovativo\",\"observacoes\",\"users_permissions_user\"]}','[]','2025-07-25 09:34:43.456000','2025-07-25 09:34:43.456000',NULL,NULL),
(174,'plugin::content-manager.explorer.delete','{}','api::registro-mensal.registro-mensal','{}','[]','2025-07-28 15:07:00.619000','2025-07-28 15:07:00.619000',NULL,NULL),
(175,'plugin::content-manager.explorer.publish','{}','api::registro-mensal.registro-mensal','{}','[]','2025-07-28 15:07:00.622000','2025-07-28 15:07:00.622000',NULL,NULL),
(179,'plugin::content-manager.explorer.create','{}','api::registro-mensal.registro-mensal','{\"fields\":[\"mes\",\"horas_extras\",\"observacoes\",\"users_permissions_user\",\"aprovado_por\",\"data_aprovacao\",\"horas_normais\",\"total_horas\",\"status\",\"ano\"]}','[]','2025-07-28 15:23:39.736000','2025-07-28 15:23:39.736000',NULL,NULL),
(181,'plugin::content-manager.explorer.read','{}','api::registro-mensal.registro-mensal','{\"fields\":[\"mes\",\"horas_extras\",\"observacoes\",\"users_permissions_user\",\"aprovado_por\",\"data_aprovacao\",\"horas_normais\",\"total_horas\",\"status\",\"ano\"]}','[]','2025-07-28 15:23:39.743000','2025-07-28 15:23:39.743000',NULL,NULL),
(183,'plugin::content-manager.explorer.update','{}','api::registro-mensal.registro-mensal','{\"fields\":[\"mes\",\"horas_extras\",\"observacoes\",\"users_permissions_user\",\"aprovado_por\",\"data_aprovacao\",\"horas_normais\",\"total_horas\",\"status\",\"ano\"]}','[]','2025-07-28 15:23:39.749000','2025-07-28 15:23:39.749000',NULL,NULL),
(191,'plugin::content-manager.explorer.delete','{}','api::arquivo-compartilhado.arquivo-compartilhado','{}','[]','2025-07-30 11:06:55.419000','2025-07-30 11:06:55.419000',NULL,NULL),
(192,'plugin::content-manager.explorer.publish','{}','api::arquivo-compartilhado.arquivo-compartilhado','{}','[]','2025-07-30 11:06:55.423000','2025-07-30 11:06:55.423000',NULL,NULL),
(199,'plugin::content-manager.explorer.delete','{}','api::pasta-compartilhamento.pasta-compartilhamento','{}','[]','2025-07-30 14:19:47.738000','2025-07-30 14:19:47.738000',NULL,NULL),
(200,'plugin::content-manager.explorer.publish','{}','api::pasta-compartilhamento.pasta-compartilhamento','{}','[]','2025-07-30 14:19:47.742000','2025-07-30 14:19:47.742000',NULL,NULL),
(201,'plugin::content-manager.explorer.create','{}','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\",\"nomecompleto\",\"cargo\",\"nif\",\"telefone\",\"data_admissao\",\"salario\",\"foto_perfil\",\"documento\",\"despesa\",\"registro_mensals\",\"pasta_compartilhamentos\",\"aprovado_por\"]}','[]','2025-07-30 14:31:39.903000','2025-07-30 14:31:39.903000',NULL,NULL),
(202,'plugin::content-manager.explorer.create','{}','api::arquivo-compartilhado.arquivo-compartilhado','{\"fields\":[\"nome\",\"tipo\",\"tamanho\",\"descricao\",\"categoria\",\"publico\",\"downloads\",\"arquivo\",\"users_permissions_user\",\"pasta\",\"tags\",\"versao\",\"arquivo_original\",\"arquivo_compartilhados\",\"aprovado\",\"data_aprovacao\",\"favorito\",\"visualizacoes\",\"ultimo_acesso\"]}','[]','2025-07-30 14:31:39.916000','2025-07-30 14:31:39.916000',NULL,NULL),
(203,'plugin::content-manager.explorer.create','{}','api::pasta-compartilhamento.pasta-compartilhamento','{\"fields\":[\"nome\",\"descricao\",\"cor\",\"icone\",\"pasta_pai\",\"usuario_proprietario\",\"publico\",\"permissoes\",\"ordem\",\"ativo\",\"arquivo_compartilhados\"]}','[]','2025-07-30 14:31:39.925000','2025-07-30 14:31:39.925000',NULL,NULL),
(204,'plugin::content-manager.explorer.read','{}','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\",\"nomecompleto\",\"cargo\",\"nif\",\"telefone\",\"data_admissao\",\"salario\",\"foto_perfil\",\"documento\",\"despesa\",\"registro_mensals\",\"pasta_compartilhamentos\",\"aprovado_por\"]}','[]','2025-07-30 14:31:39.934000','2025-07-30 14:31:39.934000',NULL,NULL),
(205,'plugin::content-manager.explorer.read','{}','api::arquivo-compartilhado.arquivo-compartilhado','{\"fields\":[\"nome\",\"tipo\",\"tamanho\",\"descricao\",\"categoria\",\"publico\",\"downloads\",\"arquivo\",\"users_permissions_user\",\"pasta\",\"tags\",\"versao\",\"arquivo_original\",\"arquivo_compartilhados\",\"aprovado\",\"data_aprovacao\",\"favorito\",\"visualizacoes\",\"ultimo_acesso\"]}','[]','2025-07-30 14:31:39.940000','2025-07-30 14:31:39.940000',NULL,NULL),
(206,'plugin::content-manager.explorer.read','{}','api::pasta-compartilhamento.pasta-compartilhamento','{\"fields\":[\"nome\",\"descricao\",\"cor\",\"icone\",\"pasta_pai\",\"usuario_proprietario\",\"publico\",\"permissoes\",\"ordem\",\"ativo\",\"arquivo_compartilhados\"]}','[]','2025-07-30 14:31:39.945000','2025-07-30 14:31:39.945000',NULL,NULL),
(207,'plugin::content-manager.explorer.update','{}','plugin::users-permissions.user','{\"fields\":[\"username\",\"email\",\"provider\",\"password\",\"resetPasswordToken\",\"confirmationToken\",\"confirmed\",\"blocked\",\"role\",\"nomecompleto\",\"cargo\",\"nif\",\"telefone\",\"data_admissao\",\"salario\",\"foto_perfil\",\"documento\",\"despesa\",\"registro_mensals\",\"pasta_compartilhamentos\",\"aprovado_por\"]}','[]','2025-07-30 14:31:39.953000','2025-07-30 14:31:39.953000',NULL,NULL),
(208,'plugin::content-manager.explorer.update','{}','api::arquivo-compartilhado.arquivo-compartilhado','{\"fields\":[\"nome\",\"tipo\",\"tamanho\",\"descricao\",\"categoria\",\"publico\",\"downloads\",\"arquivo\",\"users_permissions_user\",\"pasta\",\"tags\",\"versao\",\"arquivo_original\",\"arquivo_compartilhados\",\"aprovado\",\"data_aprovacao\",\"favorito\",\"visualizacoes\",\"ultimo_acesso\"]}','[]','2025-07-30 14:31:39.960000','2025-07-30 14:31:39.960000',NULL,NULL),
(209,'plugin::content-manager.explorer.update','{}','api::pasta-compartilhamento.pasta-compartilhamento','{\"fields\":[\"nome\",\"descricao\",\"cor\",\"icone\",\"pasta_pai\",\"usuario_proprietario\",\"publico\",\"permissoes\",\"ordem\",\"ativo\",\"arquivo_compartilhados\"]}','[]','2025-07-30 14:31:39.969000','2025-07-30 14:31:39.969000',NULL,NULL);
/*!40000 ALTER TABLE `admin_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_permissions_role_links`
--

DROP TABLE IF EXISTS `admin_permissions_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_permissions_role_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_permissions_role_links_unique` (`permission_id`,`role_id`),
  KEY `admin_permissions_role_links_fk` (`permission_id`),
  KEY `admin_permissions_role_links_inv_fk` (`role_id`),
  KEY `admin_permissions_role_links_order_inv_fk` (`permission_order`),
  CONSTRAINT `admin_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `admin_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_permissions_role_links`
--

LOCK TABLES `admin_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `admin_permissions_role_links` DISABLE KEYS */;
INSERT INTO `admin_permissions_role_links` VALUES
(1,1,2,1),
(2,2,2,2),
(3,3,2,3),
(4,4,2,4),
(5,5,2,5),
(6,6,2,6),
(7,7,3,1),
(8,8,3,2),
(9,9,3,3),
(10,10,3,4),
(11,11,3,5),
(12,12,3,6),
(16,16,1,4),
(17,17,1,5),
(18,18,1,6),
(19,19,1,7),
(20,20,1,8),
(21,21,1,9),
(22,22,1,10),
(23,23,1,11),
(24,24,1,12),
(25,25,1,13),
(26,26,1,14),
(27,27,1,15),
(28,28,1,16),
(29,29,1,17),
(30,30,1,18),
(31,31,1,19),
(32,32,1,20),
(33,33,1,21),
(34,34,1,22),
(35,35,1,23),
(36,36,1,24),
(37,37,1,25),
(38,38,1,26),
(39,39,1,27),
(40,40,1,28),
(41,41,1,29),
(42,42,1,30),
(43,43,1,31),
(44,44,1,32),
(45,45,1,33),
(46,46,1,34),
(47,47,1,35),
(48,48,1,36),
(49,49,1,37),
(50,50,1,38),
(51,51,1,39),
(52,52,1,40),
(53,53,1,41),
(54,54,1,42),
(55,55,1,43),
(56,56,1,44),
(57,57,1,45),
(58,58,1,46),
(59,59,1,47),
(60,60,1,48),
(61,61,1,49),
(62,62,1,50),
(63,63,1,51),
(64,64,1,52),
(65,65,1,53),
(66,66,1,54),
(67,67,1,55),
(68,68,1,56),
(69,69,1,57),
(105,105,1,69),
(106,106,1,70),
(125,125,1,82),
(126,126,1,83),
(139,139,1,95),
(142,142,1,98),
(145,145,1,101),
(148,148,1,102),
(151,151,1,105),
(154,154,1,108),
(174,174,1,115),
(175,175,1,116),
(179,179,1,117),
(181,181,1,119),
(183,183,1,121),
(191,191,1,128),
(192,192,1,129),
(199,199,1,136),
(200,200,1,137),
(201,201,1,138),
(202,202,1,139),
(203,203,1,140),
(204,204,1,141),
(205,205,1,142),
(206,206,1,143),
(207,207,1,144),
(208,208,1,145),
(209,209,1,146);
/*!40000 ALTER TABLE `admin_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_roles`
--

DROP TABLE IF EXISTS `admin_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_roles_created_by_id_fk` (`created_by_id`),
  KEY `admin_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_roles`
--

LOCK TABLES `admin_roles` WRITE;
/*!40000 ALTER TABLE `admin_roles` DISABLE KEYS */;
INSERT INTO `admin_roles` VALUES
(1,'Super Admin','strapi-super-admin','Super Admins can access and manage all features and settings.','2025-07-24 16:47:21.647000','2025-07-24 16:47:21.647000',NULL,NULL),
(2,'Editor','strapi-editor','Editors can manage and publish contents including those of other users.','2025-07-24 16:47:21.656000','2025-07-24 16:47:21.656000',NULL,NULL),
(3,'Author','strapi-author','Authors can manage the content they have created.','2025-07-24 16:47:21.660000','2025-07-24 16:47:21.660000',NULL,NULL);
/*!40000 ALTER TABLE `admin_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `registration_token` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `prefered_language` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_users_created_by_id_fk` (`created_by_id`),
  KEY `admin_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `admin_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `admin_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES
(1,'Danilo','Lira',NULL,'danilosilvalira10@hotmail.com','$2a$10$5FmPDxE2uSjROJ4skpfiOerb71p9qP56Cb9WSyrhuFCbKtbsR2c3m',NULL,NULL,1,0,NULL,'2025-07-24 16:47:45.016000','2025-07-24 16:47:45.016000',NULL,NULL);
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users_roles_links`
--

DROP TABLE IF EXISTS `admin_users_roles_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users_roles_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `role_order` double unsigned DEFAULT NULL,
  `user_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_roles_links_unique` (`user_id`,`role_id`),
  KEY `admin_users_roles_links_fk` (`user_id`),
  KEY `admin_users_roles_links_inv_fk` (`role_id`),
  KEY `admin_users_roles_links_order_fk` (`role_order`),
  KEY `admin_users_roles_links_order_inv_fk` (`user_order`),
  CONSTRAINT `admin_users_roles_links_fk` FOREIGN KEY (`user_id`) REFERENCES `admin_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `admin_users_roles_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `admin_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users_roles_links`
--

LOCK TABLES `admin_users_roles_links` WRITE;
/*!40000 ALTER TABLE `admin_users_roles_links` DISABLE KEYS */;
INSERT INTO `admin_users_roles_links` VALUES
(1,1,1,1,1);
/*!40000 ALTER TABLE `admin_users_roles_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arquivo_compartilhados`
--

DROP TABLE IF EXISTS `arquivo_compartilhados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivo_compartilhados` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `tamanho` decimal(10,2) DEFAULT NULL,
  `descricao` longtext DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `publico` tinyint(1) DEFAULT NULL,
  `downloads` decimal(10,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `versao` varchar(255) DEFAULT NULL,
  `aprovado` tinyint(1) DEFAULT NULL,
  `data_aprovacao` date DEFAULT NULL,
  `favorito` tinyint(1) DEFAULT NULL,
  `visualizacoes` int(11) DEFAULT NULL,
  `ultimo_acesso` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `arquivo_compartilhados_created_by_id_fk` (`created_by_id`),
  KEY `arquivo_compartilhados_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `arquivo_compartilhados_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `arquivo_compartilhados_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivo_compartilhados`
--

LOCK TABLES `arquivo_compartilhados` WRITE;
/*!40000 ALTER TABLE `arquivo_compartilhados` DISABLE KEYS */;
INSERT INTO `arquivo_compartilhados` VALUES
(14,'EsquemaEletrico','application/pdf',704724.00,'','projeto',1,0.00,'2025-07-30 15:40:05.890000','2025-07-30 15:40:05.890000','2025-07-30 15:40:05.882000',NULL,NULL,'Esquema','1.0',0,NULL,0,0,NULL),
(16,'PLC_CRESTUMA','application/x-compressed',78323374.00,'','backup',1,0.00,'2025-07-30 16:57:50.813000','2025-07-30 16:57:50.813000','2025-07-30 16:57:50.802000',NULL,NULL,'PLC','1.0',0,NULL,0,0,NULL);
/*!40000 ALTER TABLE `arquivo_compartilhados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arquivo_compartilhados_arquivo_original_links`
--

DROP TABLE IF EXISTS `arquivo_compartilhados_arquivo_original_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivo_compartilhados_arquivo_original_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `arquivo_compartilhado_id` int(10) unsigned DEFAULT NULL,
  `inv_arquivo_compartilhado_id` int(10) unsigned DEFAULT NULL,
  `arquivo_compartilhado_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `arquivo_compartilhados_arquivo_original_links_unique` (`arquivo_compartilhado_id`,`inv_arquivo_compartilhado_id`),
  KEY `arquivo_compartilhados_arquivo_original_links_fk` (`arquivo_compartilhado_id`),
  KEY `arquivo_compartilhados_arquivo_original_links_inv_fk` (`inv_arquivo_compartilhado_id`),
  KEY `arquivo_compartilhados_arquivo_original_links_order_inv_fk` (`arquivo_compartilhado_order`),
  CONSTRAINT `arquivo_compartilhados_arquivo_original_links_fk` FOREIGN KEY (`arquivo_compartilhado_id`) REFERENCES `arquivo_compartilhados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_compartilhados_arquivo_original_links_inv_fk` FOREIGN KEY (`inv_arquivo_compartilhado_id`) REFERENCES `arquivo_compartilhados` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivo_compartilhados_arquivo_original_links`
--

LOCK TABLES `arquivo_compartilhados_arquivo_original_links` WRITE;
/*!40000 ALTER TABLE `arquivo_compartilhados_arquivo_original_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `arquivo_compartilhados_arquivo_original_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arquivo_compartilhados_pasta_links`
--

DROP TABLE IF EXISTS `arquivo_compartilhados_pasta_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivo_compartilhados_pasta_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `arquivo_compartilhado_id` int(10) unsigned DEFAULT NULL,
  `pasta_compartilhamento_id` int(10) unsigned DEFAULT NULL,
  `arquivo_compartilhado_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `arquivo_compartilhados_pasta_links_unique` (`arquivo_compartilhado_id`,`pasta_compartilhamento_id`),
  KEY `arquivo_compartilhados_pasta_links_fk` (`arquivo_compartilhado_id`),
  KEY `arquivo_compartilhados_pasta_links_inv_fk` (`pasta_compartilhamento_id`),
  KEY `arquivo_compartilhados_pasta_links_order_inv_fk` (`arquivo_compartilhado_order`),
  CONSTRAINT `arquivo_compartilhados_pasta_links_fk` FOREIGN KEY (`arquivo_compartilhado_id`) REFERENCES `arquivo_compartilhados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_compartilhados_pasta_links_inv_fk` FOREIGN KEY (`pasta_compartilhamento_id`) REFERENCES `pasta_compartilhamentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivo_compartilhados_pasta_links`
--

LOCK TABLES `arquivo_compartilhados_pasta_links` WRITE;
/*!40000 ALTER TABLE `arquivo_compartilhados_pasta_links` DISABLE KEYS */;
INSERT INTO `arquivo_compartilhados_pasta_links` VALUES
(10,14,3,1),
(12,16,16,1);
/*!40000 ALTER TABLE `arquivo_compartilhados_pasta_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arquivo_compartilhados_users_permissions_user_links`
--

DROP TABLE IF EXISTS `arquivo_compartilhados_users_permissions_user_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivo_compartilhados_users_permissions_user_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `arquivo_compartilhado_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `arquivo_compartilhado_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `arquivo_compartilhados_users_permissions_user_links_unique` (`arquivo_compartilhado_id`,`user_id`),
  KEY `arquivo_compartilhados_users_permissions_user_links_fk` (`arquivo_compartilhado_id`),
  KEY `arquivo_compartilhados_users_permissions_user_links_inv_fk` (`user_id`),
  KEY `arquivo_compartilhados_users_permissions_user_links_order_inv_fk` (`arquivo_compartilhado_order`),
  CONSTRAINT `arquivo_compartilhados_users_permissions_user_links_fk` FOREIGN KEY (`arquivo_compartilhado_id`) REFERENCES `arquivo_compartilhados` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_compartilhados_users_permissions_user_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivo_compartilhados_users_permissions_user_links`
--

LOCK TABLES `arquivo_compartilhados_users_permissions_user_links` WRITE;
/*!40000 ALTER TABLE `arquivo_compartilhados_users_permissions_user_links` DISABLE KEYS */;
INSERT INTO `arquivo_compartilhados_users_permissions_user_links` VALUES
(14,14,1,7),
(16,16,1,8);
/*!40000 ALTER TABLE `arquivo_compartilhados_users_permissions_user_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `despesas`
--

DROP TABLE IF EXISTS `despesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `despesas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `data_despesa` date DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `observacoes` longtext DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `despesas_created_by_id_fk` (`created_by_id`),
  KEY `despesas_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `despesas_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `despesas_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `despesas`
--

LOCK TABLES `despesas` WRITE;
/*!40000 ALTER TABLE `despesas` DISABLE KEYS */;
INSERT INTO `despesas` VALUES
(2,'teste',1111.00,'2025-07-18','alimentacao','aprovada','asdasda','2025-07-25 15:52:48.295000','2025-07-25 15:54:21.323000','2025-07-25 15:52:48.292000',NULL,NULL),
(3,'aaaaaa',12.00,'2025-07-16','alimentacao','aprovada','sadsdas','2025-07-25 15:56:44.881000','2025-07-25 16:17:31.769000','2025-07-25 15:56:44.880000',NULL,NULL),
(4,'capitanga',11.00,'2025-07-24','alimentacao','aprovada','','2025-07-25 16:36:44.559000','2025-07-25 16:36:58.082000','2025-07-25 16:36:44.556000',NULL,NULL),
(5,'Almoço capitanga',12.00,'2025-07-23','alimentacao','aprovada','aaa','2025-07-25 16:53:25.234000','2025-07-25 16:53:56.063000','2025-07-25 16:53:25.231000',NULL,NULL),
(6,'almoço',21.00,'2025-07-09','alimentacao','aprovada','asdasd','2025-07-25 16:54:57.524000','2025-07-25 16:55:21.518000','2025-07-25 16:54:57.511000',NULL,NULL),
(7,'biscoito',11.00,'2025-07-01','alimentacao','aprovada','asdasd','2025-07-25 17:20:03.731000','2025-07-25 17:20:21.020000','2025-07-25 17:20:03.728000',NULL,NULL),
(8,'Almoço',11.00,'2025-07-13','alimentacao','aprovada','asdasd','2025-07-25 17:32:46.767000','2025-07-25 17:33:26.299000','2025-07-25 17:32:46.765000',NULL,NULL),
(9,'capitanga',11.00,'2025-07-24','alimentacao','aprovada','asdas','2025-07-25 17:38:12.650000','2025-07-25 17:38:28.963000','2025-07-25 17:38:12.648000',NULL,NULL),
(10,'capitanga',12.00,'2025-07-23','alimentacao','aprovada','asdas','2025-07-25 17:40:04.364000','2025-07-25 17:42:27.738000','2025-07-25 17:40:04.360000',NULL,NULL),
(11,'alimentação',11.00,'2025-07-14','alimentacao','aprovada','asdasd','2025-07-25 17:54:36.325000','2025-07-25 17:55:03.654000','2025-07-25 17:54:36.318000',NULL,NULL),
(12,'biscoito - bitoque',11.00,'2025-07-16','alimentacao','aprovada','asdas','2025-07-25 18:05:51.817000','2025-07-25 18:06:11.665000','2025-07-25 18:05:51.810000',NULL,NULL),
(13,'biscoit',11.00,'2025-07-09','alimentacao','aprovada','asdasd','2025-07-25 18:14:13.279000','2025-07-25 18:14:54.904000','2025-07-25 18:14:13.277000',NULL,NULL),
(14,'Almoço',11.00,'2025-07-23','alimentacao','aprovada','12313','2025-07-28 10:14:30.194000','2025-07-28 10:14:43.102000','2025-07-28 10:14:30.189000',NULL,NULL),
(15,'sasda',12.00,'2025-07-17','alimentacao','aprovada','asdasda','2025-07-28 10:28:48.712000','2025-07-28 10:30:16.353000','2025-07-28 10:28:48.708000',NULL,NULL),
(16,'capitanga',12.00,'2025-07-03','alimentacao','rejeitada','Rejeitada pelo administrador','2025-07-28 10:47:34.252000','2025-07-28 10:48:20.919000','2025-07-28 10:47:34.248000',NULL,NULL),
(17,'almoço',31.00,'2025-07-10','alimentacao','aprovada','aa','2025-07-28 11:02:55.415000','2025-07-28 11:03:28.319000','2025-07-28 11:02:55.412000',NULL,NULL),
(18,'biscoito',11.00,'2025-03-12','alimentacao','aprovada','','2025-07-28 11:07:18.238000','2025-07-28 16:42:36.090000','2025-07-28 11:07:18.236000',NULL,NULL),
(19,'almoco',11.00,'2025-07-09','alimentacao','aprovada','1sadasd','2025-07-28 15:16:07.317000','2025-07-28 16:42:33.514000','2025-07-28 15:16:07.315000',NULL,NULL),
(20,'alimentacao ',12.00,'2025-07-05','alimentacao','rejeitada','Rejeitada pelo administrador','2025-07-28 16:43:06.311000','2025-07-28 16:43:30.185000','2025-07-28 16:43:06.309000',NULL,NULL),
(21,'capitanga',11.00,'2025-07-04','alimentacao','aprovada','asda','2025-07-28 16:44:08.247000','2025-07-28 16:44:26.453000','2025-07-28 16:44:08.244000',NULL,NULL),
(22,'norte almoço',14.00,'2025-07-15','alimentacao','aprovada','asdasd','2025-07-28 17:00:54.774000','2025-07-29 17:04:36.856000','2025-07-28 17:00:54.771000',NULL,NULL),
(23,'capitanga',12.00,'2025-07-29','alimentacao','aprovada','adasa','2025-07-29 11:30:32.638000','2025-07-29 17:04:33.536000','2025-07-29 11:30:32.632000',NULL,NULL),
(24,'alimentacao',12.00,'2025-07-23','alimentacao','aprovada','asdads','2025-07-29 17:04:03.085000','2025-07-29 17:04:38.367000','2025-07-29 17:04:03.080000',NULL,NULL),
(25,'Biscoito',13.00,'2025-07-24','alimentacao','aprovada','Almoço ','2025-07-30 10:44:17.443000','2025-07-30 10:55:14.706000','2025-07-30 10:44:17.434000',NULL,NULL);
/*!40000 ALTER TABLE `despesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `despesas_users_permissions_user_links`
--

DROP TABLE IF EXISTS `despesas_users_permissions_user_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `despesas_users_permissions_user_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `despesa_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `despesas_users_permissions_user_links_unique` (`despesa_id`,`user_id`),
  KEY `despesas_users_permissions_user_links_fk` (`despesa_id`),
  KEY `despesas_users_permissions_user_links_inv_fk` (`user_id`),
  CONSTRAINT `despesas_users_permissions_user_links_fk` FOREIGN KEY (`despesa_id`) REFERENCES `despesas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `despesas_users_permissions_user_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `despesas_users_permissions_user_links`
--

LOCK TABLES `despesas_users_permissions_user_links` WRITE;
/*!40000 ALTER TABLE `despesas_users_permissions_user_links` DISABLE KEYS */;
INSERT INTO `despesas_users_permissions_user_links` VALUES
(2,2,1),
(3,3,2),
(4,4,2),
(5,5,2),
(6,6,2),
(7,7,2),
(8,8,2),
(9,9,2),
(10,10,2),
(11,11,2),
(12,12,2),
(13,13,2),
(14,14,2),
(15,15,2),
(16,16,2),
(17,17,2),
(18,18,2),
(19,19,2),
(20,20,2),
(21,21,2),
(22,22,2),
(23,23,2),
(24,24,2),
(25,25,2);
/*!40000 ALTER TABLE `despesas_users_permissions_user_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `documentos_created_by_id_fk` (`created_by_id`),
  KEY `documentos_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `documentos_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `documentos_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES
(1,'Contrato Trabalho','contrato','2025-07-24 17:57:25.337000','2025-07-24 17:57:25.337000',NULL,1,1);
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos_users_permissions_user_links`
--

DROP TABLE IF EXISTS `documentos_users_permissions_user_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentos_users_permissions_user_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `documento_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentos_users_permissions_user_links_unique` (`documento_id`,`user_id`),
  KEY `documentos_users_permissions_user_links_fk` (`documento_id`),
  KEY `documentos_users_permissions_user_links_inv_fk` (`user_id`),
  CONSTRAINT `documentos_users_permissions_user_links_fk` FOREIGN KEY (`documento_id`) REFERENCES `documentos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `documentos_users_permissions_user_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos_users_permissions_user_links`
--

LOCK TABLES `documentos_users_permissions_user_links` WRITE;
/*!40000 ALTER TABLE `documentos_users_permissions_user_links` DISABLE KEYS */;
INSERT INTO `documentos_users_permissions_user_links` VALUES
(1,1,1);
/*!40000 ALTER TABLE `documentos_users_permissions_user_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `alternative_text` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `formats` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`formats`)),
  `hash` varchar(255) DEFAULT NULL,
  `ext` varchar(255) DEFAULT NULL,
  `mime` varchar(255) DEFAULT NULL,
  `size` decimal(10,2) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `preview_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `provider_metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`provider_metadata`)),
  `folder_path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `upload_files_folder_path_index` (`folder_path`),
  KEY `upload_files_created_at_index` (`created_at`),
  KEY `upload_files_updated_at_index` (`updated_at`),
  KEY `upload_files_name_index` (`name`),
  KEY `upload_files_size_index` (`size`),
  KEY `upload_files_ext_index` (`ext`),
  KEY `files_created_by_id_fk` (`created_by_id`),
  KEY `files_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `files_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `files_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES
(1,'Logo.svg',NULL,NULL,827,52,NULL,'Logo_2c6cbe26d6','.svg','image/svg+xml',11.53,'/uploads/Logo_2c6cbe26d6.svg',NULL,'local',NULL,'/1','2025-07-25 16:36:44.536000','2025-07-25 16:36:44.536000',NULL,NULL),
(2,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_afeea2d1c0.png',NULL,'local',NULL,'/1','2025-07-25 16:53:25.210000','2025-07-25 16:53:25.210000',NULL,NULL),
(3,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_790e8e31ce.png',NULL,'local',NULL,'/1','2025-07-25 16:54:57.462000','2025-07-25 16:54:57.462000',NULL,NULL),
(4,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bb975463a8.png',NULL,'local',NULL,'/1','2025-07-25 17:20:03.697000','2025-07-25 17:20:03.697000',NULL,NULL),
(5,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_cc779ef076.png',NULL,'local',NULL,'/1','2025-07-25 17:32:46.746000','2025-07-25 17:32:46.746000',NULL,NULL),
(6,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_7e3a356c38.png',NULL,'local',NULL,'/1','2025-07-25 17:38:12.624000','2025-07-25 17:38:12.624000',NULL,NULL),
(7,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_9d7df64273.png',NULL,'local',NULL,'/1','2025-07-25 17:40:04.335000','2025-07-25 17:40:04.335000',NULL,NULL),
(8,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5b8ef42771.png',NULL,'local',NULL,'/1','2025-07-25 17:54:36.272000','2025-07-25 17:54:36.272000',NULL,NULL),
(9,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_a4bf4dfd4c.png',NULL,'local',NULL,'/1','2025-07-25 18:05:51.766000','2025-07-25 18:05:51.766000',NULL,NULL),
(10,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_840c328c56.png',NULL,'local',NULL,'/1','2025-07-25 18:14:13.247000','2025-07-25 18:14:13.247000',NULL,NULL),
(11,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_f07da91d57.png',NULL,'local',NULL,'/1','2025-07-28 10:14:30.160000','2025-07-28 10:14:30.160000',NULL,NULL),
(12,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_bcc75033bc.png',NULL,'local',NULL,'/1','2025-07-28 10:28:48.679000','2025-07-28 10:28:48.679000',NULL,NULL),
(13,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_445f3a1b67.png',NULL,'local',NULL,'/1','2025-07-28 10:47:34.224000','2025-07-28 10:47:34.224000',NULL,NULL),
(14,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_3729839f1b.png',NULL,'local',NULL,'/1','2025-07-28 11:02:55.386000','2025-07-28 11:02:55.386000',NULL,NULL),
(15,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_935569d895.png',NULL,'local',NULL,'/1','2025-07-28 11:07:18.215000','2025-07-28 11:07:18.215000',NULL,NULL),
(16,'thumb-350-375590.webp',NULL,NULL,350,350,'{\"thumbnail\":{\"name\":\"thumbnail_thumb-350-375590.webp\",\"hash\":\"thumbnail_thumb_350_375590_1f10b95ba8\",\"ext\":\".webp\",\"mime\":\"image/webp\",\"path\":null,\"width\":156,\"height\":156,\"size\":5.43,\"sizeInBytes\":5432,\"url\":\"/uploads/thumbnail_thumb_350_375590_1f10b95ba8.webp\"}}','thumb_350_375590_1f10b95ba8','.webp','image/webp',18.47,'/uploads/thumb_350_375590_1f10b95ba8.webp',NULL,'local',NULL,'/2','2025-07-28 11:26:26.311000','2025-07-28 11:26:26.311000',1,1),
(17,'tnpjnvyab2z31.png',NULL,NULL,960,960,'{\"thumbnail\":{\"name\":\"thumbnail_tnpjnvyab2z31.png\",\"hash\":\"thumbnail_tnpjnvyab2z31_c16380537b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":156,\"height\":156,\"size\":57.73,\"sizeInBytes\":57725,\"url\":\"/uploads/thumbnail_tnpjnvyab2z31_c16380537b.png\"},\"small\":{\"name\":\"small_tnpjnvyab2z31.png\",\"hash\":\"small_tnpjnvyab2z31_c16380537b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":500,\"size\":345.73,\"sizeInBytes\":345730,\"url\":\"/uploads/small_tnpjnvyab2z31_c16380537b.png\"},\"medium\":{\"name\":\"medium_tnpjnvyab2z31.png\",\"hash\":\"medium_tnpjnvyab2z31_c16380537b\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":750,\"height\":750,\"size\":655.36,\"sizeInBytes\":655363,\"url\":\"/uploads/medium_tnpjnvyab2z31_c16380537b.png\"}}','tnpjnvyab2z31_c16380537b','.png','image/png',193.38,'/uploads/tnpjnvyab2z31_c16380537b.png',NULL,'local',NULL,'/2','2025-07-28 11:26:51.315000','2025-07-28 11:26:51.315000',1,1),
(18,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_5237055aa9.png',NULL,'local',NULL,'/1','2025-07-28 15:16:07.292000','2025-07-28 15:16:07.292000',NULL,NULL),
(19,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_baf55de7cb.png',NULL,'local',NULL,'/1','2025-07-28 16:43:06.286000','2025-07-28 16:43:06.286000',NULL,NULL),
(20,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_2b7d26b3ab.png',NULL,'local',NULL,'/1','2025-07-28 16:44:08.225000','2025-07-28 16:44:08.225000',NULL,NULL),
(21,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_469dc26ffc.png',NULL,'local',NULL,'/1','2025-07-28 17:00:54.741000','2025-07-28 17:00:54.741000',NULL,NULL),
(22,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_674a051191.png',NULL,'local',NULL,'/1','2025-07-29 11:30:32.595000','2025-07-29 11:30:32.595000',NULL,NULL),
(23,'c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png',NULL,NULL,680,340,'{\"thumbnail\":{\"name\":\"thumbnail_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":245,\"height\":123,\"size\":41.24,\"sizeInBytes\":41236,\"url\":\"/uploads/thumbnail_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032.png\"},\"small\":{\"name\":\"small_c8a4257a-a6ab-4b8a-96de-0a2d2de845a9-680x340.png\",\"hash\":\"small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032\",\"ext\":\".png\",\"mime\":\"image/png\",\"path\":null,\"width\":500,\"height\":250,\"size\":144.63,\"sizeInBytes\":144633,\"url\":\"/uploads/small_c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032.png\"}}','c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032','.png','image/png',63.57,'/uploads/c8a4257a_a6ab_4b8a_96de_0a2d2de845a9_680x340_10ed4ab032.png',NULL,'local',NULL,'/1','2025-07-29 17:04:02.997000','2025-07-29 17:04:02.997000',NULL,NULL),
(24,'image.jpg',NULL,NULL,4032,3024,'{\"thumbnail\":{\"name\":\"thumbnail_image.jpg\",\"hash\":\"thumbnail_image_7e363a8146\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":208,\"height\":156,\"size\":5.28,\"sizeInBytes\":5276,\"url\":\"/uploads/thumbnail_image_7e363a8146.jpg\"},\"medium\":{\"name\":\"medium_image.jpg\",\"hash\":\"medium_image_7e363a8146\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":750,\"height\":563,\"size\":40.25,\"sizeInBytes\":40251,\"url\":\"/uploads/medium_image_7e363a8146.jpg\"},\"small\":{\"name\":\"small_image.jpg\",\"hash\":\"small_image_7e363a8146\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":500,\"height\":375,\"size\":19.93,\"sizeInBytes\":19926,\"url\":\"/uploads/small_image_7e363a8146.jpg\"},\"large\":{\"name\":\"large_image.jpg\",\"hash\":\"large_image_7e363a8146\",\"ext\":\".jpg\",\"mime\":\"image/jpeg\",\"path\":null,\"width\":1000,\"height\":750,\"size\":73.79,\"sizeInBytes\":73791,\"url\":\"/uploads/large_image_7e363a8146.jpg\"}}','image_7e363a8146','.jpg','image/jpeg',1207.75,'/uploads/image_7e363a8146.jpg',NULL,'local',NULL,'/1','2025-07-30 10:44:17.349000','2025-07-30 10:44:17.349000',NULL,NULL),
(25,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_ae3a9d7df0','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_ae3a9d7df0.rar',NULL,'local',NULL,'/1','2025-07-30 11:18:52.331000','2025-07-30 11:18:52.331000',NULL,NULL),
(26,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_49df3f24e3','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_49df3f24e3.rar',NULL,'local',NULL,'/1','2025-07-30 11:23:49.578000','2025-07-30 11:23:49.578000',NULL,NULL),
(27,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_2dbc5c2264','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_2dbc5c2264.rar',NULL,'local',NULL,'/1','2025-07-30 11:24:03.404000','2025-07-30 11:24:03.404000',NULL,NULL),
(28,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_be05e5e5e7','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_be05e5e5e7.rar',NULL,'local',NULL,'/1','2025-07-30 11:28:08.619000','2025-07-30 11:28:08.619000',NULL,NULL),
(29,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_6d28c046a7','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_6d28c046a7.rar',NULL,'local',NULL,'/1','2025-07-30 11:28:56.702000','2025-07-30 11:28:56.702000',NULL,NULL),
(30,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_d0112321d0','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_d0112321d0.rar',NULL,'local',NULL,'/1','2025-07-30 14:46:08.139000','2025-07-30 14:46:08.139000',NULL,NULL),
(31,'ECLUSA_POCINHO_IEC104_13-03-2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_POCINHO_IEC_104_13_03_2025_969d4ca8e9','.rar','application/x-compressed',65783.90,'/uploads/ECLUSA_POCINHO_IEC_104_13_03_2025_969d4ca8e9.rar',NULL,'local',NULL,'/1','2025-07-30 15:05:14.780000','2025-07-30 15:05:14.780000',NULL,NULL),
(32,'VMware-converter-en-6.2.0-7348398.rar',NULL,NULL,NULL,NULL,NULL,'V_Mware_converter_en_6_2_0_7348398_73c04af3ef','.rar','application/x-compressed',176648.16,'/uploads/V_Mware_converter_en_6_2_0_7348398_73c04af3ef.rar',NULL,'local',NULL,'/1','2025-07-30 15:05:40.627000','2025-07-30 15:05:40.627000',NULL,NULL),
(33,'VMware-converter-en-6.2.0-7348398.rar',NULL,NULL,NULL,NULL,NULL,'V_Mware_converter_en_6_2_0_7348398_36f26d8881','.rar','application/x-compressed',176648.16,'/uploads/V_Mware_converter_en_6_2_0_7348398_36f26d8881.rar',NULL,'local',NULL,'/1','2025-07-30 15:05:45.488000','2025-07-30 15:05:45.488000',NULL,NULL),
(34,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_3f0d348fdb','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_3f0d348fdb.rar',NULL,'local',NULL,'/1','2025-07-30 15:05:52.914000','2025-07-30 15:05:52.914000',NULL,NULL),
(35,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_714a500da2','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_714a500da2.rar',NULL,'local',NULL,'/1','2025-07-30 15:18:03.124000','2025-07-30 15:18:03.124000',NULL,NULL),
(36,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_9b64ae1698','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_9b64ae1698.rar',NULL,'local',NULL,'/1','2025-07-30 15:30:40.573000','2025-07-30 15:30:40.573000',NULL,NULL),
(37,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_80bcd225ed','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_80bcd225ed.rar',NULL,'local',NULL,'/1','2025-07-30 15:31:35.897000','2025-07-30 15:31:35.897000',NULL,NULL),
(38,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_0da78a9733','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_0da78a9733.rar',NULL,'local',NULL,'/1','2025-07-30 15:38:56.497000','2025-07-30 15:38:56.497000',NULL,NULL),
(39,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_710bfe843e','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_710bfe843e.rar',NULL,'local',NULL,'/1','2025-07-30 15:39:27.944000','2025-07-30 15:39:27.944000',NULL,NULL),
(40,'telegram_listing_rms1000_radar_sensor_en_im0096385.pdf',NULL,NULL,NULL,NULL,NULL,'telegram_listing_rms1000_radar_sensor_en_im0096385_80c526e3f9','.pdf','application/pdf',704.72,'/uploads/telegram_listing_rms1000_radar_sensor_en_im0096385_80c526e3f9.pdf',NULL,'local',NULL,'/1','2025-07-30 15:40:05.856000','2025-07-30 15:40:05.856000',NULL,NULL),
(41,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_d9a0999baf','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_d9a0999baf.rar',NULL,'local',NULL,'/1','2025-07-30 16:45:31.204000','2025-07-30 16:45:31.204000',NULL,NULL),
(42,'ECLUSA_NAV_REGUA_23_03_2025.rar',NULL,NULL,NULL,NULL,NULL,'ECLUSA_NAV_REGUA_23_03_2025_cfa35fdfae','.rar','application/x-compressed',78323.37,'/uploads/ECLUSA_NAV_REGUA_23_03_2025_cfa35fdfae.rar',NULL,'local',NULL,'/1','2025-07-30 16:57:50.775000','2025-07-30 16:57:50.775000',NULL,NULL);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files_folder_links`
--

DROP TABLE IF EXISTS `files_folder_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files_folder_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_id` int(10) unsigned DEFAULT NULL,
  `folder_id` int(10) unsigned DEFAULT NULL,
  `file_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `files_folder_links_unique` (`file_id`,`folder_id`),
  KEY `files_folder_links_fk` (`file_id`),
  KEY `files_folder_links_inv_fk` (`folder_id`),
  KEY `files_folder_links_order_inv_fk` (`file_order`),
  CONSTRAINT `files_folder_links_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `files_folder_links_inv_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files_folder_links`
--

LOCK TABLES `files_folder_links` WRITE;
/*!40000 ALTER TABLE `files_folder_links` DISABLE KEYS */;
INSERT INTO `files_folder_links` VALUES
(1,1,1,1),
(2,2,1,2),
(3,3,1,3),
(4,4,1,4),
(5,5,1,5),
(6,6,1,6),
(7,7,1,7),
(8,8,1,8),
(9,9,1,9),
(10,10,1,10),
(11,11,1,11),
(12,12,1,12),
(13,13,1,13),
(14,14,1,14),
(15,15,1,15),
(16,16,3,1),
(17,17,3,2),
(18,18,1,16),
(19,19,1,17),
(20,20,1,18),
(21,21,1,19),
(22,22,1,20),
(23,23,1,21),
(24,24,1,22),
(25,25,1,23),
(26,26,1,24),
(27,27,1,25),
(28,28,1,26),
(29,29,1,27),
(30,30,1,28),
(31,31,1,29),
(32,32,1,30),
(33,33,1,31),
(34,34,1,32),
(35,35,1,33),
(36,36,1,34),
(37,37,1,35),
(38,38,1,36),
(39,39,1,37),
(40,40,1,38),
(41,41,1,39),
(42,42,1,40);
/*!40000 ALTER TABLE `files_folder_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files_related_morphs`
--

DROP TABLE IF EXISTS `files_related_morphs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files_related_morphs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_id` int(10) unsigned DEFAULT NULL,
  `related_id` int(10) unsigned DEFAULT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `files_related_morphs_fk` (`file_id`),
  KEY `files_related_morphs_order_index` (`order`),
  KEY `files_related_morphs_id_column_index` (`related_id`),
  CONSTRAINT `files_related_morphs_fk` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files_related_morphs`
--

LOCK TABLES `files_related_morphs` WRITE;
/*!40000 ALTER TABLE `files_related_morphs` DISABLE KEYS */;
INSERT INTO `files_related_morphs` VALUES
(1,1,4,'api::despesa.despesa','comprovativo',1),
(2,2,5,'api::despesa.despesa','comprovativo',1),
(3,3,6,'api::despesa.despesa','comprovativo',1),
(4,4,7,'api::despesa.despesa','comprovativo',1),
(5,5,8,'api::despesa.despesa','comprovativo',1),
(6,6,9,'api::despesa.despesa','comprovativo',1),
(7,7,10,'api::despesa.despesa','comprovativo',1),
(8,8,11,'api::despesa.despesa','comprovativo',1),
(9,9,12,'api::despesa.despesa','comprovativo',1),
(10,10,13,'api::despesa.despesa','comprovativo',1),
(11,11,14,'api::despesa.despesa','comprovativo',1),
(12,12,15,'api::despesa.despesa','comprovativo',1),
(13,13,16,'api::despesa.despesa','comprovativo',1),
(14,14,17,'api::despesa.despesa','comprovativo',1),
(15,15,18,'api::despesa.despesa','comprovativo',1),
(16,17,1,'plugin::users-permissions.user','foto_perfil',1),
(17,18,19,'api::despesa.despesa','comprovativo',1),
(18,19,20,'api::despesa.despesa','comprovativo',1),
(19,20,21,'api::despesa.despesa','comprovativo',1),
(20,21,22,'api::despesa.despesa','comprovativo',1),
(21,22,23,'api::despesa.despesa','comprovativo',1),
(22,23,24,'api::despesa.despesa','comprovativo',1),
(23,24,25,'api::despesa.despesa','comprovativo',1),
(37,40,14,'api::arquivo-compartilhado.arquivo-compartilhado','arquivo',1),
(39,42,16,'api::arquivo-compartilhado.arquivo-compartilhado','arquivo',1);
/*!40000 ALTER TABLE `files_related_morphs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `i18n_locale`
--

DROP TABLE IF EXISTS `i18n_locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i18n_locale` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `i18n_locale_created_by_id_fk` (`created_by_id`),
  KEY `i18n_locale_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `i18n_locale_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `i18n_locale_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i18n_locale`
--

LOCK TABLES `i18n_locale` WRITE;
/*!40000 ALTER TABLE `i18n_locale` DISABLE KEYS */;
INSERT INTO `i18n_locale` VALUES
(1,'English (en)','en','2025-07-24 16:47:21.615000','2025-07-24 16:47:21.615000',NULL,NULL);
/*!40000 ALTER TABLE `i18n_locale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasta_compartilhamentos`
--

DROP TABLE IF EXISTS `pasta_compartilhamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pasta_compartilhamentos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `cor` varchar(255) DEFAULT NULL,
  `icone` varchar(255) DEFAULT NULL,
  `publico` tinyint(1) DEFAULT NULL,
  `permissoes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`permissoes`)),
  `ordem` int(11) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pasta_compartilhamentos_created_by_id_fk` (`created_by_id`),
  KEY `pasta_compartilhamentos_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `pasta_compartilhamentos_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `pasta_compartilhamentos_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasta_compartilhamentos`
--

LOCK TABLES `pasta_compartilhamentos` WRITE;
/*!40000 ALTER TABLE `pasta_compartilhamentos` DISABLE KEYS */;
INSERT INTO `pasta_compartilhamentos` VALUES
(1,'Pocinho','Backup','#3B82F6','Folder',1,NULL,0,1,'2025-07-30 14:45:35.552000','2025-07-30 15:37:38.651000','2025-07-30 14:45:35.547000',NULL,NULL),
(3,'Esquema Eletrico','Esquemas','#8B5CF6','Folder',1,NULL,0,1,'2025-07-30 15:37:57.561000','2025-07-30 15:37:57.561000','2025-07-30 15:37:57.558000',NULL,NULL),
(4,'PLC','Backup PLC','#10B981','Folder',1,NULL,0,1,'2025-07-30 15:38:18.736000','2025-07-30 15:38:18.736000','2025-07-30 15:38:18.734000',NULL,NULL),
(15,'Regua','Backup','#3B82F6','Folder',1,NULL,0,1,'2025-07-30 16:48:51.659000','2025-07-30 16:48:51.659000','2025-07-30 16:48:51.656000',NULL,NULL),
(16,'crestuma','','#8B5CF6','Folder',1,NULL,0,1,'2025-07-30 16:57:25.862000','2025-07-30 16:57:25.862000','2025-07-30 16:57:25.858000',NULL,NULL);
/*!40000 ALTER TABLE `pasta_compartilhamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasta_compartilhamentos_pasta_pai_links`
--

DROP TABLE IF EXISTS `pasta_compartilhamentos_pasta_pai_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pasta_compartilhamentos_pasta_pai_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pasta_compartilhamento_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `pasta_compartilhamento_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pasta_compartilhamentos_pasta_pai_links_unique` (`pasta_compartilhamento_id`,`user_id`),
  KEY `pasta_compartilhamentos_pasta_pai_links_fk` (`pasta_compartilhamento_id`),
  KEY `pasta_compartilhamentos_pasta_pai_links_inv_fk` (`user_id`),
  KEY `pasta_compartilhamentos_pasta_pai_links_order_inv_fk` (`pasta_compartilhamento_order`),
  CONSTRAINT `pasta_compartilhamentos_pasta_pai_links_fk` FOREIGN KEY (`pasta_compartilhamento_id`) REFERENCES `pasta_compartilhamentos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pasta_compartilhamentos_pasta_pai_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasta_compartilhamentos_pasta_pai_links`
--

LOCK TABLES `pasta_compartilhamentos_pasta_pai_links` WRITE;
/*!40000 ALTER TABLE `pasta_compartilhamentos_pasta_pai_links` DISABLE KEYS */;
INSERT INTO `pasta_compartilhamentos_pasta_pai_links` VALUES
(1,3,1,1),
(2,4,1,2);
/*!40000 ALTER TABLE `pasta_compartilhamentos_pasta_pai_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasta_compartilhamentos_usuario_proprietario_links`
--

DROP TABLE IF EXISTS `pasta_compartilhamentos_usuario_proprietario_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pasta_compartilhamentos_usuario_proprietario_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pasta_compartilhamento_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `pasta_compartilhamento_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pasta_compartilhamentos_usuario_proprietario_links_unique` (`pasta_compartilhamento_id`,`user_id`),
  KEY `pasta_compartilhamentos_usuario_proprietario_links_fk` (`pasta_compartilhamento_id`),
  KEY `pasta_compartilhamentos_usuario_proprietario_links_inv_fk` (`user_id`),
  KEY `pasta_compartilhamentos_usuario_proprietario_links_order_inv_fk` (`pasta_compartilhamento_order`),
  CONSTRAINT `pasta_compartilhamentos_usuario_proprietario_links_fk` FOREIGN KEY (`pasta_compartilhamento_id`) REFERENCES `pasta_compartilhamentos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pasta_compartilhamentos_usuario_proprietario_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasta_compartilhamentos_usuario_proprietario_links`
--

LOCK TABLES `pasta_compartilhamentos_usuario_proprietario_links` WRITE;
/*!40000 ALTER TABLE `pasta_compartilhamentos_usuario_proprietario_links` DISABLE KEYS */;
INSERT INTO `pasta_compartilhamentos_usuario_proprietario_links` VALUES
(1,1,1,1),
(3,3,1,3),
(4,4,1,4),
(15,15,1,5),
(16,16,1,6);
/*!40000 ALTER TABLE `pasta_compartilhamentos_usuario_proprietario_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_mensals`
--

DROP TABLE IF EXISTS `registro_mensals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro_mensals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mes` int(11) DEFAULT NULL,
  `ano` int(11) DEFAULT NULL,
  `horas_extras` decimal(10,2) DEFAULT NULL,
  `observacoes` varchar(255) DEFAULT NULL,
  `data_aprovacao` date DEFAULT NULL,
  `horas_normais` decimal(10,2) DEFAULT NULL,
  `total_horas` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `published_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `registro_mensals_created_by_id_fk` (`created_by_id`),
  KEY `registro_mensals_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `registro_mensals_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `registro_mensals_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_mensals`
--

LOCK TABLES `registro_mensals` WRITE;
/*!40000 ALTER TABLE `registro_mensals` DISABLE KEYS */;
INSERT INTO `registro_mensals` VALUES
(1,2,2025,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:11:49.591000','2025-07-28 15:37:12.554000','2025-07-28 15:11:49.589000',NULL,NULL),
(2,5,2025,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:24:43.866000','2025-07-28 15:40:01.981000','2025-07-28 15:24:43.862000',NULL,NULL),
(3,4,2025,2.00,'','2025-07-28',200.00,202.00,'pago','2025-07-28 15:36:34.425000','2025-07-28 15:36:50.064000','2025-07-28 15:36:34.421000',NULL,NULL),
(4,1,2025,0.00,'SEM HORAS EXTRAS','2025-07-28',176.00,176.00,'pago','2025-07-28 15:38:40.501000','2025-07-28 15:39:06.966000','2025-07-28 15:38:40.498000',NULL,NULL),
(5,2,2025,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:47:38.908000','2025-07-28 15:48:41.084000','2025-07-28 15:47:38.905000',NULL,NULL),
(6,12,2024,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:55:24.516000','2025-07-28 17:04:45.150000','2025-07-28 15:55:24.514000',NULL,NULL),
(7,11,2024,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:55:31.236000','2025-07-28 17:04:51.168000','2025-07-28 15:55:31.234000',NULL,NULL),
(8,10,2024,0.00,'','2025-07-28',176.00,176.00,'pago','2025-07-28 15:55:47.838000','2025-07-28 17:04:49.849000','2025-07-28 15:55:47.836000',NULL,NULL),
(9,7,2025,0.00,'','2025-07-29',176.00,176.00,'pago','2025-07-29 10:07:34.210000','2025-07-29 17:04:49.289000','2025-07-29 10:07:34.206000',NULL,NULL);
/*!40000 ALTER TABLE `registro_mensals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_mensals_aprovado_por_links`
--

DROP TABLE IF EXISTS `registro_mensals_aprovado_por_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro_mensals_aprovado_por_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `registro_mensal_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `registro_mensal_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registro_mensals_aprovado_por_links_unique` (`registro_mensal_id`,`user_id`),
  KEY `registro_mensals_aprovado_por_links_fk` (`registro_mensal_id`),
  KEY `registro_mensals_aprovado_por_links_inv_fk` (`user_id`),
  KEY `registro_mensals_aprovado_por_links_order_inv_fk` (`registro_mensal_order`),
  CONSTRAINT `registro_mensals_aprovado_por_links_fk` FOREIGN KEY (`registro_mensal_id`) REFERENCES `registro_mensals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registro_mensals_aprovado_por_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_mensals_aprovado_por_links`
--

LOCK TABLES `registro_mensals_aprovado_por_links` WRITE;
/*!40000 ALTER TABLE `registro_mensals_aprovado_por_links` DISABLE KEYS */;
INSERT INTO `registro_mensals_aprovado_por_links` VALUES
(1,2,1,1),
(2,3,1,2),
(3,4,1,3),
(4,5,1,4),
(5,6,1,5),
(6,7,1,6),
(7,8,1,7),
(8,9,1,8);
/*!40000 ALTER TABLE `registro_mensals_aprovado_por_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_mensals_users_permissions_user_links`
--

DROP TABLE IF EXISTS `registro_mensals_users_permissions_user_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro_mensals_users_permissions_user_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `registro_mensal_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  `registro_mensal_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registro_mensals_users_permissions_user_links_unique` (`registro_mensal_id`,`user_id`),
  KEY `registro_mensals_users_permissions_user_links_fk` (`registro_mensal_id`),
  KEY `registro_mensals_users_permissions_user_links_inv_fk` (`user_id`),
  KEY `registro_mensals_users_permissions_user_links_order_inv_fk` (`registro_mensal_order`),
  CONSTRAINT `registro_mensals_users_permissions_user_links_fk` FOREIGN KEY (`registro_mensal_id`) REFERENCES `registro_mensals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registro_mensals_users_permissions_user_links_inv_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_mensals_users_permissions_user_links`
--

LOCK TABLES `registro_mensals_users_permissions_user_links` WRITE;
/*!40000 ALTER TABLE `registro_mensals_users_permissions_user_links` DISABLE KEYS */;
INSERT INTO `registro_mensals_users_permissions_user_links` VALUES
(1,2,2,1),
(2,3,2,2),
(3,4,2,3),
(4,5,2,4),
(5,6,2,5),
(6,7,2,6),
(7,8,2,7),
(8,9,2,8);
/*!40000 ALTER TABLE `registro_mensals_users_permissions_user_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_api_token_permissions`
--

DROP TABLE IF EXISTS `strapi_api_token_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_api_token_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_token_permissions_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_token_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_api_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_api_token_permissions`
--

LOCK TABLES `strapi_api_token_permissions` WRITE;
/*!40000 ALTER TABLE `strapi_api_token_permissions` DISABLE KEYS */;
INSERT INTO `strapi_api_token_permissions` VALUES
(1,'api::despesa.despesa.find','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(2,'api::despesa.despesa.findOne','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(3,'api::despesa.despesa.create','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(4,'api::despesa.despesa.update','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(5,'api::documento.documento.find','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(6,'api::documento.documento.findOne','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(7,'api::documento.documento.create','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(8,'api::documento.documento.update','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(9,'api::documento.documento.delete','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(10,'plugin::upload.content-api.find','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(11,'plugin::upload.content-api.findOne','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(12,'plugin::users-permissions.user.find','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(13,'plugin::users-permissions.user.findOne','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(14,'plugin::users-permissions.user.create','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL),
(15,'plugin::users-permissions.user.update','2025-07-25 14:03:30.066000','2025-07-25 14:03:30.066000',NULL,NULL);
/*!40000 ALTER TABLE `strapi_api_token_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_api_token_permissions_token_links`
--

DROP TABLE IF EXISTS `strapi_api_token_permissions_token_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_api_token_permissions_token_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_token_permission_id` int(10) unsigned DEFAULT NULL,
  `api_token_id` int(10) unsigned DEFAULT NULL,
  `api_token_permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_api_token_permissions_token_links_unique` (`api_token_permission_id`,`api_token_id`),
  KEY `strapi_api_token_permissions_token_links_fk` (`api_token_permission_id`),
  KEY `strapi_api_token_permissions_token_links_inv_fk` (`api_token_id`),
  KEY `strapi_api_token_permissions_token_links_order_inv_fk` (`api_token_permission_order`),
  CONSTRAINT `strapi_api_token_permissions_token_links_fk` FOREIGN KEY (`api_token_permission_id`) REFERENCES `strapi_api_token_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `strapi_api_token_permissions_token_links_inv_fk` FOREIGN KEY (`api_token_id`) REFERENCES `strapi_api_tokens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_api_token_permissions_token_links`
--

LOCK TABLES `strapi_api_token_permissions_token_links` WRITE;
/*!40000 ALTER TABLE `strapi_api_token_permissions_token_links` DISABLE KEYS */;
INSERT INTO `strapi_api_token_permissions_token_links` VALUES
(1,3,1,1),
(2,4,1,1),
(3,5,1,1),
(4,1,1,1),
(5,2,1,1),
(6,7,1,1),
(7,8,1,1),
(8,9,1,1),
(9,6,1,1),
(10,10,1,1),
(11,11,1,2),
(12,12,1,2),
(13,13,1,2),
(14,14,1,2),
(15,15,1,2);
/*!40000 ALTER TABLE `strapi_api_token_permissions_token_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_api_tokens`
--

DROP TABLE IF EXISTS `strapi_api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `lifespan` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_api_tokens_created_by_id_fk` (`created_by_id`),
  KEY `strapi_api_tokens_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_api_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_api_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_api_tokens`
--

LOCK TABLES `strapi_api_tokens` WRITE;
/*!40000 ALTER TABLE `strapi_api_tokens` DISABLE KEYS */;
INSERT INTO `strapi_api_tokens` VALUES
(1,'Admin Token','Token para operações administrativas','custom','b58fd20b7ac4959ea4a5af8acaaaccce9e05f471a556c3ef9d7a6448a3ed0adcd247bd3161c05f44855ab796fb31c7e6ad899ddaf22686fd799c00dd6e5fc111',NULL,NULL,NULL,'2025-07-25 14:03:30.050000','2025-07-25 14:04:48.609000',NULL,NULL);
/*!40000 ALTER TABLE `strapi_api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_core_store_settings`
--

DROP TABLE IF EXISTS `strapi_core_store_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_core_store_settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `value` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `environment` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_core_store_settings`
--

LOCK TABLES `strapi_core_store_settings` WRITE;
/*!40000 ALTER TABLE `strapi_core_store_settings` DISABLE KEYS */;
INSERT INTO `strapi_core_store_settings` VALUES
(1,'strapi_content_types_schema','{\"admin::permission\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"actionParameters\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_permissions\",\"info\":{\"name\":\"Permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"actionParameters\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"subject\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false},\"properties\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":{}},\"conditions\":{\"type\":\"json\",\"configurable\":false,\"required\":false,\"default\":[]},\"role\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::role\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"admin::permission\",\"plugin\":\"admin\",\"globalId\":\"AdminPermission\"},\"admin::user\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false,\"searchable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"registrationToken\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_users\",\"info\":{\"name\":\"User\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"firstname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"lastname\":{\"type\":\"string\",\"unique\":false,\"minLength\":1,\"configurable\":false,\"required\":false},\"username\":{\"type\":\"string\",\"unique\":false,\"configurable\":false,\"required\":false},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true,\"unique\":true,\"private\":true},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"required\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"registrationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"isActive\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"roles\":{\"configurable\":false,\"private\":true,\"type\":\"relation\",\"relation\":\"manyToMany\",\"inversedBy\":\"users\",\"target\":\"admin::role\",\"collectionName\":\"strapi_users_roles\"},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false,\"private\":true},\"preferedLanguage\":{\"type\":\"string\",\"configurable\":false,\"required\":false,\"searchable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"admin::user\",\"plugin\":\"admin\",\"globalId\":\"AdminUser\"},\"admin::role\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"admin_roles\",\"info\":{\"name\":\"Role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"code\":{\"type\":\"string\",\"minLength\":1,\"unique\":true,\"configurable\":false,\"required\":true},\"description\":{\"type\":\"string\",\"configurable\":false},\"users\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToMany\",\"mappedBy\":\"roles\",\"target\":\"admin::user\"},\"permissions\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"oneToMany\",\"mappedBy\":\"role\",\"target\":\"admin::permission\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"admin::role\",\"plugin\":\"admin\",\"globalId\":\"AdminRole\"},\"admin::api-token\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"searchable\":false},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_tokens\",\"info\":{\"name\":\"Api Token\",\"singularName\":\"api-token\",\"pluralName\":\"api-tokens\",\"displayName\":\"Api Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"type\":{\"type\":\"enumeration\",\"enum\":[\"read-only\",\"full-access\",\"custom\"],\"configurable\":false,\"required\":true,\"default\":\"read-only\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"searchable\":false},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::api-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token\",\"connection\":\"default\",\"uid\":\"admin::api-token\",\"plugin\":\"admin\",\"globalId\":\"AdminApiToken\"},\"admin::api-token-permission\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_api_token_permissions\",\"info\":{\"name\":\"API Token Permission\",\"description\":\"\",\"singularName\":\"api-token-permission\",\"pluralName\":\"api-token-permissions\",\"displayName\":\"API Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::api-token\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"api-token-permission\",\"connection\":\"default\",\"uid\":\"admin::api-token-permission\",\"plugin\":\"admin\",\"globalId\":\"AdminApiTokenPermission\"},\"admin::transfer-token\":{\"collectionName\":\"strapi_transfer_tokens\",\"info\":{\"name\":\"Transfer Token\",\"singularName\":\"transfer-token\",\"pluralName\":\"transfer-tokens\",\"displayName\":\"Transfer Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::transfer-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_transfer_tokens\",\"info\":{\"name\":\"Transfer Token\",\"singularName\":\"transfer-token\",\"pluralName\":\"transfer-tokens\",\"displayName\":\"Transfer Token\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true,\"unique\":true},\"description\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":false,\"default\":\"\"},\"accessKey\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"lastUsedAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"permissions\":{\"type\":\"relation\",\"target\":\"admin::transfer-token-permission\",\"relation\":\"oneToMany\",\"mappedBy\":\"token\",\"configurable\":false,\"required\":false},\"expiresAt\":{\"type\":\"datetime\",\"configurable\":false,\"required\":false},\"lifespan\":{\"type\":\"biginteger\",\"configurable\":false,\"required\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"transfer-token\",\"connection\":\"default\",\"uid\":\"admin::transfer-token\",\"plugin\":\"admin\",\"globalId\":\"AdminTransferToken\"},\"admin::transfer-token-permission\":{\"collectionName\":\"strapi_transfer_token_permissions\",\"info\":{\"name\":\"Transfer Token Permission\",\"description\":\"\",\"singularName\":\"transfer-token-permission\",\"pluralName\":\"transfer-token-permissions\",\"displayName\":\"Transfer Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::transfer-token\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_transfer_token_permissions\",\"info\":{\"name\":\"Transfer Token Permission\",\"description\":\"\",\"singularName\":\"transfer-token-permission\",\"pluralName\":\"transfer-token-permissions\",\"displayName\":\"Transfer Token Permission\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"minLength\":1,\"configurable\":false,\"required\":true},\"token\":{\"configurable\":false,\"type\":\"relation\",\"relation\":\"manyToOne\",\"inversedBy\":\"permissions\",\"target\":\"admin::transfer-token\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"transfer-token-permission\",\"connection\":\"default\",\"uid\":\"admin::transfer-token-permission\",\"plugin\":\"admin\",\"globalId\":\"AdminTransferTokenPermission\"},\"plugin::upload.file\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true,\"searchable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null},{\"name\":\"upload_files_created_at_index\",\"columns\":[\"created_at\"],\"type\":null},{\"name\":\"upload_files_updated_at_index\",\"columns\":[\"updated_at\"],\"type\":null},{\"name\":\"upload_files_name_index\",\"columns\":[\"name\"],\"type\":null},{\"name\":\"upload_files_size_index\",\"columns\":[\"size\"],\"type\":null},{\"name\":\"upload_files_ext_index\",\"columns\":[\"ext\"],\"type\":null}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"files\",\"info\":{\"singularName\":\"file\",\"pluralName\":\"files\",\"displayName\":\"File\",\"description\":\"\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"alternativeText\":{\"type\":\"string\",\"configurable\":false},\"caption\":{\"type\":\"string\",\"configurable\":false},\"width\":{\"type\":\"integer\",\"configurable\":false},\"height\":{\"type\":\"integer\",\"configurable\":false},\"formats\":{\"type\":\"json\",\"configurable\":false},\"hash\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"ext\":{\"type\":\"string\",\"configurable\":false},\"mime\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"size\":{\"type\":\"decimal\",\"configurable\":false,\"required\":true},\"url\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"previewUrl\":{\"type\":\"string\",\"configurable\":false},\"provider\":{\"type\":\"string\",\"configurable\":false,\"required\":true},\"provider_metadata\":{\"type\":\"json\",\"configurable\":false},\"related\":{\"type\":\"relation\",\"relation\":\"morphToMany\",\"configurable\":false},\"folder\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"files\",\"private\":true},\"folderPath\":{\"type\":\"string\",\"min\":1,\"required\":true,\"private\":true,\"searchable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"file\",\"connection\":\"default\",\"uid\":\"plugin::upload.file\",\"plugin\":\"upload\",\"globalId\":\"UploadFile\"},\"plugin::upload.folder\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"}],\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"upload_folders\",\"info\":{\"singularName\":\"folder\",\"pluralName\":\"folders\",\"displayName\":\"Folder\"},\"options\":{},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"required\":true},\"pathId\":{\"type\":\"integer\",\"unique\":true,\"required\":true},\"parent\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::upload.folder\",\"inversedBy\":\"children\"},\"children\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.folder\",\"mappedBy\":\"parent\"},\"files\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::upload.file\",\"mappedBy\":\"folder\"},\"path\":{\"type\":\"string\",\"min\":1,\"required\":true}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"folder\",\"connection\":\"default\",\"uid\":\"plugin::upload.folder\",\"plugin\":\"upload\",\"globalId\":\"UploadFolder\"},\"plugin::content-releases.release\":{\"collectionName\":\"strapi_releases\",\"info\":{\"singularName\":\"release\",\"pluralName\":\"releases\",\"displayName\":\"Release\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"required\":true},\"releasedAt\":{\"type\":\"datetime\"},\"scheduledAt\":{\"type\":\"datetime\"},\"timezone\":{\"type\":\"string\"},\"status\":{\"type\":\"enumeration\",\"enum\":[\"ready\",\"blocked\",\"failed\",\"done\",\"empty\"],\"required\":true},\"actions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::content-releases.release-action\",\"mappedBy\":\"release\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_releases\",\"info\":{\"singularName\":\"release\",\"pluralName\":\"releases\",\"displayName\":\"Release\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"required\":true},\"releasedAt\":{\"type\":\"datetime\"},\"scheduledAt\":{\"type\":\"datetime\"},\"timezone\":{\"type\":\"string\"},\"status\":{\"type\":\"enumeration\",\"enum\":[\"ready\",\"blocked\",\"failed\",\"done\",\"empty\"],\"required\":true},\"actions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::content-releases.release-action\",\"mappedBy\":\"release\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"release\",\"connection\":\"default\",\"uid\":\"plugin::content-releases.release\",\"plugin\":\"content-releases\",\"globalId\":\"ContentReleasesRelease\"},\"plugin::content-releases.release-action\":{\"collectionName\":\"strapi_release_actions\",\"info\":{\"singularName\":\"release-action\",\"pluralName\":\"release-actions\",\"displayName\":\"Release Action\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"type\":{\"type\":\"enumeration\",\"enum\":[\"publish\",\"unpublish\"],\"required\":true},\"entry\":{\"type\":\"relation\",\"relation\":\"morphToOne\",\"configurable\":false},\"contentType\":{\"type\":\"string\",\"required\":true},\"locale\":{\"type\":\"string\"},\"release\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::content-releases.release\",\"inversedBy\":\"actions\"},\"isEntryValid\":{\"type\":\"boolean\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"strapi_release_actions\",\"info\":{\"singularName\":\"release-action\",\"pluralName\":\"release-actions\",\"displayName\":\"Release Action\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"type\":{\"type\":\"enumeration\",\"enum\":[\"publish\",\"unpublish\"],\"required\":true},\"entry\":{\"type\":\"relation\",\"relation\":\"morphToOne\",\"configurable\":false},\"contentType\":{\"type\":\"string\",\"required\":true},\"locale\":{\"type\":\"string\"},\"release\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::content-releases.release\",\"inversedBy\":\"actions\"},\"isEntryValid\":{\"type\":\"boolean\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"release-action\",\"connection\":\"default\",\"uid\":\"plugin::content-releases.release-action\",\"plugin\":\"content-releases\",\"globalId\":\"ContentReleasesReleaseAction\"},\"plugin::users-permissions.permission\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_permissions\",\"info\":{\"name\":\"permission\",\"description\":\"\",\"singularName\":\"permission\",\"pluralName\":\"permissions\",\"displayName\":\"Permission\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"action\":{\"type\":\"string\",\"required\":true,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"permissions\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"permission\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.permission\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsPermission\"},\"plugin::users-permissions.role\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"collectionName\":\"up_roles\",\"info\":{\"name\":\"role\",\"description\":\"\",\"singularName\":\"role\",\"pluralName\":\"roles\",\"displayName\":\"Role\"},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"minLength\":3,\"required\":true,\"configurable\":false},\"description\":{\"type\":\"string\",\"configurable\":false},\"type\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"permissions\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.permission\",\"mappedBy\":\"role\",\"configurable\":false},\"users\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"plugin::users-permissions.user\",\"mappedBy\":\"role\",\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"role\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.role\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsRole\"},\"plugin::users-permissions.user\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false},\"nomecompleto\":{\"type\":\"string\",\"required\":true},\"cargo\":{\"type\":\"string\",\"required\":true},\"nif\":{\"type\":\"string\",\"required\":true},\"telefone\":{\"type\":\"string\"},\"data_admissao\":{\"type\":\"date\"},\"salario\":{\"type\":\"decimal\"},\"foto_perfil\":{\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"],\"type\":\"media\",\"multiple\":false},\"documento\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::documento.documento\",\"mappedBy\":\"users_permissions_user\"},\"despesa\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::despesa.despesa\",\"mappedBy\":\"users_permissions_user\"},\"registro_mensals\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::registro-mensal.registro-mensal\",\"mappedBy\":\"aprovado_por\"},\"pasta_compartilhamentos\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::pasta-compartilhamento.pasta-compartilhamento\",\"mappedBy\":\"usuario_proprietario\"},\"aprovado_por\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"users_permissions_user\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"config\":{\"attributes\":{\"resetPasswordToken\":{\"hidden\":true},\"confirmationToken\":{\"hidden\":true},\"provider\":{\"hidden\":true}}},\"kind\":\"collectionType\",\"__filename__\":\"schema.json\",\"__schema__\":{\"collectionName\":\"up_users\",\"info\":{\"name\":\"user\",\"description\":\"\",\"singularName\":\"user\",\"pluralName\":\"users\",\"displayName\":\"User\"},\"options\":{\"draftAndPublish\":false},\"attributes\":{\"username\":{\"type\":\"string\",\"minLength\":3,\"unique\":true,\"configurable\":false,\"required\":true},\"email\":{\"type\":\"email\",\"minLength\":6,\"configurable\":false,\"required\":true},\"provider\":{\"type\":\"string\",\"configurable\":false},\"password\":{\"type\":\"password\",\"minLength\":6,\"configurable\":false,\"private\":true,\"searchable\":false},\"resetPasswordToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmationToken\":{\"type\":\"string\",\"configurable\":false,\"private\":true,\"searchable\":false},\"confirmed\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"blocked\":{\"type\":\"boolean\",\"default\":false,\"configurable\":false},\"role\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.role\",\"inversedBy\":\"users\",\"configurable\":false},\"nomecompleto\":{\"type\":\"string\",\"required\":true},\"cargo\":{\"type\":\"string\",\"required\":true},\"nif\":{\"type\":\"string\",\"required\":true},\"telefone\":{\"type\":\"string\"},\"data_admissao\":{\"type\":\"date\"},\"salario\":{\"type\":\"decimal\"},\"foto_perfil\":{\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"],\"type\":\"media\",\"multiple\":false},\"documento\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::documento.documento\",\"mappedBy\":\"users_permissions_user\"},\"despesa\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"api::despesa.despesa\",\"mappedBy\":\"users_permissions_user\"},\"registro_mensals\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::registro-mensal.registro-mensal\",\"mappedBy\":\"aprovado_por\"},\"pasta_compartilhamentos\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::pasta-compartilhamento.pasta-compartilhamento\",\"mappedBy\":\"usuario_proprietario\"},\"aprovado_por\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"users_permissions_user\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"user\",\"connection\":\"default\",\"uid\":\"plugin::users-permissions.user\",\"plugin\":\"users-permissions\",\"globalId\":\"UsersPermissionsUser\"},\"plugin::i18n.locale\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"kind\":\"collectionType\",\"__schema__\":{\"info\":{\"singularName\":\"locale\",\"pluralName\":\"locales\",\"collectionName\":\"locales\",\"displayName\":\"Locale\",\"description\":\"\"},\"options\":{\"draftAndPublish\":false},\"pluginOptions\":{\"content-manager\":{\"visible\":false},\"content-type-builder\":{\"visible\":false}},\"attributes\":{\"name\":{\"type\":\"string\",\"min\":1,\"max\":50,\"configurable\":false},\"code\":{\"type\":\"string\",\"unique\":true,\"configurable\":false}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"locale\",\"connection\":\"default\",\"uid\":\"plugin::i18n.locale\",\"plugin\":\"i18n\",\"collectionName\":\"i18n_locale\",\"globalId\":\"I18NLocale\"},\"api::arquivo-compartilhado.arquivo-compartilhado\":{\"kind\":\"collectionType\",\"collectionName\":\"arquivo_compartilhados\",\"info\":{\"singularName\":\"arquivo-compartilhado\",\"pluralName\":\"arquivo-compartilhados\",\"displayName\":\"arquivo-compartilhado\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"tipo\":{\"type\":\"string\"},\"tamanho\":{\"type\":\"decimal\"},\"descricao\":{\"type\":\"text\"},\"categoria\":{\"type\":\"enumeration\",\"enum\":[\"projeto\",\"backup\",\"documento\",\"imagem\",\"outro\"]},\"publico\":{\"type\":\"boolean\",\"default\":true},\"downloads\":{\"type\":\"decimal\",\"default\":0},\"arquivo\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"aprovado_por\"},\"pasta\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::pasta-compartilhamento.pasta-compartilhamento\",\"inversedBy\":\"arquivo_compartilhados\"},\"tags\":{\"type\":\"string\"},\"versao\":{\"type\":\"string\"},\"arquivo_original\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"inversedBy\":\"arquivo_compartilhados\"},\"arquivo_compartilhados\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"arquivo_original\"},\"aprovado\":{\"type\":\"boolean\",\"default\":true,\"required\":true},\"data_aprovacao\":{\"type\":\"date\"},\"favorito\":{\"type\":\"boolean\",\"default\":false},\"visualizacoes\":{\"type\":\"integer\",\"default\":0},\"ultimo_acesso\":{\"type\":\"date\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"arquivo_compartilhados\",\"info\":{\"singularName\":\"arquivo-compartilhado\",\"pluralName\":\"arquivo-compartilhados\",\"displayName\":\"arquivo-compartilhado\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"tipo\":{\"type\":\"string\"},\"tamanho\":{\"type\":\"decimal\"},\"descricao\":{\"type\":\"text\"},\"categoria\":{\"type\":\"enumeration\",\"enum\":[\"projeto\",\"backup\",\"documento\",\"imagem\",\"outro\"]},\"publico\":{\"type\":\"boolean\",\"default\":true},\"downloads\":{\"type\":\"decimal\",\"default\":0},\"arquivo\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"aprovado_por\"},\"pasta\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::pasta-compartilhamento.pasta-compartilhamento\",\"inversedBy\":\"arquivo_compartilhados\"},\"tags\":{\"type\":\"string\"},\"versao\":{\"type\":\"string\"},\"arquivo_original\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"inversedBy\":\"arquivo_compartilhados\"},\"arquivo_compartilhados\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"arquivo_original\"},\"aprovado\":{\"type\":\"boolean\",\"default\":true,\"required\":true},\"data_aprovacao\":{\"type\":\"date\"},\"favorito\":{\"type\":\"boolean\",\"default\":false},\"visualizacoes\":{\"type\":\"integer\",\"default\":0},\"ultimo_acesso\":{\"type\":\"date\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"arquivo-compartilhado\",\"connection\":\"default\",\"uid\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"apiName\":\"arquivo-compartilhado\",\"globalId\":\"ArquivoCompartilhado\",\"actions\":{},\"lifecycles\":{}},\"api::despesa.despesa\":{\"kind\":\"collectionType\",\"collectionName\":\"despesas\",\"info\":{\"singularName\":\"despesa\",\"pluralName\":\"despesas\",\"displayName\":\"Despesa\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"descricao\":{\"type\":\"string\",\"required\":true},\"valor\":{\"type\":\"decimal\",\"required\":true},\"data_despesa\":{\"type\":\"date\",\"required\":true},\"categoria\":{\"type\":\"enumeration\",\"enum\":[\"transporte\",\"alimentacao\",\"hospedagem\",\"combustivel\",\"outros\"],\"default\":\"outros\",\"required\":true},\"status\":{\"type\":\"enumeration\",\"enum\":[\"pendente\",\"aprovada\",\"rejeitada\"],\"default\":\"pendente\",\"required\":true},\"comprovativo\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"observacoes\":{\"type\":\"text\"},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"despesas\",\"info\":{\"singularName\":\"despesa\",\"pluralName\":\"despesas\",\"displayName\":\"Despesa\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"descricao\":{\"type\":\"string\",\"required\":true},\"valor\":{\"type\":\"decimal\",\"required\":true},\"data_despesa\":{\"type\":\"date\",\"required\":true},\"categoria\":{\"type\":\"enumeration\",\"enum\":[\"transporte\",\"alimentacao\",\"hospedagem\",\"combustivel\",\"outros\"],\"default\":\"outros\",\"required\":true},\"status\":{\"type\":\"enumeration\",\"enum\":[\"pendente\",\"aprovada\",\"rejeitada\"],\"default\":\"pendente\",\"required\":true},\"comprovativo\":{\"type\":\"media\",\"multiple\":false,\"required\":false,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"observacoes\":{\"type\":\"text\"},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"despesa\",\"connection\":\"default\",\"uid\":\"api::despesa.despesa\",\"apiName\":\"despesa\",\"globalId\":\"Despesa\",\"actions\":{},\"lifecycles\":{}},\"api::documento.documento\":{\"kind\":\"collectionType\",\"collectionName\":\"documentos\",\"info\":{\"singularName\":\"documento\",\"pluralName\":\"documentos\",\"displayName\":\"Documento\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"tipo\":{\"type\":\"enumeration\",\"enum\":[\"contrato\",\"recibo_vencimento\",\"certificado\",\"outros\"]},\"arquivo\":{\"type\":\"media\",\"multiple\":false,\"required\":true,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"documento\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"documentos\",\"info\":{\"singularName\":\"documento\",\"pluralName\":\"documentos\",\"displayName\":\"Documento\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"tipo\":{\"type\":\"enumeration\",\"enum\":[\"contrato\",\"recibo_vencimento\",\"certificado\",\"outros\"]},\"arquivo\":{\"type\":\"media\",\"multiple\":false,\"required\":true,\"allowedTypes\":[\"images\",\"files\",\"videos\",\"audios\"]},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"documento\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"documento\",\"connection\":\"default\",\"uid\":\"api::documento.documento\",\"apiName\":\"documento\",\"globalId\":\"Documento\",\"actions\":{},\"lifecycles\":{}},\"api::pasta-compartilhamento.pasta-compartilhamento\":{\"kind\":\"collectionType\",\"collectionName\":\"pasta_compartilhamentos\",\"info\":{\"singularName\":\"pasta-compartilhamento\",\"pluralName\":\"pasta-compartilhamentos\",\"displayName\":\"pasta-compartilhamento\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"descricao\":{\"type\":\"string\",\"required\":false},\"cor\":{\"type\":\"string\"},\"icone\":{\"type\":\"string\"},\"pasta_pai\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"pasta_compartilhamentos\"},\"usuario_proprietario\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"pasta_compartilhamentos\"},\"publico\":{\"type\":\"boolean\",\"default\":false},\"permissoes\":{\"type\":\"json\"},\"ordem\":{\"type\":\"integer\"},\"ativo\":{\"type\":\"boolean\",\"default\":true},\"arquivo_compartilhados\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"pasta\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"pasta_compartilhamentos\",\"info\":{\"singularName\":\"pasta-compartilhamento\",\"pluralName\":\"pasta-compartilhamentos\",\"displayName\":\"pasta-compartilhamento\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"nome\":{\"type\":\"string\",\"required\":true},\"descricao\":{\"type\":\"string\",\"required\":false},\"cor\":{\"type\":\"string\"},\"icone\":{\"type\":\"string\"},\"pasta_pai\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"pasta_compartilhamentos\"},\"usuario_proprietario\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"pasta_compartilhamentos\"},\"publico\":{\"type\":\"boolean\",\"default\":false},\"permissoes\":{\"type\":\"json\"},\"ordem\":{\"type\":\"integer\"},\"ativo\":{\"type\":\"boolean\",\"default\":true},\"arquivo_compartilhados\":{\"type\":\"relation\",\"relation\":\"oneToMany\",\"target\":\"api::arquivo-compartilhado.arquivo-compartilhado\",\"mappedBy\":\"pasta\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"pasta-compartilhamento\",\"connection\":\"default\",\"uid\":\"api::pasta-compartilhamento.pasta-compartilhamento\",\"apiName\":\"pasta-compartilhamento\",\"globalId\":\"PastaCompartilhamento\",\"actions\":{},\"lifecycles\":{}},\"api::registro-mensal.registro-mensal\":{\"kind\":\"collectionType\",\"collectionName\":\"registro_mensals\",\"info\":{\"singularName\":\"registro-mensal\",\"pluralName\":\"registro-mensals\",\"displayName\":\"registro-mensal\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"mes\":{\"type\":\"integer\",\"required\":true},\"horas_extras\":{\"type\":\"decimal\"},\"observacoes\":{\"type\":\"string\"},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"registro_mensals\"},\"aprovado_por\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"registro_mensals\"},\"data_aprovacao\":{\"type\":\"date\"},\"horas_normais\":{\"type\":\"decimal\"},\"total_horas\":{\"type\":\"decimal\"},\"status\":{\"type\":\"enumeration\",\"enum\":[\"pendente\",\"aprovado\",\"pago\"]},\"ano\":{\"type\":\"integer\"},\"createdAt\":{\"type\":\"datetime\"},\"updatedAt\":{\"type\":\"datetime\"},\"publishedAt\":{\"type\":\"datetime\",\"configurable\":false,\"writable\":true,\"visible\":false},\"createdBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true},\"updatedBy\":{\"type\":\"relation\",\"relation\":\"oneToOne\",\"target\":\"admin::user\",\"configurable\":false,\"writable\":false,\"visible\":false,\"useJoinTable\":false,\"private\":true}},\"__schema__\":{\"collectionName\":\"registro_mensals\",\"info\":{\"singularName\":\"registro-mensal\",\"pluralName\":\"registro-mensals\",\"displayName\":\"registro-mensal\",\"description\":\"\"},\"options\":{\"draftAndPublish\":true},\"pluginOptions\":{},\"attributes\":{\"mes\":{\"type\":\"integer\",\"required\":true},\"horas_extras\":{\"type\":\"decimal\"},\"observacoes\":{\"type\":\"string\"},\"users_permissions_user\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"registro_mensals\"},\"aprovado_por\":{\"type\":\"relation\",\"relation\":\"manyToOne\",\"target\":\"plugin::users-permissions.user\",\"inversedBy\":\"registro_mensals\"},\"data_aprovacao\":{\"type\":\"date\"},\"horas_normais\":{\"type\":\"decimal\"},\"total_horas\":{\"type\":\"decimal\"},\"status\":{\"type\":\"enumeration\",\"enum\":[\"pendente\",\"aprovado\",\"pago\"]},\"ano\":{\"type\":\"integer\"}},\"kind\":\"collectionType\"},\"modelType\":\"contentType\",\"modelName\":\"registro-mensal\",\"connection\":\"default\",\"uid\":\"api::registro-mensal.registro-mensal\",\"apiName\":\"registro-mensal\",\"globalId\":\"RegistroMensal\",\"actions\":{},\"lifecycles\":{}}}','object',NULL,NULL),
(2,'plugin_content_manager_configuration_content_types::admin::api-token-permission','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"token\":{\"edit\":{\"label\":\"token\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"token\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"token\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"token\",\"size\":6}]]},\"uid\":\"admin::api-token-permission\"}','object',NULL,NULL),
(3,'plugin_content_manager_configuration_content_types::admin::transfer-token-permission','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"token\":{\"edit\":{\"label\":\"token\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"token\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"token\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"token\",\"size\":6}]]},\"uid\":\"admin::transfer-token-permission\"}','object',NULL,NULL),
(4,'plugin_content_manager_configuration_content_types::plugin::upload.folder','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"pathId\":{\"edit\":{\"label\":\"pathId\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"pathId\",\"searchable\":true,\"sortable\":true}},\"parent\":{\"edit\":{\"label\":\"parent\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"parent\",\"searchable\":true,\"sortable\":true}},\"children\":{\"edit\":{\"label\":\"children\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"children\",\"searchable\":false,\"sortable\":false}},\"files\":{\"edit\":{\"label\":\"files\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"files\",\"searchable\":false,\"sortable\":false}},\"path\":{\"edit\":{\"label\":\"path\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"path\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"pathId\",\"parent\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"pathId\",\"size\":4}],[{\"name\":\"parent\",\"size\":6},{\"name\":\"children\",\"size\":6}],[{\"name\":\"files\",\"size\":6},{\"name\":\"path\",\"size\":6}]]},\"uid\":\"plugin::upload.folder\"}','object',NULL,NULL),
(5,'plugin_content_manager_configuration_content_types::plugin::content-releases.release','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"releasedAt\":{\"edit\":{\"label\":\"releasedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"releasedAt\",\"searchable\":true,\"sortable\":true}},\"scheduledAt\":{\"edit\":{\"label\":\"scheduledAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"scheduledAt\",\"searchable\":true,\"sortable\":true}},\"timezone\":{\"edit\":{\"label\":\"timezone\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"timezone\",\"searchable\":true,\"sortable\":true}},\"status\":{\"edit\":{\"label\":\"status\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"status\",\"searchable\":true,\"sortable\":true}},\"actions\":{\"edit\":{\"label\":\"actions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"contentType\"},\"list\":{\"label\":\"actions\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"releasedAt\",\"scheduledAt\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"releasedAt\",\"size\":6}],[{\"name\":\"scheduledAt\",\"size\":6},{\"name\":\"timezone\",\"size\":6}],[{\"name\":\"status\",\"size\":6},{\"name\":\"actions\",\"size\":6}]]},\"uid\":\"plugin::content-releases.release\"}','object',NULL,NULL),
(6,'plugin_content_manager_configuration_content_types::plugin::content-releases.release-action','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"contentType\",\"defaultSortBy\":\"contentType\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"contentType\":{\"edit\":{\"label\":\"contentType\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"contentType\",\"searchable\":true,\"sortable\":true}},\"locale\":{\"edit\":{\"label\":\"locale\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"locale\",\"searchable\":true,\"sortable\":true}},\"release\":{\"edit\":{\"label\":\"release\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"release\",\"searchable\":true,\"sortable\":true}},\"isEntryValid\":{\"edit\":{\"label\":\"isEntryValid\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"isEntryValid\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"type\",\"contentType\",\"locale\"],\"edit\":[[{\"name\":\"type\",\"size\":6},{\"name\":\"contentType\",\"size\":6}],[{\"name\":\"locale\",\"size\":6},{\"name\":\"release\",\"size\":6}],[{\"name\":\"isEntryValid\",\"size\":4}]]},\"uid\":\"plugin::content-releases.release-action\"}','object',NULL,NULL),
(7,'plugin_content_manager_configuration_content_types::plugin::users-permissions.permission','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"role\",\"createdAt\"],\"edit\":[[{\"name\":\"action\",\"size\":6},{\"name\":\"role\",\"size\":6}]]},\"uid\":\"plugin::users-permissions.permission\"}','object',NULL,NULL),
(8,'plugin_content_manager_configuration_content_types::admin::permission','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"action\",\"defaultSortBy\":\"action\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"action\":{\"edit\":{\"label\":\"action\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"action\",\"searchable\":true,\"sortable\":true}},\"actionParameters\":{\"edit\":{\"label\":\"actionParameters\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"actionParameters\",\"searchable\":false,\"sortable\":false}},\"subject\":{\"edit\":{\"label\":\"subject\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"subject\",\"searchable\":true,\"sortable\":true}},\"properties\":{\"edit\":{\"label\":\"properties\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"properties\",\"searchable\":false,\"sortable\":false}},\"conditions\":{\"edit\":{\"label\":\"conditions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"conditions\",\"searchable\":false,\"sortable\":false}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"action\",\"subject\",\"role\"],\"edit\":[[{\"name\":\"action\",\"size\":6}],[{\"name\":\"actionParameters\",\"size\":12}],[{\"name\":\"subject\",\"size\":6}],[{\"name\":\"properties\",\"size\":12}],[{\"name\":\"conditions\",\"size\":12}],[{\"name\":\"role\",\"size\":6}]]},\"uid\":\"admin::permission\"}','object',NULL,NULL),
(9,'plugin_content_manager_configuration_content_types::admin::user','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"firstname\",\"defaultSortBy\":\"firstname\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"firstname\":{\"edit\":{\"label\":\"firstname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"firstname\",\"searchable\":true,\"sortable\":true}},\"lastname\":{\"edit\":{\"label\":\"lastname\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastname\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"registrationToken\":{\"edit\":{\"label\":\"registrationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"registrationToken\",\"searchable\":true,\"sortable\":true}},\"isActive\":{\"edit\":{\"label\":\"isActive\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"isActive\",\"searchable\":true,\"sortable\":true}},\"roles\":{\"edit\":{\"label\":\"roles\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"roles\",\"searchable\":false,\"sortable\":false}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"preferedLanguage\":{\"edit\":{\"label\":\"preferedLanguage\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"preferedLanguage\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"firstname\",\"lastname\",\"username\"],\"edit\":[[{\"name\":\"firstname\",\"size\":6},{\"name\":\"lastname\",\"size\":6}],[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"isActive\",\"size\":4}],[{\"name\":\"roles\",\"size\":6},{\"name\":\"blocked\",\"size\":4}],[{\"name\":\"preferedLanguage\",\"size\":6}]]},\"uid\":\"admin::user\"}','object',NULL,NULL),
(10,'plugin_content_manager_configuration_content_types::admin::role','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"description\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}],[{\"name\":\"description\",\"size\":6},{\"name\":\"users\",\"size\":6}],[{\"name\":\"permissions\",\"size\":6}]]},\"uid\":\"admin::role\"}','object',NULL,NULL),
(11,'plugin_content_manager_configuration_content_types::admin::api-token','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"lastUsedAt\":{\"edit\":{\"label\":\"lastUsedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastUsedAt\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"expiresAt\":{\"edit\":{\"label\":\"expiresAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"expiresAt\",\"searchable\":true,\"sortable\":true}},\"lifespan\":{\"edit\":{\"label\":\"lifespan\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lifespan\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"accessKey\",\"size\":6}],[{\"name\":\"lastUsedAt\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"expiresAt\",\"size\":6},{\"name\":\"lifespan\",\"size\":4}]]},\"uid\":\"admin::api-token\"}','object',NULL,NULL),
(12,'plugin_content_manager_configuration_content_types::admin::transfer-token','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"accessKey\":{\"edit\":{\"label\":\"accessKey\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"accessKey\",\"searchable\":true,\"sortable\":true}},\"lastUsedAt\":{\"edit\":{\"label\":\"lastUsedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lastUsedAt\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"expiresAt\":{\"edit\":{\"label\":\"expiresAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"expiresAt\",\"searchable\":true,\"sortable\":true}},\"lifespan\":{\"edit\":{\"label\":\"lifespan\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"lifespan\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"accessKey\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"accessKey\",\"size\":6},{\"name\":\"lastUsedAt\",\"size\":6}],[{\"name\":\"permissions\",\"size\":6},{\"name\":\"expiresAt\",\"size\":6}],[{\"name\":\"lifespan\",\"size\":4}]]},\"uid\":\"admin::transfer-token\"}','object',NULL,NULL),
(13,'plugin_content_manager_configuration_content_types::plugin::upload.file','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"alternativeText\":{\"edit\":{\"label\":\"alternativeText\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"alternativeText\",\"searchable\":true,\"sortable\":true}},\"caption\":{\"edit\":{\"label\":\"caption\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"caption\",\"searchable\":true,\"sortable\":true}},\"width\":{\"edit\":{\"label\":\"width\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"width\",\"searchable\":true,\"sortable\":true}},\"height\":{\"edit\":{\"label\":\"height\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"height\",\"searchable\":true,\"sortable\":true}},\"formats\":{\"edit\":{\"label\":\"formats\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"formats\",\"searchable\":false,\"sortable\":false}},\"hash\":{\"edit\":{\"label\":\"hash\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"hash\",\"searchable\":true,\"sortable\":true}},\"ext\":{\"edit\":{\"label\":\"ext\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ext\",\"searchable\":true,\"sortable\":true}},\"mime\":{\"edit\":{\"label\":\"mime\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mime\",\"searchable\":true,\"sortable\":true}},\"size\":{\"edit\":{\"label\":\"size\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"size\",\"searchable\":true,\"sortable\":true}},\"url\":{\"edit\":{\"label\":\"url\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"url\",\"searchable\":true,\"sortable\":true}},\"previewUrl\":{\"edit\":{\"label\":\"previewUrl\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"previewUrl\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"provider_metadata\":{\"edit\":{\"label\":\"provider_metadata\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"provider_metadata\",\"searchable\":false,\"sortable\":false}},\"folder\":{\"edit\":{\"label\":\"folder\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"folder\",\"searchable\":true,\"sortable\":true}},\"folderPath\":{\"edit\":{\"label\":\"folderPath\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"folderPath\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"alternativeText\",\"caption\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"alternativeText\",\"size\":6}],[{\"name\":\"caption\",\"size\":6},{\"name\":\"width\",\"size\":4}],[{\"name\":\"height\",\"size\":4}],[{\"name\":\"formats\",\"size\":12}],[{\"name\":\"hash\",\"size\":6},{\"name\":\"ext\",\"size\":6}],[{\"name\":\"mime\",\"size\":6},{\"name\":\"size\",\"size\":4}],[{\"name\":\"url\",\"size\":6},{\"name\":\"previewUrl\",\"size\":6}],[{\"name\":\"provider\",\"size\":6}],[{\"name\":\"provider_metadata\",\"size\":12}],[{\"name\":\"folder\",\"size\":6},{\"name\":\"folderPath\",\"size\":6}]]},\"uid\":\"plugin::upload.file\"}','object',NULL,NULL),
(14,'plugin_content_manager_configuration_content_types::plugin::i18n.locale','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"code\":{\"edit\":{\"label\":\"code\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"code\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"code\",\"createdAt\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"code\",\"size\":6}]]},\"uid\":\"plugin::i18n.locale\"}','object',NULL,NULL),
(15,'plugin_content_manager_configuration_content_types::plugin::users-permissions.role','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"name\",\"defaultSortBy\":\"name\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"name\":{\"edit\":{\"label\":\"name\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"name\",\"searchable\":true,\"sortable\":true}},\"description\":{\"edit\":{\"label\":\"description\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"description\",\"searchable\":true,\"sortable\":true}},\"type\":{\"edit\":{\"label\":\"type\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"type\",\"searchable\":true,\"sortable\":true}},\"permissions\":{\"edit\":{\"label\":\"permissions\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"action\"},\"list\":{\"label\":\"permissions\",\"searchable\":false,\"sortable\":false}},\"users\":{\"edit\":{\"label\":\"users\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"name\",\"description\",\"type\"],\"edit\":[[{\"name\":\"name\",\"size\":6},{\"name\":\"description\",\"size\":6}],[{\"name\":\"type\",\"size\":6},{\"name\":\"permissions\",\"size\":6}],[{\"name\":\"users\",\"size\":6}]]},\"uid\":\"plugin::users-permissions.role\"}','object',NULL,NULL),
(16,'plugin_content_manager_configuration_content_types::plugin::users-permissions.user','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"username\",\"defaultSortBy\":\"username\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"username\":{\"edit\":{\"label\":\"username\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"username\",\"searchable\":true,\"sortable\":true}},\"email\":{\"edit\":{\"label\":\"email\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"email\",\"searchable\":true,\"sortable\":true}},\"provider\":{\"edit\":{\"label\":\"provider\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"provider\",\"searchable\":true,\"sortable\":true}},\"password\":{\"edit\":{\"label\":\"password\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"password\",\"searchable\":true,\"sortable\":true}},\"resetPasswordToken\":{\"edit\":{\"label\":\"resetPasswordToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"resetPasswordToken\",\"searchable\":true,\"sortable\":true}},\"confirmationToken\":{\"edit\":{\"label\":\"confirmationToken\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"confirmationToken\",\"searchable\":true,\"sortable\":true}},\"confirmed\":{\"edit\":{\"label\":\"confirmed\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"confirmed\",\"searchable\":true,\"sortable\":true}},\"blocked\":{\"edit\":{\"label\":\"blocked\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"blocked\",\"searchable\":true,\"sortable\":true}},\"role\":{\"edit\":{\"label\":\"role\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"name\"},\"list\":{\"label\":\"role\",\"searchable\":true,\"sortable\":true}},\"nomecompleto\":{\"edit\":{\"label\":\"nomecompleto\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"nomecompleto\",\"searchable\":true,\"sortable\":true}},\"cargo\":{\"edit\":{\"label\":\"cargo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"cargo\",\"searchable\":true,\"sortable\":true}},\"nif\":{\"edit\":{\"label\":\"nif\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"nif\",\"searchable\":true,\"sortable\":true}},\"telefone\":{\"edit\":{\"label\":\"telefone\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"telefone\",\"searchable\":true,\"sortable\":true}},\"data_admissao\":{\"edit\":{\"label\":\"data_admissao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"data_admissao\",\"searchable\":true,\"sortable\":true}},\"salario\":{\"edit\":{\"label\":\"salario\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"salario\",\"searchable\":true,\"sortable\":true}},\"foto_perfil\":{\"edit\":{\"label\":\"foto_perfil\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"foto_perfil\",\"searchable\":false,\"sortable\":false}},\"documento\":{\"edit\":{\"label\":\"documento\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"documento\",\"searchable\":true,\"sortable\":true}},\"despesa\":{\"edit\":{\"label\":\"despesa\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"descricao\"},\"list\":{\"label\":\"despesa\",\"searchable\":true,\"sortable\":true}},\"registro_mensals\":{\"edit\":{\"label\":\"registro_mensals\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"observacoes\"},\"list\":{\"label\":\"registro_mensals\",\"searchable\":false,\"sortable\":false}},\"pasta_compartilhamentos\":{\"edit\":{\"label\":\"pasta_compartilhamentos\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"pasta_compartilhamentos\",\"searchable\":false,\"sortable\":false}},\"aprovado_por\":{\"edit\":{\"label\":\"aprovado_por\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"aprovado_por\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"username\",\"email\",\"confirmed\"],\"edit\":[[{\"name\":\"username\",\"size\":6},{\"name\":\"email\",\"size\":6}],[{\"name\":\"password\",\"size\":6},{\"name\":\"confirmed\",\"size\":4}],[{\"name\":\"blocked\",\"size\":4},{\"name\":\"role\",\"size\":6}],[{\"name\":\"nomecompleto\",\"size\":6},{\"name\":\"cargo\",\"size\":6}],[{\"name\":\"nif\",\"size\":6},{\"name\":\"telefone\",\"size\":6}],[{\"name\":\"data_admissao\",\"size\":4},{\"name\":\"salario\",\"size\":4}],[{\"name\":\"foto_perfil\",\"size\":6},{\"name\":\"documento\",\"size\":6}],[{\"name\":\"despesa\",\"size\":6},{\"name\":\"registro_mensals\",\"size\":6}],[{\"name\":\"pasta_compartilhamentos\",\"size\":6},{\"name\":\"aprovado_por\",\"size\":6}]]},\"uid\":\"plugin::users-permissions.user\"}','object',NULL,NULL),
(17,'plugin_upload_settings','{\"sizeOptimization\":true,\"responsiveDimensions\":true,\"autoOrientation\":false}','object',NULL,NULL),
(18,'plugin_upload_view_configuration','{\"pageSize\":10,\"sort\":\"createdAt:DESC\"}','object',NULL,NULL),
(19,'plugin_upload_metrics','{\"weeklySchedule\":\"39 17 17 * * 4\",\"lastWeeklyUpdate\":1753373859034}','object',NULL,NULL),
(20,'plugin_users-permissions_grant','{\"email\":{\"icon\":\"envelope\",\"enabled\":true},\"discord\":{\"icon\":\"discord\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/discord/callback\",\"scope\":[\"identify\",\"email\"]},\"facebook\":{\"icon\":\"facebook-square\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/facebook/callback\",\"scope\":[\"email\"]},\"google\":{\"icon\":\"google\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/google/callback\",\"scope\":[\"email\"]},\"github\":{\"icon\":\"github\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/github/callback\",\"scope\":[\"user\",\"user:email\"]},\"microsoft\":{\"icon\":\"windows\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/microsoft/callback\",\"scope\":[\"user.read\"]},\"twitter\":{\"icon\":\"twitter\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/twitter/callback\"},\"instagram\":{\"icon\":\"instagram\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/instagram/callback\",\"scope\":[\"user_profile\"]},\"vk\":{\"icon\":\"vk\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/vk/callback\",\"scope\":[\"email\"]},\"twitch\":{\"icon\":\"twitch\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/twitch/callback\",\"scope\":[\"user:read:email\"]},\"linkedin\":{\"icon\":\"linkedin\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callbackUrl\":\"api/auth/linkedin/callback\",\"scope\":[\"r_liteprofile\",\"r_emailaddress\"]},\"cognito\":{\"icon\":\"aws\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my.subdomain.com\",\"callback\":\"api/auth/cognito/callback\",\"scope\":[\"email\",\"openid\",\"profile\"]},\"reddit\":{\"icon\":\"reddit\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/reddit/callback\",\"scope\":[\"identity\"]},\"auth0\":{\"icon\":\"\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"subdomain\":\"my-tenant.eu\",\"callback\":\"api/auth/auth0/callback\",\"scope\":[\"openid\",\"email\",\"profile\"]},\"cas\":{\"icon\":\"book\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/cas/callback\",\"scope\":[\"openid email\"],\"subdomain\":\"my.subdomain.com/cas\"},\"patreon\":{\"icon\":\"\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"callback\":\"api/auth/patreon/callback\",\"scope\":[\"identity\",\"identity[email]\"]},\"keycloak\":{\"icon\":\"\",\"enabled\":false,\"key\":\"\",\"secret\":\"\",\"subdomain\":\"myKeycloakProvider.com/realms/myrealm\",\"callback\":\"api/auth/keycloak/callback\",\"scope\":[\"openid\",\"email\",\"profile\"]}}','object',NULL,NULL),
(21,'plugin_users-permissions_email','{\"reset_password\":{\"display\":\"Email.template.reset_password\",\"icon\":\"sync\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Reset password\",\"message\":\"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>\"}},\"email_confirmation\":{\"display\":\"Email.template.email_confirmation\",\"icon\":\"check-square\",\"options\":{\"from\":{\"name\":\"Administration Panel\",\"email\":\"no-reply@strapi.io\"},\"response_email\":\"\",\"object\":\"Account confirmation\",\"message\":\"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>\"}}}','object',NULL,NULL),
(22,'plugin_users-permissions_advanced','{\"unique_email\":true,\"allow_register\":true,\"email_confirmation\":false,\"email_reset_password\":null,\"email_confirmation_redirection\":null,\"default_role\":\"authenticated\"}','object',NULL,NULL),
(23,'plugin_i18n_default_locale','\"en\"','string',NULL,NULL),
(24,'core_admin_auth','{\"providers\":{\"autoRegister\":false,\"defaultRole\":null,\"ssoLockedRoles\":null}}','object',NULL,NULL),
(29,'plugin_content_manager_configuration_content_types::api::documento.documento','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"nome\",\"defaultSortBy\":\"nome\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"nome\":{\"edit\":{\"label\":\"nome\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"nome\",\"searchable\":true,\"sortable\":true}},\"tipo\":{\"edit\":{\"label\":\"tipo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tipo\",\"searchable\":true,\"sortable\":true}},\"arquivo\":{\"edit\":{\"label\":\"arquivo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"arquivo\",\"searchable\":false,\"sortable\":false}},\"users_permissions_user\":{\"edit\":{\"label\":\"users_permissions_user\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users_permissions_user\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"nome\",\"tipo\",\"arquivo\"],\"edit\":[[{\"name\":\"nome\",\"size\":6},{\"name\":\"tipo\",\"size\":6}],[{\"name\":\"arquivo\",\"size\":6},{\"name\":\"users_permissions_user\",\"size\":6}]]},\"uid\":\"api::documento.documento\"}','object',NULL,NULL),
(30,'plugin_content_manager_configuration_content_types::api::despesa.despesa','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"descricao\",\"defaultSortBy\":\"descricao\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"descricao\":{\"edit\":{\"label\":\"descricao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"descricao\",\"searchable\":true,\"sortable\":true}},\"valor\":{\"edit\":{\"label\":\"valor\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"valor\",\"searchable\":true,\"sortable\":true}},\"data_despesa\":{\"edit\":{\"label\":\"data_despesa\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"data_despesa\",\"searchable\":true,\"sortable\":true}},\"categoria\":{\"edit\":{\"label\":\"categoria\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"categoria\",\"searchable\":true,\"sortable\":true}},\"status\":{\"edit\":{\"label\":\"status\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"status\",\"searchable\":true,\"sortable\":true}},\"comprovativo\":{\"edit\":{\"label\":\"comprovativo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"comprovativo\",\"searchable\":false,\"sortable\":false}},\"observacoes\":{\"edit\":{\"label\":\"observacoes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"observacoes\",\"searchable\":true,\"sortable\":true}},\"users_permissions_user\":{\"edit\":{\"label\":\"users_permissions_user\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users_permissions_user\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"descricao\",\"valor\",\"data_despesa\"],\"edit\":[[{\"name\":\"descricao\",\"size\":6},{\"name\":\"valor\",\"size\":4}],[{\"name\":\"data_despesa\",\"size\":4},{\"name\":\"categoria\",\"size\":6}],[{\"name\":\"status\",\"size\":6},{\"name\":\"comprovativo\",\"size\":6}],[{\"name\":\"observacoes\",\"size\":6},{\"name\":\"users_permissions_user\",\"size\":6}]]},\"uid\":\"api::despesa.despesa\"}','object',NULL,NULL),
(31,'plugin_upload_api-folder','{\"id\":1}','object',NULL,NULL),
(33,'plugin_content_manager_configuration_content_types::api::registro-mensal.registro-mensal','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"ano\",\"defaultSortBy\":\"ano\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"mes\":{\"edit\":{\"label\":\"mes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"mes\",\"searchable\":true,\"sortable\":true}},\"horas_extras\":{\"edit\":{\"label\":\"horas_extras\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"horas_extras\",\"searchable\":true,\"sortable\":true}},\"observacoes\":{\"edit\":{\"label\":\"observacoes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"observacoes\",\"searchable\":true,\"sortable\":true}},\"users_permissions_user\":{\"edit\":{\"label\":\"users_permissions_user\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users_permissions_user\",\"searchable\":true,\"sortable\":true}},\"aprovado_por\":{\"edit\":{\"label\":\"aprovado_por\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"aprovado_por\",\"searchable\":true,\"sortable\":true}},\"data_aprovacao\":{\"edit\":{\"label\":\"data_aprovacao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"data_aprovacao\",\"searchable\":true,\"sortable\":true}},\"horas_normais\":{\"edit\":{\"label\":\"horas_normais\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"horas_normais\",\"searchable\":true,\"sortable\":true}},\"total_horas\":{\"edit\":{\"label\":\"total_horas\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"total_horas\",\"searchable\":true,\"sortable\":true}},\"status\":{\"edit\":{\"label\":\"status\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"status\",\"searchable\":true,\"sortable\":true}},\"ano\":{\"edit\":{\"label\":\"ano\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ano\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"mes\",\"ano\",\"horas_extras\"],\"edit\":[[{\"name\":\"mes\",\"size\":4},{\"name\":\"ano\",\"size\":6}],[{\"name\":\"horas_extras\",\"size\":4},{\"name\":\"observacoes\",\"size\":6}],[{\"name\":\"data_aprovacao\",\"size\":4},{\"name\":\"horas_normais\",\"size\":4},{\"name\":\"total_horas\",\"size\":4}],[{\"name\":\"status\",\"size\":6},{\"name\":\"users_permissions_user\",\"size\":6}],[{\"name\":\"aprovado_por\",\"size\":6}]]},\"uid\":\"api::registro-mensal.registro-mensal\"}','object',NULL,NULL),
(34,'plugin_content_manager_configuration_content_types::api::arquivo-compartilhado.arquivo-compartilhado','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"nome\",\"defaultSortBy\":\"nome\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"nome\":{\"edit\":{\"label\":\"nome\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"nome\",\"searchable\":true,\"sortable\":true}},\"tipo\":{\"edit\":{\"label\":\"tipo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tipo\",\"searchable\":true,\"sortable\":true}},\"tamanho\":{\"edit\":{\"label\":\"tamanho\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tamanho\",\"searchable\":true,\"sortable\":true}},\"descricao\":{\"edit\":{\"label\":\"descricao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"descricao\",\"searchable\":true,\"sortable\":true}},\"categoria\":{\"edit\":{\"label\":\"categoria\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"categoria\",\"searchable\":true,\"sortable\":true}},\"publico\":{\"edit\":{\"label\":\"publico\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"publico\",\"searchable\":true,\"sortable\":true}},\"downloads\":{\"edit\":{\"label\":\"downloads\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"downloads\",\"searchable\":true,\"sortable\":true}},\"arquivo\":{\"edit\":{\"label\":\"arquivo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"arquivo\",\"searchable\":false,\"sortable\":false}},\"users_permissions_user\":{\"edit\":{\"label\":\"users_permissions_user\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"users_permissions_user\",\"searchable\":true,\"sortable\":true}},\"pasta\":{\"edit\":{\"label\":\"pasta\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"pasta\",\"searchable\":true,\"sortable\":true}},\"tags\":{\"edit\":{\"label\":\"tags\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"tags\",\"searchable\":true,\"sortable\":true}},\"versao\":{\"edit\":{\"label\":\"versao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"versao\",\"searchable\":true,\"sortable\":true}},\"arquivo_original\":{\"edit\":{\"label\":\"arquivo_original\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"arquivo_original\",\"searchable\":true,\"sortable\":true}},\"arquivo_compartilhados\":{\"edit\":{\"label\":\"arquivo_compartilhados\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"arquivo_compartilhados\",\"searchable\":false,\"sortable\":false}},\"aprovado\":{\"edit\":{\"label\":\"aprovado\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"aprovado\",\"searchable\":true,\"sortable\":true}},\"data_aprovacao\":{\"edit\":{\"label\":\"data_aprovacao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"data_aprovacao\",\"searchable\":true,\"sortable\":true}},\"favorito\":{\"edit\":{\"label\":\"favorito\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"favorito\",\"searchable\":true,\"sortable\":true}},\"visualizacoes\":{\"edit\":{\"label\":\"visualizacoes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"visualizacoes\",\"searchable\":true,\"sortable\":true}},\"ultimo_acesso\":{\"edit\":{\"label\":\"ultimo_acesso\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ultimo_acesso\",\"searchable\":true,\"sortable\":true}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"nome\",\"tipo\",\"tamanho\"],\"edit\":[[{\"name\":\"nome\",\"size\":6},{\"name\":\"tipo\",\"size\":6}],[{\"name\":\"tamanho\",\"size\":4},{\"name\":\"descricao\",\"size\":6}],[{\"name\":\"categoria\",\"size\":6},{\"name\":\"publico\",\"size\":4}],[{\"name\":\"downloads\",\"size\":4},{\"name\":\"arquivo\",\"size\":6}],[{\"name\":\"users_permissions_user\",\"size\":6},{\"name\":\"pasta\",\"size\":6}],[{\"name\":\"tags\",\"size\":6},{\"name\":\"versao\",\"size\":6}],[{\"name\":\"arquivo_original\",\"size\":6},{\"name\":\"arquivo_compartilhados\",\"size\":6}],[{\"name\":\"aprovado\",\"size\":4},{\"name\":\"data_aprovacao\",\"size\":4},{\"name\":\"favorito\",\"size\":4}],[{\"name\":\"visualizacoes\",\"size\":4},{\"name\":\"ultimo_acesso\",\"size\":4}]]},\"uid\":\"api::arquivo-compartilhado.arquivo-compartilhado\"}','object',NULL,NULL),
(35,'plugin_content_manager_configuration_content_types::api::pasta-compartilhamento.pasta-compartilhamento','{\"settings\":{\"bulkable\":true,\"filterable\":true,\"searchable\":true,\"pageSize\":10,\"mainField\":\"nome\",\"defaultSortBy\":\"nome\",\"defaultSortOrder\":\"ASC\"},\"metadatas\":{\"id\":{\"edit\":{},\"list\":{\"label\":\"id\",\"searchable\":true,\"sortable\":true}},\"nome\":{\"edit\":{\"label\":\"nome\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"nome\",\"searchable\":true,\"sortable\":true}},\"descricao\":{\"edit\":{\"label\":\"descricao\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"descricao\",\"searchable\":true,\"sortable\":true}},\"cor\":{\"edit\":{\"label\":\"cor\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"cor\",\"searchable\":true,\"sortable\":true}},\"icone\":{\"edit\":{\"label\":\"icone\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"icone\",\"searchable\":true,\"sortable\":true}},\"pasta_pai\":{\"edit\":{\"label\":\"pasta_pai\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"pasta_pai\",\"searchable\":true,\"sortable\":true}},\"usuario_proprietario\":{\"edit\":{\"label\":\"usuario_proprietario\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"username\"},\"list\":{\"label\":\"usuario_proprietario\",\"searchable\":true,\"sortable\":true}},\"publico\":{\"edit\":{\"label\":\"publico\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"publico\",\"searchable\":true,\"sortable\":true}},\"permissoes\":{\"edit\":{\"label\":\"permissoes\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"permissoes\",\"searchable\":false,\"sortable\":false}},\"ordem\":{\"edit\":{\"label\":\"ordem\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ordem\",\"searchable\":true,\"sortable\":true}},\"ativo\":{\"edit\":{\"label\":\"ativo\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true},\"list\":{\"label\":\"ativo\",\"searchable\":true,\"sortable\":true}},\"arquivo_compartilhados\":{\"edit\":{\"label\":\"arquivo_compartilhados\",\"description\":\"\",\"placeholder\":\"\",\"visible\":true,\"editable\":true,\"mainField\":\"nome\"},\"list\":{\"label\":\"arquivo_compartilhados\",\"searchable\":false,\"sortable\":false}},\"createdAt\":{\"edit\":{\"label\":\"createdAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"createdAt\",\"searchable\":true,\"sortable\":true}},\"updatedAt\":{\"edit\":{\"label\":\"updatedAt\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true},\"list\":{\"label\":\"updatedAt\",\"searchable\":true,\"sortable\":true}},\"createdBy\":{\"edit\":{\"label\":\"createdBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"createdBy\",\"searchable\":true,\"sortable\":true}},\"updatedBy\":{\"edit\":{\"label\":\"updatedBy\",\"description\":\"\",\"placeholder\":\"\",\"visible\":false,\"editable\":true,\"mainField\":\"firstname\"},\"list\":{\"label\":\"updatedBy\",\"searchable\":true,\"sortable\":true}}},\"layouts\":{\"list\":[\"id\",\"nome\",\"descricao\",\"cor\"],\"edit\":[[{\"name\":\"nome\",\"size\":6},{\"name\":\"descricao\",\"size\":6}],[{\"name\":\"cor\",\"size\":6},{\"name\":\"icone\",\"size\":6}],[{\"name\":\"pasta_pai\",\"size\":6},{\"name\":\"usuario_proprietario\",\"size\":6}],[{\"name\":\"publico\",\"size\":4}],[{\"name\":\"permissoes\",\"size\":12}],[{\"name\":\"ordem\",\"size\":4},{\"name\":\"ativo\",\"size\":4}],[{\"name\":\"arquivo_compartilhados\",\"size\":6}]]},\"uid\":\"api::pasta-compartilhamento.pasta-compartilhamento\"}','object',NULL,NULL);
/*!40000 ALTER TABLE `strapi_core_store_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_database_schema`
--

DROP TABLE IF EXISTS `strapi_database_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_database_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `schema` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`schema`)),
  `time` datetime DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_database_schema`
--

LOCK TABLES `strapi_database_schema` WRITE;
/*!40000 ALTER TABLE `strapi_database_schema` DISABLE KEYS */;
INSERT INTO `strapi_database_schema` VALUES
(25,'{\"tables\":[{\"name\":\"strapi_core_store_settings\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"key\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"value\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"environment\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tag\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"strapi_webhooks\",\"indexes\":[],\"foreignKeys\":[],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"url\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"headers\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"events\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"enabled\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false}]},{\"name\":\"admin_permissions\",\"indexes\":[{\"name\":\"admin_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"action_parameters\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"subject\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"properties\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"conditions\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_users\",\"indexes\":[{\"name\":\"admin_users_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_users_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"firstname\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"lastname\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"username\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"email\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"password\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"reset_password_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"registration_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"is_active\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"blocked\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"prefered_language\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_roles\",\"indexes\":[{\"name\":\"admin_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"admin_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"admin_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"admin_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"code\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_api_tokens\",\"indexes\":[{\"name\":\"strapi_api_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_api_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_api_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_api_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"access_key\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"last_used_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"expires_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"lifespan\",\"type\":\"bigInteger\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_api_token_permissions\",\"indexes\":[{\"name\":\"strapi_api_token_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_api_token_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_api_token_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_api_token_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_transfer_tokens\",\"indexes\":[{\"name\":\"strapi_transfer_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_transfer_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_transfer_tokens_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_transfer_tokens_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"access_key\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"last_used_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"expires_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"lifespan\",\"type\":\"bigInteger\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_transfer_token_permissions\",\"indexes\":[{\"name\":\"strapi_transfer_token_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_transfer_token_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_transfer_token_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_transfer_token_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files\",\"indexes\":[{\"name\":\"upload_files_folder_path_index\",\"columns\":[\"folder_path\"],\"type\":null},{\"name\":\"upload_files_created_at_index\",\"columns\":[\"created_at\"],\"type\":null},{\"name\":\"upload_files_updated_at_index\",\"columns\":[\"updated_at\"],\"type\":null},{\"name\":\"upload_files_name_index\",\"columns\":[\"name\"],\"type\":null},{\"name\":\"upload_files_size_index\",\"columns\":[\"size\"],\"type\":null},{\"name\":\"upload_files_ext_index\",\"columns\":[\"ext\"],\"type\":null},{\"name\":\"files_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"files_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"files_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"files_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"alternative_text\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"caption\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"width\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"height\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"formats\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"hash\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ext\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"mime\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"size\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"url\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"preview_url\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider_metadata\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"folder_path\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"upload_folders\",\"indexes\":[{\"name\":\"upload_folders_path_id_index\",\"columns\":[\"path_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_path_index\",\"columns\":[\"path\"],\"type\":\"unique\"},{\"name\":\"upload_folders_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"upload_folders_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"upload_folders_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"upload_folders_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"path_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"path\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_releases\",\"indexes\":[{\"name\":\"strapi_releases_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_releases_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_releases_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_releases_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"released_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"scheduled_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"timezone\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"status\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_release_actions\",\"indexes\":[{\"name\":\"strapi_release_actions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"strapi_release_actions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"strapi_release_actions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"strapi_release_actions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"target_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"target_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"content_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"locale\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"is_entry_valid\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_permissions\",\"indexes\":[{\"name\":\"up_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_permissions_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_permissions_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"action\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_roles\",\"indexes\":[{\"name\":\"up_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_roles_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_roles_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"description\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_users\",\"indexes\":[{\"name\":\"up_users_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"up_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"up_users_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"up_users_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"username\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"email\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"provider\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"password\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"reset_password_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"confirmation_token\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"confirmed\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"blocked\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"nomecompleto\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"cargo\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"nif\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"telefone\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"data_admissao\",\"type\":\"date\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"salario\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"i18n_locale\",\"indexes\":[{\"name\":\"i18n_locale_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"i18n_locale_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"i18n_locale_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"i18n_locale_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"name\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"code\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"arquivo_compartilhados\",\"indexes\":[{\"name\":\"arquivo_compartilhados_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"arquivo_compartilhados_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"arquivo_compartilhados_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"arquivo_compartilhados_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"nome\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tipo\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tamanho\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"descricao\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"categoria\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"publico\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"downloads\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tags\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"versao\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"aprovado\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"data_aprovacao\",\"type\":\"date\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"favorito\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"visualizacoes\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ultimo_acesso\",\"type\":\"date\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"despesas\",\"indexes\":[{\"name\":\"despesas_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"despesas_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"despesas_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"despesas_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"descricao\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"valor\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"data_despesa\",\"type\":\"date\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"categoria\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"status\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"observacoes\",\"type\":\"text\",\"args\":[\"longtext\"],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"documentos\",\"indexes\":[{\"name\":\"documentos_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"documentos_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"documentos_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"documentos_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"nome\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"tipo\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"pasta_compartilhamentos\",\"indexes\":[{\"name\":\"pasta_compartilhamentos_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"pasta_compartilhamentos_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"pasta_compartilhamentos_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"pasta_compartilhamentos_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"nome\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"descricao\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"cor\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"icone\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"publico\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"permissoes\",\"type\":\"jsonb\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ordem\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ativo\",\"type\":\"boolean\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"registro_mensals\",\"indexes\":[{\"name\":\"registro_mensals_created_by_id_fk\",\"columns\":[\"created_by_id\"]},{\"name\":\"registro_mensals_updated_by_id_fk\",\"columns\":[\"updated_by_id\"]}],\"foreignKeys\":[{\"name\":\"registro_mensals_created_by_id_fk\",\"columns\":[\"created_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"},{\"name\":\"registro_mensals_updated_by_id_fk\",\"columns\":[\"updated_by_id\"],\"referencedTable\":\"admin_users\",\"referencedColumns\":[\"id\"],\"onDelete\":\"SET NULL\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"mes\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"horas_extras\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"observacoes\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"data_aprovacao\",\"type\":\"date\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"horas_normais\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"total_horas\",\"type\":\"decimal\",\"args\":[10,2],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"status\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"ano\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"updated_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"published_at\",\"type\":\"datetime\",\"args\":[{\"useTz\":false,\"precision\":6}],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"created_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"updated_by_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_permissions_role_links\",\"indexes\":[{\"name\":\"admin_permissions_role_links_fk\",\"columns\":[\"permission_id\"]},{\"name\":\"admin_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"]},{\"name\":\"admin_permissions_role_links_unique\",\"columns\":[\"permission_id\",\"role_id\"],\"type\":\"unique\"},{\"name\":\"admin_permissions_role_links_order_inv_fk\",\"columns\":[\"permission_order\"]}],\"foreignKeys\":[{\"name\":\"admin_permissions_role_links_fk\",\"columns\":[\"permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"admin_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"permission_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"admin_users_roles_links\",\"indexes\":[{\"name\":\"admin_users_roles_links_fk\",\"columns\":[\"user_id\"]},{\"name\":\"admin_users_roles_links_inv_fk\",\"columns\":[\"role_id\"]},{\"name\":\"admin_users_roles_links_unique\",\"columns\":[\"user_id\",\"role_id\"],\"type\":\"unique\"},{\"name\":\"admin_users_roles_links_order_fk\",\"columns\":[\"role_order\"]},{\"name\":\"admin_users_roles_links_order_inv_fk\",\"columns\":[\"user_order\"]}],\"foreignKeys\":[{\"name\":\"admin_users_roles_links_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_users\",\"onDelete\":\"CASCADE\"},{\"name\":\"admin_users_roles_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"admin_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_api_token_permissions_token_links\",\"indexes\":[{\"name\":\"strapi_api_token_permissions_token_links_fk\",\"columns\":[\"api_token_permission_id\"]},{\"name\":\"strapi_api_token_permissions_token_links_inv_fk\",\"columns\":[\"api_token_id\"]},{\"name\":\"strapi_api_token_permissions_token_links_unique\",\"columns\":[\"api_token_permission_id\",\"api_token_id\"],\"type\":\"unique\"},{\"name\":\"strapi_api_token_permissions_token_links_order_inv_fk\",\"columns\":[\"api_token_permission_order\"]}],\"foreignKeys\":[{\"name\":\"strapi_api_token_permissions_token_links_fk\",\"columns\":[\"api_token_permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_api_token_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"strapi_api_token_permissions_token_links_inv_fk\",\"columns\":[\"api_token_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_api_tokens\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"api_token_permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"api_token_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"api_token_permission_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_transfer_token_permissions_token_links\",\"indexes\":[{\"name\":\"strapi_transfer_token_permissions_token_links_fk\",\"columns\":[\"transfer_token_permission_id\"]},{\"name\":\"strapi_transfer_token_permissions_token_links_inv_fk\",\"columns\":[\"transfer_token_id\"]},{\"name\":\"strapi_transfer_token_permissions_token_links_unique\",\"columns\":[\"transfer_token_permission_id\",\"transfer_token_id\"],\"type\":\"unique\"},{\"name\":\"strapi_transfer_token_permissions_token_links_order_inv_fk\",\"columns\":[\"transfer_token_permission_order\"]}],\"foreignKeys\":[{\"name\":\"strapi_transfer_token_permissions_token_links_fk\",\"columns\":[\"transfer_token_permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_transfer_token_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"strapi_transfer_token_permissions_token_links_inv_fk\",\"columns\":[\"transfer_token_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_transfer_tokens\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"transfer_token_permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"transfer_token_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"transfer_token_permission_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files_related_morphs\",\"indexes\":[{\"name\":\"files_related_morphs_fk\",\"columns\":[\"file_id\"]},{\"name\":\"files_related_morphs_order_index\",\"columns\":[\"order\"]},{\"name\":\"files_related_morphs_id_column_index\",\"columns\":[\"related_id\"]}],\"foreignKeys\":[{\"name\":\"files_related_morphs_fk\",\"columns\":[\"file_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"files\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"file_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"related_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"related_type\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"field\",\"type\":\"string\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":false},{\"name\":\"order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"files_folder_links\",\"indexes\":[{\"name\":\"files_folder_links_fk\",\"columns\":[\"file_id\"]},{\"name\":\"files_folder_links_inv_fk\",\"columns\":[\"folder_id\"]},{\"name\":\"files_folder_links_unique\",\"columns\":[\"file_id\",\"folder_id\"],\"type\":\"unique\"},{\"name\":\"files_folder_links_order_inv_fk\",\"columns\":[\"file_order\"]}],\"foreignKeys\":[{\"name\":\"files_folder_links_fk\",\"columns\":[\"file_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"files\",\"onDelete\":\"CASCADE\"},{\"name\":\"files_folder_links_inv_fk\",\"columns\":[\"folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"file_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"file_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"upload_folders_parent_links\",\"indexes\":[{\"name\":\"upload_folders_parent_links_fk\",\"columns\":[\"folder_id\"]},{\"name\":\"upload_folders_parent_links_inv_fk\",\"columns\":[\"inv_folder_id\"]},{\"name\":\"upload_folders_parent_links_unique\",\"columns\":[\"folder_id\",\"inv_folder_id\"],\"type\":\"unique\"},{\"name\":\"upload_folders_parent_links_order_inv_fk\",\"columns\":[\"folder_order\"]}],\"foreignKeys\":[{\"name\":\"upload_folders_parent_links_fk\",\"columns\":[\"folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"},{\"name\":\"upload_folders_parent_links_inv_fk\",\"columns\":[\"inv_folder_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"upload_folders\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"inv_folder_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"folder_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"strapi_release_actions_release_links\",\"indexes\":[{\"name\":\"strapi_release_actions_release_links_fk\",\"columns\":[\"release_action_id\"]},{\"name\":\"strapi_release_actions_release_links_inv_fk\",\"columns\":[\"release_id\"]},{\"name\":\"strapi_release_actions_release_links_unique\",\"columns\":[\"release_action_id\",\"release_id\"],\"type\":\"unique\"},{\"name\":\"strapi_release_actions_release_links_order_inv_fk\",\"columns\":[\"release_action_order\"]}],\"foreignKeys\":[{\"name\":\"strapi_release_actions_release_links_fk\",\"columns\":[\"release_action_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_release_actions\",\"onDelete\":\"CASCADE\"},{\"name\":\"strapi_release_actions_release_links_inv_fk\",\"columns\":[\"release_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"strapi_releases\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"release_action_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"release_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"release_action_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_permissions_role_links\",\"indexes\":[{\"name\":\"up_permissions_role_links_fk\",\"columns\":[\"permission_id\"]},{\"name\":\"up_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"]},{\"name\":\"up_permissions_role_links_unique\",\"columns\":[\"permission_id\",\"role_id\"],\"type\":\"unique\"},{\"name\":\"up_permissions_role_links_order_inv_fk\",\"columns\":[\"permission_order\"]}],\"foreignKeys\":[{\"name\":\"up_permissions_role_links_fk\",\"columns\":[\"permission_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_permissions\",\"onDelete\":\"CASCADE\"},{\"name\":\"up_permissions_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"permission_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"permission_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"up_users_role_links\",\"indexes\":[{\"name\":\"up_users_role_links_fk\",\"columns\":[\"user_id\"]},{\"name\":\"up_users_role_links_inv_fk\",\"columns\":[\"role_id\"]},{\"name\":\"up_users_role_links_unique\",\"columns\":[\"user_id\",\"role_id\"],\"type\":\"unique\"},{\"name\":\"up_users_role_links_order_inv_fk\",\"columns\":[\"user_order\"]}],\"foreignKeys\":[{\"name\":\"up_users_role_links_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"},{\"name\":\"up_users_role_links_inv_fk\",\"columns\":[\"role_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_roles\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"role_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"arquivo_compartilhados_users_permissions_user_links\",\"indexes\":[{\"name\":\"arquivo_compartilhados_users_permissions_user_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"]},{\"name\":\"arquivo_compartilhados_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"arquivo_compartilhados_users_permissions_user_links_unique\",\"columns\":[\"arquivo_compartilhado_id\",\"user_id\"],\"type\":\"unique\"},{\"name\":\"arquivo_compartilhados_users_permissions_user_links_order_inv_fk\",\"columns\":[\"arquivo_compartilhado_order\"]}],\"foreignKeys\":[{\"name\":\"arquivo_compartilhados_users_permissions_user_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"arquivo_compartilhados\",\"onDelete\":\"CASCADE\"},{\"name\":\"arquivo_compartilhados_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"arquivo_compartilhado_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"arquivo_compartilhado_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"arquivo_compartilhados_pasta_links\",\"indexes\":[{\"name\":\"arquivo_compartilhados_pasta_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"]},{\"name\":\"arquivo_compartilhados_pasta_links_inv_fk\",\"columns\":[\"pasta_compartilhamento_id\"]},{\"name\":\"arquivo_compartilhados_pasta_links_unique\",\"columns\":[\"arquivo_compartilhado_id\",\"pasta_compartilhamento_id\"],\"type\":\"unique\"},{\"name\":\"arquivo_compartilhados_pasta_links_order_inv_fk\",\"columns\":[\"arquivo_compartilhado_order\"]}],\"foreignKeys\":[{\"name\":\"arquivo_compartilhados_pasta_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"arquivo_compartilhados\",\"onDelete\":\"CASCADE\"},{\"name\":\"arquivo_compartilhados_pasta_links_inv_fk\",\"columns\":[\"pasta_compartilhamento_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"pasta_compartilhamentos\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"arquivo_compartilhado_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"pasta_compartilhamento_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"arquivo_compartilhado_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"arquivo_compartilhados_arquivo_original_links\",\"indexes\":[{\"name\":\"arquivo_compartilhados_arquivo_original_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"]},{\"name\":\"arquivo_compartilhados_arquivo_original_links_inv_fk\",\"columns\":[\"inv_arquivo_compartilhado_id\"]},{\"name\":\"arquivo_compartilhados_arquivo_original_links_unique\",\"columns\":[\"arquivo_compartilhado_id\",\"inv_arquivo_compartilhado_id\"],\"type\":\"unique\"},{\"name\":\"arquivo_compartilhados_arquivo_original_links_order_inv_fk\",\"columns\":[\"arquivo_compartilhado_order\"]}],\"foreignKeys\":[{\"name\":\"arquivo_compartilhados_arquivo_original_links_fk\",\"columns\":[\"arquivo_compartilhado_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"arquivo_compartilhados\",\"onDelete\":\"CASCADE\"},{\"name\":\"arquivo_compartilhados_arquivo_original_links_inv_fk\",\"columns\":[\"inv_arquivo_compartilhado_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"arquivo_compartilhados\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"arquivo_compartilhado_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"inv_arquivo_compartilhado_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"arquivo_compartilhado_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"despesas_users_permissions_user_links\",\"indexes\":[{\"name\":\"despesas_users_permissions_user_links_fk\",\"columns\":[\"despesa_id\"]},{\"name\":\"despesas_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"despesas_users_permissions_user_links_unique\",\"columns\":[\"despesa_id\",\"user_id\"],\"type\":\"unique\"}],\"foreignKeys\":[{\"name\":\"despesas_users_permissions_user_links_fk\",\"columns\":[\"despesa_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"despesas\",\"onDelete\":\"CASCADE\"},{\"name\":\"despesas_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"despesa_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"documentos_users_permissions_user_links\",\"indexes\":[{\"name\":\"documentos_users_permissions_user_links_fk\",\"columns\":[\"documento_id\"]},{\"name\":\"documentos_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"documentos_users_permissions_user_links_unique\",\"columns\":[\"documento_id\",\"user_id\"],\"type\":\"unique\"}],\"foreignKeys\":[{\"name\":\"documentos_users_permissions_user_links_fk\",\"columns\":[\"documento_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"documentos\",\"onDelete\":\"CASCADE\"},{\"name\":\"documentos_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"documento_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"pasta_compartilhamentos_pasta_pai_links\",\"indexes\":[{\"name\":\"pasta_compartilhamentos_pasta_pai_links_fk\",\"columns\":[\"pasta_compartilhamento_id\"]},{\"name\":\"pasta_compartilhamentos_pasta_pai_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"pasta_compartilhamentos_pasta_pai_links_unique\",\"columns\":[\"pasta_compartilhamento_id\",\"user_id\"],\"type\":\"unique\"},{\"name\":\"pasta_compartilhamentos_pasta_pai_links_order_inv_fk\",\"columns\":[\"pasta_compartilhamento_order\"]}],\"foreignKeys\":[{\"name\":\"pasta_compartilhamentos_pasta_pai_links_fk\",\"columns\":[\"pasta_compartilhamento_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"pasta_compartilhamentos\",\"onDelete\":\"CASCADE\"},{\"name\":\"pasta_compartilhamentos_pasta_pai_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"pasta_compartilhamento_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"pasta_compartilhamento_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links\",\"indexes\":[{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_fk\",\"columns\":[\"pasta_compartilhamento_id\"]},{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_unique\",\"columns\":[\"pasta_compartilhamento_id\",\"user_id\"],\"type\":\"unique\"},{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_order_inv_fk\",\"columns\":[\"pasta_compartilhamento_order\"]}],\"foreignKeys\":[{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_fk\",\"columns\":[\"pasta_compartilhamento_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"pasta_compartilhamentos\",\"onDelete\":\"CASCADE\"},{\"name\":\"pasta_compartilhamentos_usuario_proprietario_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"pasta_compartilhamento_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"pasta_compartilhamento_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"registro_mensals_users_permissions_user_links\",\"indexes\":[{\"name\":\"registro_mensals_users_permissions_user_links_fk\",\"columns\":[\"registro_mensal_id\"]},{\"name\":\"registro_mensals_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"registro_mensals_users_permissions_user_links_unique\",\"columns\":[\"registro_mensal_id\",\"user_id\"],\"type\":\"unique\"},{\"name\":\"registro_mensals_users_permissions_user_links_order_inv_fk\",\"columns\":[\"registro_mensal_order\"]}],\"foreignKeys\":[{\"name\":\"registro_mensals_users_permissions_user_links_fk\",\"columns\":[\"registro_mensal_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"registro_mensals\",\"onDelete\":\"CASCADE\"},{\"name\":\"registro_mensals_users_permissions_user_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"registro_mensal_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"registro_mensal_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]},{\"name\":\"registro_mensals_aprovado_por_links\",\"indexes\":[{\"name\":\"registro_mensals_aprovado_por_links_fk\",\"columns\":[\"registro_mensal_id\"]},{\"name\":\"registro_mensals_aprovado_por_links_inv_fk\",\"columns\":[\"user_id\"]},{\"name\":\"registro_mensals_aprovado_por_links_unique\",\"columns\":[\"registro_mensal_id\",\"user_id\"],\"type\":\"unique\"},{\"name\":\"registro_mensals_aprovado_por_links_order_inv_fk\",\"columns\":[\"registro_mensal_order\"]}],\"foreignKeys\":[{\"name\":\"registro_mensals_aprovado_por_links_fk\",\"columns\":[\"registro_mensal_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"registro_mensals\",\"onDelete\":\"CASCADE\"},{\"name\":\"registro_mensals_aprovado_por_links_inv_fk\",\"columns\":[\"user_id\"],\"referencedColumns\":[\"id\"],\"referencedTable\":\"up_users\",\"onDelete\":\"CASCADE\"}],\"columns\":[{\"name\":\"id\",\"type\":\"increments\",\"args\":[{\"primary\":true,\"primaryKey\":true}],\"defaultTo\":null,\"notNullable\":true,\"unsigned\":false},{\"name\":\"registro_mensal_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"user_id\",\"type\":\"integer\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true},{\"name\":\"registro_mensal_order\",\"type\":\"double\",\"args\":[],\"defaultTo\":null,\"notNullable\":false,\"unsigned\":true}]}]}','2025-07-30 14:31:38','90a17c4cb822879b69565ae8e487f0b1');
/*!40000 ALTER TABLE `strapi_database_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_migrations`
--

DROP TABLE IF EXISTS `strapi_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_migrations`
--

LOCK TABLES `strapi_migrations` WRITE;
/*!40000 ALTER TABLE `strapi_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_release_actions`
--

DROP TABLE IF EXISTS `strapi_release_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_release_actions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `target_id` int(10) unsigned DEFAULT NULL,
  `target_type` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `locale` varchar(255) DEFAULT NULL,
  `is_entry_valid` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_release_actions_created_by_id_fk` (`created_by_id`),
  KEY `strapi_release_actions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_release_actions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_release_actions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_release_actions`
--

LOCK TABLES `strapi_release_actions` WRITE;
/*!40000 ALTER TABLE `strapi_release_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_release_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_release_actions_release_links`
--

DROP TABLE IF EXISTS `strapi_release_actions_release_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_release_actions_release_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `release_action_id` int(10) unsigned DEFAULT NULL,
  `release_id` int(10) unsigned DEFAULT NULL,
  `release_action_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_release_actions_release_links_unique` (`release_action_id`,`release_id`),
  KEY `strapi_release_actions_release_links_fk` (`release_action_id`),
  KEY `strapi_release_actions_release_links_inv_fk` (`release_id`),
  KEY `strapi_release_actions_release_links_order_inv_fk` (`release_action_order`),
  CONSTRAINT `strapi_release_actions_release_links_fk` FOREIGN KEY (`release_action_id`) REFERENCES `strapi_release_actions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `strapi_release_actions_release_links_inv_fk` FOREIGN KEY (`release_id`) REFERENCES `strapi_releases` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_release_actions_release_links`
--

LOCK TABLES `strapi_release_actions_release_links` WRITE;
/*!40000 ALTER TABLE `strapi_release_actions_release_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_release_actions_release_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_releases`
--

DROP TABLE IF EXISTS `strapi_releases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_releases` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `released_at` datetime(6) DEFAULT NULL,
  `scheduled_at` datetime(6) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_releases_created_by_id_fk` (`created_by_id`),
  KEY `strapi_releases_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_releases_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_releases_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_releases`
--

LOCK TABLES `strapi_releases` WRITE;
/*!40000 ALTER TABLE `strapi_releases` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_releases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_transfer_token_permissions`
--

DROP TABLE IF EXISTS `strapi_transfer_token_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_transfer_token_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_transfer_token_permissions_created_by_id_fk` (`created_by_id`),
  KEY `strapi_transfer_token_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_transfer_token_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_transfer_token_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_transfer_token_permissions`
--

LOCK TABLES `strapi_transfer_token_permissions` WRITE;
/*!40000 ALTER TABLE `strapi_transfer_token_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_transfer_token_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_transfer_token_permissions_token_links`
--

DROP TABLE IF EXISTS `strapi_transfer_token_permissions_token_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_transfer_token_permissions_token_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `transfer_token_permission_id` int(10) unsigned DEFAULT NULL,
  `transfer_token_id` int(10) unsigned DEFAULT NULL,
  `transfer_token_permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strapi_transfer_token_permissions_token_links_unique` (`transfer_token_permission_id`,`transfer_token_id`),
  KEY `strapi_transfer_token_permissions_token_links_fk` (`transfer_token_permission_id`),
  KEY `strapi_transfer_token_permissions_token_links_inv_fk` (`transfer_token_id`),
  KEY `strapi_transfer_token_permissions_token_links_order_inv_fk` (`transfer_token_permission_order`),
  CONSTRAINT `strapi_transfer_token_permissions_token_links_fk` FOREIGN KEY (`transfer_token_permission_id`) REFERENCES `strapi_transfer_token_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `strapi_transfer_token_permissions_token_links_inv_fk` FOREIGN KEY (`transfer_token_id`) REFERENCES `strapi_transfer_tokens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_transfer_token_permissions_token_links`
--

LOCK TABLES `strapi_transfer_token_permissions_token_links` WRITE;
/*!40000 ALTER TABLE `strapi_transfer_token_permissions_token_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_transfer_token_permissions_token_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_transfer_tokens`
--

DROP TABLE IF EXISTS `strapi_transfer_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_transfer_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `access_key` varchar(255) DEFAULT NULL,
  `last_used_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) DEFAULT NULL,
  `lifespan` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `strapi_transfer_tokens_created_by_id_fk` (`created_by_id`),
  KEY `strapi_transfer_tokens_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `strapi_transfer_tokens_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `strapi_transfer_tokens_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_transfer_tokens`
--

LOCK TABLES `strapi_transfer_tokens` WRITE;
/*!40000 ALTER TABLE `strapi_transfer_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_transfer_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `strapi_webhooks`
--

DROP TABLE IF EXISTS `strapi_webhooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strapi_webhooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `url` longtext DEFAULT NULL,
  `headers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`headers`)),
  `events` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`events`)),
  `enabled` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strapi_webhooks`
--

LOCK TABLES `strapi_webhooks` WRITE;
/*!40000 ALTER TABLE `strapi_webhooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `strapi_webhooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_permissions`
--

DROP TABLE IF EXISTS `up_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_permissions_created_by_id_fk` (`created_by_id`),
  KEY `up_permissions_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_permissions_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_permissions_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_permissions`
--

LOCK TABLES `up_permissions` WRITE;
/*!40000 ALTER TABLE `up_permissions` DISABLE KEYS */;
INSERT INTO `up_permissions` VALUES
(1,'plugin::users-permissions.user.me','2025-07-24 16:47:21.580000','2025-07-24 16:47:21.580000',NULL,NULL),
(2,'plugin::users-permissions.auth.changePassword','2025-07-24 16:47:21.580000','2025-07-24 16:47:21.580000',NULL,NULL),
(3,'plugin::users-permissions.auth.callback','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(4,'plugin::users-permissions.auth.connect','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(5,'plugin::users-permissions.auth.resetPassword','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(6,'plugin::users-permissions.auth.forgotPassword','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(7,'plugin::users-permissions.auth.register','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(8,'plugin::users-permissions.auth.emailConfirmation','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(9,'plugin::users-permissions.auth.sendEmailConfirmation','2025-07-24 16:47:21.593000','2025-07-24 16:47:21.593000',NULL,NULL),
(10,'api::despesa.despesa.find','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(11,'api::despesa.despesa.findOne','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(12,'api::despesa.despesa.create','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(13,'api::despesa.despesa.update','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(14,'api::documento.documento.find','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(15,'api::documento.documento.findOne','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(16,'api::documento.documento.create','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(17,'api::documento.documento.update','2025-07-24 17:50:50.782000','2025-07-24 17:50:50.782000',NULL,NULL),
(21,'api::despesa.despesa.find','2025-07-24 18:01:46.129000','2025-07-24 18:01:46.129000',NULL,NULL),
(22,'api::despesa.despesa.findOne','2025-07-24 18:01:46.129000','2025-07-24 18:01:46.129000',NULL,NULL),
(23,'api::documento.documento.find','2025-07-24 18:01:46.129000','2025-07-24 18:01:46.129000',NULL,NULL),
(24,'api::documento.documento.findOne','2025-07-24 18:01:46.129000','2025-07-24 18:01:46.129000',NULL,NULL),
(30,'plugin::upload.content-api.upload','2025-07-25 09:39:33.576000','2025-07-25 09:39:33.576000',NULL,NULL),
(31,'plugin::users-permissions.user.update','2025-07-25 09:39:33.576000','2025-07-25 09:39:33.576000',NULL,NULL),
(32,'plugin::users-permissions.user.find','2025-07-25 09:39:33.576000','2025-07-25 09:39:33.576000',NULL,NULL),
(33,'plugin::users-permissions.user.findOne','2025-07-25 09:39:33.576000','2025-07-25 09:39:33.576000',NULL,NULL),
(34,'plugin::users-permissions.auth.callback','2025-07-25 14:40:26.108000','2025-07-25 14:40:26.108000',NULL,NULL),
(35,'plugin::users-permissions.auth.resetPassword','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(36,'plugin::users-permissions.auth.connect','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(37,'plugin::users-permissions.auth.forgotPassword','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(38,'plugin::users-permissions.auth.register','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(39,'plugin::users-permissions.auth.emailConfirmation','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(40,'plugin::users-permissions.auth.sendEmailConfirmation','2025-07-25 14:43:23.061000','2025-07-25 14:43:23.061000',NULL,NULL),
(43,'api::despesa.despesa.create','2025-07-25 14:44:20.696000','2025-07-25 14:44:20.696000',NULL,NULL),
(44,'api::despesa.despesa.update','2025-07-25 14:44:20.696000','2025-07-25 14:44:20.696000',NULL,NULL),
(45,'plugin::upload.content-api.findOne','2025-07-25 16:42:21.978000','2025-07-25 16:42:21.978000',NULL,NULL),
(46,'plugin::upload.content-api.findOne','2025-07-25 16:42:31.742000','2025-07-25 16:42:31.742000',NULL,NULL),
(47,'plugin::upload.content-api.upload','2025-07-25 16:42:31.742000','2025-07-25 16:42:31.742000',NULL,NULL),
(56,'api::registro-mensal.registro-mensal.find','2025-07-28 15:07:34.402000','2025-07-28 15:07:34.402000',NULL,NULL),
(57,'api::registro-mensal.registro-mensal.findOne','2025-07-28 15:07:34.402000','2025-07-28 15:07:34.402000',NULL,NULL),
(58,'api::registro-mensal.registro-mensal.create','2025-07-28 15:07:34.402000','2025-07-28 15:07:34.402000',NULL,NULL),
(59,'api::registro-mensal.registro-mensal.update','2025-07-28 15:07:34.402000','2025-07-28 15:07:34.402000',NULL,NULL),
(60,'api::registro-mensal.registro-mensal.find','2025-07-28 15:07:46.466000','2025-07-28 15:07:46.466000',NULL,NULL),
(61,'api::registro-mensal.registro-mensal.findOne','2025-07-28 15:07:46.466000','2025-07-28 15:07:46.466000',NULL,NULL),
(62,'api::arquivo-compartilhado.arquivo-compartilhado.find','2025-07-30 11:12:44.047000','2025-07-30 11:12:44.047000',NULL,NULL),
(63,'api::arquivo-compartilhado.arquivo-compartilhado.findOne','2025-07-30 11:12:44.047000','2025-07-30 11:12:44.047000',NULL,NULL),
(64,'api::arquivo-compartilhado.arquivo-compartilhado.create','2025-07-30 11:12:44.047000','2025-07-30 11:12:44.047000',NULL,NULL),
(65,'api::arquivo-compartilhado.arquivo-compartilhado.update','2025-07-30 11:12:44.047000','2025-07-30 11:12:44.047000',NULL,NULL),
(66,'api::arquivo-compartilhado.arquivo-compartilhado.delete','2025-07-30 11:12:44.047000','2025-07-30 11:12:44.047000',NULL,NULL),
(67,'api::arquivo-compartilhado.arquivo-compartilhado.find','2025-07-30 11:12:50.683000','2025-07-30 11:12:50.683000',NULL,NULL),
(68,'api::arquivo-compartilhado.arquivo-compartilhado.findOne','2025-07-30 11:12:50.683000','2025-07-30 11:12:50.683000',NULL,NULL),
(69,'api::arquivo-compartilhado.arquivo-compartilhado.update','2025-07-30 11:12:50.683000','2025-07-30 11:12:50.683000',NULL,NULL),
(70,'api::arquivo-compartilhado.arquivo-compartilhado.create','2025-07-30 11:12:50.683000','2025-07-30 11:12:50.683000',NULL,NULL),
(72,'api::pasta-compartilhamento.pasta-compartilhamento.find','2025-07-30 14:42:26.661000','2025-07-30 14:42:26.661000',NULL,NULL),
(73,'api::pasta-compartilhamento.pasta-compartilhamento.findOne','2025-07-30 14:42:26.662000','2025-07-30 14:42:26.662000',NULL,NULL),
(74,'api::pasta-compartilhamento.pasta-compartilhamento.create','2025-07-30 14:42:26.662000','2025-07-30 14:42:26.662000',NULL,NULL),
(75,'api::pasta-compartilhamento.pasta-compartilhamento.update','2025-07-30 14:42:26.662000','2025-07-30 14:42:26.662000',NULL,NULL),
(76,'api::pasta-compartilhamento.pasta-compartilhamento.delete','2025-07-30 14:42:26.662000','2025-07-30 14:42:26.662000',NULL,NULL),
(77,'api::pasta-compartilhamento.pasta-compartilhamento.find','2025-07-30 14:42:35.791000','2025-07-30 14:42:35.791000',NULL,NULL),
(78,'api::pasta-compartilhamento.pasta-compartilhamento.findOne','2025-07-30 14:42:35.791000','2025-07-30 14:42:35.791000',NULL,NULL),
(79,'api::pasta-compartilhamento.pasta-compartilhamento.create','2025-07-30 14:42:35.791000','2025-07-30 14:42:35.791000',NULL,NULL),
(80,'api::pasta-compartilhamento.pasta-compartilhamento.update','2025-07-30 14:42:35.791000','2025-07-30 14:42:35.791000',NULL,NULL);
/*!40000 ALTER TABLE `up_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_permissions_role_links`
--

DROP TABLE IF EXISTS `up_permissions_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_permissions_role_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `permission_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `up_permissions_role_links_unique` (`permission_id`,`role_id`),
  KEY `up_permissions_role_links_fk` (`permission_id`),
  KEY `up_permissions_role_links_inv_fk` (`role_id`),
  KEY `up_permissions_role_links_order_inv_fk` (`permission_order`),
  CONSTRAINT `up_permissions_role_links_fk` FOREIGN KEY (`permission_id`) REFERENCES `up_permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_permissions_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_permissions_role_links`
--

LOCK TABLES `up_permissions_role_links` WRITE;
/*!40000 ALTER TABLE `up_permissions_role_links` DISABLE KEYS */;
INSERT INTO `up_permissions_role_links` VALUES
(1,2,1,1),
(2,1,1,1),
(3,3,2,1),
(4,4,2,1),
(5,5,2,1),
(6,6,2,1),
(7,8,2,1),
(8,7,2,1),
(9,9,2,1),
(10,10,1,2),
(11,11,1,2),
(12,13,1,2),
(13,15,1,2),
(14,17,1,2),
(17,12,1,2),
(18,14,1,2),
(19,16,1,2),
(21,21,2,2),
(22,22,2,2),
(23,23,2,2),
(24,24,2,2),
(30,30,1,3),
(31,31,1,3),
(32,32,1,3),
(33,33,1,3),
(34,34,1,4),
(35,35,1,5),
(36,36,1,5),
(37,37,1,5),
(38,38,1,5),
(39,39,1,5),
(40,40,1,5),
(43,43,2,3),
(44,44,2,3),
(45,45,1,6),
(46,46,2,4),
(47,47,2,4),
(56,56,1,7),
(57,57,1,7),
(58,58,1,7),
(59,59,1,7),
(60,60,2,5),
(61,61,2,5),
(62,62,1,8),
(63,64,1,8),
(64,65,1,8),
(65,63,1,8),
(66,66,1,8),
(67,67,2,6),
(68,68,2,6),
(69,70,2,6),
(70,69,2,6),
(72,74,1,9),
(73,72,1,9),
(74,73,1,9),
(75,76,1,9),
(76,75,1,9),
(77,77,2,7),
(78,78,2,7),
(79,79,2,7),
(80,80,2,7);
/*!40000 ALTER TABLE `up_permissions_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_roles`
--

DROP TABLE IF EXISTS `up_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_roles_created_by_id_fk` (`created_by_id`),
  KEY `up_roles_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_roles_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_roles_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_roles`
--

LOCK TABLES `up_roles` WRITE;
/*!40000 ALTER TABLE `up_roles` DISABLE KEYS */;
INSERT INTO `up_roles` VALUES
(1,'Authenticated','Default role given to authenticated user.','authenticated','2025-07-24 16:47:21.569000','2025-07-30 14:42:26.655000',NULL,NULL),
(2,'Public','Default role given to unauthenticated user.','public','2025-07-24 16:47:21.573000','2025-07-30 14:42:35.788000',NULL,NULL);
/*!40000 ALTER TABLE `up_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_users`
--

DROP TABLE IF EXISTS `up_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed` tinyint(1) DEFAULT NULL,
  `blocked` tinyint(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  `nomecompleto` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `nif` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `data_admissao` date DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `up_users_created_by_id_fk` (`created_by_id`),
  KEY `up_users_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `up_users_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `up_users_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users`
--

LOCK TABLES `up_users` WRITE;
/*!40000 ALTER TABLE `up_users` DISABLE KEYS */;
INSERT INTO `up_users` VALUES
(1,'admin','admin@rls.pt','local','$2a$10$Ip31yQ20jU2VAKNlV7sFdetGgA.ch4xf3Yxc9nv4fHfBYZ18hRkti',NULL,NULL,1,0,'2025-07-25 09:42:25.237000','2025-07-28 11:26:54.883000',1,1,'João Silva','Gestor','123456789','912345678','2025-07-10',5000.00),
(2,'danilo','danilo@rls.pt','local','$2a$10$8128uUv8j5JgiwkuLNH2Q.//RRzgaZrlusGwWQ6gLUqzzmulIBdQK',NULL,NULL,1,0,'2025-07-25 15:46:06.151000','2025-07-25 17:27:00.446000',1,1,'Danilo ','Tecnico','1231231231','1231231231','2025-07-02',5000.00);
/*!40000 ALTER TABLE `up_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `up_users_role_links`
--

DROP TABLE IF EXISTS `up_users_role_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `up_users_role_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `role_id` int(10) unsigned DEFAULT NULL,
  `user_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `up_users_role_links_unique` (`user_id`,`role_id`),
  KEY `up_users_role_links_fk` (`user_id`),
  KEY `up_users_role_links_inv_fk` (`role_id`),
  KEY `up_users_role_links_order_inv_fk` (`user_order`),
  CONSTRAINT `up_users_role_links_fk` FOREIGN KEY (`user_id`) REFERENCES `up_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `up_users_role_links_inv_fk` FOREIGN KEY (`role_id`) REFERENCES `up_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `up_users_role_links`
--

LOCK TABLES `up_users_role_links` WRITE;
/*!40000 ALTER TABLE `up_users_role_links` DISABLE KEYS */;
INSERT INTO `up_users_role_links` VALUES
(1,1,1,1),
(2,2,1,2);
/*!40000 ALTER TABLE `up_users_role_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upload_folders`
--

DROP TABLE IF EXISTS `upload_folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upload_folders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path_id` int(11) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `created_by_id` int(10) unsigned DEFAULT NULL,
  `updated_by_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_folders_path_id_index` (`path_id`),
  UNIQUE KEY `upload_folders_path_index` (`path`),
  KEY `upload_folders_created_by_id_fk` (`created_by_id`),
  KEY `upload_folders_updated_by_id_fk` (`updated_by_id`),
  CONSTRAINT `upload_folders_created_by_id_fk` FOREIGN KEY (`created_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `upload_folders_updated_by_id_fk` FOREIGN KEY (`updated_by_id`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_folders`
--

LOCK TABLES `upload_folders` WRITE;
/*!40000 ALTER TABLE `upload_folders` DISABLE KEYS */;
INSERT INTO `upload_folders` VALUES
(1,'API Uploads',1,'/1','2025-07-25 16:36:44.487000','2025-07-25 16:36:44.487000',NULL,NULL),
(3,'Perfil',2,'/2','2025-07-28 11:24:45.947000','2025-07-28 11:24:45.947000',1,1);
/*!40000 ALTER TABLE `upload_folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upload_folders_parent_links`
--

DROP TABLE IF EXISTS `upload_folders_parent_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `upload_folders_parent_links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `folder_id` int(10) unsigned DEFAULT NULL,
  `inv_folder_id` int(10) unsigned DEFAULT NULL,
  `folder_order` double unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `upload_folders_parent_links_unique` (`folder_id`,`inv_folder_id`),
  KEY `upload_folders_parent_links_fk` (`folder_id`),
  KEY `upload_folders_parent_links_inv_fk` (`inv_folder_id`),
  KEY `upload_folders_parent_links_order_inv_fk` (`folder_order`),
  CONSTRAINT `upload_folders_parent_links_fk` FOREIGN KEY (`folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `upload_folders_parent_links_inv_fk` FOREIGN KEY (`inv_folder_id`) REFERENCES `upload_folders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload_folders_parent_links`
--

LOCK TABLES `upload_folders_parent_links` WRITE;
/*!40000 ALTER TABLE `upload_folders_parent_links` DISABLE KEYS */;
/*!40000 ALTER TABLE `upload_folders_parent_links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-07-30 17:05:13
