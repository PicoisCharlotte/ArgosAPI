# Argos API

## Run in Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9a839ffb639e339e25a3)

## Endpoints

## API Argos, database : firebase

### Select : https://argosapi.herokuapp.com/table_name/select?action=action_name

Returns a list of the selected table

list of action_name user : 
- selectAllUser
- selectJoinRToU
- selectAUser, add after action_name, &credential=[{{login}}, {{password}}]

list of action_name robot:
- selectAllRobot
- selectWhereRobot, add after action_name; &idUserRobot={{idUserRobot}}

### Insert : https://argosapi.herokuapp.com/table_name/insert

insert new data

table_name user:
- insertUser, parameters(body), body is required

table_name robot:
- insertRobot, parameters(body), body is required

### Delete : https://argosapi.herokuapp.com/table_name/delete

Delete data

table_name robot:
- deleteRobot, parameters(body), body is required, just id_robot in body