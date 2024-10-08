# Тестовое задания на стажировку в Авито (осень 2024)

Личный кабинет продавца на маркетплейсе, в котором есть возможность управлять своими объявлениями и заказами

## Важно:

Для запуска :

- npm install
- npm run start
  и адрес будет http://localhost:4300

## Стек и технологии:

Webpack, React, Redux, Typescript, MaterialUI, eslint, Prettier

## Этапы работы:

1. Развертка проекта
2. Настройка зависимостей
3. Разбиение на компоненты
4. Взаимодействие компонентов
5. Стили

## Что хорошего сделала:

1. Loadingи при загрузке
2. Раскрывашка на description
3. написала и использовала хук useDebounce при поиске объявлений и при перемещении слайдера цены в заказах
4. Постаралась обработать ошибки
5. Добавила компонент подверждения при удалении
6. свой универсиальный компонент пагинации

## Что планируется:

1. Разделение верстки компонента (ui) и логики (не успела все разделить)
1. Добавление confirmation-modal на все действия, которые этого требуют (сейчас только на удаление объявления)
1. Сделать нормальный дизайн и на все компоненты (сейчас это просто не успела)
1. Валидация форм
1. Авторизация
1. Скрыть заархивированные заказы и отображать при установке соответсвующего чекбокса
1. Получение данных объявления исправить
1. Стили и верстка ()
1. Фильтры на страницу объявлений
1. Переход к соответсвующему заказу из объявления
1. Покрытие тестами

## Возникшие вопросы:

? Что значит завершить заказ<br />

> В проекте завершить заказ значит перевести его статус в 'Archived'

? Нужно ли использовать Redux

> да, приложение небольшое и можно было обойтись в целом без него, но я минимизировала props drilling, отслеживала состояние своих данных и точно знала как они будут изменяться, при тестировании будет легче
