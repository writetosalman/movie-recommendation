composer install
echo "Composer install completed"
npm install
echo "npm install completed"
cp .env.example  .env
echo ".env file copied from .env.example"
php artisan key:generate
php artisan config:clear
echo "Keys generated completed"
echo "Please first edit .env file with your mysql database details & then run laravel migrations by using command `php artisan migrate`"
