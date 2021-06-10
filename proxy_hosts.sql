-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server Version:               10.4.15-MariaDB - MariaDB Server
-- Server Betriebssystem:        Linux
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Exportiere Struktur von Tabelle npm.proxy_host
CREATE TABLE IF NOT EXISTS `proxy_host` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_on` datetime NOT NULL,
  `modified_on` datetime NOT NULL,
  `owner_user_id` int(10) unsigned NOT NULL,
  `is_deleted` int(10) unsigned NOT NULL DEFAULT 0,
  `domain_names` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`domain_names`)),
  `forward_host` varchar(255) NOT NULL,
  `forward_port` int(10) unsigned NOT NULL,
  `access_list_id` int(10) unsigned NOT NULL DEFAULT 0,
  `certificate_id` int(10) unsigned NOT NULL DEFAULT 0,
  `ssl_forced` int(10) unsigned NOT NULL DEFAULT 0,
  `caching_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `block_exploits` int(10) unsigned NOT NULL DEFAULT 0,
  `advanced_config` text NOT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meta`)),
  `allow_websocket_upgrade` int(10) unsigned NOT NULL DEFAULT 0,
  `http2_support` int(10) unsigned NOT NULL DEFAULT 0,
  `forward_scheme` varchar(255) NOT NULL DEFAULT 'http',
  `enabled` int(10) unsigned NOT NULL DEFAULT 1,
  `locations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`locations`)),
  `hsts_enabled` int(10) unsigned NOT NULL DEFAULT 0,
  `hsts_subdomains` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=Aria AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 PAGE_CHECKSUM=1;

-- Exportiere Daten aus Tabelle npm.proxy_host: 1 rows
/*!40000 ALTER TABLE `proxy_host` DISABLE KEYS */;
INSERT INTO `proxy_host` (`id`, `created_on`, `modified_on`, `owner_user_id`, `is_deleted`, `domain_names`, `forward_host`, `forward_port`, `access_list_id`, `certificate_id`, `ssl_forced`, `caching_enabled`, `block_exploits`, `advanced_config`, `meta`, `allow_websocket_upgrade`, `http2_support`, `forward_scheme`, `enabled`, `locations`, `hsts_enabled`, `hsts_subdomains`) VALUES
	(1, '2021-06-07 18:04:05', '2021-06-07 18:04:11', 1, 0, '["server.evergene.dev"]', '49.12.113.94', 81, 0, 1, 0, 1, 0, '', '{"letsencrypt_email":"dominik@spitzli.dev","letsencrypt_agree":true,"dns_challenge":false,"nginx_online":true,"nginx_err":null}', 0, 0, 'http', 1, '[]', 0, 0),
	(2, '2021-06-07 18:04:05', '2021-06-07 18:04:11', 1, 0, '["test.evergene.dev"]', '49.12.113.94', 81, 0, 2, 0, 1, 0, '0', '{"letsencrypt_email":"dominik@spitzli.dev","letsencrypt_agree":true,"dns_challenge":false,"nginx_online":true,"nginx_err":null}', 0, 0, 'http', 1, '[]', 0, 0),
	(3, '2021-06-07 18:04:05', '2021-06-07 18:04:11', 1, 0, '["proxy.evergene.dev"]', '49.12.113.94', 81, 0, 3, 0, 1, 0, '0', '{"letsencrypt_email":"dominik@spitzli.dev","letsencrypt_agree":true,"dns_challenge":false,"nginx_online":true,"nginx_err":null}', 0, 0, 'http', 1, '[]', 0, 0),
	(4, '2021-06-07 18:04:05', '2021-06-07 18:04:11', 1, 0, '["node.evergene.dev", "panel.evergene.dev"]', '49.12.113.94', 81, 0, 4, 0, 1, 0, '0', '{"letsencrypt_email":"dominik@spitzli.dev","letsencrypt_agree":true,"dns_challenge":false,"nginx_online":true,"nginx_err":null}', 0, 0, 'http', 1, '[]', 0, 0);
/*!40000 ALTER TABLE `proxy_host` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
