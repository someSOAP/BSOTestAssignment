# BSOTestAssignment


## Description
The app consists of two parts - [bso-spa](bso-spa) as the frontend part of the app and [bso-strapi](bso-strapi)
as the CMS backend. 
On the backend side user can create list products which can be added to the user's cart. Products list and user's cart is displayed on 
the frontend side. When product is updated on the CMS side, data will be automatically conveyed to the frontend side with 
real time update. 

## Simplifications
In order to reduce the time of development some of the things were omitted or simplified. For example, errors proceeding 
were mostly omitted, project files structure was simplifed (feature folders were omitted and so on).

## Start
In order to start the application run `yarn install` command and `yarn dev` afterwards. It will concurrently run the strapi 
dev server and react spa dev project. 

## Credentials
### Strapi Admin
Email: `test@admin.com`\
Password: `TestAdmin123`

### Test user
Username: `test` | `test2`\
Password: `Pass123`

## Patches
I had to patch `strapi-plugin-io` in order to emit CRUD events for users who don't have corresponding rights.
In current case, authenticated no-admin users have no right to create, update or delete products. And it's quite dangerous
to give them such rights. By default, `strapi-plugin-io` emits events only for rooms of users who have corresponding rights.
I've patched the package in such way that all authenticated users now will be notified about any changes in products. There might was
an easier way to do that which I was not manage to find, because the documentation is poor enough and the plugin is hardly maintained.


## Issues
At some places you will see some strange code like:
````
    const { useRegisterMutation } = authApiService;
    const [register, data] = useRegisterMutation();
````
In such cases service api is imported instead of mutation/query hooks straight import. 
It is done due to the [GitHub issue](https://github.com/reduxjs/redux-toolkit/issues/3983). 

