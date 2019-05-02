# Argos API

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

action_name user:
- insertUser, parameters(body), body is required

action_name robot:
- insertRobot, parameters(body), body is required