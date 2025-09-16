# PVAdmin мини-админка для MODX 2.8

## Обзор
Ну вот я добрался до того чтобы сделать админку для MODX. Реализовал только нужный нам функционал, но при необходимости можно все, не очень сложно, доработать. В gtsAPI теперь есть все необходимые модули. Так же можно использовать эти модули для других проектов.

![PVAdmin Interface](images/resource.png)

## Здесь реализованы:
1. Дерево ресурсов MODX.

![PVAdmin Interface](images/resource.png)

2. Своя галерея файлов.

![file-galery](images\file-galery.png)

3. Дерево файлов.

![file-tree](images\file-tree.png)

4. Управление пользователями.

![users](images\users.png)

## Установка
Перед установкой PVAdmin, установить gtsAPI(getTables и pdoTools, если не встали) и Login.
Установить пакет pvadmin.transport.zip из репозитория пакета.

# Важно
gtsAPI работает на MODX 2.8, mySQL 5.7 или последняя mariadb, php 7.4. На остальных конфигурациях работа не тестировалась.