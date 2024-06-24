# Web store
Simple web store written mostly in HTML and CSS, with some simple Javascript.

## Nginx deployment
```
sudo su
mkdir -pi /var/www/store-example
cp src/* /var/www/store-example
sudo chown -R nginx:nginx /var/www/store-example  # nginx user
cp nginx/example-store /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/store-example /etc/nginx/sites-enabled/store-example
```

Make sure the line `include /etc/nginx/sites-enabled/*;` is uncommented in `/etc/nginx/nginx.conf` is uncommented in `/etc/nginx/nginx.conf`.
