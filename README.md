## Movie Recommendations

This project is built in PHP Laravel and ReactJS.
It can serve as a boiler plate to start your own project.

It returns movie recommendations based on **Genre** and **Showing time** selected.

### Installation

For installation, use `install.sh` provided: -

- Change into the directory
- Give execute permissions to install file 
`chmod +x install.sh`
- Execute it `./install.sh`
- **After** installation is complete, edit .env file with correct MySQL details
- Run laravel migrations by running command 
`php artisan migrate`
- Run laravel seeder to seed database by running command 
`php artisan db:seed`

### Running

For viewing project in browser: -

- cd into the directory
- Run command `php artisan serve`
- Visit the URL mentioned in the command prompt.