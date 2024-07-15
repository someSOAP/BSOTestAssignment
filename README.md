# BSOTestAssignment




# Issues
At some places you will see some strange code like:
````
    const { useRegisterMutation } = authApiService;
    const [register, data] = useRegisterMutation();
````
In such cases service api is imported instead of mutation/query hooks straight import. 
It is done due to the [GitHub issue](https://github.com/reduxjs/redux-toolkit/issues/3983). 
