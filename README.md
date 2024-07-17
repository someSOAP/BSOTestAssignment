# BSOTestAssignment


## Strapi Admin Credentials
Email: `test@admin.com`\
Password: `TestAdmin123`

## Issues
At some places you will see some strange code like:
````
    const { useRegisterMutation } = authApiService;
    const [register, data] = useRegisterMutation();
````
In such cases service api is imported instead of mutation/query hooks straight import. 
It is done due to the [GitHub issue](https://github.com/reduxjs/redux-toolkit/issues/3983). 

## Patches
I had to patch `strapi-plugin-io` in order to emit CRUD events for users who don't have corresponding rights.
In current case, authenticated no-admin users have no right to create, update or delete products. And it's quite dangerous 
to give them such rights. By default, `strapi-plugin-io` emits events only for rooms of users who have corresponding rights. 
I've patched the package in such way that all authenticated users now will be notified about any changes in products. There might was
an easier way to do that which I was not manage to find, because the documentation is poor enough and the plugin is hardly maintained.
