# فروشگاه اینترنتی (E-Commerce Backend)

بک‌اند یک فروشگاه آنلاین با NestJS و TypeScript.

## این پروژه چیکار می‌کنه؟

- مدیریت کاربران (ثبت، ویرایش، حذف)
- مدیریت محصولات و دسته‌بندی‌ها
- سبد خرید و علاقه‌مندی‌ها
- ثبت سفارش و پرداخت آنلاین با [زیبال](https://zibal.ir/)
- مدیریت آدرس و تیکت پشتیبانی
- مستندات API با Swagger

## تکنولوژی‌ها

NestJS · TypeScript · MySQL · TypeORM · Swagger

## نصب و اجرا

**نیاز داری:** Node.js، MySQL

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce.git
cd ecommerce
npm install
```

یک فایل `.env` بساز (از `.env-example` کپی کن):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=ecommerce

JWT_SECRET=your_secret_key
JWT_EXPIRATION=1h

PORT=3000
```

توی MySQL یه دیتابیس بساز:

```sql
CREATE DATABASE ecommerce;
```

بعد پروژه رو اجرا کن:

```bash
npm run start:dev
```

سرور روی `http://localhost:3000` بالا میاد.

## Swagger

بعد از اجرا، همه APIها رو اینجا ببین و تست کن:

```
http://localhost:3000/api
```

## APIها (خلاصه)

| بخش | مسیر |
|-----|------|
| کاربران | `/users` |
| محصولات | `/products` |
| دسته‌بندی | `/categories` |
| سفارش‌ها | `/orders` |
| آدرس | `/address` |
| تیکت | `/tickets` |

جزئیات هر endpoint توی Swagger هست.

## پرداخت

1. `POST /orders/start-payment` → لینک پرداخت می‌گیری
2. `POST /orders/verify-payment` → بعد از پرداخت، تراکنش رو تأیید می‌کنی

## دستورات مفید

```bash
npm run start:dev    # اجرا در حالت توسعه
npm run build        # بیلد
npm run start:prod   # اجرای production
```

## ساختار پوشه‌ها

```
src/
├── users/       # کاربران
├── products/    # محصولات و سبد خرید
├── categories/  # دسته‌بندی
├── orders/      # سفارش و پرداخت
├── address/     # آدرس
├── tickets/     # تیکت پشتیبانی
└── middlewares/ # لاگر
```

---

**Arezo Afshar**
