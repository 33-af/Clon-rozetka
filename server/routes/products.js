const express = require('express');
const router = express.Router();


const products = [
    {
        id: 1,
        title: "Мобільний телефон Samsung Galaxy S24 Ultra 12/512GB",
        isSale: 'Акція',
        rating: 5,
        price: 52999,
        category: "smartphone",
        image: "../../frontend/assets/img/Apple.png",
        brand: "Apple",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 2,
        title: "Мобільний телефон Apple iPhone 15 128GB Pink",
        isSale: 'Акція',
        rating: 4,
        price: 40999,
        category: "smartphone",
        image: "../../assets/img/Apple2.png",
        brand: "Apple",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ", "1ТБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 3,
        title: "Мобільний телефон Apple iPhone 13 128GB Green",
        isSale: 'Акція',
        rating: 5,
        price: 28999,
        category: "smartphone",
        image: "../../assets/img/Apple3.png",
        brand: "Apple",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 4,
        title: "Мобільний телефон Samsung Galaxy A05 4/128GB ",
        isSale: 'Акція',
        rating: 5,
        price: 4699,
        category: "smartphone",
        image: "../../assets/img/galaxy.png",
        brand: "Samsung",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 5,
        title: "Мобільний телефон Samsung Galaxy A55 5G 8/128GB Navy",
        isSale: 'Акція',
        rating: 3,
        price: 3299,
        category: "smartphone",
        image: "../../assets/img/Samsung4.png",
        brand: "Samsung ",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ", "1ТБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 6,
        title: "Мобільний телефон Samsung Galaxy S24 Ultra 12GB/1TB Titanium Yellow",
        isSale: 'Акція',
        rating: 5,
        price: 61599,
        category: "smartphone",
        image: "../../assets/img/Samsung5.png",
        brand: "Samsung ",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 7,
        title: "Мобільний телефон Xiaomi Redmi Note 13 6/128GB Midnight Black",
        isSale: 'Акція',
        rating: 5,
        price: 6999,
        category: "smartphone",
        image: "../../assets/img//Xiaomi.png",
        brand: "Xiaomi",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ", "1ТБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 8,
        title: "Мобільний телефон Xiaomi Redmi Note 13 Pro 8/256GB Midnight Black",
        isSale: 'Акція',
        rating: 5,
        price: 9999,
        category: "smartphone",
        image: "../../assets/img/Xiaomi3.png",
        brand: "Xiaomi",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 9,
        title: "Мобільний телефон Xiaomi Redmi 9A 4/64GB Sky Blue",
        isSale: 'Акція',
        rating: 5,
        price: 3299,
        category: "smartphone",
        image: "../../assets/img/Xiaomi4.png",
        brand: "Xiaomi ",
        info: 'Вбудована память',
        sizes: ["128 ГБ", "256 ГБ", "1ТБ"],
        infoDesc: "Екран (6.6\", Super AMOLED, 2340x1080) / Samsung Exynos 1380 (4 x 2.4 ГГц + 4 x 2.0 ГГц) / основна потрійна камера: 50 Мп + 8 Мп + 5 Мп, фронтальна 13 Мп / RAM 8 ГБ / 256 ГБ вбудованої пам'яті + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / A-GPS / ГЛОНАСС / BDS / підтримка 2х SIM-карт (Nano-SIM) / Android 14 / 5000 мА * год"
    },
    {
        id: 10,
        title: "Телевізор LG 55UT91006LA",
        isSale: 'Акція',
        rating: 5,
        price: 27499,
        category: "TV",
        image: "../../assets/img/LG1.png",
        brand: "LG ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°"],
        infoDesc: `
        <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 11,
        title: "Телевізор LG 32LQ63806LC",
        isSale: 'Акція',
        rating: 5,
        price: 11499,
        category: "TV",
        image: "../../assets/img/LG2.png",
        brand: "LG ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°"],
        infoDesc: `
        <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 12,
        title: "Телевізор LG OLED65C46LA",
        isSale: 'Акція',
        rating: 5,
        price: 99999,
        category: "TV",
        image: "../../assets/img/LG3.png",
        brand: "LG ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°"],
        infoDesc: `
       <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 13,
        title: "Телевізор Samsung QLED QE55Q70DAUXUA",
        isSale: 'Акція',
        rating: 5,
        price: 39999,
        category: "TV",
        image: "../../assets/img/TVSum1.png",
        brand: "Samsung ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°", "75°"],
        infoDesc: `
        <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 14,
        title: "Телевізор Samsung QLED QE85Q60DAUXUA",
        isSale: 'Акція',
        rating: 5,
        price: 76999,
        category: "TV",
        image: "../../assets/img/TVSum2.png",
        brand: "Samsung ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°", "75°"],
        infoDesc: `
          <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 15,
        title: "Телевізор Samsung UE32T5300AUXUA",
        isSale: 'Акція',
        rating: 5,
        price: 11999,
        category: "TV",
        image: "../../assets/img/TVSum3.png",
        brand: "Samsung ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°", "75°"],
        infoDesc: `
    <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 16,
        title: "Телевізор Sony XR65X90KR2",
        isSale: 'Акція',
        rating: 5,
        price: 84999,
        category: "TV",
        image: "../../assets/img/TVSony.png",
        brand: "Sony ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°"],
        infoDesc: `
     <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 17,
        title: "Телевізор Sony KD55X80LE33",
        isSale: 'Акція',
        rating: 5,
        price: 42999,
        category: "TV",
        image: "../../assets/img/TVSony2.png",
        brand: "Sony ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°"],
        infoDesc: `
      <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 18,
        title: "Телевізор Sony XR-77A95L",
        isSale: 'Акція',
        rating: 5,
        price: 36999,
        category: "TV",
        image: "../../assets/img/TVSony3.png",
        brand: "Sony ",
        info: 'Діагональ екрана',
        sizes: ["32°", "43°", "50°"],
        infoDesc: `
      <span class="screen-f">   Діагональ екрана:  <span class="blue-text"> 43 дюйми</span><br>
             <span class="screen-f">    Роздільна здатність: <span class="blue-text">1920x1080</span><br>
            <span class="screen-f"> Частота оновлення: <span class="blue-text">60 Гц </span><br>
           <span class="screen-f">  Платформа: <span class="blue-text"> Tizen</span>
        `
    },
    {
        id: 19,
        title: "УМБ Xiaomi Mi Power Bank 20000 mAh 22.5W Fast Charge",
        isSale: 'Акція',
        rating: 5,
        price: 1199,
        category: "Electronics",
        image: "../../assets/img/powerbank.png",
        brand: "Xiaomi ",
        info: 'Індикація: З індикатором рівня заряду',
        infoDesc: 'Максимальна вихідна потужність, Вт: 22.5',
    },
    {
        id: 20,
        title: "Футболка бавовняна довга чоловіча Guess",
        isSale: 'Акція',
        rating: 5,
        price: 1520,
        category: "Clothes",
        image: "../../assets/img/Guess1.png",
        brand: "Guess ",
        info: 'Розмір',
        sizes: ["M", "L", "XL"],
        infoDesc: ''
    },
    {
        id: 21,
        title: "Футболка чоловіча Guess M3GI16I3Z14-G1ED L Бежева",
        isSale: 'Акція',
        rating: 5,
        price: 500,
        category: "Clothes",
        image: "../../assets/img/Guess2.png",
        brand: "Guess ",
        info: 'Розмір',
        sizes: ["S", "L"],
        infoDesc: ''
    },
    {
        id: 22,
        title: "Футболка бавовняна довга чоловіча Mavi",
        isSale: 'Акція',
        rating: 5,
        price: 390,
        category: "Clothes",
        image: "../../assets/img/Mavi1.png",
        brand: "Mavi ",
        info: 'Розмір',
        sizes: ["S", "L", "2XL"],
        infoDesc: ''
    },
    {
        id: 23,
        title: "Футболка бавовняна довга чоловіча Mavi",
        isSale: 'Акція',
        rating: 5,
        price: 374,
        category: "Clothes",
        image: "../../assets/img/Mavi2.png",
        brand: "Mavi ",
        info: 'Розмір',
        sizes: ["S", "M", "L", "2XL"],
        infoDesc: ''
    },
    {
        id: 24,
        title: "Жіночі кеди низькі Nike W Court Vision Alta Ltr ",
        isSale: 'Акція',
        rating: 5,
        price: 3649,
        category: "Sneakers",
        image: "../../assets/img/Nike1.png",
        brand: "Nike ",
        info: 'Розмір',
        sizes: ["38", "39", "40", "41"],
        infoDesc: "УВАГА! Оформлюючи замовлення, звіряйтеся з таблицею розмірів за US, оскільки на бирці та на коробці розмір UA не вказується.",
    },
    {
        id: 25,
        title: "Жіночі кеди низькі Nike Wmns Court Legacy",
        isSale: 'Акція',
        rating: 5,
        price: 3569,
        size: ["36", "37.5"],
        category: "Sneakers",
        image: "../../assets/img/Nike2.png",
        brand: "Nike ",
        info: 'Розмір',
        sizes: ["36", "36.5", "37", "37.5"],
        infoDesc: "УВАГА! Оформлюючи замовлення, звіряйтеся з таблицею розмірів за US, оскільки на бирці та на коробці розмір UA не вказується.",
    },
    {
        id: 26,
        title: "Жіночі кеди низькі Adidas Gazelle Bold",
        isSale: 'Акція',
        rating: 5,
        price: 3999,
        category: "Sneakers",
        size: ["36", "37.5"],
        image: "../../assets/img/Adidas1.png",
        brand: "Adidas ",
        sizes: ["36", "36.5", "37", "37.5"],
        info: 'Розмір',
        infoDesc: "УВАГА! Оформлюючи замовлення, звіряйтеся з таблицею розмірів за US, оскільки на бирці та на коробці розмір UA не вказується.",

    },
    {
        id: 27,
        title: "Жіночі кеди низькі Adidas Vl Court 3.0",
        isSale: 'Акція',
        rating: 5,
        price: 2969,
        size: ["36", "37.5"],
        category: "Sneakers",
        image: "../../assets/img/Adidas2.png",
        brand: "Adidas ",
        sizes: ["36", "36.5", "37", "37.5"],
        info: 'Розмір',
        infoDesc: "УВАГА! Оформлюючи замовлення, звіряйтеся з таблицею розмірів за US, оскільки на бирці та на коробці розмір UA не вказується.",

    }
]

router.get('/', (req, res) => {
    res.status(200).json({ products });
});



router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send({ message: 'Invalid product ID' });
    }
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: 'Product not found' });
    }
});

module.exports = router;