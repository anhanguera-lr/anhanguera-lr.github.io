<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'anhang49_wp947' );

/** MySQL database username */
define( 'DB_USER', 'anhang49_wp947' );

/** MySQL database password */
define( 'DB_PASSWORD', ']288u.5tSp' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '2ey88gid8lhbn28vg0efhty9be6f0ruu5matbgeknpyzhet79hblyjpjrxnyzzis' );
define( 'SECURE_AUTH_KEY',  'qayfwiprbcfmsamntyxcnaslias6ucqkft5cpazk7zbz4dzphnu2hbrfu2dzuad4' );
define( 'LOGGED_IN_KEY',    '3qlzciyf5fezoxxblw7uyfrffyblq9pwrlwslnrcmv5jnrppxg7gxkm7tyc9qept' );
define( 'NONCE_KEY',        'dln8l4umm23aczpskh6dnzvkbmmva5xuuc2fx75yht6feuzmnqajhqd5frscxexh' );
define( 'AUTH_SALT',        'mhxzrtm01wzrjbhocmuvu1tfn2k70iny0u9nhnedi34emulgo3sofamsfyjblbvl' );
define( 'SECURE_AUTH_SALT', 'bv3ys3nsfuks3n58aybzfqoderjmje7muvd67ch01sbmifjkeiywtc7qydwkug87' );
define( 'LOGGED_IN_SALT',   'krqblfeyng2yffxhrwh1helhkwccvxzkvveedzgrjhmlmwwh9bl6r097hqiwhuzo' );
define( 'NONCE_SALT',       'riiawigl1jqzpflcdus3rxpq4zpavy2r3thntsv0th5trelukvbi0bpfoxskby18' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpu2_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
