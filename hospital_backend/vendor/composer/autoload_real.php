<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInitcbdd8d07a2fae8f0e4123b3c9cf0df08
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        require __DIR__ . '/platform_check.php';

        spl_autoload_register(array('ComposerAutoloaderInitcbdd8d07a2fae8f0e4123b3c9cf0df08', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInitcbdd8d07a2fae8f0e4123b3c9cf0df08', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInitcbdd8d07a2fae8f0e4123b3c9cf0df08::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
