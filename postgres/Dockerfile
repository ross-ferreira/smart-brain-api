FROM postgres:13.1

# This is the folder we are going to create in our container
ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /seed/ /docker-entrypoint-initdb.d/seed/
ADD deploy_schemas.sql /docker-entrypoint-initdb.d/
# This is according to postgres image documentation to extend this image so it is standard naming